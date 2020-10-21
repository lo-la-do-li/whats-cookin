// const ingredientsData = require('../data/ingredients.js')

class User {
  constructor (user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavoriteRecipes(recipe) {
    if(!this.favoriteRecipes.includes(recipe)) {
    this.favoriteRecipes.push(recipe)
    }
  }

  removeFavoriteRecipes(recipe) {
    let recipeToRemove = this.favoriteRecipes.indexOf(recipe)
    this.favoriteRecipes.splice(recipeToRemove, 1)
  }

  addRecipiesToCook(recipe) {
    this.recipesToCook.push(recipe)
  }

  filterFavoriteRecipes(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag)
    })
  }

  filterRecipiesToCook(tag) {
    return this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(tag)
    })
  }

  searchFavoriteRecipesByName(nameInput) {
    console.log(nameInput)
    let recipeMatches = new Set()
    let newInput = nameInput.toLowerCase()
    recipeMatches = this.favoriteRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(newInput)
    })
    console.log(recipeMatches)
    return recipeMatches.length !== 0 ? recipeMatches : "No recipes match that title"
  }

  findIngredients(ingredientInput) {
     let newInput = ingredientInput.toLowerCase();
     return ingredientsData.filter(ingredient => {
      return ingredient.name === newInput
     })
   }

  searchFavoriteRecipesByIngredient(ingredientInput) {
    if (ingredientInput === ' ') {
      return "Please enter an ingredient to search for"
    }
    let newInput = ingredientInput.toLowerCase();
    let foundIngredients = this.findIngredients(ingredientInput);
    // console.log(foundIngredients)

    let searchResults = new Set()

    let ingredientMatches = foundIngredients.reduce((acc, ingredient) => {
      if (ingredient.name.includes(newInput)) {
        acc.push(ingredient.id)
      }
      // console.log('Matching Ingredient ID:', acc)
      return acc
    }, []);

    searchResults = this.favoriteRecipes.reduce((acc, recipe) => {
      let filterIngredients = recipe.ingredients.filter(ingredient => {
      return ingredientMatches.includes(ingredient.id) ? acc.push(recipe) : "No ingredient matches"
      // && console.log('Recipe including this ingredient:', recipe.name)
    })
    return acc

  }, [])

    return searchResults
  }
}

    //we have an array of ingredients that match search
    //Need to access the ids of each object in array
    //Loop through recipes navigate through ingredient property
    //Loop through recipe.ingredients array to find ID
    //Return recipe object that matches / searchResults


if (typeof module !== 'undefined') {
  module.exports = User;
}
