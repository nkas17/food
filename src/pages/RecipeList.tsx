import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeListItem from '../components/RecipeListItem';
import type Recipe from '../types/recipe';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';
import { UserContext } from '../context/UserContext';

function RecipeList() {
  // @ts-ignore
  const [user] = React.useContext(UserContext);
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
        {!isLoading &&
          (recipesToDisplay?.length > 0 ? (
            <>
              {user !== null && (
                <p
                  className="box"
                  style={{
                    borderBottom: '1px solid #f29544',
                    margin: '32px',
                    textAlign: 'right',
                    paddingBottom: '16px',
                  }}
                >
                  {' '}
                  <Link className="button button-primary" to="new/edit">
                    add
                  </Link>
                </p>
              )}
              <div className="list">
                {recipesToDisplay?.map((recipe: Recipe) => (
                  <RecipeListItem recipe={recipe} key={recipe.id} />
                ))}
              </div>
            </>
          ) : (
            <p
              className="box"
              style={{
                fontStyle: 'italic',
                color: 'rgba(140, 49, 28, .75)',
              }}
            >
              no recipes to display
            </p>
          ))}
      </div>
    </section>
  );
}

export default RecipeList;
