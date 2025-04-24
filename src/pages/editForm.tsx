// "use client";

// import { useState, useEffect, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import RecipeContext from "../context/mockRecipes";

// interface RecipeFormData {
//   id: number;
//   title: string;
//   description: string;
//   tags: string[];
//   coverImage?: string;
// }

// export default function RecipeEditForm({ recipe }) {
//   const { mockRecipes } = useContext(RecipeContext);

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<RecipeFormData>({
//     id: 0,
//     title: "",
//     description: "",
//     prepTime: "",
//     cookTime: "",
//     servings: "",
//     tags: [],
//   });
//   const [currentTag, setCurrentTag] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Load recipe data when component mounts
//   useEffect(() => {
//     if (recipe) {
//       setFormData({
//         id: recipe._id,
//         title: recipe.title,
//         description: recipe.description,
//         prepTime: recipe.prepTime,
//         cookTime: recipe.cookTime,
//         servings: recipe.servings?.toString() || "",
//         tags: recipe.tags,
//         coverImage: recipe.coverImage,
//       });
//     }
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTagAdd = () => {
//     if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, currentTag.trim()],
//       }));
//       setCurrentTag("");
//     }
//   };

//   const handleTagRemove = (tagToRemove: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((tag) => tag !== tagToRemove),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // In a real app, you would:
//       // await api.updateRecipe(formData);
//       navigate(`/recipes/${formData.id}`);
//     } catch (error) {
//       console.error("Error updating recipe:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!formData.id) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold">Loading recipe...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Information */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label htmlFor="title" className="block font-medium">
//               Recipe Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="coverImage" className="block font-medium">
//               Cover Image URL
//             </label>
//             <input
//               type="url"
//               id="coverImage"
//               name="coverImage"
//               value={formData.coverImage || ""}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="description" className="block font-medium">
//             Description *
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         {/* Time and Servings */}
//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="space-y-2">
//             <label htmlFor="prepTime" className="block font-medium">
//               Prep Time *
//             </label>
//             <input
//               type="text"
//               id="prepTime"
//               name="prepTime"
//               value={formData.prepTime}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="cookTime" className="block font-medium">
//               Cook Time *
//             </label>
//             <input
//               type="text"
//               id="cookTime"
//               name="cookTime"
//               value={formData.cookTime}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="servings" className="block font-medium">
//               Servings *
//             </label>
//             <input
//               type="text"
//               id="servings"
//               name="servings"
//               value={formData.servings}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="space-y-2">
//           <label htmlFor="tags" className="block font-medium">
//             Tags
//           </label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               id="tags"
//               value={currentTag}
//               onChange={(e) => setCurrentTag(e.target.value)}
//               onKeyDown={(e) =>
//                 e.key === "Enter" && (e.preventDefault(), handleTagAdd())
//               }
//               className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Add a tag (e.g., vegetarian)"
//             />
//             <button
//               type="button"
//               onClick={handleTagAdd}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {/* {formData.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
//               >
//                 {tag}
//                 <button
//                   type="button"
//                   onClick={() => handleTagRemove(tag)}
//                   className="ml-2 text-gray-500 hover:text-gray-700"
//                 >
//                   ×
//                 </button>
//               </span>
//             ))} */}
//             <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
//               {formData.tags}
//               <button
//                 type="button"
//                 onClick={() => handleTagRemove(tag)}
//                 className="ml-2 text-gray-500 hover:text-gray-700"
//               ></button>
//             </span>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-4 pt-4 border-t">
//           <button
//             type="button"
//             onClick={() => navigate(`/recipes/${formData.id}`)}
//             className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
//             disabled={isSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               "Save Changes"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useRef, ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalContext from "../context/modalCondition";
import axios from "axios";
import RecipeContext from "../context/mockRecipes";

interface RecipeFormData {
  _id?: string;
  title: string;
  description: string;
  tags: string;
  ingredients: string[];
  instructions: string[];
  coverImage?: File | null;
  previewImage?: string;
  existingImageUrl?: string;
}

interface EditRecipeModalProps {
  recipe: RecipeFormData;
}

export default function EditRecipeModal({ recipe }: EditRecipeModalProps) {
  const { toggleModal } = useContext(ModalContext);
  const { updateRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<RecipeFormData>({
    _id: 0,
    title: "",
    description: "",
    tags: "",
    ingredients: [""],
    instructions: [""],
    coverImage: null,
    previewImage: "",
    existingImageUrl: "",
  });
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with recipe data
  useEffect(() => {
    if (recipe) {
      setFormData({
        _id: recipe._id,
        title: recipe.title,
        description: recipe.description,
        tags: recipe.tags,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        coverImage: null,
        previewImage: "",
        existingImageUrl: recipe.previewImage || "",
      });
      setCurrentTag(recipe.tags || "");
    }
  }, [recipe]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
        previewImage: URL.createObjectURL(file),
        existingImageUrl: "", // Clear existing image URL when new image is selected
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

  const handleTagRemove = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData._id || "");
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      formData.ingredients.forEach((ing) =>
        formDataToSend.append("ingredients", ing)
      );
      formData.instructions.forEach((inst) =>
        formDataToSend.append("instructions", inst)
      );

      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      if (currentTag !== "" && currentTag !== undefined) {
        formDataToSend.append("tags", currentTag);
      }

      // If no new image was selected but there's an existing image URL
      if (!formData.coverImage && formData.existingImageUrl) {
        formDataToSend.append("existingImageUrl", formData.existingImageUrl);
      }

      // Use formDataToSend for the update
      updateRecipe(formDataToSend, recipe._id);

      toggleModal();
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky bg-white top-0 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Recipe</h2>
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
                  {formData.previewImage || formData.existingImageUrl
                    ? "Change Image"
                    : "Choose Image"}
                </button>
                {(formData.previewImage || formData.existingImageUrl) && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                    <img
                      src={formData.previewImage || formData.existingImageUrl}
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
                          existingImageUrl: "",
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
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a tag (e.g., vegetarian)"
              />
            </div>
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
                  Updating...
                </>
              ) : (
                "Update Recipe"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
