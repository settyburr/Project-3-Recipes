import { useState, type FormEvent, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPE } from "../utils/mutations"; // Import the mutation for adding a recipe
import { GET_RECIPES } from "../utils/queries"; // Import the query for getting all recipes
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    ingredients: "",
    steps: "",
    category: "",
    photo: "",
  });

  const { loading, error, data } = useQuery(GET_RECIPES); // Fetch recipes
  const [addRecipe, { error: mutationError, data: mutationData }] = useMutation(ADD_RECIPE);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addRecipe({
        variables: {
          input: {
            ...formState,
            ingredients: formState.ingredients.split(","),
            steps: formState.steps.split("."),
          },
        },
      });

      if (data) {
        navigate("/recipes"); // Navigate to recipes list after success
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add New Recipe</h4>
          <div className="card-body">
            {mutationData ? (
              <p>
                Success! Your recipe has been added.{" "}
                <button onClick={() => navigate("/recipes")} className="btn btn-link">
                  View Recipes
                </button>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Recipe Title"
                  name="title"
                  type="text"
                  value={formState.title}
                  onChange={handleChange}
                />
                <textarea
                  className="form-input"
                  placeholder="Ingredients (comma-separated)"
                  name="ingredients"
                  value={formState.ingredients}
                  onChange={handleChange}
                />
                <textarea
                  className="form-input"
                  placeholder="Steps (separated by periods)"
                  name="steps"
                  value={formState.steps}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Category (e.g., Breakfast, Vegan)"
                  name="category"
                  type="text"
                  value={formState.category}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Photo URL"
                  name="photo"
                  type="text"
                  value={formState.photo}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Add Recipe
                </button>
              </form>
            )}

            {mutationError && (
              <div className="my-3 p-3 bg-danger text-white">{mutationError.message}</div>
            )}

            {/* Table to display all recipes */}
            <h4 className="mt-4">Your Recipes</h4>
            {loading ? (
              <p>Loading recipes...</p>
            ) : error ? (
              <p>Error fetching recipes: {error.message}</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Ingredients</th>
                    <th>Steps</th>
                    <th>Photo</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {data?.recipes?.map((recipe: any) => (
                    <tr key={recipe._id}>
                      <td>{recipe.title}</td>
                      <td>{recipe.category}</td>
                      <td>{recipe.ingredients}</td>
                      <td>{recipe.steps}</td>
                      <td>
                        {recipe.photo ? (
                          <img src={recipe.photo} alt={recipe.title} style={{ width: 100 }} />
                        ) : (
                          "No photo"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeForm;
