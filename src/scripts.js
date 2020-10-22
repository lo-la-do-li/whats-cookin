let modal;
let trigger;
let likeButton
let completeRecipeSet;
let removeButton;
let addToCookButton;
let cookButton;
let removeToCookButton;

//Query Selectors
let allRecipes = document.querySelector('.all-recipes');
let recipesDisplay = document.querySelector('.recipes-display');
let instructions = document.querySelector('.instructions');
let ingredients = document.querySelector('.ingredients');
let estimatedCost = document.querySelector('.estimated-cost')
let closeButton = document.querySelector('.close-button');
let recipeInfoModal = document.querySelector('.modal')
let favoritesTab = document.querySelector('.tab-favorite-recipes')
let favoriteDisplay = document.querySelector('.favorite-recipes')
let allRecipesTab = document.querySelector('.tab-all-recipes')
let toCookTab = document.querySelector('.tab-to-cook-recipes')
let toCookDisplay = document.querySelector('.to-cook-recipes')
let pantryTab = document.querySelector('.tab-pantry')
let searchBar = document.querySelector('.search-input')


//Functions//Event Listeners
window.addEventListener('click', windowOnClick);
window.addEventListener('load', onLoad);
recipesDisplay.addEventListener('click', recipeBlockClickHandler)
searchBar.addEventListener('input', searchRecipes)

function onLoad() {
  getRandomUser();
  completeRecipeSet = assignRecipes(recipeData)
  displayRecipesAll(completeRecipeSet)
  displayUserPantry(userPantry, ingredientsData)
}
//RECIPE BUTTON HANDLERS
function recipeBlockClickHandler(event) {
  if (event.target.classList.contains("close-button")) {
    recipeInfoModal.classList.toggle("show-modal")
  }
  if (event.target.classList.contains("trigger")) {
    let recipeID = event.target.closest(".recipe-block").id
    displayModal(recipeID)
  }
  if (event.target.classList.contains("like-btn")) {
    let newRecipe = event.target.closest(".recipe-block").id
    addToFavorites(newRecipe)
  }
  if (event.target.classList.contains("remove-btn")) {
    let removeRecipe = event.target.closest(".recipe-block").id
    removeFromFavorites(removeRecipe)
  }
  if (event.target.classList.contains("to-cook-btn")) {
    let faveRecipe = event.target.closest(".recipe-block").id
    addToCook(faveRecipe)
  }
  if (event.target.classList.contains("remove-to-cook-btn")) {
    let removeRecipe = event.target.closest(".recipe-block").id
    removeFromRecipesToCook(removeRecipe)
  }
  if (event.target.classList.contains("cook-btn")) {
    let currentRecipe = event.target.closest(".recipe-block").id
    checkForIngredients(currentRecipe)
  }
}
//MODAL HANDLERS
function displayModal(recipeID) {
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === +recipeID
  })
  document.querySelector('.ingredients').innerText = ''
  document.querySelector('.instructions').innerText = ''
  document.querySelector('.estimated-cost').innerText = ''
  displayRecipeInstructions(foundRecipe, "instructions");
  displayRecipeIngredients(foundRecipe, "ingredients");
  displayCostOfRecipe(foundRecipe, "estimated-cost");
  modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
}
function toggleModal(event) {
  modal.classList.toggle("show-modal");
}

//WINDOW CLICK EVENTS
function windowOnClick(event) {

  if (event.target === modal) {
    toggleModal();
  }
  if (event.target === favoritesTab) {
    event.preventDefault();
    displayFavorites()
  }
  if (event.target === allRecipesTab) {
    event.preventDefault();
    displayAllView()
  }
  if (event.target === toCookTab) {
    event.preventDefault();
    displayRecipesToCook();
  }
  if (event.target === pantryTab) {
    event.preventDefault();
    displayPantryStock(pantry, ingredientsArray)
  }

  //add other window-clickevent targets Here
}
function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function getRandomUser() {
  user = new User(getRandomIndex(usersData))
  userPantry = new Pantry(user);
  let message = document.querySelector('.whats-cookin-message');
  message.innerHTML = `What's Cookin' in ${user.name}'s Kitchen?`
}


