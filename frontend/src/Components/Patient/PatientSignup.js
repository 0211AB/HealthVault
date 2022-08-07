import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
import Loader from '../Loader/Loader'
import logo from '../../Images/signup.gif'
import { useState, useContext, useEffect } from 'react'


const PatientSignup = () => {
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
            const res = await fetch('http://localhost:8000/patient/signup',
                {
                    method: 'POST',
                    body: formData
                })

            const datares = await res.json();
            // console.log(datares)

            if (res.status === 201) {
                authCtx.login(datares.tokens[0].token);
                navigate(`/patient/${datares.aadharNumber}`, { state: datares })
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
                    <h3>Signup As Patient</h3>
                    <h4><Link to='/patient/login'>Click Here to login</Link></h4>
                </div>
                <form onSubmit={submitHandler} id="form">
                    <div className="inputBox">
                        <input type="text" placeholder="Name" name="name" required onChange={changeHandler} />
                        <input type="email" placeholder="Email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" name="email" required onChange={changeHandler} />
                    </div>
                    <div className="inputBox">
                        <input type="password" minLength={8} placeholder="Password" name="password" required onChange={changeHandler} />
                        <input type="text" placeholder="Aadhaar Number" name="aadharNumber" required onChange={changeHandler} />
                    </div>
                    <div className="inputBox">
                        <input type="text" placeholder="Male/Female/Other" name="gender" required onChange={changeHandler} />
                        <input type="tel" placeholder="Phone Number" name="mobile" required onChange={changeHandler} />
                    </div>
                    <div className="inputBox">
                        <input type="text" placeholder="Address" name="address" required onChange={changeHandler} />
                        <input type="file" placeholder="Upload profile picture" accept="image/bmp, image/jpeg, image/png" name="image" required onChange={changeHandler} />
                    </div>
                    <div className="inputBox">
                        <input type="date" placeholder="Date Of Birth" name="dob" required onChange={changeHandler} />
                    </div>
                    <div className='align-center'>
                        <input type="submit" value="SignUp" className="btn" />
                    </div>
                </form>
            </div>

        </section>
    )
}

export default PatientSignup