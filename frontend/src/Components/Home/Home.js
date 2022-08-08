import React from "react";
import Header from "../Header/Header";
import "./Home.css";

import Landing from "../Landing/Landing";
import ContactUs from "../ContactUs/ContactUs";
import MedBot from "../MedBot/MedBot";
import Facilities from "../Facilities/Facilities";
import DoctorLogin from "../Doctor/DoctorLogin";
import PatientLogin from "../Patient/PatientLogin";
import DoctorSignup from "../Doctor/DoctorSignup";
import PatientSignup from "../Patient/PatientSignup";

const Home = (props) => {
  return (
    <>
      <Header />
      {props.val == 0 ? <Landing></Landing> : <></>}
      {props.val == 1 ? <MedBot></MedBot> : <></>}
      {props.val == 2 ? <ContactUs></ContactUs> : <></>}
      {props.val == 3 ? <Facilities></Facilities> : <></>}
      {props.val == 4 ? <DoctorLogin></DoctorLogin> : <></>}
      {props.val == 5 ? <PatientLogin></PatientLogin> : <></>}
      {props.val == 6 ? <DoctorSignup></DoctorSignup> : <></>}
      {props.val == 7 ? <PatientSignup></PatientSignup> : <></>}
    </>
  );
};

export default Home;
