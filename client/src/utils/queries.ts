import { gql } from '@apollo/client';

export const QUERY_RANDOM_RECIPES = gql`
  query GetRandomRecipes {
    randomRecipes {
      id
      title
      image
    }
  }
`;