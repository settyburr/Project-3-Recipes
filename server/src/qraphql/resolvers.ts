// import Recipe from '../models/Recipe.js';
import getRandomRecipe from '../utils/api.js';
// import { signToken, AuthenticationError } from '../utils/auth.js'; 


// Define types for the arguments


const resolvers = {
  Query: {
    randomRecipes: async () => {
      
      try {
        const recipes = await getRandomRecipe(3);

        if (!recipes) {
          throw new Error('No recipe found.');
        }
        console.log(recipes)
        return recipes;

        // TODO: use the below for find recipe by id
        // const existingRecipe = await Recipe.findOne({ spoonacularId: recipe.id });

        // if (!existingRecipe) {
        //   const newRecipe = new Recipe({
        //     spoonacularId: recipe.id,
        //     title: recipe.title,
        //     image: recipe.image,
        //   });

        //   await newRecipe.save();
        // }

        // return [{ id: recipe.id, title: recipe.title, image: recipe.image }];
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch and save recipe');
      }
    },
  //   user: async (_parent: any, { username }: UserArgs) => {
  //     return User.findOne({ username }).populate('thoughts');
  //   },
  //   thoughts: async () => {
  //     return await Thought.find().sort({ createdAt: -1 });
  //   },
  //   thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
  //     return await Thought.findOne({ _id: thoughtId });
  //   },
  //   // Query to get the authenticated user's information
  //   // The 'me' query relies on the context to check if the user is authenticated
  //   me: async (_parent: any, _args: any, context: any) => {
  //     // If the user is authenticated, find and return the user's information along with their thoughts
  //     if (context.user) {
  //       return User.findOne({ _id: context.user._id }).populate('thoughts');
  //     }
  //     // If the user is not authenticated, throw an AuthenticationError
  //     throw new AuthenticationError('Could not authenticate user.');
  //   },
  // },
  // Mutation: {
  //   addUser: async (_parent: any, { input }: AddUserArgs) => {
  //     // Create a new user with the provided username, email, and password
  //     const user = await User.create({ ...input });
    
  //     // Sign a token with the user's information
  //     const token = signToken(user.username, user.email, user._id);
    
  //     // Return the token and the user
  //     return { token, user };
  //   },
    
  //   login: async (_parent: any, { email, password }: LoginUserArgs) => {
  //     // Find a user with the provided email
  //     const user = await User.findOne({ email });
    
  //     // If no user is found, throw an AuthenticationError
  //     if (!user) {
  //       throw new AuthenticationError('Could not authenticate user.');
  //     }
    
  //     // Check if the provided password is correct
  //     const correctPw = await user.isCorrectPassword(password);
    
  //     // If the password is incorrect, throw an AuthenticationError
  //     if (!correctPw) {
  //       throw new AuthenticationError('Could not authenticate user.');
  //     }
    
  //     // Sign a token with the user's information
  //     const token = signToken(user.username, user.email, user._id);
    
  //     // Return the token and the user
  //     return { token, user };
  //   },
  //   addThought: async (_parent: any, { input }: AddThoughtArgs, context: any) => {
  //     if (context.user) {
  //       const thought = await Thought.create({ ...input });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $addToSet: { thoughts: thought._id } }
  //       );

  //       return thought;
  //     }
  //     throw AuthenticationError;
  //     ('You need to be logged in!');
  //   },
  //   addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: any) => {
  //     if (context.user) {
  //       return Thought.findOneAndUpdate(
  //         { _id: thoughtId },
  //         {
  //           $addToSet: {
  //             comments: { commentText, commentAuthor: context.user.username },
  //           },
  //         },
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //     }
  //     throw AuthenticationError;
  //   },
  //   removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: any) => {
  //     if (context.user) {
  //       const thought = await Thought.findOneAndDelete({
  //         _id: thoughtId,
  //         thoughtAuthor: context.user.username,
  //       });

  //       if(!thought){
  //         throw AuthenticationError;
  //       }

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { thoughts: thought._id } }
  //       );

  //       return thought;
  //     }
  //     throw AuthenticationError;
  //   },
  //   removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: any) => {
  //     if (context.user) {
  //       return Thought.findOneAndUpdate(
  //         { _id: thoughtId },
  //         {
  //           $pull: {
  //             comments: {
  //               _id: commentId,
  //               commentAuthor: context.user.username,
  //             },
  //           },
  //         },
  //         { new: true }
  //       );
  //     }
  //     throw AuthenticationError;
  //   },
  },
};

export default resolvers;
