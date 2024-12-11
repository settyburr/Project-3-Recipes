const typeDefs = `

  type Recipe {
    id: ID
    title: String!
    image: String!
  }


  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }
    input AddRecipeInput {
    title: String!
    extendedIngredients: [String!]!
    instructions: String!
    cuisines: [String!]!
    image: String
  }

  type Recipe {
    title: String!
    extendedIngredients: [String!]!
    instructions: String!
    cuisines: [String!]!
    image: String
  }

  type Query {
    randomRecipes: [Recipe!]!
    recipes: [Recipe]
    recipe(recipeId: Int): Recipe
    users: [User]
    user(username: String!): User
    getUserProfile(username: String!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: AddRecipeInput!): Recipe!
  }
`;

export default typeDefs;
