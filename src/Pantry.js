class Pantry {
  constructor(user) {
    this.pantry = user.pantry;
    this.recipes = user.recipesToCook;
    this.shoppingList = [];
  }
  
  // checkPantry(recipe) {
  //     let ingredientInRecipe = recipe.mapIngredientsInfo();
  //     let isStocked;
  // 
  //     let pantryIngredients = this.pantry.reduce((inventory, item) => {
  //       return {...inventroy, [item.ingredient] : item.amount};
  // 
  //     }, {})
  //     ingredientInRecipe.forEach(ingredient => {
  //       console.log(isStocked)
  //       if (!pantryIngredients[ingredient.id]) {
  //         isStocked = false;
  //         this.shoppingList.push(ingredient)
  //       } else if (pantryIngredients[ingredient.id] < ingredient.quantity.amount) {
  //         isStocked = false;
  //         this.shoppingList.push(ingredient);
  //       } else {
  //         isStocked = true;
  //       }
  //     })
  //     console.log(isStocked)
  //     return isStocked;
  //     }
  
  checkPantry(recipe) {
    this.shoppingList = []
      let ingredientInRecipe = recipe.mapIngredientsInfo();
      let pantryIngredients = this.pantry.reduce((inventory, item) => {
        return {...inventory, [item.ingredient] : item.amount};
      }, {})
      ingredientInRecipe.forEach(ingredient => {
        if(!pantryIngredients[ingredient.id]) {
          this.shoppingList.push(ingredient)
        } else if( pantryIngredients[ingredient.id] < ingredient.quantity.amount) {
          let negativeAmount = pantryIngredients[ingredient.id] -
           ingredient.quantity.amount
           this.shoppingList.push({
             id:ingredient.id,
             name: ingredient.name,
             estimatedCostInCents: ingredient.estimatedCostInCents,
             quantity: {
               amount: Math.abs(negativeAmount),
               unit: ingredient.quantity.unit
             }
           })
      }
    })
    return (this.shoppingList.length > 0) ? false : true
  }

    updatePantry(recipe) {
      let ingredientInRecipe = recipe.mapIngredientsInfo();
      if(this.shoppingList.length > 0) {
        this.addItemsToPantry()
      }
      ingredientInRecipe.forEach(ingredient => {
        this.pantry.forEach(item => {
          if(item.ingredient === ingredient.id) {
            item.amount -= ingredient.quantity.amount
          }
        })
      })
      return this.pantry
  }
  
  addItemsToPantry() {
    this.shoppingList.forEach(ingredient => {
      const foundIngredient = this.pantry.find(item =>{
        return item.ingredient === ingredient.id
      })
      if(!foundIngredient) {
        this.pantry.push({'ingredient':ingredient.id, 'amount': ingredient.quantity.amount})
      } else {
        this.pantry.forEach(item => {
          if(item.ingredient === ingredient.id) {
            item.amount += ingredient.quantity.amount
          }
        })
      }
    })
  }
  
  returnShoppingList() {
      
      return this.shoppingList;
    }
  }

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
