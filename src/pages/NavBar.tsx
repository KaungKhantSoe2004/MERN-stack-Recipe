import { Outlet } from "react-router-dom";
import NavHeader from "./nav";

const NavBar = () => {
  return (
    <div className="">
      <NavHeader />
      <Outlet />
    </div>
  );
};
export default NavBar;
