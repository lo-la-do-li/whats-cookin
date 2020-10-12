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
  
}

if (typeof module !== 'undefined') {
     module.exports = User; 
} 