import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { BsFillPersonFill, BsCardHeading, BsCalendarDateFill, BsGenderAmbiguous, BsEnvelopeFill } from 'react-icons/bs'
import AuthContext from '../../Store/auth-context'
import Loader from '../Loader/Loader'

const DoctorUpdate = () => {
  let formData;
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [fdata, setFData] = useState(null)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    // setLoading(true)
    const sendData = async () => {
      formData = new FormData(document.getElementById('form'))
      formData.append('image', fdata);

      const res = await fetch(`http://localhost:8000/doctor/update/${data.registrationNumber}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': `Bearer :${authCtx.token}`
          }
        })

      const datares = await res.json();

      if (res.status === 200) {
        navigate(`/doctor/${datares.registrationNumber}`)
      }
      else {
        // setLoading(false)
        setData(null)
        alert(datares?.Message)
      }
    }

    if (fdata !== null)
      sendData()

    // setLoading(false)

  }, [update])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/doctor/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer :${authCtx.token}`
          }
        })

      const patient = await res.json();
      // console.log(patient)
      setData(patient)
      setLoading(false)
    }

    fetchData()
  }, [])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdate(true)
    setFData(e.target.image.value)
  }

  return loading ? (<Loader></Loader>) : (
    <>
      <div className="heading top-margin">
        <h3>update doctor details</h3>
      </div>
      {data === null ? <Loader /> : <section className="info-container">
        <div className="box">
          <i className="fas fa-user-graduate"><BsFillPersonFill /></i>
          <div className="info">
            <h3>Name</h3>
            <p>{data.name}</p>
          </div>
        </div>

        <div className="box">
          <i className="fas fa-laptop-code"><BsCardHeading /></i>
          <div className="info">
            <h3>Registration Number</h3>
            <p>{data.registrationNumber}</p>
          </div>
        </div>

        <div className="box">
          <i className="fas fa-book"><BsGenderAmbiguous /></i>
          <div className="info">
            <h3>Gender</h3>
            <p>{data.gender}</p>
          </div>
        </div>

        <div className="box">
          <i className="fas fa-book"><BsEnvelopeFill /></i>
          <div className="info">
            <h3>Email ID</h3>
            <p>{data.email}</p>
          </div>
        </div>
      </section>}

      <div className="content content-update">
        <form onSubmit={submitHandler} id="form">
          <div className="inputBox">
            <input type="text" placeholder="City Of Practice" name="cityofPractice" onChange={changeHandler} />
            <input type="text" placeholder="Clinincs" name="clinics" onChange={changeHandler} />
          </div>
          <div className="inputBox">
            <input type="text" placeholder="Speciality" name="speciality" onChange={changeHandler} />
            <input type="text" placeholder="Year Of Graduation" name="gradYear" onChange={changeHandler} />
          </div>
          <div className="inputBox">
            <input type="text" placeholder="Name Of College" name="college" onChange={changeHandler} />
            <input type="file" placeholder="Upload profile picture" accept="image/bmp, image/jpeg, image/png" name="image" onChange={changeHandler} />
          </div>
          <div className='align-center'>
            <input type="submit" value="Update Details" className="btn" />
          </div>
        </form>
      </div></>
  )
}

export default DoctorUpdate