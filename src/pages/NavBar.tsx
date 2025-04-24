import { Outlet, useNavigate } from "react-router-dom";
import NavHeader from "./nav";
import axios from "axios";
import { useContext, useEffect } from "react";
import RecipeContext from "../context/mockRecipes";

const NavBar = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(RecipeContext);
  const checkAuth = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        withCredentials: true,
      });
      console.log(response, "is response");
      if (response.status == 200) {
        return;
      } else {
        navigate(-1);
      }
    } catch (e) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);
  return (
    <div className="">
      <NavHeader />
      <Outlet />
    </div>
  );
};
export default NavBar;
