/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const navigate =useNavigate()
  const user =  Cookies.get("userInfo") 
  ? JSON.parse(Cookies.get("userInfo")) : null

  useEffect(()=>{},[user])
  return (user ? children : navigate("/"))
};

export default ProtectedPage;
