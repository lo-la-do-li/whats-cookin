let modal;
let trigger;
let likeButton
let completeRecipeSet;
let removeButton;
let addToCookButton;
let cookButton;
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
searchBar.addEventListener('input', searchRecipes);

// favoritesView.addEventListener('click', displayFavorites)
//Functions



function onLoad() {
  getRandomUser();
  completeRecipeSet = assignRecipes(recipeData)
  displayRecipesAll(completeRecipeSet)
}
//RECIPE BUTTON HANDLERS

function searchRecipes(e) {

  console.log(e.target.value);
  let searchInput = e.target.value
  let recipeMatches = user.searchFavoriteRecipesByName(searchInput)

  return displayFavorites(searchResults)
}

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
  if (event.target.classList.contains("add-to-cook-btn")) {
    let faveRecipe = event.target.closest(".recipe-block").id
    addToCook(faveRecipe)

  }
  if (event.target.classList.contains("cook-btn")) {
    let cookedRecipe = event.target.closest(".recipe-block").id
    cookedRecipe = new Recipe()
    userPantry.checkPantry(cookedRecipe)


  }
}
//WINDOW CLICK EVENTS
function windowOnClick(event) {
event.preventDefault();
  if (event.target === modal) {
    toggleModal();
  }
  if(event.target === favoritesTab) {
    // event.preventDefault();
    displayFavorites()
  }
  if(event.target === allRecipesTab) {
    // event.preventDefault();
    displayAllView()
  }
  if(event.target === toCookTab) {
    // event.preventDefault();
    displayRecipesToCook();
  }
    //add other window-clickevent targets Here
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

function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function getRandomUser() {
  user = new User(getRandomIndex(usersData))
  userPantry = new Pantry(user);
  let message = document.querySelector('.whats-cookin-message');
  message.innerHTML = `What's Cookin' in ${user.name}'s Kitchen?`
}
// function showElement(className) {
//   document.querySelector(`.${className}`).remove('hidden')
// }
function showElement(item) {
  item.classList.remove('hidden')
}
function hideElement(className) {
  className.classList.add('hidden')
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
  // favoriteDisplay.innerHTML = " ";
  completeRecipeSet.forEach(recipe => {
const recipeBlock =
`
  <article class="recipe-block" id="${recipe.id}">
    <figure>
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
      <h2>${recipe.name}</h2>
      <h3 class="tags">${recipe.tags}</h3>
    </hgroup>
    <p>
      <button class="like-btn">Like</button>
    </p>
      <button class="trigger" id="trigger">Click here to see more</button>
    </article>
  `
    // <button class="remove-btn">Remove</button>
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
// function displayTags(item, className) {
//   document.querySelector().insertAdjacentHTML('beforeend', item)
// }
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
function removeFromFavorites(newRecipe) {
  let removedRecipe = recipeData.find(recipe => {
     return recipe.id === +newRecipe
  })
    user.removeFavoriteRecipes(removedRecipe)
}

function displayFavorites() {
  allRecipes.innerHTML = " ";
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
    <h3 class="tags">${recipe.tags}</h3>
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

  //RECIPES TO COOK
  function addToCook(faveRecipe) {
    const foundRecipe = recipeData.find(recipe => {
       return recipe.id === +faveRecipe
    })
      user.addRecipiesToCook(foundRecipe)
  }

  function formatRecipesToCook(recipesToCook) {
  user.recipesToCook.forEach(recipe => {
  const toCookBlock =
  `
    <article class="recipe-block" id="${recipe.id}">
      <figure>
        <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
      </figure>
      <hgroup>
        <h2>${recipe.name}</h2>
        <h3 class="tags">${recipe.tags}</h3>
      </hgroup>
      <p>
        <button class="remove-btn">Remove</button>
        <button class="cook-btn">Cook this Recipe</button>
      </p>
        <button class="trigger" id="trigger">Click here to see more</button>
      </article>
    `
      cookButton = document.querySelector('.cook-btn');
      toCookDisplay.insertAdjacentHTML('afterend', toCookBlock);
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
