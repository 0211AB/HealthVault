import React, { useContext, useState, useEffect } from 'react'
import { formToJSON } from 'axios'
import './UpdateForm.css'
import CloudinaryWidget from "../../Cloudinary/CloudinaryWidget"
import AuthContext from '../../../store/AuthContext'
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

const UpdateForm = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const authCtx = useContext(AuthContext)
    const toast = useToast()

    const submitHandler = (e) => {
        e.preventDefault();
        setData(formToJSON(new FormData(document.getElementById('update-doctor-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const updateData = async () => {
            console.log(data.Timing)
            var request = {};
            if (data.Mobile !== "")
                request = { ...request, Mobile: data.Mobile }
            if (data.College !== "")
                request = { ...request, College: data.College }
            if (data.Experience !== "")
                request = { ...request, Experience: data.Experience }
            if (data.Fees !== "")
                request = { ...request, Fees: data.Fees }
            if (data.Location !== "")
                request = { ...request, Location: data.Location }
            if (data.Timing !== undefined)
                request = { ...request, Timing: data.Timing }
            if (document
                .getElementById("uploadedimage")
                .getAttribute("src") !== null)
                request = {
                    ...request, Photo: document
                        .getElementById("uploadedimage")
                        .getAttribute("src")
                }

            if (Object.keys(request).length === 0) {
                toast({
                    title: 'Please Enter Some Data To Update.',
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
                setData(null)
                setLoading(false)
                return;
            }

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}doctor/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer : ${authCtx.token}`
                },
                body: JSON.stringify(request)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Updating Account.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Account Updated.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }

            setData(null)
            setLoading(false)
        };

        updateData();
        // eslint-disable-next-line
    }, [data])


    return (
        <form autoComplete="off" id="update-doctor-form" className="sign-up-form update-form" onSubmit={submitHandler}>

            <div className="heading">
                <h2>EDIT YOUR PROFILE</h2>
            </div>
            <br></br>
            {loading === true ? <div className="loading-wrap input-wrap">
                <Spinner
                    thickness='5px'
                    speed='1s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </div> : <div className="actual-form">
                <div className="input-wrap">
                    <input
                        type="text"
                        name="Mobile"
                        className="input-field"
                        autoComplete="off"
                        pattern="^[0-9\b]+$"
                        minLength={10}
                        maxLength={10}
                    />
                    <label className='label'>Mobile</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="College"
                    />
                    <label className='label'>College</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Location"
                    />
                    <label className='label'>Clinic Location</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Experience"
                    />
                    <label className='label'>Years Of Experience</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Fees"
                    />
                    <label className='label'>Fees Per Consultation</label>
                </div>

                <div className="input-wrap">
                    <select defaultValue="0" name="Timing" id="speciality">
                        <option value="0" disabled>Choose Clinic Timings</option>
                        <option value="7:00 A.M-12:00 P.M">7:00 A.M-12:00 P.M</option>
                        <option value="12:00 P.M-5:00 P.M">12:00 P.M-5:00 P.M</option>
                        <option value="5:00 P.M-10:00 P.M">5:00 P.M-10:00 P.M</option>
                    </select>
                </div>
                <CloudinaryWidget />

                <input type="submit" value="UPDATE" className="sign-btn" />
            </div>}
            <br></br>
        </form>
    )
}

export default UpdateForm