const ingredientsData = require('../data/ingredients.js');

class User {
  constructor (name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  
  addFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe)
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
    // console.log('Ingredient in ingredientsData:', foundIngredients)
    let searchResults = new Set()
    let ingredientMatches = foundIngredients.reduce((acc, ingredient) => {
      let lowerIngredient = ingredient.name.toLowerCase();
      // if (ingredient.name.includes(newInput)) {
      if (lowerIngredient.includes(newInput)) {
        acc.push(ingredient.id)
      }
      // console.log('Matching Ingredient ID:', acc)
      return acc
    }, []);
    searchResults = this.favoriteRecipes.reduce((acc, recipe) => {
      recipe.ingredients.filter(ingredient => {
        return ingredientMatches.includes(ingredient.id) ? acc.push(recipe) : "No ingredient matches"
        // console.log(filterIngredients)
      })
      return acc
    }, [])
    return searchResults
  }
}



if (typeof module !== 'undefined') {
  module.exports = User;
}