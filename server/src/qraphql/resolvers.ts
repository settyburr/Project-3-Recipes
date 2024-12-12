// import Recipe from '../models/Recipe.js';
import { getRandomRecipe, getRecipe } from '../utils/api.js';
import { AuthenticationError, signToken } from '../utils/auth.js'; 
import Recipe from "../models/Recipe.js";
import User from '../models/User.js';

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}


interface AddRecipeInput {
  title: string;
  instructions: string[];
  extendedIngredients: string[];
  cuisines: string;
  image?: string;
  
}

interface updateRecipeArgs {
  title?: string;
  instructions?: string[];
  extendedIngredients?: string[];
  cuisines?: string;
  image?: string;
  id: string
}




const resolvers = {
  Query: {
    randomRecipes: async () => {
      try {
        const recipes = await getRandomRecipe(6);
        if (!recipes) {
          throw new Error("No recipe found.");
        }
        return recipes;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch and save recipe");
      }
    },

    recipe: async (_parent: any, { recipeId }: any) => {
      try {
        const recipe = await getRecipe(recipeId);
        if (!recipe) {
          throw new Error("No recipe found.");
        }
        return recipe;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch and save recipe");
      }
    },

    recipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },

    getUserProfile: async (_parent: any, { username }: UserArgs) => {
      return await User.findOne({ username });
    },

    users: async () => {
      return User.find().populate("recipes");
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate("recipes");
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("recipes");
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
  },
  Mutation: {
    addRecipe: async (_parent: any, { input }: { input: AddRecipeInput }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a recipe.");
      }
      try {
        const newRecipe = new Recipe({
          ...input,
          userId: context.user.id,
        });
        const savedRecipe = await newRecipe.save();
        return savedRecipe;
      } catch (error) {
        console.error("Error adding recipe:", error);
        throw new Error("Failed to add recipe. Please try again.");
      }
    },
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    updateRecipe: async (_parent: any, { title, instructions, extendedIngredients, cuisines, image, id }: updateRecipeArgs, context: any) => {
      if (context.user) {
        return await Recipe.findOneAndUpdate(
          { _id: id },
          { title, instructions, extendedIngredients, cuisines, image },
          { new: true }
        );
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
    deleteRecipe: async (_parent: any, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete a recipe.");
      }
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
          throw new Error(`Recipe with ID ${id} not found.`);
        }
        return recipe; // Return the deleted recipe
      } catch (error) {
        console.error("Error deleting recipe:", error);
        throw new Error("Failed to delete recipe. Please try again.");
      }
    },
  },
};

export default resolvers;