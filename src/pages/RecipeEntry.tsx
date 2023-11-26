import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card } from '@nmw/react-components';
import type Recipe from '../types/recipe';
import TextInput from '../components/form/TextInput';
import TextArea from '../components/form/TextArea';
import type Category from '../types/category';
import SelectInput from '../components/form/SelectInput';
import RecipeApi from '../api/RecipeApi';
import { RecipeContext } from '../context/RecipeContext';
import CategoryApi from '../api/mockCategoryApi';
import { UserContext } from '../context/UserContext';

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
  const [user] = React.useContext(UserContext);
  // @ts-ignore
  const [recipeData, setRecipeData] = React.useContext(RecipeContext);
  const { recipes, recipesToDisplay } = recipeData;
  const [recipeToUpdate, setRecipeToUpdate] = React.useState(
    () => recipes?.find((recipe: Recipe) => recipe.id === location.pathname.split('/')[2]) || {},
  );
  const [categorieOptions, setCategorieOptionss] = React.useState<
    { text: string; value: string }[] /* eslint-disable-line @typescript-eslint/indent */
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
          // eslint-disable-next-line quotes
          id: replaceAll(replaceAll(recipeToUpdate.title, ' ', '-'), "'", ''),
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
      toast.success('recipe saved');
      navigate(`/recipe/${updatedRecipe.id}`);
    }
  };

  const handleCancel = () => {
    toast.success('update cancelled');
    if (recipeToUpdate.id === undefined) navigate('/recipe');
    else navigate(`/recipe/${recipeToUpdate.id}`);
  };

  return (
    <Card type="filled">
      <form className="box">
        <TextInput
          name="title"
          id="title"
          label="Title"
          value={recipeToUpdate?.title}
          onChange={handleChange}
          error={errors.title}
        />
        <TextInput
          id="description"
          name="description"
          label="Description"
          value={recipeToUpdate?.description}
          onChange={handleChange}
          error={errors.description}
        />
        <TextArea
          id="ingredients"
          name="ingredients"
          label="Ingredient List"
          rows={10}
          value={recipeToUpdate?.ingredients}
          onChange={handleChange}
          error={errors.ingredients}
        />
        <TextArea
          id="directions"
          name="directions"
          label="Directions"
          rows={10}
          value={recipeToUpdate?.directions}
          onChange={handleChange}
          error={errors.directions}
        />
        <SelectInput
          id="category"
          name="category"
          label="Category"
          value={recipeToUpdate?.category}
          defaultOption="select category"
          options={categorieOptions}
          onChange={handleChange}
          error={errors.category}
        />
        <div className="box">
          <button
            id="save"
            type="button"
            disabled={saving}
            className="button button-primary"
            onClick={handleSave}
          >
            {saving ? 'saving...' : 'save'}
          </button>
          <button
            id="cancel"
            type="button"
            disabled={saving}
            className="button button-link nmw-left-16"
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </Card>
  );
}

export default RecipeEntry;
