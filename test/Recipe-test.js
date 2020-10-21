const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe');
const newRecipe = require('../data/recipes');

describe('Recipe', () => {
  let newRecipe, ingredient1, ingredient2, ingredient3, instruction1, instruction2;

  beforeEach(() => {

    ingredient1 = {
      "id": 20081,
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    }

    ingredient2 = {
      "id": 18372,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    }

    ingredient3 = {
      "id": 1123,
      "quantity": {
        "amount": 1,
        "unit": "large"
      }
    }

    instruction1 = {
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    }

    instruction2 = {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    }

    newRecipe = new Recipe(
        {
        id: 595736,
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg", ingredients: [ingredient1, ingredient2, ingredient3],
        instructions: [instruction1, instruction2],
        name: "Loaded Chocolate Chip Pudding Cookie Cups",
        tags: ["antipasti", "starter", "snack", "appetizer"]
  });
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
    expect(newRecipe.instructions).to.deep.equal([instruction1, instruction2]);
  });

  it('should contain an array of instructions', () => {
    expect(newRecipe.instructions).to.be.a('array');
    expect(newRecipe.instructions.length).to.deep.equal(2);
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

  it('should be able to provide missing ingredient info', () => {
    expect(newRecipe.getIngredientsData().length).to.deep.equal(3);
  });

  it('should combine ingredients property with ingredients data set into one complete ingredient object in an array', () => {
    expect(newRecipe.mapIngredientsInfo()).to.be.an('array');
    expect(newRecipe.mapIngredientsInfo()[0].name).to.equal('wheat flour');
  });

  it('should be able to return total cost of recipe', () => {
    expect(newRecipe.getCostOfRecipe()).to.equal(976);
  });
});
