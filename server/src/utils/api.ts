import axios from "axios";
const apiKey = "43cf289d109f4dba88c16d789ab27720";

async function getRandomRecipe(numberOfRecipes: number) {
  try {
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}&apiKey=${apiKey}`
    );
    return result?.data?.recipes;
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    throw error;
  }
}
// .then(response => console.log(response.data))
// .catch(error => console.error(error));

// import pkg from 'spoonacular';
// const { SpoonacularClient } = pkg;

// // Initialize the client with your API key
// const apiKey = '43cf289d109f4dba88c16d789ab27720'; // Replace with your Spoonacular API key
// const client = new SpoonacularClient(apiKey);

// async function getRandomRecipe() {
//   try {
//     // Use the `getRandomRecipes` method to fetch a random recipe
//     const response = await client.getRandomRecipes({ number: 1 }); // Fetching one random recipe
//     if (response.recipes && response.recipes.length > 0) {
//       const recipe = response.recipes[0];
//       console.log('Random Recipe:', recipe.title);
//       console.log('Ingredients:', recipe.extendedIngredients.map((ing: any) => ing.original).join(', '));
//       console.log('Instructions:', recipe.instructions || 'No instructions available.');
//       return {
//         id: recipe.id,
//         title: recipe.title,
//         image: recipe.image,
//       };
//     } else {
//       console.log('No recipes found.');
//       return undefined;
//     }
//   } catch (error) {
//     console.error('Error fetching random recipe:', error);
//     throw error;
//   }
// }

export default getRandomRecipe
