import React from "react";
import { Link } from "react-router-dom";
import "./PatientHistory.css";
import presp from "../../Images/presp.svg";
import nodata from "../../Images/nodata.png";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../../Store/auth-context";
import Loader from "../Loader/Loader";

const PatientHistory = () => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [pdata, setPData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/patient/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer :${authCtx.token}`,
        },
      });

      const data = await res.json();
      // console.log(patient)
      setData(data);
      setLoading(false);
    };

    if (data === null) fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:8000/prescription/${data.aadharNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer :${authCtx.token}`,
          },
        }
      );

      const resD = await res.json();
      // console.log(patient)
      setPData(resD);
      setLoading(false);
    };

    if (data !== null) fetchData();
  }, [data]);

  console.log(pdata);

  return loading ? (
    <Loader></Loader>
  ) : (
    <section className="blogs" id="blogs">
      <div className="heading">
        <span>Your Prescriptions</span>
        <h3>Medical History</h3>
      </div>

      <div className="box-container">
        {pdata === null ? (
          <Loader />
        ) : pdata.data.length === 0 ? (
          <div className="box">
            <img src={nodata} alt="" />{" "}
          </div>
        ) : (
          pdata.data.map((data) => {
            return (
              <div className="box" key={data._id}>
                <img src={presp} alt="" />
                <Link to="/patient/history" disabled className="title">
                  {" "}
                  Dr .{data.doctor.name}
                </Link>
                <p className="blog-description">
                  {data.description}
                  <br></br>
                  {data.dietPlan !== undefined
                    ? `Diet Plan :  ${data.dietPlan}`
                    : ""}
                  <br></br>
                  {data.bloodLevel !== undefined
                    ? `Blood Level :  ${data.bloodLevel}`
                    : ""}
                  <br></br>
                  {data.medicinesPrescribed !== undefined
                    ? `Medicines Prescribed :  ${data.medicinesPrescribed}`
                    : ""}
                  <br></br>
                  {data.sugarLevel !== undefined
                    ? `Sugar Level :  ${data.sugarLevel}`
                    : ""}
                  <br></br>
                  {data.testsPrescribed !== undefined
                    ? `Tests Prescribed :  ${data.testsPrescribed}`
                    : ""}
                  <br></br>
                </p>
                <div className="icons">
                  <p>
                    <i className="fas fa-calendar"></i>
                    {data.updatedAt.split("T")[0]}
                    <br></br>
                    {data.updatedAt.split("T")[1].split(".")[0]} UTC
                  </p>
                  <Link to={`/patient/${data.name}`}>
                    {data.patient.name}
                    <br></br>
                    {data.patient.email}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default PatientHistory;
