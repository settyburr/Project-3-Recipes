import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  category: { type: String, required: true },
  photo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
