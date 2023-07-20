import { useSelector } from "react-redux";
import "./App.css";
import { MainLayout } from "./cmps";
import routes from "./routes/routes";
// import MainRoute from './routes/MainRoute'
import { Routes, Route } from "react-router-dom";
export const BASE_URL = "http://localhost:9080/api/v1";

function App() {
  // const {user}=useSelector(state=>state)
  // console.log(`App`);
  // console.log(user.userAuth.userInfo.data.email);
  console.log();
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
