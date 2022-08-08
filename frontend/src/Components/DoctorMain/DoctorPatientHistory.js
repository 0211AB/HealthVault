import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Store/auth-context";
import search from "../../Images/search.svg";
import presp from "../../Images/presp.svg";
import nodata from "../../Images/nodata.png";
import "./DoctorPatientHistory.css";
import { Link } from "react-router-dom";
const DoctorPatientHistory = () => {
  const authCtx = useContext(AuthContext);
  const [details, setDetails] = useState({
    name: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [rdata, setRData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/prescription`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer :${authCtx.token}`,
        },
      });

      if (res.status === 400) {
        alert("No such patient found");
      } else {
        const resD = await res.json();
        console.log(resD);
        setRData(resD);
        setLoading(false);
      }
    };

    if (data !== null) fetchData();
  }, [data]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdate(true);
    setData(details);
  };

  if (rdata === null)
    return (
      <section className="about centre-flex" id="about">
        <div className="image">
          <img src={search} alt="" />
        </div>

        <div className="content ">
          <h3>Search In Records</h3>
          <span>Enter patient details to get patient data</span>
          <form onSubmit={submitHandler} id="form">
            <div className="inputBox">
              <input
                className="full-width"
                type="text"
                placeholder="Aadhar Number Of Patient"
                name="aadhar"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="inputBox">
              <input
                className="full-width"
                type="text"
                placeholder="Doctors Registration Number"
                name="registrationNumber"
                required
                onChange={changeHandler}
              />
            </div>
            <div className="align-center">
              <input type="submit" value="Search Records" className="btn" />
            </div>
          </form>
        </div>
      </section>
    );
  else
    return (
      <section className="blogs" id="blogs">
        <div className="heading">
          <span>Prescriptions</span>
          <h3>Medical History</h3>
        </div>

        <div className="box-container">
          {rdata === null ? (
            <></>
          ) : rdata.data.length === 0 ? (
            <div className="box box-img">
              <img src={nodata} alt="" />{" "}
            </div>
          ) : (
            rdata.data.map((data) => {
              return (
                <div className="box" key={data._id}>
                  <img src={presp} alt="" />
                  <Link
                    to={`/doctor/${rdata.registration}`}
                    disabled
                    className="title"
                  >
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
                    <Link to={`/doctor/history`}>
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

export default DoctorPatientHistory;
