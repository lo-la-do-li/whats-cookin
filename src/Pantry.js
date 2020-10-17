class Pantry {
  constructor(user) {
    this.pantry = user.pantry;
    this.recipe = user.recipesToCook;
    this.shoppingList = [];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
