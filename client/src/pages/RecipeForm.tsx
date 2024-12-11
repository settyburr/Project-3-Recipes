import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE } from "../utils/mutations"; // Import the mutation for updating a recipe
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
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_RECIPES);
  console.log(loading, error, data);
  const [addRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [GET_RECIPES]
  });
  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    refetchQueries: [GET_RECIPES]
  });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (editingRecipeId) {
        console.log("Panda")
        // Update existing recipe
        await updateRecipe({
          variables: { 
              id: editingRecipeId,
              title: formState.title,
              extendedIngredients: formState.ingredients.split(","),
              instructions: formState.steps,
              cuisines: formState.category,
              image: formState.photo
          },
        });
        setEditingRecipeId(null);
      } else {
        // Add new recipe
        console.log(formState)
        await addRecipe({
          variables: {
            input: {
              title: formState.title,
              extendedIngredients: formState.ingredients.split(","),
              instructions: formState.steps,
              cuisines: formState.category.split(","),
              image: formState.photo
            },
          },
        });
      }
    // title: "",
    // ingredients: "",
    // steps: "",
    // category: "",
    // photo: "",

      // setFormState({
      //   title: "",
      //   ingredients: "",
      //   steps: "",
      //   category: "",
      //   photo: "",
      // });
      navigate("/recipes");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("Editing Recipe ID:", editingRecipeId);
    console.log(formState)
  }, [formState, editingRecipeId]);
  

  const handleEditClick = (recipe: any) => {
    console.log(recipe);
    const selectedId = recipe.id;
    setEditingRecipeId(selectedId);
    setFormState({
      title: recipe.title,
      ingredients: recipe.extendedIngredients.join(","),
      steps: recipe.instructions,
      category: recipe.cuisines,
      photo: recipe.image || "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">
            {editingRecipeId ? "Edit Recipe" : "Add New Recipe"}
          </h4>
          <div className="card-body">
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
                {editingRecipeId ? "Update Recipe" : "Add Recipe"}
              </button>
            </form>

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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recipes?.map((recipe: any) => (
                    <tr key={recipe.id}>
                      <td>{recipe.title}</td>
                      <td>{recipe.cuisines.join(", ")}</td>
                      <td>{recipe.extendedIngredients.join(", ")}</td>
                      <td>{recipe.instructions}</td>
                      <td>
                        {recipe.image ? (
                          <img src={recipe.image} alt={recipe.title} style={{ width: 100 }} />
                        ) : (
                          "No photo"
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleEditClick(recipe)}
                        >
                          Edit
                        </button>
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
