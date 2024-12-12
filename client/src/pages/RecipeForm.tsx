import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "../utils/mutations";
import { GET_RECIPES } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import '../styling/recipe-form.css';

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
  const [addRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [GET_RECIPES],
  });
  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    update(cache, { data: { updateRecipe } }) {
      const existingRecipes = cache.readQuery({ query: GET_RECIPES });
      if (existingRecipes && updateRecipe) {
        const updatedRecipes = existingRecipes.recipes.map((recipe: any) =>
          recipe.id === updateRecipe.id ? updateRecipe : recipe
        );
        cache.writeQuery({
          query: GET_RECIPES,
          data: { recipes: updatedRecipes },
        });
      }
    },
  });
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteRecipe } }) {
      const existingRecipes = cache.readQuery({ query: GET_RECIPES });
      if (existingRecipes && deleteRecipe) {
        const updatedRecipes = existingRecipes.recipes.filter(
          (recipe: any) => recipe.id !== deleteRecipe.id
        );
        cache.writeQuery({
          query: GET_RECIPES,
          data: { recipes: updatedRecipes },
        });
      }
    },
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
        await updateRecipe({
          variables: {
            updateRecipeId: editingRecipeId,
            title: formState.title,
            extendedIngredients: formState.ingredients.split(","),
            instructions: formState.steps,
            cuisines: formState.category.split(","),
            image: formState.photo,
          },
        });
        setEditingRecipeId(null);
      } else {
        await addRecipe({
          variables: {
            input: {
              title: formState.title,
              extendedIngredients: formState.ingredients.split(","),
              instructions: formState.steps,
              cuisines: formState.category.split(","),
              image: formState.photo,
            },
          },
        });
      }
      navigate("/recipes");
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (recipe: any) => {
    const selectedId = recipe.id;
    setEditingRecipeId(selectedId);
    setFormState({
      title: recipe.title,
      ingredients: recipe.extendedIngredients.join(","),
      steps: recipe.instructions,
      category: recipe.cuisines.join(","),
      photo: recipe.image || "",
    });
  };

  const handleDeleteClick = async (recipeId: string) => {
    try {
      await deleteRecipe({
        variables: { id: recipeId },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("Editing Recipe ID:", editingRecipeId);
  }, [editingRecipeId]);

  return (
    <main className="recipe-form-border">
      <div className="recipe-form">
        <h1>{editingRecipeId ? "Edit Recipe" : "Add New Recipe"}</h1>
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
            className="button"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {editingRecipeId ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>

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
                    <button className="button" onClick={() => handleEditClick(recipe)}>
                      Edit
                    </button>
                    <button
                      className="button"
                      style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                      onClick={() => handleDeleteClick(recipe.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default RecipeForm;
