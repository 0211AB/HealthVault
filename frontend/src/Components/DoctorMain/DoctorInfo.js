import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Store/auth-context'
import Loader from '../Loader/Loader'

const DoctorInfo = () => {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/api/doctor/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer :${authCtx.token}`
          }
        })

      const doc = await res.json();
      // // console.log(patient)
      //   console.log(doc.college)
      setData(doc)
      setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    //setLoading(true)
    const fetchImage = async () => {
      const res = await fetch(`http://localhost:8000/api/getimage/${data.photo}`,
        {
          method: 'GET'
        })

      setUrl(res.url)
      setLoading(false)
    }

    if (data !== null)
      fetchImage()
  }, [data])

  return loading ? (<Loader></Loader>) : (
    <><section className="category" id="category">

      <div className="heading">
        <h3>Doctor details</h3>
      </div>

      <div className="heading">
        {url === "" ? <Loader /> : <img src={url} />}
      </div>

      <div className="box-container">

        <div className="box">
          <h3>Name</h3>
          <p>{data.name}</p>
        </div>

        <div className="box">
          <h3>Registration Number</h3>
          <p>{data.registrationNumber}</p>
        </div>
        <div className="box">
          <h3>Address</h3>
          <p>{data.address}</p>
        </div>

        <div className="box">
          <h3>Email</h3>
          <p>{data.email}</p>
        </div>

        <div className="box">
          <h3>Gender</h3>
          <p>{data.gender}</p>
        </div>

        <div className="box">
          <h3>Mobile Number</h3>
          <p>{data.mobile}</p>
        </div>

        {data.cityofPractice !== undefined ? <div className="box">
          <h3>City Of Practice</h3>
          <p>{data.cityofPractice}</p>
        </div> : <></>}

        {data.clinics !== undefined ? <div className="box">
          <h3>Clinics</h3>
          <p>{data.clinics}</p>
        </div> : <></>}

        {data.speciality !== undefined ? <div className="box">
          <h3>Speciality</h3>
          <p>{data.speciality}</p>
        </div> : <></>}

        {data.gradYear !== undefined ? <div className="box">
          <h3>Graduation Year</h3>
          <p>{data.gradYear}</p>
        </div> : <></>}

        {data.college !== undefined ? <div className="box">
          <h3>Medical College</h3>
          <p>{data.college}</p>
        </div> : <></>}


      </div>



    </section></>
  )
}

export default DoctorInfo