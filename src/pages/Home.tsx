import * as React from 'react';
import { Page } from '@nmw/react-components';
import Login from '../components/Login';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';

function Home() {
  // @ts-ignore
  const [{ isLoading }] = React.useContext(RecipeContext);
  return (
    <Page>
      <div className="content">{isLoading ? <LoadingSpinner /> : <Login />}</div>
    </Page>
  );
}

export default Home;
