import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store from "./redux/store.jsx";
// import { persistStore } from "redux-persist";

// let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>

  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>

  //   </PersistGate>
  // </Provider>
);
