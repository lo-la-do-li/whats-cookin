const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const newRecipe = require('../data/recipes');

describe('Recipe', () => {
  let newRecipe, ingredient1, ingredient2, ingredient3, instruction1, instruction2, instruction3, instruction4;

  beforeEach(() => {
    newRecipe = new Recipe(595736, "https://spoonacular.com/recipeImages/595736-556x370.jpg", [ingredient1, ingredient2, ingredient3], [instruction1, instruction2, instruction3, instruction4], "Loaded Chocolate Chip Pudding Cookie Cups", ["antipasti", "starter", "snack", "appetizer"]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(newRecipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(newRecipe.id).to.equal(595736);
  });

  it('should have an image', () => {
    expect(newRecipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg",
    "ingredients");
  });

  it('should have ingredients', () => {
    expect(newRecipe.ingredients).to.deep.equal([ingredient1, ingredient2, ingredient3]);
  });

  it('should contain an array of ingredients', () => {
    expect(newRecipe.ingredients.length).to.deep.equal(3);
  });

  it('should have instructions', () => {
    expect(newRecipe.instructions).to.deep.equal([instruction1, instruction2, instruction3, instruction4]);
  });

  it('should contain an array of instructions', () => {
    expect(newRecipe.instructions).to.be.a('array');
    expect(newRecipe.instructions.length).to.deep.equal(4);
  });

  it('should have a name', () => {
    expect(newRecipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('should have tags', () => {
    expect(newRecipe.tags).to.deep.equal(["antipasti", "starter", "snack", "appetizer"])
  });

  it('should contain an array of tags', () => {
    expect(newRecipe.tags).to.be.a('array');
    expect(newRecipe.tags.length).to.deep.equal(4);
  });
});
