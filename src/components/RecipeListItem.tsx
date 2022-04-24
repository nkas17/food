import * as React from 'react';
import { Link } from 'react-router-dom';
import vanillaToast from 'vanilla-toast';
import type Recipe from '../types/recipe';
import type User from '../types/user';
import UserApi from '../api/UserApi';
import RecipeApi from '../api/RecipeApi';
import { RecipeContext } from '../context/RecipeContext';

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  const user: User = UserApi.getCurrentUser();
  // @ts-ignore
  const [recipeData, setRecipeData] = React.useContext(RecipeContext);
  const { recipes, recipesToDisplay } = recipeData;

  const handleClick = async () => {
    if (
      /* eslint-disable no-alert */
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'Click "Ok" if you are sure you would like to delete this recipe, otherwise "Cancel".',
      )
    ) {
      console.log(`deleted recipe id - ${recipe.id}`); // eslint-disable-line no-console

      try {
        if (user.token && recipe._id) {
          await RecipeApi.deleteRecipe(recipe._id.toString(), user.token);
          setRecipeData({
            ...recipeData,
            recipes: recipes.filter((theRecipe: Recipe) => theRecipe._id !== recipe._id),
            recipesToDisplay: recipesToDisplay.filter(
              (theRecipe: Recipe) => theRecipe._id !== recipe?._id,
            ),
          });
          vanillaToast.success('Recipe deleted');
        }
      } catch (error) {
        vanillaToast.error(error);
      }
    }
  };
  // recipes.filter((recipe: Recipe) => recipe._id !== action?.payload?.recipe?._id)
  return (
    <div className="list-item">
      <Link to={recipe.id}>{recipe.title}</Link>
      {user && (
        <button type="button" className="btn btn-link delete-recipe" onClick={handleClick}>
          delete
        </button>
      )}
    </div>
  );
}

export default RecipeListItem;
