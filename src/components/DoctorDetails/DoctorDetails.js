import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import "./DoctorDetails.css"

import UpdateForm from './UpdateForm/UpdateForm'
import Appointments from './Appointments/Appointments'
import Details from './Details/Details'
import Prescriptions from './Prescriptions/Prescriptions'

import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import AuthContext from '../../store/AuthContext'

const DoctorDetails = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const authCtx = useContext(AuthContext)
  const toast = useToast()

  useEffect(() => {
    if (data !== null) return;
    setLoading(true)
    const docDetails = async () => {

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}doctor/details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${authCtx.token}`
        }
      });

      const res_data = await res.json()

      if (res.status !== 200) {
        toast({
          title: 'Error Loading Account Data.',
          description: "Please Try Again",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        setData(res_data)
      }

      setLoading(false)
    };

    docDetails();
    // eslint-disable-next-line
  }, [data])

  return (
    <>
      <Navigation />
      {loading || data===null ? <div className="loading-wrap details-wrap">
        <Spinner
          thickness='5px'
          speed='1s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div> :
        <>
          <section id="our_story">

            <div className="our-story-img">
              <img src={data.Photo} alt="Doctor"/>
            </div>
            <div className="our-stroy-text">
              <h2>{data.Name}</h2>
              <p>{data.Location.toUpperCase()} : {data.Timing}</p>
              <div className="story-numbers-container">
              <div className="story-numbers-box s-n-box1">
                  <strong>{data.Mobile}</strong>
                  <span>PHONE NUMBER</span>
                </div>
                <div className="story-numbers-box s-n-box3">
                  <strong>{data.HealthCareID}</strong>
                  <span>HEALTHCARE ID</span>
                </div>
                <div className="story-numbers-box s-n-box2">
                  <strong>{data.Speciality}</strong>
                  <span>SPECIALITY</span>
                </div>
                <div className="story-numbers-box s-n-box4">
                  <strong>Rs. {data.Fees}</strong>
                  <span>FEES</span>
                </div>

              </div>
            </div>
          </section>
          <section id="our-team">
            <div className='btn-container details-btn-container'>
              <button className='nav-appointment-btn' onClick={() => {
                setPage(1)
              }}> EDIT PROFILE </button>
              <button className='nav-appointment-btn ' onClick={() => {
                setPage(2)
              }}> UPCOMING APPOINTMENTS </button>
              <button className='nav-appointment-btn ' onClick={() => {
                setPage(3)
              }}> GET PATIENT DETAILS </button>
              <button className='nav-appointment-btn ' onClick={() => {
                setPage(4)
              }}> CREATE PRESCRIPTION </button>
            </div>
          </section>
        </>
      }
      {page === 1 && !loading && <UpdateForm />}
      {page === 2 && !loading && <Appointments />}
      {page === 3 && !loading && <Details email={data.Email}/>}
      {page === 4 && !loading && <Prescriptions name={data.Name}/>}
      <Footer />
    </>
  )
}

export default DoctorDetails