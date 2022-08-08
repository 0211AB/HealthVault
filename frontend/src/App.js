import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";

import Home from "./Components/Home/Home";
import DoctorMain from "./Components/DoctorMain/DoctorMain";
import PatientMain from "./Components/PatientMain/PatientMain";
import "./App.css";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home val="0" />}></Route>
      <Route path="/med-bot" element={<Home val="1" />}></Route>
      <Route path="/contact" element={<Home val="2" />}></Route>
      <Route path="/facilities" element={<Home val="3" />}></Route>
      <Route path="/doctor/login" element={<Home val="4" />}></Route>
      <Route path="/patient/login" element={<Home val="5" />}></Route>
      <Route path="/doctor/signup" element={<Home val="6" />}></Route>
      <Route path="/patient/signup" element={<Home val="7" />}></Route>
      <Route
        path="/patient/:pid"
        element={
          authCtx.isLoggedIn ? (
            <PatientMain val="0" />
          ) : (
            <Navigate to="/patient/login" />
          )
        }
      ></Route>
      <Route
        path="/patient/update"
        element={
          authCtx.isLoggedIn ? (
            <PatientMain val="1" />
          ) : (
            <Navigate to="/patient/login" />
          )
        }
      ></Route>
      <Route
        path="/patient/history"
        element={
          authCtx.isLoggedIn ? (
            <PatientMain val="2" />
          ) : (
            <Navigate to="/patient/login" />
          )
        }
      ></Route>
      <Route
        path="/patient/appointment"
        element={
          authCtx.isLoggedIn ? (
            <PatientMain val="3" />
          ) : (
            <Navigate to="/patient/login" />
          )
        }
      ></Route>
      <Route
        path="/doctor/:did"
        element={
          authCtx.isLoggedIn ? (
            <DoctorMain val="0" />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      ></Route>
      <Route
        path="/doctor/update"
        element={
          authCtx.isLoggedIn ? (
            <DoctorMain val="1" />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      ></Route>
      <Route
        path="/doctor/history"
        element={
          authCtx.isLoggedIn ? (
            <DoctorMain val="2" />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      ></Route>
      <Route
        path="/doctor/appointment"
        element={
          authCtx.isLoggedIn ? (
            <DoctorMain val="3" />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      ></Route>
      <Route
        path="/doctor/prescription"
        element={
          authCtx.isLoggedIn ? (
            <DoctorMain val="4" />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      ></Route>
    </Routes>
  );
};

export default App;
