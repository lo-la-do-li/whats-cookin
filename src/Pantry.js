class Pantry {
  constructor(user) {
    this.pantry = user.pantry;
    this.recipes = user.recipesToCook;
    this.shoppingList = [];
  }
  
  checkPantry(recipe) {
      let ingredientInRecipe = recipe.mapIngredientsInfo();
      let isStocked;
      
      let pantryIngredients = this.pantry.reduce((inventroy, item) => {
        return {...inventroy, [item.ingredient] : item.amount};
      }, {})
      
      ingredientInRecipe.forEach(ingredient => {
        if (!pantryIngredients.hasOwnProperty(ingredient.id)) {
          isStocked = false;
          this.shoppingList.push(ingredient)
        } else if (pantryIngredients[ingredient.id] < ingredient.quantity.amount) {
          isStocked = false;
          this.shoppingList.push(ingredient);
        } else {
          isStocked = true;
        }
      })
      return isStocked;
      }
      
    returnShoppingList() {
      
      return this.shoppingList;
    }
  }
  
  
  


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
