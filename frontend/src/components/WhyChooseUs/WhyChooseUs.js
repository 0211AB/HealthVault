import React from 'react'
import './WhyChooseUs.css'
import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us">
            <div className='why-choose-us-left'>
                <h3>Why Choose Us</h3>
                <div className='why-choose-us-box-container'>

                    <div className='why-choose-us-box'>
                        <ion-icon name="checkmark"></ion-icon>
                        <div className='why-choose-box-text'>
                            <strong>Personalization</strong>
                            <p> Customized Health Plans and Goals</p>
                        </div>
                    </div>

                    <div className='why-choose-us-box'>
                        <ion-icon name="checkmark"></ion-icon>
                        <div className='why-choose-box-text'>
                            <strong>User-friendly Interface</strong>
                            <p>Easy to Use and Navigate</p>
                        </div>
                    </div>

                    <div className='why-choose-us-box'>
                        <ion-icon name="checkmark"></ion-icon>
                        <div className='why-choose-box-text'>
                            <strong>Comprehensive Health Tracking</strong>
                            <p> Monitor All Aspects of Your Health</p>
                        </div>
                    </div>

                    <div className='why-choose-us-box'>
                        <ion-icon name="checkmark"></ion-icon>
                        <div className='why-choose-box-text'>
                            <strong>Customer Service</strong>
                            <p>Prompt and Effective Assistance</p>
                        </div>
                    </div>
                </div>
                <Link className='why-chose-us-btn' to='/search-doctor'>Make Appointment</Link>
            </div>
            <div className='why-choose-us-right'>
                <h3>Emergency?<br></br>Contact Us</h3>
                <p>Get in touch with us for any questions or concerns you may have regarding our medical website. You can contact us via email, phone, or by filling out our online contact form. We value your feedback and are committed to providing the best possible user experience on our website.</p>
                <div className='w-contact-container'>
                    <div className='w-contact-box'>
                        <ion-icon name="call"></ion-icon>
                        <div className='w-contact-box-text'>
                            <span>Call Us Now</span>
                            <strong> +12 34567890</strong>
                        </div>
                    </div>

                    <div className='w-contact-box'>
                        <ion-icon name="mail"></ion-icon>
                        <div className='w-contact-box-text'>
                            <span>Mail Us</span>
                            <strong>info@healthvault.com</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs