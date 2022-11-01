import * as React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@nmw/react-components';
import type Recipe from '../types/recipe';
import RecipeApi from '../api/RecipeApi';
import { RecipeContext } from '../context/RecipeContext';
import { UserContext } from '../context/UserContext';

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  // @ts-ignore
  const [user] = React.useContext(UserContext);

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
          toast.success('Recipe deleted');
        }
      } catch (error) {
        // @ts-ignore
        toast.error(error);
      }
    }
  };
  return (
    <div className="list-item list-item__flex">
      <div className="list-item__flex-item list-item__flex-item__recipe">
        <Link to={recipe.id}>{recipe.title}</Link>
        <div className="nmw-fine-print nmw-top-8 nmw-left-8">{recipe.category}</div>
      </div>
      {user !== null && (
        <div className=" list-item__flex-item list-item__flex-item__delete-button">
          <Button
            type="button"
            className="nmw-button-secondary-elevated nmw-left-8"
            onClick={handleClick}
          >
            delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecipeListItem;
