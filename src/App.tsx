import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  }

  // ✅ Declare it only once
  const [mockRecipes, setMockRecipes] = useState<mockRecipesType[]>([]);

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
    console.log("Added new Recipe", response);
    setMockRecipes((prev) => [...prev, response.data.data]);
    console.log(mockRecipes);
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
    // console.log(updatableRecipe, "is updatable Recipe");
    for (let [key, value] of updatableRecipe.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await axios.patch(
      `http://localhost:3000/blog/updateRecipe/${id}`,
      updatableRecipe,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  };
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    console.log(name, email, password);
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
      console.log(response);
      return;
    }
  };
  const login = async (email: string, password: string): Promise<number> => {
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
      console.log(response.status);
      return response.status;
    }
  };
  interface UserType {
    name: string;
    email: string;
    password: string;
    favorites: string[];
  }
  const { User, SetUser } = useState<UserType | undefined>(undefined);
  const logout = () => {
    localStorage.removeItem("mockingJay");
    return "true";
  };

  const [isOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!isOpen);
  };
  const fetchData = async (): Promise<void> => {
    const response = await axios.get(`http://localhost:3000/blog/getRecipe`, {
      withCredentials: true,
    });
    console.log(response.data.data);
    setMockRecipes(response.data.data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      <AuthContext.Provider value={{ register, login, User, logout }}>
        <RecipeContext.Provider
          value={{
            mockRecipes,
            addRecipe,
            deleteRecipe,
            updateRecipe,
            fetchData,
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
