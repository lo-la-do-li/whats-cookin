const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Recipe = require('../src/Recipe');

describe('User', () => {
  let user1, recipe1, recipe2

  beforeEach(() => {

    user1 = new User(
      {
        'name': "Saige O'Kon",
        'id': 1,
        'pantry': [
        {
          "ingredient": 11477,
          "amount": 4
        },
        {
          "ingredient": 11297,
          "amount": 4
        },
        {
          "ingredient": 1082047,
          "amount": 10
        }
      ]
    });
      recipe1 = new Recipe(
        {
          id: 595736,
          image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
          ingredients: [
            {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
        ],
        instructions: [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          },
          {
            "instruction": "Add egg and vanilla and mix until combined.",
            "number": 2
          }
        ],
        name: "Loaded Chocolate Chip Pudding Cookie Cups",
        tags: ["antipasti",
              "starter"]
      });

       recipe2 = new Recipe(
         {
           id: 678353,
           image: "https://spoonacular.com/recipeImages/678353-556x370.jpg",
           ingredients: [
             {
               "id": 1009016,
               "quantity": {
                 "amount": 1.5,
                 "unit": "cups"
               }
             },
             {
               "id": 9003,
               "quantity": {
                 "amount": 2,
                 "unit": ""
               }
             }
           ],
           instructions:
           [
                 {
                   "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
                   "number": 1
                 }
               ],
               name: "Maple Dijon Apple Cider Grilled Pork Chops",
              tags: ["lunch", "main course"]
       });
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(user1.name).to.equal("Saige O'Kon");
  });

  it('should have an id', () => {
    expect(user1.id).to.equal(1);
  });

   it('should have a pantry', () => {
     expect(user1.pantry).to.deep.equal([
             {
               "ingredient": 11477,
               "amount": 4
             },
             {
               "ingredient": 11297,
               "amount": 4
             },
             {
               "ingredient": 1082047,
               "amount": 10
             }
           ])
   });

   it('should start with no favorite recipes', () => {
     expect(user1.favoriteRecipes.length).to.equal(0)
   });

   it('should start with no recipes to cook', () => {
     expect(user1.recipesToCook.length).to.equal(0)
   });

   it('should be able to add a recipe to favorites' , () => {
     user1.addFavoriteRecipes(recipe1)
     user1.addFavoriteRecipes(recipe2)

     expect(user1.favoriteRecipes.length).to.equal(2)
   });

   it('should be able to remove a recipe from favorites', () => {
     user1.addFavoriteRecipes(recipe1)
     user1.addFavoriteRecipes(recipe2)

     user1.removeFavoriteRecipes(recipe2)

     expect(user1.favoriteRecipes).to.deep.equal([recipe1])
   });

   it('should be able to add a recipe to recipies to cook' , () => {
     user1.addRecipiesToCook(recipe1)
     user1.addRecipiesToCook(recipe2)

     expect(user1.recipesToCook.length).to.equal(2)
   });

   it('should filter favorite recipes by tag', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)
    user1.filterFavoriteRecipes('starter')

     expect(user1.filterFavoriteRecipes('starter')).to.deep.equal([recipe1])
   });

   it('should filter recipies to cook by tag', () => {
    user1.addRecipiesToCook(recipe1)
    user1.addRecipiesToCook(recipe2)
    user1.filterRecipiesToCook('lunch')

    expect(user1.filterRecipiesToCook('lunch')).to.deep.equal([recipe2])
  });

  it('should search my favorite recipes by name', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)

    expect(user1.searchFavoriteRecipesByName('Pokie')).to.equal("No recipes match that title")
    expect(user1.searchFavoriteRecipesByName('pork')).to.deep.equal([recipe2])
    expect(user1.searchFavoriteRecipesByName('Chocolate')).to.deep.equal([recipe1])
  });

  it('should return a message if no recipies match the search title in favorites', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)

    expect(user1.searchFavoriteRecipesByName('Pokie')).to.equal("No recipes match that title")
})
  it('should search ingredients data and match input to ingredient object', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)

    expect(user1.findIngredients('Wheat flour')).to.deep.equal([{ id: 20081, name: 'wheat flour', estimatedCostInCents: 142}, {estimatedCostInCents: 865, id: 20011, name: "buck wheat flour"}])
  });

  it('should search my favorite recipies by ingredient', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)

    expect(user1.searchFavoriteRecipesByIngredient('Wheat flour')).to.deep.equal([recipe1])

  });

  it('should return message if search is empty', () => {
    user1.addFavoriteRecipes(recipe1)
    user1.addFavoriteRecipes(recipe2)

    expect(user1.searchFavoriteRecipesByIngredient(' ')).to.equal("Please enter an ingredient to search for")
  });
});
