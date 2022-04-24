import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import vanillaToast from 'vanilla-toast';
import type Recipe from '../types/recipe';
import TextInput from '../components/form/TextInput';
import TextArea from '../components/form/TextArea';
import type Category from '../types/category';
import SelectInput from '../components/form/SelectInput';
import RecipeApi from '../api/RecipeApi';
import UserApi from '../api/UserApi';
import type User from '../types/user';
import { RecipeContext } from '../context/RecipeContext';
import CategoryApi from '../api/mockCategoryApi';

const replaceAll = (str: string, get: string, replace: string) =>
  str.replace(new RegExp(get, 'g'), replace);

function RecipeEntry() {
  const initialErrors = {
    title: '',
    description: '',
    ingredients: '',
    directions: '',
    category: '',
  };
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const [recipeData, setRecipeData] = React.useContext(RecipeContext);
  const { recipes, recipesToDisplay } = recipeData;
  const [recipeToUpdate, setRecipeToUpdate] = React.useState(
    () => recipes?.find((recipe: Recipe) => recipe.id === location.pathname.split('/')[2]) || {},
  );
  const [categorieOptions, setCategorieOptionss] = React.useState<
    { text: string; value: number }[] /* eslint-disable-line @typescript-eslint/indent */
  >([]);
  const [saving, setSaving] = React.useState(false);
  const [errors, setErrors] = React.useState(initialErrors);

  React.useEffect(() => {
    async function fetch() {
      const categories: Category[] = await CategoryApi.getAllCategories();
      setCategorieOptionss(
        categories.map((category) => ({
          value: category.id,
          text: category.name,
        })),
      );
    }
    fetch().then();
  }, []);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = name;
    const tempRecipe = { ...recipeToUpdate } || {};
    tempRecipe[field] = value;
    setRecipeToUpdate(tempRecipe);
  };
  const user: User = UserApi.getCurrentUser();

  const recipeFormIsValid = () => {
    let formIsValid = true;
    const formErrors = { ...initialErrors };

    if (recipeToUpdate.title.length < 5) {
      formErrors.title = 'title must be at least 5 characters.';
      formIsValid = false;
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    setSaving(true);
    if (recipeFormIsValid()) {
      const updatedRecipe: Recipe = await RecipeApi.saveRecipe(
        {
          ...recipeToUpdate,
          id: replaceAll(recipeToUpdate.title, ' ', '-'),
        },
        user.token || '',
      );
      setRecipeData({
        ...recipeData,
        recipes: [
          ...recipes.filter((recipe: Recipe) => recipe.id !== recipeToUpdate?.id),
          updatedRecipe,
        ],
        recipesToDisplay: [
          ...recipesToDisplay.filter((recipe: Recipe) => recipe.id !== recipeToUpdate?.id),
          updatedRecipe,
        ],
      });
      setSaving(false);
      vanillaToast.success('Recipe saved');
      navigate(`/recipe/${updatedRecipe.id}`);
    }
  };

  const handleCancel = () => {
    vanillaToast.success('Recipe cancelled');
    if (recipeToUpdate.id === undefined) navigate('/recipe');
    else navigate(`/recipe/${recipeToUpdate.id}`);
  };

  return (
    <section className="content-wrapper">
      <div className="content">
        <form className="box">
          <TextInput
            name="title"
            label="Title"
            value={recipeToUpdate?.title}
            onChange={handleChange}
            error={errors.title}
          />
          <TextInput
            name="description"
            label="Description"
            value={recipeToUpdate?.description}
            onChange={handleChange}
            error={errors.description}
          />
          <TextArea
            name="ingredients"
            label="Ingredient List"
            rows={10}
            value={recipeToUpdate?.ingredients}
            onChange={handleChange}
            error={errors.ingredients}
          />
          <TextArea
            name="directions"
            label="Directions"
            rows={10}
            value={recipeToUpdate?.directions}
            onChange={handleChange}
            error={errors.directions}
          />
          <SelectInput
            name="category"
            label="Category"
            value={recipeToUpdate?.category}
            defaultOption="select category"
            options={categorieOptions}
            onChange={handleChange}
            error={errors.category}
          />
          <button
            id="save"
            type="button"
            disabled={saving}
            className="btn btn-primary"
            onClick={handleSave}
          >
            {saving ? 'saving...' : 'save'}
          </button>
          <button
            id="cancel"
            type="button"
            disabled={saving}
            className="btn btn-link"
            onClick={handleCancel}
          >
            cancel
          </button>
        </form>
      </div>
    </section>
  );
}

export default RecipeEntry;
