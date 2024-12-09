import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_RECIPES } from '../../utils/queries';

interface Recipe {
    id: number;
    title: string;
    image: string;
}

const RandomRecipes: React.FC = () => {

    const { loading, error, data } = useQuery<{ randomRecipes: Recipe[] }>(QUERY_RANDOM_RECIPES);

    const recipes = data?.randomRecipes || [];
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error fetching recipes</div>
    }

    return (
        <div className='random-recipes'>
            {recipes.map((recipe) => (
                <div className='recipe-card' key={recipe.id}>
                    <a href={`https://spoonacular.com/recipes/${recipe.id}`} target="_blank" rel="noopener noreferrer">
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>  
                    </a>
                </div>
            ))}
        </div>
    );
};

export default RandomRecipes;