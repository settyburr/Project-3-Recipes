import express from 'express';
import axios from 'axios';
import Recipe from '../models/Recipe';

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

export default router;