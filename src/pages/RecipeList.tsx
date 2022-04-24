import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeListItem from '../components/RecipeListItem';
import UserApi from '../api/UserApi';
import type Recipe from '../types/recipe';
import type User from '../types/user';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';

function RecipeList() {
  const [user] = React.useState<User>((): User => UserApi.getCurrentUser());
  // @ts-ignore
  const [recipeData] = React.useContext(RecipeContext);
  const { recipesToDisplay, isLoading } = recipeData;
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
  return (
    <section className="content-wrapper">
      <div className="content">
        {isLoading && <LoadingSpinner />}
        {user && (
          <p className="box">
            {' '}
            <Link to="new/edit">add</Link>
          </p>
        )}
        <div className="list">
          {recipesToDisplay?.map((recipe: Recipe) => (
            <RecipeListItem recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipeList;
