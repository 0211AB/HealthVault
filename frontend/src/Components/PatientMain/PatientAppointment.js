import React from 'react'
import { useState, useEffect, useContext } from 'react'
import './PatientAppointment.css'
import apImg from '../../Images/appointment.svg'
import nodata from '../../Images/nodata.png'
import book from '../../Images/bookApp.svg'
import Loader from '../Loader/Loader'
import AuthContext from '../../Store/auth-context'

const PatientAppointment = () => {
  const authCtx = useContext(AuthContext)
  const [details, setDetails] = useState({
    name: "",
  })

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [adata, setaData] = useState(null)

  useEffect(() => {
    setLoading(true)
    const sendData = async () => {
      const res = await fetch('http://localhost:8000/appointments/patient',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer :${authCtx.token}`
          }
        })

      const datares = await res.json()

      if (res.status === 200) {
        setaData(datares)
      }
      else {
        setLoading(false)
        alert(datares?.Error)
      }
    }
    sendData()
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    const sendData = async () => {
      // console.log(data)
      const res = await fetch('http://localhost:8000/appointment/create',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer :${authCtx.token}`
          }
        })

      const datares = await res.json();
      // console.log(datares)

      if (res.status === 201) {
        alert(datares?.Message)
      }
      else {
        setLoading(false)
        setData(null)
        alert(datares?.Error)
      }
    }

    if (data !== null)
      sendData()

    setLoading(false)

  }, [data])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdate(true)
    setData(details)
  }

  // console.log(adata)
  return (
    <section className="reviews" id="reviews">

      <div className="heading">
        <span>Appointments</span>
        <h3>Upcoming Appointments</h3>
      </div>

      <div className="box-container">

        {adata === null ? <Loader /> : adata.data.length === 0 ? <div className="box" ><img src={nodata} alt="" /> </div> : adata.data.map((data) => {
          return <div className="box" key={data._id}>
            <img src={apImg} alt="" />
            <h3>Dr . {data.doctor.name}<br></br>{data.doctor.email}</h3>
            <p>Appointment Made On : {data.createdAt.split('T')[0]}<br></br>Date Of Appointment : {data.day.split('T')[0]}<br></br>Time Of Appointment : {data.day.split('T')[1].split('.')[0]} UTC</p>
          </div>
        })}

      </div>

      <section className="about centre-flex" id="about">

        <div className="image">
          <img src={book} alt="" />
        </div>

        <div className="content ">
          <span>Book An Appointment</span>
          <h3>Hassle free method to book appointment online</h3>
          <form onSubmit={submitHandler} id="form">
            <div className="inputBox">
              <p>NAME</p><input type="text" placeholder="Name" name="name" required onChange={changeHandler} />
            </div>
            <div className="inputBox">
              <p>MOBILE NUMBER</p><input type="tel" placeholder="Mobile Number" name="mobile" required onChange={changeHandler} />
            </div>
            <div className="inputBox">
              <p>RESGISTRATION NO.</p><input type="text" placeholder="Doctors Registration Number" name="registrationNumber" required onChange={changeHandler} />
            </div>
            <div className="inputBox">
              <p>DAY</p><input type="datetime-local" placeholder="Date Of Appointment" name="day" required onChange={changeHandler} />
            </div>
            <div className='align-center'>
              <input type="submit" value="Book Appointment" className="btn" />
            </div>
          </form>
        </div>

      </section>

    </section>
  )
}

export default PatientAppointment