import React from 'react'
import './PatientInfo.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Store/auth-context'
import Loader from '../Loader/Loader'

const PatientInfo = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/patient/profile`,
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

    // console.log(data.height)

    return loading ? (<Loader></Loader>) : (
        <><section className="category" id="category">

            <div className="heading">
                <h3>Patient details</h3>
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
                    <h3>Aadhar Number</h3>
                    <p>{data.aadharNumber}</p>
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

                <div className="box">
                    <h3>Date Of Birth</h3>
                    <p>{data.dob.split('T')[0]}</p>
                </div>

                <div className="box">
                    <h3>Email</h3>
                    <p>{data.email}</p>
                </div>

                {data.bloodGroup !== undefined ? <div className="box">
                    <h3>Blood Group</h3>
                    <p>{data.bloodGroup}</p>
                </div> : <></>}

                {data.height !== undefined ? <div className="box">
                    <h3>Height</h3>
                    <p>{data.height} cm</p>
                </div> : <></>}

                {data.weight !== undefined ? <div className="box">
                    <h3>Weight</h3>
                    <p>{data.weight} kg</p>
                </div> : <></>}

                {data.identifcationMark !== undefined ? <div className="box">
                    <h3>Identifcation Mark</h3>
                    <p>{data.identifcationMark}</p>
                </div> : <></>} 

                {data.familyHistory !== undefined ? <div className="box">
                    <h3>Family History</h3>
                    <p>{data.familyHistory}</p>
                </div> : <></>}


            </div>



        </section></>
    )
}

export default PatientInfo