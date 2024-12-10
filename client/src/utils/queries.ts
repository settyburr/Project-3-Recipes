import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
   
    }
export const QUERY_RANDOM_RECIPES = gql`
  query GetRandomRecipes {
    randomRecipes {
    id
    title
    image
  }

  }
`;

export const GET_RECIPES = gql`
  query getRecipes {
    recipes {
    title
    steps
    photo
    ingredients
    category
  }
}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        spoonacularId
        title
        image
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      recipes {
        spoonacularId
        title
        image
      }
    }
  }
`;


export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    getUserProfile(username: $username) {
      username
      email
    }
  }
`;
=======
export const QUERY_RECIPE = gql`
  query Recipe($recipeId: Int) {
  recipe(recipeId: $recipeId) {
      id
      title
      image
      extendedIngredients
      instructions
      cuisines
    }
  }
`;

