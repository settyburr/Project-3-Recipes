import mongoose, { Document } from "mongoose";

// Define interface for type safety
export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  steps: string[];
  category: string;
  photo: string;
  cookTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  servings?: number;
  createdBy?: mongoose.Types.ObjectId;
  rating?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  ingredients: { 
    type: [String], 
    required: true 
  },
  steps: { 
    type: [String], 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  photo: { 
    type: String,
    default: '/api/placeholder/400/300' // Default placeholder image
  },
  cookTime: {
    type: String,
    default: 'Not specified'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  servings: {
    type: Number,
    min: 1,
    default: 4
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;