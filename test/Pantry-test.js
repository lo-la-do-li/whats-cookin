const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const User = require('../src/User');
const Recipe = require('../src/Recipe');

describe('Pantry', () => {
  let user;
  let userPantry;
  let recipe1;
  let recipe2;

  beforeEach(() => {
    user = new User(
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
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 18372,
            "amount": 2
          }
        ]
      });

      recipe1 = new Recipe(
        {
          id: 595736,
          image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
          ingredients:[
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
          tags: ["antipasti", "starter"]
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
              },
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

          user.addRecipiesToCook(recipe2);
          userPantry = new Pantry(user);
        });

        it('should be a function', () => {
          expect(Pantry).to.be.a('function');
        });

        it('should be an instance of Pantry', () => {
          expect(userPantry).to.be.an.instanceof(Pantry);
        });

        it('should have a pantry property with an array of ingredients in user\'s pantry', () => {
          expect(userPantry.pantry.length).to.equal(5);
        });

        it('should store an instance of Recipe that user wants to make', () => {
          expect(userPantry.recipes[0]).to.be.an.instanceof(Recipe);
        });
        
        it('should have a shopping list as an array of ingredients needed to cook recipe that is empty by default', () => {
         expect(userPantry.shoppingList.length).to.equal(0);
       });
       
       it('should be able to check if user has enough ingredients to make recipe', () => {
         expect(userPantry.checkPantry(recipe1)).to.be.true;
       });
       
      
      it('should determine if user pantry has enough ingredients to cook a given meal', () => {
        expect(userPantry.checkPantry(recipe2)).to.be.false;
      })
      
      it('should store a list of out of stock ingredients that are needed to cook a given recipe', () => {
        userPantry.checkPantry(recipe2)
      
        expect(userPantry.shoppingList.length).to.equal(2);
      });
      
      
      it('should update the amount of each ingredient that is being used in the recipe', () => {
        userPantry.checkPantry(recipe2);
        
        expect(userPantry.updatePantry(recipe2)).to.deep.equal([
          { ingredient: 11477, amount: 4 },
          { ingredient: 11297, amount: 4 },
          { ingredient: 1082047, amount: 10 },
          { ingredient: 20081, amount: 2 },
          { ingredient: 18372, amount: 2 },
          { ingredient: 1009016, amount: 0 },
          { ingredient: 9003, amount: 0 }
        ])
      })
      
      it('should add ingredient that the user does not have in their pantry with a quantity of 0', () => {
        userPantry.checkPantry(recipe2);
        userPantry.updatePantry(recipe2);
        
        expect(userPantry.pantry.length).to.equal(7)
      })
      
      // it('should return the array of users shopping list', () => {
      //   userPantry.checkPantry(recipe1);
      //   expect(userPantry.returnShoppingList()).to.be.an('array')
      // })
});
