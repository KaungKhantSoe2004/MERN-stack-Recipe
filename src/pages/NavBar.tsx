import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import NavHeader from "./nav";
import axios from "axios";
import { useContext, useEffect } from "react";
import RecipeContext from "../context/mockRecipes";
import AuthContext from "../context/users";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const { SetUser } = useContext(AuthContext);
  const { fetchData } = useContext(RecipeContext);
  const checkAuth = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        withCredentials: true,
      });

      if (response.status == 200) {
        console.log(response.data);
        SetUser(response.data.data);
        return;
      } else {
        navigate(-1);
      }
    } catch (e) {
      navigate("/login");
      console.log(e);
    }
  };
  useEffect(() => {
    checkAuth();
    fetchData(currentPage, searchTerm);
  }, []);
  return (
    <div className="">
      <NavHeader />
      <Outlet />
    </div>
  );
};
export default NavBar;
