import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../utils/API.js';
import '../styling/single-recipe.css'

const SingleRecipe: React.FC = () => {
  const { recipeId: recipeParam } = useParams<{ recipeId: string | undefined }>();
  const [recipeData, setRecipeData] = useState({
    id: '',
    title: '',
    image: '',
    extendedIngredients: [],
    instructions: '',
    cuisines: [],
  });

  const recipeDataLength = Object.keys(recipeData).length;
  useEffect(() => {
    const getRecipeData = async () => {
      try {

        const response = await getRecipe(recipeParam);
        console.log(response);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const recipe = await response.json();

        const cleanedInstructions = recipe.instructions.replace(/<\/?ol>|<\/?li>/g, '');
        recipe.instructions = cleanedInstructions;
        
        setRecipeData(recipe);
      } catch (err) {
        console.error(err);
      }
    };

    getRecipeData();
  }, [recipeDataLength]);
  return (
    <div className="single-recipe-page">
      <div className="single-recipe">
          <h1>{recipeData.title}</h1>
          <img src={recipeData.image} alt={recipeData.title}></img>
          <div>
            <h2>Ingredients</h2>
            <ul>
            {recipeData?.extendedIngredients.map((item: { id: string; name: string }) => (
              <li key={item.id}>{item.name}</li>
            ))}
            </ul>

            <h2>Cuisines</h2>
            <ul>
            {recipeData?.cuisines.map((cuisine: string, index: number) => (
              <li key={index}>{cuisine}</li>
            ))}
            </ul>
          </div>
          <h2>Instructions</h2>
          <p>{recipeData.instructions}</p>
        
          {!recipeParam && (
            <div className="no-recipe-message">
            <p>No parameter passed.</p>
          </div>
      )}
      </div>
    </div>
  );
};

export default SingleRecipe;