import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from "../Footer/Footer"
import { formToJSON } from 'axios'

import AuthContext from '../../store/AuthContext'
import { useToast, Spinner } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const Appointment = () => {
    var now = new Date();
    const minDate = now.toISOString().substring(0, 10)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const authCtx = useContext(AuthContext)
    const [appData, setAppData] = useState(null)
    const toast = useToast()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault();
        setAppData(formToJSON(new FormData(document.getElementById('appointment-form'))))
    }

    useEffect(() => {
        if (appData === null) return;
        setLoading(true)

        const bookAppointment = async () => {
            var request = {};
            if (appData.Day !== "")
                request = { ...request, Day: appData.Day }
            if (appData.Timing !== undefined)
                request = { ...request, Timing: appData.Timing }

            request = { ...request, DoctorID: data.HealthCareID, DName: data.Name }

            if (Object.keys(request).length !== 4) {
                toast({
                    title: 'Please Enter Appropriate Data.',
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
                setAppData(null)
                setLoading(false)
                return;
            }

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}appointment/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(request)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Creating Appointment.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setAppData(null)
            }
            else {
                toast({
                    title: 'Appointment Created.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                setLoading(false)
                setAppData(null)
            }
        }

        bookAppointment();

        // eslint-disable-next-line
    }, [appData])

    useEffect(() => {
        if (data !== null) return;

        const getAll = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/doctorDetails/${location.search.split("=")[1]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                }
            });

            const res_data = await res.json()

            console.log(res_data)

            if (res.status === 404) {
                toast({
                    title: 'Error Loading Data.',
                    description: 'Please Try Again',
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

        getAll();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navigation />
            {loading || data === null ? <div className="loading-wrap details-wrap">
                <Spinner
                    thickness='5px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div> : <>
                <section id="our_story">

                    <div className="our-story-img">
                        <img src={data.Photo} alt="Doctor" />
                    </div>
                    <div className="our-stroy-text">
                        <h2>{data.Name}</h2>
                        <p><strong>EMAIL </strong> : {data.Email}</p>
                        <p><strong>ADDRESS </strong> : {data.Address}</p>
                        <p><strong>GRADUATION FROM </strong> : {data?.College?.toUpperCase()}</p>
                        <div className="story-numbers-container">
                            <div className="story-numbers-box s-n-box1">
                                <strong>{data.Speciality}</strong>
                                <span>SPECIALITY</span>
                            </div>
                            <div className="story-numbers-box s-n-box2">
                                <strong>CLINIC</strong>
                                <span>{data.Location}</span>
                            </div>
                            <div className="story-numbers-box s-n-box3">
                                <strong>{data.HealthCareID}</strong>
                                <span>HEALTHCARE ID</span>
                            </div>
                            <div className="story-numbers-box s-n-box4">
                                <strong>TIMIMGS</strong>
                                <span>{data.Timing}</span>
                            </div>
                            <div className="story-numbers-box s-n-box2">
                                <strong>{data.Experience}</strong>
                                <span>YEARS OF EXPERIENCE</span>
                            </div>
                            <div className="story-numbers-box s-n-box4">
                                <strong>Rs. {data.Fees}</strong>
                                <span>CONSULTANCY FEES</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="our_story" className='appointment-container'>
                    <form action="" id="appointment-form" autoComplete="off" className="sign-up-form update-form" onSubmit={submitHandler}>

                        <div className="heading">
                            <h2>BOOK AN APPOINTMENT</h2>
                        </div>
                        <br></br>
                        <div className="actual-form">

                            <div className="input-wrap">
                                <input type="date" name="Day" min={minDate} required />
                                <label className='label'>Choose Date</label>
                            </div>

                            <div className="input-wrap">
                                <select defaultValue="0" name="Timing" id="speciality" required>
                                    <option value="0" disabled>Choose Timing</option>
                                    <option value="7:00 A.M-12:00 P.M">7:00 A.M-12:00 P.M</option>
                                    <option value="12:00 P.M-5:00 P.M">12:00 P.M-5:00 P.M</option>
                                    <option value="5:00 P.M-10:00 P.M">5:00 P.M-10:00 P.M</option>
                                </select>
                            </div>
                            <input type="submit" value="Book Appointment" className="sign-btn" />
                        </div>
                        <br></br>
                    </form>
                </section>
            </>
            }
            <Footer />
        </>
    )
}

export default Appointment