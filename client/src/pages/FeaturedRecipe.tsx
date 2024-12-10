import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the Recipe type
interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  category: string;
  photo?: string;
  cookTime?: string;
  difficulty?: string;
  rating?: number;
}

// Define the query response type
interface RecipesData {
  recipes: Recipe[];
}

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      _id
      title
      ingredients
      steps
      category
      photo
      cookTime
      difficulty
      rating
    }
  }
`;

const FeaturedRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { loading, error, data } = useQuery<RecipesData>(GET_RECIPES);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 py-8">
      Error loading recipes: {error.message}
    </div>
  );

  const recipes = data?.recipes || [];

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || recipe.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Featured Recipes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of delicious recipes from around the world.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="🔍 Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            {['all', 'Italian', 'Asian', 'Healthy', 'American'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe: Recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={recipe.photo || '/api/placeholder/400/300'}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>⏱ {recipe.cookTime || 'N/A'}</span>
                <span>📊 {recipe.difficulty || 'N/A'}</span>
                <span>⭐ {recipe.rating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
                <button className="text-blue-500 hover:text-blue-700 font-medium">
                  View Recipe →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No recipes found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedRecipes;