import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { logoutUser } from "../store/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Nevbar";
import { AllRoutes } from "./components/AllRoutes";

const App = () => {

  return (
    <>
      <Navbar />
      <AllRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
