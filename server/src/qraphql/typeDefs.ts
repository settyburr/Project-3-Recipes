const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    recipes: [Recipe]     # Add this to link recipes to users
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Recipe {
    _id: ID!
    title: String!
    ingredients: [String!]!
    steps: [String!]!
    category: String!
    photo: String
    cookTime: String
    difficulty: String
    rating: Float
    createdBy: User      # Add this to link recipe to user
    createdAt: String
    updatedAt: String
  }

  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input AddRecipeInput {
    title: String!
    ingredients: [String!]!
    steps: [String!]!
    category: String!
    photo: String
    cookTime: String
    difficulty: Difficulty
  }

  input UpdateRecipeInput {
    title: String
    ingredients: [String!]
    steps: [String!]
    category: String
    photo: String
    cookTime: String
    difficulty: Difficulty
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
    recipes: [Recipe]
    recipe(id: ID!): Recipe
    getFeaturedRecipes: [Recipe]!          # New query for featured recipes
    getRecipesByCategory(category: String!): [Recipe]!
    searchRecipes(searchTerm: String!): [Recipe]!
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addRecipe(input: AddRecipeInput!): Recipe!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: ID!): Recipe!
    rateRecipe(id: ID!, rating: Float!): Recipe!
  }
`;

export default typeDefs;