//ALL RECIPES
function assignRecipes(recipesArray) {
  return recipesArray.map(recipe => new Recipe(recipe));
}
function displayAllView() {
  favoritesTab.classList.remove('current')
  toCookTab.classList.remove('current')
  allRecipesTab.classList.add('current')
  completeRecipeSet = assignRecipes(recipeData)
  displayRecipesAll(completeRecipeSet);
}

function displayRecipesAll(completeRecipeSet) {
  completeRecipeSet.forEach(recipe => {
    const recipeBlock =
    `
    <article class="recipe-block" id="${recipe.id}">
    <figure>
    <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
    <h2>${recipe.name}</h2>
    <h3 class="tags">${insertTags(recipe)}</h3>
    </hgroup>
    <p>
    <button class="like-btn">Like</button>
    </p>
    <button class="trigger" id="trigger">Click here to see more</button>
    </article>
    `
    allRecipes.insertAdjacentHTML('beforeend', recipeBlock);
  });
};

function displayRecipeIngredients(recipe, className) {
  recipe.ingredients.forEach(ingredient => {
    ingredient =
    `
    ${getIngredientName(ingredient)}:
    ${ingredient.quantity.amount} ${ingredient.quantity.unit}</br>
    `
    populateModal(ingredient, className);
  });
}

function insertTags(recipe) {
  return recipe.tags.map(tag => {
    newTag =
    ` ${tag}`
    return newTag
  })
}

function displayRecipeInstructions(recipe, className) {
  recipe.instructions.forEach(instruction => {
    instruction =
    `${instruction.number}. ${instruction.instruction}</br>`
    populateModal(instruction, className);
  });
}
function populateModal(item, className) {
  document.querySelector(`.${className}`).insertAdjacentHTML('beforeend', item)
}

function getIngredientName(ingredient) {
  let name;
  ingredientsData.forEach(ingredientData => {
    if (ingredient.id === ingredientData.id) {
      name = ingredientData.name;
    }
  })
  return name;
}
function displayCostOfRecipe(recipe, className) {
  recipe = new Recipe(recipe)
  let cost = `¢${recipe.getCostOfRecipe()}`
  populateModal(cost, className)
}

//FAVORITES
function addToFavorites(newRecipe) {
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === +newRecipe
  })
  user.addFavoriteRecipes(foundRecipe)
}
function removeFromFavorites(byeRecipe) {
  let removedRecipe = recipeData.find(recipe => {
    return recipe.id === +byeRecipe
  })
  user.removeFavoriteRecipes(removedRecipe)
  displayFavoritesView(user.favoriteRecipes)
}
function removeFromRecipesToCook(byeRecipe) {
  let removedRecipe = recipeData.find(recipe => {
    return recipe.id === +byeRecipe
  })
    removedRecipe = user.recipesToCook.indexOf(removedRecipe)
    user.recipesToCook.splice(removedRecipe, 1)
    displayRecipesToCook(user.recipesToCook)
  }

  function searchRecipes(e) {

    let searchInput = e.target.value
    let recipeMatches = []

    let nameMatches = user.searchFavoriteRecipesByName(searchInput)
    let ingredientMatches = user.searchFavoriteRecipesByIngredient(searchInput)

      if (typeof nameMatches === 'object' && nameMatches.length !== 0) {
      recipeMatches = nameMatches.concat()
      }

      if (typeof ingredientMatches === 'object' && ingredientMatches.length !== 0) {
        console.log(typeof ingredientMatches)
      recipeMatches = ingredientMatches.concat()
      }

      displayFavoritesSearch(recipeMatches)
  }

function displayFavorites() {
  allRecipes.innerHTML = " ";
  toCookDisplay.innerHTML = " ";
  allRecipesTab.classList.remove('current')
  toCookTab.classList.remove('current')
  favoritesTab.classList.add('current')
  displayFavoritesView(user.favoriteRecipes);
}

