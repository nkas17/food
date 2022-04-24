type Recipe = {
  _id?: {
    $oid: string;
  };
  title: string;
  description: string;
  category: string;
  id: string;
  ingredients: string;
  directions: string;
};

export default Recipe;
