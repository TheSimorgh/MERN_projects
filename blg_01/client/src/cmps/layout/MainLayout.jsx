/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import {Footer,PrivateNavbar,PublicNavbar} from "../../cmps";
import { useSelector } from "react-redux";
const MainLayout = () => {
  const { userAuth } = useSelector((state) => state?.user);
  const isLogin = userAuth?.userInfo?.data?.token;
  return (
    <>
    {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <div className="container mx-auto w-full h-[calc(100%-30px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
