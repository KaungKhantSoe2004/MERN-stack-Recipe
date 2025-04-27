import { NavLink } from "react-router-dom";

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

interface RecipeCardProps {
  recipe: RecipeType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <NavLink to={`/recipes/${recipe._id}`} className="block h-full">
      <div className="overflow-hidden h-full hover:shadow-md transition-shadow rounded-lg">
        <div className="relative w-full h-48">
          <img
            src={recipe.coverImage || "/placeholder.svg"}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {recipe?.tags}
            {/* {recipe?.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                +{recipe.tags.length - 3}
              </span>
            )} */}
          </div>
        </div>

        <div className="p-4 pt-0 flex justify-between text-sm text-gray-500">
          {/* <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>
              {Number(recipe.prepTime) + Number(recipe.cookTime)} mins
            </span>
          </div> */}
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

// Example icons (you would import these from your icon library)
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
