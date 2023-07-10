import { Routes, Route } from "react-router-dom";
import { MainLayout, PgWrapper } from "../cmps";
import routes from "./routes.jsx";
const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, index) =>
            route.index ? (
              <Route
                index
                key={index}
                element={
                  route.state ? (
                    <PgWrapper state={route.state}>{route.element}</PgWrapper>
                  ) : (
                    route.element
                  )
                }
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={
                  route.state ? (
                    <PgWrapper state={route.state}>{route.element}</PgWrapper>
                  ) : (
                    route.element
                  )
                }
              />
            )
          )}
        </Route>
      </Routes>
    </>
  );
};

export default MainRoute;
