import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_THOUGHT = gql`
  mutation AddThought($input: ThoughtInput!) {
    addThought(input: $input) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      title
      instructions
      image
      extendedIngredients
      cuisines
      id
    }
  }
`;


export const UPDATE_RECIPE = gql`
  mutation updateRecipe($title: String, $updateRecipeId: String, $instructions: String, $extendedIngredients: [String], $cuisines: [String], $image: String) {
  updateRecipe(title: $title, id: $updateRecipeId, instructions: $instructions, extendedIngredients: $extendedIngredients, cuisines: $cuisines, image: $image){
    title
    instructions
    image
    id
    extendedIngredients
    cuisines
  }
}

`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    user(username: $username) {
      username
      email
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;


