import mongoose, { Schema, Document } from 'mongoose';

interface IRecipe extends Document {
    spoonacularId: number;
    title: string;
    image: string;
    instructions: string;
    extendedIngredients: [string];
    cuisines: [string];
}

const RecipeSchema: Schema = new Schema({
    spoonacularId: { type: Number },
    title: { type: String, required: true },
    image: { type: String, required: true },
    instructions: { type: String, required: true},
    extendedIngredients: { type: [String], required: true},
    cuisines: { type: [String], required: true}
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;