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
          expect(userPantry.pantry.length).to.equal(3);
        });

        it('should store an instance of Recipe that user wants to make', () => {
          expect(userPantry.recipes[0]).to.be.an.instanceof(Recipe);
        });
        
      });
