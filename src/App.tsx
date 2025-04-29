import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import FavPage from "./pages/fav";
import ProfilePage from "./pages/profile";
import NavBar from "./pages/NavBar";
import RecipeDetail from "./pages/recipe";
import { useEffect, useState } from "react";
import ModalContext from "./context/modalCondition";
import RecipeContext from "./context/mockRecipes";
import AuthContext from "./context/users";
import axios from "axios";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
function App() {
  interface mockRecipesType {
    id: number;
    title: string;
    description: string;
    tags: string[];
    prepTime: string;
    cookTime: string;
    coverImage?: string;
    servings?: number;
    userId?: number;
  }
  interface links {
    nextPage: boolean;
    prevPage: boolean;
    currentPage: number;
    loopableLinks: { number: number }[];
  }
  // ✅ Declare it only once
  const [mockRecipes, setMockRecipes] = useState<mockRecipesType[]>([]);
  const [links, setLinks] = useState<links | null>({
    nextPage: true,
    prevPage: true,
    currentPage: 2,
    loopableLinks: [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
    ],
  });

  const addRecipe = async (
    newRecipe: mockRecipesType
    // token: string
  ): Promise<void> => {
    const response = await axios.post(
      `http://localhost:3000/blog/addRecipe`,
      newRecipe,

      {
        withCredentials: true,
      }
    );

    setMockRecipes((prev) => [...prev, response.data.data]);
  };
  const deleteRecipe = async (id: number): Promise<void> => {
    const response = await axios.delete(
      `http://localhost:3000/blog/deleteRecipe/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status == 200) {
      const newData = mockRecipes.filter((r) => r._id !== id);
      setMockRecipes(newData);
    }
  };
  const updateRecipe = async (
    updatableRecipe: mockRecipesType,
    id: number
    // token: string
  ): Promise<void> => {
    for (let [key, value] of updatableRecipe.entries()) {
      console.log("dd");
    }
    const response = await axios.patch(
      `http://localhost:3000/blog/updateRecipe/${id}`,
      updatableRecipe,
      {
        withCredentials: true,
      }
    );
  };
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    if (!name || !email || !password) {
      return;
    } else {
      const response = await axios.post(
        `http://localhost:3000/user/register`,
        JSON.stringify({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return;
    }
  };
  const login = async (email: string, password: string): Promise<number> => {
    try {
      if (!email || !password) {
        return 422;
      } else {
        const response = await axios.post(
          `http://localhost:3000/user/login`,
          JSON.stringify({ email, password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        return response.status;
      }
    } catch (e: any) {
      return e.status;
    }
  };
  interface UserType {
    name: string;
    email: string;
    password: string;
    favorites: string[];
  }
  const [User, SetUser] = useState<UserType | undefined>(undefined);
  const logout = () => {
    localStorage.removeItem("mockingJay");
    return "true";
  };

  const [isOpen, setModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const toggleModal = () => {
    setModalOpen(!isOpen);
  };
  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };
  const fetchData = async (
    pageNumber: number,
    searchTerm: string | undefined
  ): Promise<void> => {
    console.log(searchTerm, "is searching term");
    const response = await axios.get(
      `http://localhost:3000/blog/getRecipe/?page=${pageNumber}&search=${searchTerm}`,
      {
        withCredentials: true,
      }
    );

    setLinks(response.data.links);
    setMockRecipes(response.data.data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <ModalContext.Provider
      value={{ isOpen, toggleModal, isEditModalOpen, toggleEditModal }}
    >
      <AuthContext.Provider value={{ register, login, User, SetUser, logout }}>
        <RecipeContext.Provider
          value={{
            mockRecipes,
            addRecipe,
            deleteRecipe,
            updateRecipe,
            fetchData,
            links,
            setLinks,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavBar />}>
                <Route index element={<HomePage />} />
                {/* <Route path="/createRecipe" element={<AddRecipeModal />} /> */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="fav" element={<FavPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="recipes/:id" element={<RecipeDetail />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        </RecipeContext.Provider>
      </AuthContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
