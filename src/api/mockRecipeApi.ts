import delay from './delay';
import type Recipe from '../types/recipe';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes: Recipe[] = [
  {
    _id: {
      $oid: '593f6ceec2ef162c8cca24ec',
    },
    title: 'quiche',
    description: 'delicious Spinach Quiche and Ham & Cauliflower quiche',
    category: 'other',
    id: 'quiche',
    ingredients:
      'pie crust\nhalf n half\nmilk\neggs\ncheddar cheese\nparmesan cheese\nham\ncauliflower\nspinach',
    directions:
      'prepare pie crust by cooking per package directions or at 350 for 5-10 minutes.\n\nsteam cauliflower\nchop ham into 1/4 - 1/2 cubes\ngrade 8 oz cheese 4 per quiche\ndefrost and press water out of spinach\n\ngently press cheese into bottom of crust\nspread spinach on cheese\nspread cauliflower and ham on cheese in other crust\n\nbeat 7-8 eggs very well, mix 1 cup hal n half and 1 cup milk totaling about 4 cups of liquid\nmix well\npour half of egg/half n half/milk mixture into pir crust over spinach and ham and cauliflower\n\nsprinkle parmesan cheese over top\n\nbake at 350 for 45 - 60 minutes or until top is swollen and firm and lightly browned\n\n',
  },
  {
    _id: {
      $oid: '593f6e31bd966f4138b1faed',
    },
    title: 'tacos 2.2',
    description: 'yummy',
    category: 'beef',
    id: 'tacos-2.2',
    ingredients: 'meat\nveggies',
    directions: 'cook and serve',
  },
];

class RecipeApi {
  static getAllRecipes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static saveRecipe(recipe: Recipe) {
    const theRecipe = { ...recipe }; // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minRecipeTitleLength = 1;
        if (theRecipe.title.length < minRecipeTitleLength) {
          reject(new Error(`Title must be at least ${minRecipeTitleLength} characters.`));
        }

        if (theRecipe.id) {
          const existingRecipeIndex = recipes.findIndex((a) => a.id === theRecipe.id);
          recipes.splice(existingRecipeIndex, 1, theRecipe);
        } else {
          // Just simulating creation here.
          // The server would generate ids and watchHref's for new courses in a real app.
          // Cloning so copy returned is passed by value rather than by reference.
          const id = ++recipes.length;
          theRecipe.id = id.toString();
          recipes.push(theRecipe);
        }

        resolve(theRecipe);
      }, delay);
    });
  }

  static deleteRecipe(recipeId: string) {
    return new Promise((resolve /* reject */) => {
      setTimeout(() => {
        const indexOfRecipeToDelete = recipes.findIndex((recipe) => recipe.id === recipeId);
        recipes.splice(indexOfRecipeToDelete, 1);
        resolve(0);
      }, delay);
    });
  }
}

export default RecipeApi;
