// let recipeSet = [];

let modal;
let trigger;
let closeButton;

const recipesDisplay = document.querySelector('.recipes-display');
let instructions = document.querySelector('.instructions')
let ingredients = document.querySelector('.ingredients');

window.addEventListener('click', windowOnClick);
window.addEventListener('load', onLoad);
recipesDisplay.addEventListener('click', recipeBlockClickHandler)

function onLoad() {
  getRandomUser();
  const allRecipes = assignRecipes(recipeData);
  displayRecipes(allRecipes);
}

function recipeBlockClickHandler(event) {
  if (event.target.classList.contains("close-button")) {
    modal.classList.toggle("show-modal")
  }
  if (event.target.classList.contains("trigger")) {
    let recipeID = event.target.closest(".recipe-block").id
    displayModal(recipeID)
  }
}

function callModalListeners() {
  modal = document.querySelector(".modal");
  trigger = document.querySelector(".trigger");
  closeButton = document.querySelector(".close-button");

  trigger.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
}

function toggleModal(event) {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target && event.id === modal) {
    toggleModal();
    //add other window-click event targets here
  }
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

function displayElement(className) {
  document.querySelector(`.${className}`).remove('hidden')
}

function hideElement(className) {
  document.querySelector(`.${className}`).add('hidden')
}

function assignRecipes(recipesArray) {
  return recipesArray.map(recipe => new Recipe(recipe));
}

function displayRecipes(recipeArray) {
recipeArray.forEach(recipe => {

const recipeBlock =
`
  <article class="recipe-block" id="${recipe.id}">
    <figure>
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}"/>
    </figure>
    <hgroup>
      <h2>${recipe.name}</h2>
      <h3>${recipe.tags}</h3>
    </hgroup>
    <p>
      <button>Like</button>
      <button>Remove</button>
    </p>
    <p>
      <button class="trigger" id="trigger">Click here to see more</button>
    </article>
  `
    recipesDisplay.insertAdjacentHTML('afterend', recipeBlock);

    });
  };

function populateModal(item, className) {
  document.querySelector(`.${className}`).insertAdjacentHTML('beforeend', item)
}

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

  function getIngredientName(ingredient) {
  let name;
  ingredientsData.forEach(ingredientData => {
    if (ingredient.id === ingredientData.id) {
      name = ingredientData.name;
    }
  })
  return name;
}
