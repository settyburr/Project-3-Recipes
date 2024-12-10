import express from 'express';
import axios from 'axios';
import Recipe from '../models/Recipe.js';
import { getRecipe } from '../utils/api.js';

const router = express.Router();

router.get('/random-recipes', async (_req, res) => {
    try {
        // Fetch recipes from the Spoonacular API
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: { number: 3, apiKey: process.env.SPOONACULAR_API_KEY },
        });

        const recipes = response.data.recipes.map((recipe: any) => ({
            spoonacularId: recipe.id,
            title: recipe.title,
            image: recipe.image,
        }));

        // Save to MongoDB
        const savedRecipes = await Recipe.insertMany(recipes, { ordered: false }).catch(() => {
            // Ignore duplicate insertion errors
        });

        // Return recipes to the frontend
        res.status(200).json(savedRecipes || recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

router.get('/recipe/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId);
    console.log('Hello');
    if (!recipeId) {
        return res.status(400).json({ error: 'Recipe ID is required' });
    }

    try {
        // Invoke the recipe resolver logic
        const recipe = await getRecipe(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'No recipe found.' });
        }

        return res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return res.status(500).json({ error: 'Failed to fetch recipe' });
    }
});

export default router;