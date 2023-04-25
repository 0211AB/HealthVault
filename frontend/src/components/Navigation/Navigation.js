import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'
import AuthContext from '../../store/AuthContext'

const Navigation = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <nav className='navigation'>
            <input type="checkbox" className='menu-btn' id='menu-btn' hidden></input>
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='nav-icon'></span>
            </label>
            <Link to='/' className='logo'><span>Health</span>Vault</Link>
            <ul className='menu'>
                {authCtx.isDoctor && authCtx.isLoggedIn && <li><Link to={`/doctor/${authCtx.id}`}>Profile Page</Link></li>}
                {authCtx.isDoctor === false && authCtx.isLoggedIn && <li><Link to={`/patient/${authCtx.id}`}>Profile Page</Link></li>}
                <li><Link to='/search-doctor'>Find A Doctor</Link></li>
                <li><Link to='/facilities'>Nearby Facilities</Link></li>
                <li><Link to='/bot'>Medical Bot</Link></li>
            </ul>

            {authCtx.isLoggedIn ? <button className='nav-appointment-btn' onClick={() => {
                authCtx.logout();
                navigate('/')
            }}>Logout</button> : <Link to='/search-doctor' className='nav-appointment-btn'>Appointment</Link>}
        </nav>
    )
}

export default Navigation