/* eslint-disable no-unused-vars */
import { useState } from "react";
import MainRoute from "./routes/MainRoute";
import CssBaseline from "@mui/material/CssBaseline";
import themeConfigs from "./configs/theme.configs";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
        <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
     />
      {/* mui reset css */}
      <CssBaseline />
      <div>
        <MainRoute />
      </div>
    </ThemeProvider>
  );
}

export default App;
