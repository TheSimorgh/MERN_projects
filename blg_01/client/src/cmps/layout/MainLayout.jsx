/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import {Footer,PrivateNavbar,PublicNavbar} from "../../cmps";
const MainLayout = () => {
  const isLogin = true
  return (
    <>
    {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
