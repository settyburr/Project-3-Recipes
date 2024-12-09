const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
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

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
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
    ingredients: [String!]!
    steps: [String!]!
    category: String!
    photo: String
  }

  type Recipe {
    title: String!
    ingredients: [String!]!
    steps: [String!]!
    category: String!
    photo: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
    recipes: [Recipe]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addRecipe(input: AddRecipeInput!): Recipe!
  }
`;

export default typeDefs;
