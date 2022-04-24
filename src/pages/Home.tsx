import * as React from 'react';
import Login from '../components/Login';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';

function Home() {
  // @ts-ignore
  const [{ isLoading }] = React.useContext(RecipeContext);
  return (
    <section className="content-wrapper">
      <div className="content">{isLoading ? <LoadingSpinner /> : <Login />}</div>
    </section>
  );
}

export default Home;
