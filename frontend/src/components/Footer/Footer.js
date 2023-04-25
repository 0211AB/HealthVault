import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-company-box'>
                    <Link to='/' className='logo'><span>Health</span> Vault</Link>
                    <p>HealthVault is dedicated to promoting health and wellness and to help individuals improve their overall health.We value our users' privacy and are committed to keeping their personal information secure.</p>

                    <div className='footer-social'>
                        <a href="https://www.facebook.com/abhay.bajaj.319/"><ion-icon name="logo-facebook"></ion-icon></a>
                        <a href="https://www.instagram.com/_abhaybajaj/"><ion-icon name="logo-instagram"></ion-icon></a>
                        <a href="https://twitter.com/Abhay53033159"><ion-icon name="logo-twitter"></ion-icon></a>
                        <a href="https://www.linkedin.com/in/abhay-bajaj-736913207/"><ion-icon name="logo-linkedin"></ion-icon></a>
                    </div>
                </div>

                <div className='footer-link-box'>
                    <strong>Main Links</strong>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/search-doctor'>Appointments</Link></li>
                        <li><Link to='/signup'>Login</Link></li>
                        <li><Link to='/'>Insurance Information</Link></li>
                        <li><Link to='/'>Services</Link></li>
                    </ul>
                </div>

                <div className='footer-link-box'>
                    <strong>Legal and Privacy</strong>
                    <ul>
                        <li><Link to='/'>About Us</Link></li>
                        <li><Link to='/'>Contact Us</Link></li>
                        <li><Link to='/'>Privacy Policy</Link></li>
                        <li><Link to='/'>Terms and Conditions</Link></li>
                        <li><Link to='/'>Medical Disclaimer</Link></li>
                    </ul>
                </div>

                <div className='footer-link-box'>
                    <strong>Explore Our Website</strong>
                    <ul>
                        <li><Link to='/'>Testimonials</Link></li>
                        <li><Link to='/'>Careers</Link></li>
                        <li><Link to='/'>Research and Education</Link></li>
                        <li><Link to='/'>News and Events</Link></li>
                        <li><Link to='/'>Resources</Link></li>
                    </ul>
                </div>
            </div>

            <div className='footer-bottom'>
                <span>Made By Abhay Bajaj</span>
                <span>Copyright 2023 - Abhay Bajaj</span>
            </div>

        </footer>
    )
}

export default Footer