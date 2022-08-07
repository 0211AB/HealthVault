import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
import './DoctorLogin.css'
import Loader from '../Loader/Loader'
import logo from '../../Images/login.gif'
import { useState, useContext, useEffect } from 'react'


const DoctorLogin = () => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext);
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        aadharNumber: ""
    })

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const sendData = async () => {
            const res = await fetch('http://localhost:8000/doctor/login',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            const datares = await res.json();

            if (res.status === 200) {
                authCtx.login(datares.tokens[0].token);
                navigate(`/doctor/${datares.registrationNumber}`)
            }
            else {
                setLoading(false)
                setData(null)
                alert(`Incorrect Credentials.Please Try Again!!`)
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
        setData({
            email: details.email,
            password: details.password
        })
    }
    return loading ? (<Loader></Loader>) : (

        <section className="home centre-flex" id="home">

            <div className="image">
                <img src={logo} className='animate' alt="" />
            </div>


            <div className="content">
                <div className="heading">
                    <h3>Login As Doctor</h3>
                    <h4><Link to='/doctor/signup'>Click Here to signup</Link></h4>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="inputBox">
                        <input type="text" placeholder="Name" name="name" required onChange={changeHandler} />
                        <input type="email" placeholder="Email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" name="email" required onChange={changeHandler} />
                    </div>
                    <div className="inputBox">
                        <input type="password" minLength={8} placeholder="Password" name="password" required onChange={changeHandler} />
                        <input type="text" placeholder="Registration Number" name="registrationNumber" required onChange={changeHandler} />
                    </div>
                    <div className='align-center'>
                        <input type="submit" value="Login" className="btn" />
                    </div>
                </form>
            </div>

        </section>
    )
}

export default DoctorLogin