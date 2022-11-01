import * as React from 'react';
import { Card, Page } from '@nmw/react-components';
import Login from '../components/Login';
import { RecipeContext } from '../context/RecipeContext';
import LoadingSpinner from '../components/form/LoadingSpinner';

function Home() {
  // @ts-ignore
  const [{ isLoading }] = React.useContext(RecipeContext);
  return (
    <Page>
      <Card type="filled">{isLoading ? <LoadingSpinner /> : <Login />}</Card>
    </Page>
  );
}

export default Home;
