import { Thought, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 
import Recipe from "../models/Recipe.js"

// Define all interfaces at the top
interface UserArgs {
  username: string;
}

interface ThoughtArgs {
  thoughtId: string;
}

interface AddUserInput {
  username: string;
  email: string;
  password: string;
}

interface AddRecipeInput {
  title: string;
  ingredients: string[];
  steps: string[];
  category: string;
  photo?: string;
}

interface AddThoughtInput {
  thoughtText: string;
  thoughtAuthor: string;
}

interface AddUserArgs {
  input: AddUserInput;
}

interface AddThoughtArgs {
  input: AddThoughtInput;
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    recipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    }
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addThought: async (_parent: any, { input }: AddThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.create({ ...input });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: any) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });
        if (!thought) {
          throw new AuthenticationError('Thought not found or unauthorized');
        }
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );
        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addRecipe: async (_parent: any, { input }: { input: AddRecipeInput }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a recipe.");
      }
      try {
        const newRecipe = new Recipe({
          ...input,
          userId: context.user._id,
        });
        const savedRecipe = await newRecipe.save();
        return savedRecipe;
      } catch (error) {
        console.error("Error adding recipe:", error);
        throw new Error("Failed to add recipe. Please try again.");
      }
    },
  },
};

export default resolvers;