import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
import './DoctorLogin.css'
import Loader from '../Loader/Loader'
import logo from '../../Images/signup.gif'
import { useState, useContext, useEffect } from 'react'


const DoctorLogin = () => {
    let formData;
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext);

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const sendData = async () => {
            formData = new FormData(document.getElementById('form'))
            formData.append('image', data);
            // console.log(formData)
            const res = await fetch('http://localhost:8000/doctor/signup',
                {
                    method: 'POST',
                    body: formData
                })

            const datares = await res.json();
            // console.log(datares)

            if (res.status === 201) {
                authCtx.login(datares.tokens[0].token);
                navigate(`/doctor/${datares.registrationNumber}`)
            }
            else {
                setLoading(false)
                setData(null)
                alert(datares?.Message)
            }
        }

        if (data !== null)
            sendData()

        setLoading(false)

    }, [data])

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setData(e.target.image.value)
    }

    return loading ? (<Loader></Loader>) : (

        <section className="home centre-flex" id="home">

            <div className="image">
                <img src={logo} className='animate' alt="" />
            </div>


            <div className="content">
                <div className="heading">
                    <h3>Signup As Doctor</h3>
                    <h4><Link to='/doctor/login'>Click Here to login</Link></h4>
                </div>
                <form onSubmit={submitHandler} id="form">
                    <div className="inputBox">
                        <input type="text" placeholder="Name" name="name" required />
                        <input type="email" placeholder="Email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" name="email" required />
                    </div>
                    <div className="inputBox">
                        <input type="password" minLength={8} placeholder="Password" name="password" required />
                        <input type="text" placeholder="Registration Number" name="registrationNumber" required />
                    </div>
                    <div className="inputBox">
                        <input type="text" placeholder="Male/Female/Other" name="gender" required />
                        <input type="tel" placeholder="Phone Number" minLength={10} maxLength={10} name="mobile" required />
                    </div>
                    <div className="inputBox">
                        <input type="text" placeholder="Address" name="address" required />
                        <input type="file" placeholder="Upload profile picture" name="image" required />
                    </div>
                    <div className='align-center'>
                        <input type="submit" value="SignUp" className="btn" />
                    </div>
                </form>
            </div>

        </section>
    )
}

export default DoctorLogin