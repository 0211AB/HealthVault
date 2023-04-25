import { formToJSON } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import AuthContext from '../../store/AuthContext'

const Register = () => {
    const [role, setRole] = useState(1)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        setData(formToJSON(new FormData(document.getElementById('signup-form'))))
    }

    useEffect(() => {
        if (data === null) return;
        setLoading(true)
        const register = async () => {

            var body;

            if (role === 1) {
                const geodata = await fetch(
                    `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${encodeURIComponent(data.Location)}&country=India&accept-language=en`,
                    {
                        headers: {
                            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                            "x-rapidapi-key":
                                "7449b52200msh1221ff45cc1eb7ap10d0c2jsn7f19c18f3385",
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );

                const gData = await geodata.json();
                body = {
                    ...data,
                    Coordinates: [Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lon : 78.92), Number(gData !== undefined && gData[0] !== undefined ? gData[0]?.lat : 20.59)]
                }
            }
            else {
                if (data.Gender === undefined) {
                    toast({
                        title: 'Gender Field is Required.',
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                    })
                    setLoading(false)
                    setData(null)
                    return;
                }

                body = data;
            }

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${role === 1 ? `doctor` : `user`}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });

            const res_data = await res.json()

            if (res.status === 404) {
                toast({
                    title: 'Error Creating Account.',
                    description: res_data.message.split("\"")[1],
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Account created.',
                    description: `${res_data.Message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                if (role === 1) {
                    authCtx.login(res_data.token, "doctor",res_data.ID);
                    navigate(`/doctor/${res_data.ID}`)
                }
                else {
                    authCtx.login(res_data.token, "patient",res_data.ID);
                    navigate(`/patient/${res_data.ID}`)
                }
            }

            setLoading(false)
        };

        register();
        // eslint-disable-next-line
    }, [data])

    return (
        <form autoComplete="off" className="sign-up-form" id="signup-form" onSubmit={submitHandler}>
            <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account? </h6>
                <Link to="/signin" className="toggle">Sign in</Link>
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
                            <h3>Select Your Role </h3>
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
                            type="text"
                            name="Name"
                            className="input-field"
                            autoComplete="off"
                            required
                        />
                        <label className='label'>Name</label>
                    </div>

                    <div className="input-wrap">
                        <input
                            type="text"
                            name="Mobile"
                            className="input-field"
                            autoComplete="off"
                            pattern="^[0-9\b]+$"
                            required
                            minLength={10}
                            maxLength={10}
                        />
                        <label className='label'>Mobile Number</label>
                    </div>

                    <div className="input-wrap">
                        <input
                            type="email"
                            className="input-field"
                            autoComplete="off"
                            required
                            name="Email"
                        />
                        <label className='label'>Email</label>
                    </div>

                    <div className="input-wrap">
                        <input
                            type="password"
                            minLength="8"
                            className="input-field"
                            autoComplete="off"
                            required
                            name="Password"
                        />
                        <label className='label'>Password</label>
                    </div>

                    <div className="input-wrap">
                        <select defaultValue="0" name="Gender" id="gender" required={true}>
                            <option value="0" disabled>Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {role === 1 &&
                        <>
                            <div className="input-wrap">
                                <input
                                    type="text"
                                    className="input-field"
                                    autoComplete="off"
                                    required
                                    name="Address"
                                />
                                <label className='label'>Address</label>
                            </div>

                            <div className="input-wrap">
                                <input
                                    type="text"
                                    className="input-field"
                                    autoComplete="off"
                                    required
                                    name="Location"
                                />
                                <label className='label'>Clinic Location</label>
                            </div>

                            <div className="input-wrap">
                                <select defaultValue="0" name="Timing" id="timing" required>
                                    <option value="0" disabled>Choose Clinic Timings</option>
                                    <option value="7:00 A.M-12:00 P.M">7:00 A.M-12:00 P.M</option>
                                    <option value="12:00 P.M-5:00 P.M">12:00 P.M-5:00 P.M</option>
                                    <option value="5:00 P.M-10:00 P.M">5:00 P.M-10:00 P.M</option>
                                </select>
                            </div>

                            <div className="input-wrap">
                                <select defaultValue="0" name="Speciality" id="speciality" required>
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

                            <div className="input-wrap">
                                <input
                                    type="number"
                                    className="input-field"
                                    autoComplete="off"
                                    required
                                    name="Fees"
                                />
                                <label className='label'>Fees</label>
                            </div>
                        </>}

                    <input type="submit" value="Sign Up" className="sign-btn" />

                    <p className="text">
                        By signing up, I agree to the
                        Terms of Services  and
                        Privacy Policy
                    </p>
                </div>}
        </form>
    )
}

export default Register