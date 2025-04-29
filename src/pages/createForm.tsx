"use client";

import { useState, useRef, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ModalContext from "../context/modalCondition";
import axios from "axios";
import RecipeContext from "../context/mockRecipes";
import AuthContext from "../context/users";

interface RecipeFormData {
  title: string;
  description: string;

  tags: string;
  ingredients: string[];
  instructions: string[];
  coverImage?: File | null;
  previewImage?: string;
}

export default function AddRecipeModal() {
  const { toggleModal } = useContext(ModalContext);
  const { addRecipe } = useContext(RecipeContext);
  const { User } = useContext(AuthContext);
  console.log(User, "is user data");
  const [isIngredientError, setIsIngredientError] = useState(false);
  const [isInstructionError, setIsInstructionError] = useState(false);
  const [isTagError, setIsTagError] = useState(false);
  const [isCoverError, setIsCoverError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",

    tags: "",
    ingredients: [""],
    instructions: [""],
    coverImage: null,
    previewImage: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayFieldChange = (
    field: "ingredients" | "instructions",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayFieldItem = (field: "ingredients" | "instructions") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayFieldItem = (
    field: "ingredients" | "instructions",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsTagError(false);
    setIsIngredientError(false);
    setIsInstructionError(false);
    setIsCoverError(false);

    // return;
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      if (formData.previewImage == "") {
        setIsCoverError(true);
        return;
      }
      if (formData.tags == "") {
        setIsTagError(true);
        return;
      }
      if (formData.ingredients) {
        if (formData.ingredients.length == 1) {
          setIsIngredientError(true);
          return;
        }
      }
      if (formData.instructions) {
        if (formData.instructions.length == 1) {
          setIsInstructionError(true);
          return;
        }
      }

      // return;
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      // formData.tags.forEach((tag) => formDataToSend.append("tags", tag));
      formData.ingredients.forEach((ing) =>
        formDataToSend.append("ingredients", ing)
      );
      formDataToSend.append("tags", formData.tags);
      formData.instructions.forEach((inst) =>
        formDataToSend.append("instructions", inst)
      );

      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }
      // if (formData.tags) {
      //   formDataToSend.append("tags", formData.tags[0]);
      // }
      if (currentTag !== "" && currentTag !== undefined) {
        formDataToSend.append("tags", currentTag);
      }

      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      formDataToSend.append("userId", User._id);

      addRecipe(formDataToSend);

      toggleModal();
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/70  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky bg-white top-0  p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Recipe</h2>
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Spaghetti Carbonara"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Cover Image</label>
              <input
                type="file"
                name="coverImage"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {formData.previewImage ? "Change Image" : "Choose Image"}
                </button>
                {formData.previewImage && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                    <img
                      src={formData.previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          coverImage: null,
                          previewImage: "",
                        }))
                      }
                      className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-1 rounded-bl"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: JPEG/PNG, 800x600px, max 2MB
              </p>
              {isCoverError && (
                <small className=" text-red-700">Cover photo is required</small>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="A brief description of your recipe..."
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="block font-medium">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a tag (e.g., vegetarian)"
              />
            </div>

            {isTagError && (
              <small className=" text-red-600">
                Tag is required <br />
              </small>
            )}
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <label className="block font-medium">Ingredients *</label>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-gray-500 w-5">{index + 1}.</span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "ingredients",
                        index,
                        e.target.value
                      )
                    }
                    required={index === 0}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayFieldItem("ingredients", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                      aria-label="Remove ingredient"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayFieldItem("ingredients")}
                className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Ingredient
              </button>
            </div>
            {isIngredientError && (
              <small className=" text-red-800">
                Your Ingredients must be atleast 2 ingredients
              </small>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <label className="block font-medium">Instructions *</label>
            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-gray-500 w-5 mt-2">{index + 1}.</span>
                  <div className="flex-1 flex gap-2">
                    <textarea
                      value={instruction}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "instructions",
                          index,
                          e.target.value
                        )
                      }
                      required={index === 0}
                      rows={2}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Step ${
                        index + 1
                      } (e.g., Preheat oven to 350°F)`}
                    />
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayFieldItem("instructions", index)
                        }
                        className="p-2 text-red-500 hover:text-red-700 h-fit"
                        aria-label="Remove instruction"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayFieldItem("instructions")}
                className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Step
              </button>
            </div>
            {isInstructionError && (
              <small className=" text-red-800">
                Your Instructions must be atleast 2
              </small>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={toggleModal}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Recipe"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
