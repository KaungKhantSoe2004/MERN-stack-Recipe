"use client";

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeEditForm from "./editForm";
import RecipeContext from "../context/mockRecipes";
import ModalContext from "../context/modalCondition";

export default function RecipeDetail() {
  const { mockRecipes, deleteRecipe } = useContext(RecipeContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { toggleEditModal, isEditModalOpen } = useContext(ModalContext);

  const recipe = mockRecipes.find((r) => r._id === id);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Recipe not found</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/")}
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe Header */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
        <img
          src={recipe.coverImage || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">{recipe.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toggleEditModal();
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6">{recipe.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
          >
            {tag}
          </span>
        ))} */}
        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
          {recipe.tags}
        </span>
      </div>

      {/* Recipe Metadata */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center">
          <span className="font-medium">Prep:</span>
          <span className="ml-2">{recipe.prepTime}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Cook:</span>
          <span className="ml-2">{recipe.cookTime}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Serves:</span>
          <span className="ml-2">{recipe.servings}</span>
        </div>
      </div> */}

      {/* Ingredients and Instructions */}
      <div className="mb-8">
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`ingredient-${index}`}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={`step-${index}`}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {/* <h3 className="text-xl font-semibold mb-4">Gallery</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    
      </div> */}

      {/* Image Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      {isEditModalOpen == true && <RecipeEditForm recipe={recipe} />}
    </div>
  );
}
