import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  category: { type: String, required: true },
  photo: { type: String },
}, {
  // from M18A25
  timestamps: true
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
