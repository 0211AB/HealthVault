import React, { useEffect } from 'react'
import "./Testimonials.css"

import tIMg from "../../Images/testimonials-img.png"
import pImg1 from "../../Images/p1.avif"
import pImg2 from "../../Images/p2.avif"

const Testimonials = () => {
    useEffect(() => {

    }, [])
    return (
        <section id="testimonials">
            <div className="testimonials-heading">
                <h3>Our Patients FeedBack About Us</h3>
                <p>Your feedback is important to us as we strive to improve our app and provide the best possible experience for our users. Thank you for taking the time to share your thoughts with us.</p>
            </div>

            <div className="testimonials-content">

                <div className="testimonials-img">
                    <img src={tIMg} alt="" />
                </div>

                <div className="testimonials-box-container">
                    <div className="swiper mySwipertesti">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="testimonials-box">
                                    <div className="t-profile">
                                        <div className="t-profile-img">
                                            <img src={pImg2} alt="" />
                                        </div>
                                        <div className="t-profile-text">
                                            <strong>Rajesh Patel</strong>
                                            <span>Mumbai, Maharashtra</span>
                                            <div className="t-rating">
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <p>"I recently found this website and it has been a lifesaver for me. The information provided is accurate and easy to understand, and the resources have been incredibly helpful in managing my health. I would highly recommend this site to anyone looking for reliable health information."</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="swiper-slide">
                                <div className="testimonials-box">
                                    <div className="t-profile">
                                        <div className="t-profile-img">
                                            <img src={pImg1} alt="" />
                                        </div>
                                        <div className="t-profile-text">
                                            <strong>Anjali Sharma</strong>
                                            <span> New Delhi, Delhi</span>
                                            <div className="t-rating">
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                                <ion-icon name="star"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <p>"As a healthcare professional, I appreciate the quality of the information on this website. I often refer my patients to this site for additional information and resources, and have received positive feedback from them. Thank you for providing such a valuable resource!"</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Testimonials