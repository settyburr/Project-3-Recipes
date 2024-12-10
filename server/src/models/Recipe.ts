import mongoose, { Schema, Document } from 'mongoose';

interface IRecipe extends Document {
    spoonacularId: number;
    title: string;
    image: string;
}

const RecipeSchema: Schema = new Schema({
    spoonacularId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
});

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;