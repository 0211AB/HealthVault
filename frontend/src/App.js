import React, { useContext } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Facilities from './components/Facilities/Facilities';
import './App.css'
import Home from './components/Home/Home'
import Signin from './components/Signup/Signin';
import Signup from './components/Signup/Signup';
import Bot from './components/Bot/Bot';
import DoctorsList from './components/DoctorsList/DoctorsList';
import DoctorDetails from './components/DoctorDetails/DoctorDetails';
import PatientDetails from './components/PatientDetails/PatientDetails';
import Appointment from './components/Appointment/Appointment';
import AuthContext from './store/AuthContext';


const App = () => {
  const authCtx = useContext(AuthContext)
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/facilities" element={<Facilities />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path='/bot' element={<Bot />}></Route>
        <Route path='/search-doctor' element={<DoctorsList />}></Route>
        <Route
          path="/doctor/:id"
          element={
            authCtx.isLoggedIn && authCtx.isDoctor ? (
              <DoctorDetails />
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/patient/:id"
          element={
            authCtx.isLoggedIn && authCtx.isDoctor === false ? (
              <PatientDetails />
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
        <Route
          path="/appointment"
          element={
            authCtx.isLoggedIn ? (
              <Appointment />
            ) : (
              <Navigate to="/signin" />
            )
          }
        ></Route>
      </Routes>
    </>
  )
}

export default App