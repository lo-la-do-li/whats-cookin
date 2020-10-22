// const ingredientsData = require('../data/ingredients.js');

class User {
  constructor (user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavoriteRecipes(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
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
    let recipeMatches = new Set()
    let newInput = nameInput.toLowerCase()
    recipeMatches = this.favoriteRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(newInput)
    })
    return recipeMatches.length !== 0 ? recipeMatches : "No recipes match that title"
  }

  findIngredients(ingredientInput) {
     let newInput = ingredientInput.toLowerCase();
     let filteredIngData = ingredientsData.filter(ingredientData => {
       return ingredientData.id ? ingredientData : undefined
     })
     return filteredIngData.filter(ingredient => {

      return ingredient.name.includes(newInput)
     })
   }

  searchFavoriteRecipesByIngredient(ingredientInput) {
    if (ingredientInput === ' ') {
      return "Please enter an ingredient to search for"
    }
    let newInput = ingredientInput.toLowerCase();
    let foundIngredients = this.findIngredients(ingredientInput);

    let searchResults = new Set()
    let ingredientMatches = foundIngredients.reduce((acc, ingredient) => {

      if (ingredient.name.includes(newInput)) {
        acc.push(ingredient.id)
      }
      return acc
    }, []);

    searchResults = this.favoriteRecipes.reduce((acc, recipe) => {
      let filterIngredients = recipe.ingredients.filter(ingredient => {
      return ingredientMatches.includes(ingredient.id) ? acc.push(recipe) : "No ingredient matches"

    })
    return acc

  }, [])
    return searchResults
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
