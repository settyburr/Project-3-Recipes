// import type { User } from '../models/User.js';
// import type { Book } from '../models/Book.js';

// route to get logged in user's info (needs the token)
export const getRecipe = (recipeId: string | undefined) => {
  console.log(recipeId);
  return fetch(`/api/recipe/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

