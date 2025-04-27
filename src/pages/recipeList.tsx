"use client";

import { useState } from "react";
import RecipeCard from "./recipeCard";

interface RecipeType {
  _id: number;
  title: string;
  description: string;
  tags: string[];
  prepTime: string;
  cookTime: string;
  coverImage?: string;
  servings?: number;
}

interface RecipeListProps {
  recipes: RecipeType[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No recipes found</h3>
          <p className="text-muted-foreground">
            Try a different search term or add a new recipe.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
