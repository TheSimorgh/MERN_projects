/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const MainLayout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);


  return (
    <>
      <Box display="flex" minHeight="100vh">
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
