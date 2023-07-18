/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import { MainLayout } from "../cmps";

const MainRoute = () => {
  return (
    <>
       <Routes>
         <Route path="/" element={<MainLayout />}> 
          {routes.map((route, index) => {
            route.index ? (
              <Route index key={index} element={route.element} />
            ) : (
              <Route path={route.path} key={index} element={route.element} />
            );


          })}

       </Route> 

      </Routes> 
    </>
  );
};

export default MainRoute;
