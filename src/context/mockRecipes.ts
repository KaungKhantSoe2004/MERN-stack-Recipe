import { createContext } from "react";
interface mockRecipesType {
  id: number;
  title: string;
  description: string;
  tags: string;
  prepTime: string;
  cookTime: string;
  coverImage?: string;
  servings?: number;
}
interface RecipeContextType {
  mockRecipes: mockRecipesType[];
  addRecipe: (newRecipe: mockRecipesType, token: string) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
  updateRecipe: (
    updatableRecipe: mockRecipesType,
    token: string
  ) => Promise<void>;
}
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);
export default RecipeContext;
