import { formToJSON } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import AuthContext from '../../store/AuthContext'

const Login = () => {
    const [role, setRole] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        setData(formToJSON(new FormData(document.getElementById('signin-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const login = async () => {

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${role === 1 ? `doctor` : `user`}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const res_data = await res.json()

            if (res.status !== 200) {

                toast({
                    title: 'Error Signing in to Account.',
                    description: res_data.Message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Signed In Sucessfuly.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })


                if (role === 1) {
                    authCtx.login(res_data.token, "doctor", res_data.ID);
                    navigate(`/doctor/${res_data.ID}`)
                }
                else {
                    authCtx.login(res_data.token, "patient", res_data.ID);
                    navigate(`/patient/${res_data.ID}`)
                }
            }

            setLoading(false)
        };

        login();
        // eslint-disable-next-line
    }, [data])

    return (
        <form id="signin-form" autoComplete="off" className="sign-in-form" onSubmit={submitHandler}>
            <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registred yet? </h6>
                <Link to='/signup' className="toggle">Sign up</Link>
            </div>

            {loading ?
                <div className="loading-wrap input-wrap">
                    <Spinner
                        thickness='5px'
                        speed='1s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div> : <div className="actual-form">
                    <div className="input-wrap">
                        <div className="checkbox-inputs">
                            <h4>Select Your Role </h4>
                            <br></br>
                            <div className='checkbox'>
                                <input type="radio" id="doctor-radio" defaultChecked value='doctor' onClick={(e) => {
                                    setRole(1);
                                    const radioButton = document.getElementById("doctor-radio");
                                    const radioButton2 = document.getElementById("patient-radio")
                                    radioButton.checked = true
                                    radioButton2.checked = false
                                }} />
                                <h6>Doctor</h6>
                            </div>
                            <div className='checkbox'>
                                <input type="radio" id="patient-radio" value='patient' onClick={(e) => {
                                    setRole(2);
                                    const radioButton = document.getElementById("doctor-radio");
                                    const radioButton2 = document.getElementById("patient-radio")
                                    radioButton.checked = false
                                    radioButton2.checked = true
                                }} />
                                <h6>Patient</h6>
                            </div>
                        </div>
                    </div>

                    <div className="input-wrap">
                        <input
                            type="email"
                            name="Email"
                            className="input-field"
                            autoComplete="off"
                            required
                        />
                        <label className='label'>Email</label>
                    </div>

                    <div className="input-wrap">
                        <input
                            type="password"
                            className="input-field"
                            autoComplete="off"
                            required
                            name="Password"
                        />
                        <label className='label'>Password</label>
                    </div>

                    <input type="submit" value="Sign In" className="sign-btn" />
                </div>}
        </form>
    )
}

export default Login