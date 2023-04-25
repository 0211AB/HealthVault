import React from 'react'
import './Services.css'

const Services = () => {
    return (
        <section className='what-we-provide'>
            <div className='w-info-box w-info-box1'>
                <div className='w-info-icon'>
                    <ion-icon name="bandage"></ion-icon>
                </div>
                <div className='w-info-text'>
                    <strong>Management</strong>
                    <p>  Manage appointments, medications <br></br>and other health-info</p>
                </div>
            </div>
            <div className='w-info-box w-info-box2'>
                <div className='w-info-icon'>
                    <ion-icon name="ribbon"></ion-icon>
                </div>
                <div className='w-info-text'>
                    <strong>Tracking</strong>
                    <p>Keep track of your medical history <br></br>and other health metrics</p>
                </div>
            </div>
            <div className='w-info-box w-info-box3'>
                <div className='w-info-icon'>
                    <ion-icon name="pulse"></ion-icon>
                </div>
                <div className='w-info-text'>
                    <strong>Information</strong>
                    <p>Access trusted health information and resources</p>
                </div>
            </div>
        </section>)
}

export default Services