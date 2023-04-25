import React, { useState, useContext, useEffect } from 'react'
import CloudinaryWidget from "../../Cloudinary/CloudinaryWidget"
import { formToJSON } from 'axios'
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
        setData(formToJSON(new FormData(document.getElementById('update-user-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const updateData = async () => {
            var request = {};
            if (data.Mobile !== "")
                request = { ...request, Mobile: data.Mobile }
            if (data.Address !== "")
                request = { ...request, Address: data.Address }
            if (data.Dob !== "")
                request = { ...request, Dob: data.Dob }
            if (data.BloodGroup !== "")
                request = { ...request, BloodGroup: data.BloodGroup }
            if (data.IdentificationMark !== "")
                request = { ...request, IdentificationMark: data.IdentificationMark }
            if (data.Weight !== "")
                request = { ...request, Weight: data.Weight }
            if (data.Height !== "")
                request = { ...request, Height: data.Height }
            if (data.FamilyHistory !== "")
                request = { ...request, FamilyHistory: data.FamilyHistory }
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

            console.log(request)

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}user/update`, {
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
        <form action="" autoComplete="off" id="update-user-form" className="sign-up-form update-form" onSubmit={submitHandler}>

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
                /></div> : <div className="actual-form">
                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Mobile"
                    />
                    <label className='label'>Mobile</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        name="Address"
                        className="input-field"
                        autoComplete="off"
                    />
                    <label className='label'>Address</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="date"
                        name="Dob"
                        className="input-field"
                        autoComplete="off"
                    />
                    <label className='label'>Date Of Birth</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="BloodGroup"
                    />
                    <label className='label'>Blood Group</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        name="IdentificationMark"
                        className="input-field"
                        autoComplete="off"
                    />
                    <label className='label'>Identification Marks</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Weight"
                    />
                    <label className='label'>Weight (in kg)</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        name="Height"
                    />
                    <label className='label'>Height (in cm)</label>
                </div>

                <div className="input-wrap">
                    <input
                        type="text"
                        name="FamilyHistory"
                        className="input-field"
                        autoComplete="off"
                    />
                    <label className='label'>Family Medical History</label>
                </div>

                <CloudinaryWidget />

                <input type="submit" value="UPDATE" className="sign-btn" />
            </div>}
            <br></br>
        </form>
    )
}

export default UpdateForm