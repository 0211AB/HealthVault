import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import Loader from "../Loader/Loader";
import createp from "../../Images/createprescription.gif";
import { useState, useContext, useEffect } from "react";
import { json } from "body-parser";

const DoctorCreatePrescription = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [details, setDetails] = useState({
    name: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sendData = async () => {
      // console.log(formData)
      const res = await fetch("http://localhost:8000/prescription/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer :${authCtx.token}`,
        },
      });

      const datares = await res.json();
      console.log(datares);

      if (res.status === 201) {
        alert("Prescription added sucessfully!!!");
        navigate(`/doctor/history`);
      } else {
        setLoading(false);
        setData(null);
        alert(datares?.Message);
      }
    };

    if (data !== null) sendData();

    setLoading(false);
  }, [data]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setData(details);
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <section className="home centre-flex" id="home">
      <div className="image">
        <img src={createp} className="animate" alt="" />
      </div>

      <div className="content">
        <div className="heading">
          <h3>Enter the Details</h3>
        </div>
        <form onSubmit={submitHandler} id="form">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Aadhar Number"
              name="patient"
              required
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="Registration Number"
              name="doctor"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Medicines Prescribed"
              name="medicinesPrescribed"
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="Diet Plan"
              name="dietPlan"
              onChange={changeHandler}
            />
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Sugar Level"
              name="sugarLevel"
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="Blood Level"
              name="bloodLevel"
              required
              onChange={changeHandler}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            id=""
            cols="30"
            rows="10"
            required
            onChange={changeHandler}
          ></textarea>
          <div className="align-center">
            <input type="submit" value="Create Prescription" className="btn" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default DoctorCreatePrescription;
