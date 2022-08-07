import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'
import { FaBars } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { GiHealthNormal } from 'react-icons/gi'

const Header = () => {

    const [navClasses, setnavClasses] = useState('header')
    const [isOpen, setisOpen] = useState('false')

    const clickHandler = () => {
        setisOpen(!isOpen)
        if (isOpen) {
            setnavClasses('header active')
        }
        else
            setnavClasses('header')
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
                    <Link to='/'> <i></i> Home </Link>
                    <Link to='/doctor/login'> <i></i> Doctors </Link>
                    <Link to='/patient/login'> <i></i> Patients</Link>
                    <Link to='/med-bot'> <i></i> Medical Bot </Link>
                    <Link to='/facilities'> <i></i> Nearby Facilities</Link>
                    <Link to='/contact'> <i></i> Contact Us </Link>
                </nav>
            </header>
        </>
    )
}

export default Header