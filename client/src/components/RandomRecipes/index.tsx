import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_RECIPES } from '../../utils/queries';
import { Link } from 'react-router-dom';
import '../../styling/random-recipes.css';

interface Recipe {
    id: number;
    title: string;
    image: string;
}

const RandomRecipes: React.FC = () => {

    const { loading, error, data } = useQuery<{ randomRecipes: Recipe[] }>(QUERY_RANDOM_RECIPES);
    console.log(data);
    const recipes = data?.randomRecipes || [];
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error fetching recipes</div>
    }

    return (
        <div className="random-recipes-page">
            <div className="random-recipes">
                <div className="discover-section">
                    <h2 className="discover-message">Discover Your New Favorite Recipe</h2>
                </div>

                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <div className="recipe-card" key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`} >
                                <img src={recipe.image} alt={recipe.title} />
                                <h3>{recipe.title}</h3>  
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RandomRecipes;