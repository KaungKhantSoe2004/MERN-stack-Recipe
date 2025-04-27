import { useContext, useState } from "react";
import AddRecipeModal from "./createForm";
import RecipeList from "./recipeList";
import ModalContext from "../context/modalCondition";
import RecipeContext from "../context/mockRecipes";
import Pagination from "./pagination";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const { mockRecipes } = useContext(RecipeContext);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { isOpen, toggleModal } = useContext(ModalContext);
  const { links } = useContext(RecipeContext);
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") || ""
  );
  return (
    <div className=" my-4 ">
      <div className=" topHeader my-10">
        <h2 className=" text-3xl font-bold text-center">Delicious Recipes</h2>
      </div>
      <div className="relative px-auto max-w-md mx-auto ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search recipes..."
          required
        />
        <button
          onClick={() => {
            window.location.href = `http://localhost:5173/?searchTerm=${searchTerm}`;
          }}
          className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-black/90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200"
        >
          Search
        </button>
      </div>
      <div className=" md:mx-8 my-3 md:my-7 mx-4 RecipeContainer">
        <RecipeList recipes={mockRecipes} />
      </div>
      {isOpen == true && <AddRecipeModal />}
      <Pagination links={links} basePath="http://localhost:5173/" />
    </div>
  );
};
export default HomePage;
