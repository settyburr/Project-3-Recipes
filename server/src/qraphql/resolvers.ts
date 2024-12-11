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
          throw new Error('No recipe found.');
        }
        // console.log(recipes)
        return recipes;

      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch and save recipe');
      }
    },

    recipe: async (_parent: any, { recipeId }: any) => {
      
      try {
        const recipe = await getRecipe(recipeId);

        if (!recipe) {
          throw new Error('No recipe found.');
        }
        // console.log(recipe)
        return recipe;

      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch and save recipe');
      }
    },

    recipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },



    getUserProfile: async (_parent: any, { username }: UserArgs) => {
      return await User.findOne({ username });
    },
    
    // thoughts: async () => {
    //   return await Thought.find().sort({ createdAt: -1 });
    // },


    users: async () => {
      return User.find().populate('recipes');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('recipes');
    },
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('recipes');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
  
    addRecipe: async (_parent: any, { input }: { input: AddRecipeInput }, context: any) => {
      console.log("Add recipe running")
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a recipe.");
      }

      try {
        // Create a new recipe document
        console.log("input", input)
        const newRecipe = new Recipe({
          ...input,
          userId: context.user.id, // Associate the recipe with the logged-in user
        });
        console.log(newRecipe)
        // Save the recipe to the database
        const savedRecipe = await newRecipe.save();
        console.log(savedRecipe)
        return savedRecipe;
      } catch (error) {
        console.error("Error adding recipe:", error);
        throw new Error("Failed to add recipe. Please try again.");
      }
    },
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    updateRecipe: async (_parent: any, { title, instructions, extendedIngredients, cuisines, image, id }: updateRecipeArgs, context: any)  => {
      if (context.user) {
        return await Recipe.findOneAndUpdate(
          { _id: id },
          {
             title: title,
             instructions: instructions,
             extendedIngredients: extendedIngredients,
             cuisines: cuisines,
             image: image,
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError('Could not authenticate user.');
    }
}};


export default resolvers;
