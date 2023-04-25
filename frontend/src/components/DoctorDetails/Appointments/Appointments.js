import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import noData from "../../../Images/nodata.svg"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useToast, Spinner } from '@chakra-ui/react';
import AuthContext from '../../../store/AuthContext';
import "./Appointments.css"

const Appointments = () => {
    const [loading, setLoading] = useState(true)
    const [appData, setAppData] = useState(null)
    const [delData, setDelData] = useState(null)
    const [finData, setFinData] = useState(null)
    const toast = useToast()
    const authCtx = useContext(AuthContext)

    const handleFinish = (e) => { setFinData(e) }
    const handleDelete = (e) => { setDelData(e) }

    useEffect(() => {
        if (appData !== null) return;
        setLoading(true)

        const getUserData = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}appointment/doctor/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Fetching Appointment.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setAppData(null)
            }
            else {
                setLoading(false)
                setAppData(res_data)
            }
        }

        getUserData();

        // eslint-disable-next-line
    }, [appData])

    useEffect(() => {
        if (delData === null) return;
        setLoading(true)

        const deleteAppointment = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}appointment/doctor/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(delData)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Deleting Appointment.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setDelData(null)
            }
            else {
                toast({
                    title: 'Cancelled Appointment',
                    description: res_data.Message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setDelData(null)
                window.location.reload(true)
            }
        }

        deleteAppointment();

        // eslint-disable-next-line
    }, [delData])

    useEffect(() => {
        if (finData === null) return;
        setLoading(true)

        const finishAppointment = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}appointment/doctor/complete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(finData)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Completing Appointment.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setDelData(null)
            }
            else {
                toast({
                    title: 'Finished Appointment',
                    description: res_data.Message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setLoading(false)
                setFinData(null)
            }
        }

        finishAppointment();

        // eslint-disable-next-line
    }, [finData])

    return (
        <section>
            <div className="services-box-container">
                <div className="services-heading-text">
                    <h2>Your Appointments</h2>
                </div>
                {loading || appData === null ? <div className="loading-wrap input-wrap">
                    <Spinner
                        thickness='5px'
                        speed='1s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /></div> : <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={
                            {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                        breakpoints={
                            {
                                700: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                }
                            }}
                    >
                    {appData.length === 0 ? <div className='no-data-box'>
                        <h6>No Upcoming Appointments</h6>
                        <img src={noData} alt="No Data" className='no-data-img' />
                    </div> : appData.map((d, idx) => {
                        return <SwiperSlide key={idx}>
                            <div className="swiper-slide">
                                <div className={`service-box app-box s-box${idx % 4 + 1}`}>
                                    <strong>PATIENT : {d.Name}</strong>
                                    <p>{moment(d.Day).format('MMMM Do YYYY')}</p>
                                    <p>{d.Timing}</p>
                                    <button onClick={() => { handleDelete(d) }}>Cancel <ion-icon id='appointment-icon' name="trash-outline"></ion-icon></button>
                                    <button onClick={() => { handleFinish(d) }}>Finished <ion-icon id='appointment-icon' name="checkmark-done-circle"></ion-icon></button>
                                </div>
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>}
            </div>
        </section >
    )
}

export default Appointments