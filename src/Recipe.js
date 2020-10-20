// const ingredientsData = require('../data/ingredients.js');

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }
  getIngredientsData() {
    return ingredientsData.reduce((acc, ingredient) => {
      this.ingredients.filter(recipeIngredient => {
        return recipeIngredient.id === ingredient.id ? acc.push({id: ingredient.id, name: ingredient.name, estimatedCostInCents: ingredient.estimatedCostInCents}) : "No such ingredient ID exists"
      })
      return acc;
    }, [])
  }

  mapIngredientsInfo() {
    let ingredientsData = this.getIngredientsData()
    let recipeIngredients = this.ingredients

    let allIngredientsData = ingredientsData.map((item, i) => Object.assign({}, item, recipeIngredients[i]))

    return allIngredientsData
  }

  getCostOfRecipe() {
    let totalCostOfRecipe = this.mapIngredientsInfo().reduce((total, ingredient) => {
      total += (ingredient.estimatedCostInCents * ingredient.quantity.amount)
      return total
    }, 0)

    return totalCostOfRecipe
  }
}

if (typeof module !== 'undefined') { 
  module.exports = Recipe; 
}
