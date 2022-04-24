import type Recipe from './recipe';

type RecipeData = {
  recipes: Recipe[];
  recipesToDisplay: Recipe[];
  isLoading: boolean;
};

export default RecipeData;