function displayFavoritesView(favoriteRecipes) {
favoriteDisplay.innerHTML = " "
let favorites = new Set(user.favoriteRecipes)
  favorites.forEach(recipe => {
    const favoritesBlock =
    `
    <article class="recipe-block" id="${recipe.id}">
    <figure>
    <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
    <h2>${recipe.name}</h2>
    <h3 class="tags">${insertTags(recipe)}</h3>
    </hgroup>
    <p>
    <button class="remove-btn">Remove</button>
    <button class="to-cook-btn">Add to Recipes to Cook</button>
    </p>
    <button class="trigger" id="trigger">Click here to see more</button>
    </article>
    `
    addToCookButton = document.querySelector('.to-cook-btn');
    favoriteDisplay.insertAdjacentHTML('beforeend', favoritesBlock);
  });
};

function displayFavoritesSearch(recipeMatches) {
let searchMatches = new Set(recipeMatches)
favoriteDisplay.innerHTML = " "

  searchMatches.forEach(recipe => {
    console.log(recipe)
    const searchedBlock =
    `
    <article class="recipe-block" id="${recipe.id}">
    <figure>
    <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
    <h2>${recipe.name}</h2>
    <h3 class="tags">${insertTags(recipe)}</h3>
    </hgroup>
    <p>
    <button class="remove-btn">Remove</button>
    <button class="to-cook-btn">Add to Recipes to Cook</button>
    </p>
    <button class="trigger" id="trigger">Click here to see more</button>
    </article>
    `
    addToCookButton = document.querySelector('.to-cook-btn');
    favoriteDisplay.insertAdjacentHTML('beforeend', searchedBlock);
  });
};

//RECIPES TO COOK
function addToCook(faveRecipe) {
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === +faveRecipe
  })
  user.addRecipiesToCook(foundRecipe)
}

function formatRecipesToCook(recipesToCook) {
  toCookDisplay.innerHTML = " "
  let toCooks = new Set(user.recipesToCook)
  toCooks.forEach(recipe => {
    const toCookBlock =
    `
    <article class="recipe-block" id="${recipe.id}">
    <figure>
    <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
    <h2>${recipe.name}</h2>
    <h3 class="tags">${insertTags(recipe)}</h3>
    </hgroup>
    <p>
    <button class="remove-to-cook-btn">Remove</button>
    <button class="cook-btn">Cook this Recipe</button>
    </p>
    <button class="trigger" id="trigger">Click here to see more</button>
    </article>
    `
    removeToCookButton = document.querySelector('remove-to-cook-btn');
    cookButton = document.querySelector('.cook-btn');
    toCookDisplay.insertAdjacentHTML('afterbegin', toCookBlock);
  });
};

function displayRecipesToCook() {
  allRecipes.innerHTML = " ";
  favoriteDisplay.innerHTML = " ";
  allRecipesTab.classList.remove('current')
  favoritesTab.classList.remove('current')
  toCookTab.classList.add('current')
  formatRecipesToCook(user.recipesToCook);
}

function displayPantryStock(pantry, ingredientsArray) {
  const userPantryBlock = document.querySelector('.user-pantry');
  userPantryBlock.innerHTML = '<h3>What\'s in Stock?</h3>';
  pantry.pantry.forEach(function(item) {
    const itemsInStock =
    `
    <a>${itemNameById(item.ingredient, ingredientsArray)}, ${item.amount}</a>
    `
    userPantryBlock.insertAdjacentHTML('beforeend', itemsInStock);
  })
}

function itemNameById(itemId, ingredientsArray) {
  let name;
  ingredientsArray.forEach(ingredient => {
    if (ingredient.id === itemId) {
      name = ingredient.name
    }
  })
  return name;
}
function displayUserPantry(pantry, ingredientsArray) {
  displayPantryStock(pantry, ingredientsArray);
}

function checkForIngredients(recipe) {
  let response = userPantry.checkPantry(recipe);
  const questionBlock = document.querySelector('.cook-question');

  if(response === true) {

    const canCook =
    `<a> You can cook this recipe!</a>`
  } else {
    const canCook =
    `<a> You can not cook this recipe</a>`
  }
  questionBlock.insertAdjacentHTML('beforeend', canCook);
}
