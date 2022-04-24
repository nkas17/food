import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { reject } from 'lodash';
import type Recipe from '../types/recipe';
import { RecipeContext } from '../context/RecipeContext';

/**
 * Common Header component
 */
function Header() {
  // @ts-ignore
  const [recipeData, setRecipeData] = React.useContext(RecipeContext);
  const { recipes } = recipeData;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [searchValue, setSearchValue] = React.useState('');

  function getRecipesToDisplay(value: string) {
    return reject(recipes, (recipe: Recipe) => {
      const titleIndex = recipe.title.toLowerCase().indexOf(value.toLowerCase());
      const descriptionIndex = recipe.description.toLowerCase().indexOf(value.toLowerCase());
      const categoryIndex = recipe.category.toLowerCase().indexOf(value.toLowerCase());
      return titleIndex === -1 && descriptionIndex === -1 && categoryIndex === -1;
    });
  }

  function handleChange({ target }: { target: { value: string } }) {
    setSearchValue(target.value);
    setRecipeData({
      ...recipeData,
      recipesToDisplay: getRecipesToDisplay(target.value),
    });
    if (pathname !== '/recipe') {
      navigate('/recipe');
    }
  }
  return (
    <header className="page-header">
      <h1 className="header-title">let&apos;s eat!</h1>
      <div className="header-search-wrapper">
        <input
          className="text-box header-search-box"
          type="text"
          name="searchRecipe"
          aria-label="Search Recipes"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      <nav className="header-nav">
        <Link to="/">
          <span className={`${pathname === '/' ? 'bold' : ''}`}>home</span>
        </Link>
        |
        <Link to="/recipe">
          <span className={`${pathname === '/recipe' ? 'bold' : ''}`}>recipes</span>
        </Link>
        |
        <Link to="/about">
          <span className={`${pathname === '/about' ? 'bold' : ''}`}>about</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
