import React from "react";
import { useState, useEffect, useContext } from "react";
import apImg from "../../Images/appointment.svg";
import nodata from "../../Images/nodata.png";
import book from "../../Images/bookApp.svg";
import Loader from "../Loader/Loader";
import AuthContext from "../../Store/auth-context";

const DoctorAppointment = () => {
  const authCtx = useContext(AuthContext);
  const [details, setDetails] = useState({
    name: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [adata, setaData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const sendData = async () => {
      const res = await fetch("http://localhost:8000/appointments/doctor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer :${authCtx.token}`,
        },
      });

      const datares = await res.json();

      if (res.status === 200) {
        setaData(datares);
      } else {
        setLoading(false);
        alert(datares?.Error);
      }
    };
    sendData();
    setLoading(false);
  }, []);

  // console.log(adata)
  return (
    <section className="reviews" id="reviews">
      <div className="heading">
        <span>Appointments</span>
        <h3>Upcoming Appointments</h3>
      </div>

      <div className="box-container">
        {adata === null ? (
          <Loader />
        ) : adata.data.length === 0 ? (
          <div className="box">
            <img src={nodata} alt="" />{" "}
          </div>
        ) : (
          adata.data.map((data) => {
            return (
              <div className="box" key={data._id}>
                <img src={apImg} alt="" />
                <h3>
                  {data.patient.name}
                  <br></br>
                  {data.patient.email}
                </h3>
                <p>
                  Appointment Made On : {data.createdAt.split("T")[0]}
                  <br></br>Date Of Appointment : {data.day.split("T")[0]}
                  <br></br>Time Of Appointment :{" "}
                  {data.day.split("T")[1].split(".")[0]} UTC
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default DoctorAppointment;
