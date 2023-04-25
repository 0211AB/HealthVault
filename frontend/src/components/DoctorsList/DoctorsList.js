import React, { useEffect, useRef, useState } from 'react'
import "./DoctorsList.css"
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import noData from "../../Images/nodata.svg"

import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const DoctorsList = () => {
    const [data, setData] = useState(null)
    const [query, setQuery] = useState(null)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const toast = useToast()
    const nameRef = useRef(null)
    const locationRef = useRef(null)
    const specRef = useRef(null)
    const timeRef = useRef(null)

    const handleSubmit = () => {
        setQuery({
            Name: nameRef?.current?.value,
            Location: locationRef?.current?.value,
            Time: timeRef?.current?.value,
            Speciality: specRef?.current?.value,
        })
        setLoading(true)
    }

    useEffect(() => {
        if (data !== null) return;

        const getAll = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}doctor/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const res_data = await res.json()

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
                setCount(res_data.length)
            }

            setLoading(false)
        };

        getAll();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (query === null) return;

        const getQuery = async () => {
            var body = {};
            if (query.Name !== "")
                body = { ...body, Name: query.Name }
            if (query.Location !== "")
                body = { ...body, Location: query.Location }
            if (query.Time !== "0")
                body = { ...body, Time: query.Time }
            if (query.Speciality !== "0")
                body = { ...body, Speciality: query.Speciality }


            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}doctor/query`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });

            const res_data = await res.json()

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
                setCount(res_data.length)
                setQuery(null)
                setCurrentPage(1)
            }

            setLoading(false)
        };

        getQuery();

        // eslint-disable-next-line
    }, [query])

    return (
        <>
            <Navigation />
            <section id="our-team">
                <div className="our-team-heading">
                    <h3>Meet Our Doctors</h3>
                    <p>For patients who are seeking high-quality medical care and want to learn more about the physicians who can provide that care.</p>
                </div>

                {loading ?
                    <div className="data-wrap">
                        <Spinner
                            thickness='5px'
                            speed='1s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div> : <>
                        <div className='appointment-search-container doctor-filter-container'>
                            <h3>Filters</h3>
                            <div className='appointment-search doctor-filter'>
                                <div className='appo-search-box'>
                                    <ion-icon name="search"></ion-icon>
                                    <input type="text" placeholder='Search Doctor Here' ref={nameRef}></input>
                                </div>
                                <div className='appo-search-box'>
                                    <ion-icon name="location"></ion-icon>
                                    <input type="text" placeholder='Search Location Here' ref={locationRef}></input>
                                </div>
                                <div className='appo-search-box'>

                                    <select defaultValue="0" name="speciality" id="speciality" ref={specRef}>
                                        <option value="0" disabled>Choose A Speciality</option>
                                        <option value="ENT">ENT</option>
                                        <option value="EYE">EYE</option>
                                        <option value="SKIN">SKIN</option>
                                        <option value="HEART">HEART</option>
                                        <option value="WOMEN">WOMEN</option>
                                        <option value="CHILD">CHILD</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                                <div className='appo-search-box'>

                                    <select defaultValue="0" name="speciality" id="speciality" ref={timeRef}>
                                        <option value="0" disabled>Choose Clinic Timings</option>
                                        <option value="7:00 A.M-12:00 P.M">7:00 A.M-12:00 P.M</option>
                                        <option value="12:00 P.M-5:00 P.M">12:00 P.M-5:00 P.M</option>
                                        <option value="5:00 P.M-10:00 P.M">5:00 P.M-10:00 P.M</option>
                                    </select>
                                </div>
                                <button onClick={handleSubmit}>
                                    <ion-icon name="search"></ion-icon>
                                </button>
                            </div>
                        </div>

                        <div className="team-box-container">
                            {data.length === 0 ?
                                <div className='no-data-box'>
                                    <h3>No Doctors Found</h3>
                                    <p>Please Try Agin With Other Filters</p>
                                    <img src={noData} alt="No Data" className='no-data-img' />
                                </div>
                                : data.slice((currentPage - 1) * 12, (currentPage - 1) * 12 + 12).map((d, idx) => {
                                    return <div className="team-box" key={idx}>
                                        <div className="team-img">
                                            <img src={d.Photo} alt={d.Photo} loading="lazy" />
                                        </div>
                                        <div className="team-text">
                                            <strong>Dr . {d.Name}</strong>
                                            <span>ID : {d.HealthCareID}</span>
                                            <span>{d.Speciality} SPECIALIST</span>
                                            <br></br>
                                            <Link to={`/appointment?id=${d._id}`} className='nav-appointment-btn team-text-btn'>View Details</Link>
                                        </div>
                                    </div>
                                })}

                        </div>
                        <br></br>
                        <div className='btn-container'>
                            {currentPage > 1 && <button className='nav-appointment-btn' onClick={() => { setCurrentPage(page => page - 1) }}>&laquo; Previous</button>}
                            {currentPage < count / 12 && <button className='nav-appointment-btn' onClick={() => { setCurrentPage(page => page + 1) }}>Next &raquo;</button>}
                        </div></>}
            </section>
            <Footer />
        </>
    )
}

export default DoctorsList