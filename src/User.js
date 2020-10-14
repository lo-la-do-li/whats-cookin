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
    let nameValue = nameInput
     return this.favoriteRecipes.filter(recipe => {
      if(recipe.name.includes(nameValue)) {
        return recipe
      } else {
        return "No recipes match that title"
      }
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
  
  searchFavoriteRecipesByIngredient(ingredientInput) {
  
    let searchResults = [];
    const ingredientId = ingredientsData.find(ingredient => {
      if(ingredient.name === ingredientInput)
        console.log(ingredient.id)
        return ingredient.id
      
    })
    
    
  }
}


if (typeof module !== 'undefined') {
    module.exports = User;
}