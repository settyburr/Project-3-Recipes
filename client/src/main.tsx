import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';
import RecipeForm from './pages/RecipeForm.js';
import SingleRecipe from './pages/SingleRecipe.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
 },
      {
        path: '/me',
        element: <Profile />
      },
       {
        path: '/recipe',

      }, {
        // path: '/profiles/:username',
        // element: <Profile />
      }, {
        // path: '/me',
        // element: <Profile />
      }, {
        path: '/recipes/:recipeId',
        element: <SingleRecipe />
      }, {
        path: '/recipes',
        element: <RecipeForm />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
