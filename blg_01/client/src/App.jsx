import "./App.css";
import { MainLayout } from "./cmps";
import routes from "./routes/routes";
// import MainRoute from './routes/MainRoute'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <MainRoute />  */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, index) =>
            route.index ? (
              <Route index key={index} element={route.element} />
            ) : (
              <Route path={route.path} key={index} element={route.element} />
            )

            // <Route path={route.path} key={index} element={route.element} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
