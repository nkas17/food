import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import type Recipe from '../types/recipe';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';
import { UserContext } from '../context/UserContext';

function RecipeDisplay() {
  // @ts-ignore
  const [recipeData] = React.useContext(RecipeContext);
  const { recipes, isLoading } = recipeData;
  // @ts-ignore
  const [user] = React.useContext(UserContext);
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  let recipe: Recipe | undefined = {
    category: '',
    directions: '',
    id: '',
    ingredients: '',
    title: '',
    description: '',
  };

  if (recipeId !== 'new') {
    recipe = recipes?.find(({ id }: { id: string }) => id === recipeId);
    if (recipe === undefined) {
      recipe = {
        category: '',
        directions: '',
        id: '',
        ingredients: '',
        title: '',
        description: '',
      };
    }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [recipe.id]);

  return (
    <section className="content-wrapper">
      <div className="content">
        {isLoading && <LoadingSpinner />}
        <div className="box">
          <header>
            <h2 style={{ display: 'inline-block' }}>{recipe.title} </h2>
            <span style={{ fontSize: '1em' }}> - {recipe.category}</span>
            {'  '}
            {user && <Link to="edit">edit</Link>}
            <p className="nmw-top-16" style={{ paddingLeft: '0.5rem' }}>
              {recipe.description}
            </p>
          </header>
          <div className="recipe-display__child__ingredients" style={{ marginLeft: '16px' }}>
            {recipe.ingredients.split('\n').map(
              (ingredient: string) =>
                ingredient && (
                  <p key={ingredient}>
                    <input type="checkbox" id={ingredient} />
                    <label className="container" htmlFor={ingredient}>
                      {ingredient}
                    </label>
                  </p>
                ),
            )}
          </div>
          <hr />
          <div className="recipe-display__child__directions" style={{ marginLeft: '16px' }}>
            {recipe.directions.split('\n').map(
              (direction: string) =>
                direction && (
                  <p key={direction}>
                    <input type="checkbox" id={direction} />
                    <label className="container" htmlFor={direction}>
                      {direction}
                    </label>
                  </p>
                ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDisplay;
