import * as React from 'react';
import { sortBy } from 'lodash';
import type RecipeData from '../types/recipeData';
import RecipeApi from '../api/RecipeApi';

export const RecipeContext = React.createContext({});

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipeData, setRecipeData] = React.useState<RecipeData | {}>({ isLoading: true });

  React.useEffect(() => {
    async function fetch() {
      const theRecipes = sortBy(await RecipeApi.getAllRecipes(), [(o) => o.title]);
      setRecipeData({
        ...recipeData,
        recipes: theRecipes,
        recipesToDisplay: theRecipes,
        isLoading: false,
      });
    }
    fetch().then();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <RecipeContext.Provider value={[recipeData, setRecipeData]}>{children}</RecipeContext.Provider>
  );
}
