import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { GiHealthNormal } from 'react-icons/gi'
import AuthContext from '../../Store/auth-context'

const PatientSideBar = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const [logout, setLogout] = useState(false)
    const [navClasses, setnavClasses] = useState('header')
    const [isOpen, setisOpen] = useState('false')

    useEffect(() => {

        const logoutF = async () => {
            const res = await fetch(`http://localhost:8000/patient/logout`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer :${authCtx.token}`
                    }
                })

            if (res.status === 200) {
                authCtx.logout()
                navigate('/')
            }
            else
                alert("Unexpected Error Occured!!Please try again later")
        }

        if (logout)
            logoutF()
    }, [logout])

    const clickHandler = () => {
        setisOpen(!isOpen)
        if (isOpen) {
            setnavClasses('header active')
        }
        else
            setnavClasses('header')
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        setLogout(true);
    }
    return (
        <>
            <div id="menu-btn" onClick={clickHandler}>
                {isOpen ? <FaBars className="fas fa-bars"></FaBars> :
                    <ImCross className="fas fa-bars"></ImCross>}
            </div>

            <header className={navClasses}>

                <Link to='/' className="logo">
                    <GiHealthNormal className='logoHt'></GiHealthNormal> HealthVault</Link>

                <nav className="navbar">
                    <Link to={`/patient/${isOpen}`}> <i></i> Profile </Link>
                    <Link to='/patient/update'> <i></i> Update Profile </Link>
                    <Link to='/patient/history'> <i></i> History</Link>
                    <Link to='/patient/appointment'> <i></i> Appointments </Link>
                    <Link to='/' onClick={logoutHandler}> <i></i> Logout</Link>
                </nav>
            </header>
        </>
    )
}

export default PatientSideBar