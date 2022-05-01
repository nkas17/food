import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import About from './pages/About';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import Header from './components/Header';
import RecipeDisplay from './pages/RecipeDisplay';
import Footer from './components/Footer';
import RecipeEntry from './pages/RecipeEntry';
import { RecipeProvider } from './context/RecipeContext';
import { UserProvider } from './context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Main component that wraps everything else
 */
function App() {
  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
      <UserProvider>
        <RecipeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe">
              <Route path="" element={<RecipeList />} />
              <Route path=":id/edit" element={<RecipeEntry />} />
              <Route path=":id" element={<RecipeDisplay />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<section className="page-content">Page Not Found</section>} />
          </Routes>
        </RecipeProvider>
      </UserProvider>
      <Footer />
    </main>
  );
}

export default App;
