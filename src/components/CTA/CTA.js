import React from 'react'
import "./CTA.css"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
    const navigate = useNavigate()
    return (
        <section id="our-services">

            <div className="services-heading">
                <div className="services-heading-text">
                    <strong>Our Services</strong>
                    <h2>High Quality Services For You</h2>
                </div>
                <div className="service-slide-btns">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>

            <div className="services-box-container">

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={
                        {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                    breakpoints={
                        {
                            700: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            }
                        }}
                >
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box1">
                                <ion-icon name="ear"></ion-icon>
                                <strong>ENT Care</strong>
                                <p>ENT care manages conditions including sinusitis, allergies, and ear infections. Prevention includes hygiene practices and ear protection to avoid ENT infections and hearing loss.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box2">
                                <ion-icon name="eye"></ion-icon>
                                <strong>Eye Care</strong>
                                <p>Regular exams, eye protection, contact lens care, healthy diet, and sun protection are essential for maintaining good eye health.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box3">
                                <ion-icon name="body"></ion-icon>
                                <strong>Skin Care</strong>
                                <p>Skin care involves daily cleansing and moisturizing, sun protection, and avoiding smoking and excessive alcohol intake. Treatment options for skin conditions may include medication, lifestyle changes, or medical procedures such as laser therapy or surgery.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box4">
                                <ion-icon name="fitness"></ion-icon>
                                <strong>Heart</strong>
                                <p>Heart care involves managing conditions such as high blood pressure, high cholesterol, and heart disease. Treatment may include medication, lifestyle changes, or surgery such as angioplasty or bypass surgery. Recovery may involve cardiac rehabilitation and ongoing management of risk factors.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box1">
                                <ion-icon name="woman"></ion-icon>
                                <strong>Women</strong>
                                <p>Women's medicine includes reproductive health, breast and cervical cancer screenings, osteoporosis management, and menopause care. Treatment may include medication, lifestyle changes, or medical procedures such as hysterectomy or mastectomy.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box2">
                                <ion-icon name="happy"></ion-icon>
                                <strong>Child Care</strong>
                                <p>Child medicine involves managing conditions such as vaccinations, asthma, allergies, and infectious diseases. Treatment may include medication, lifestyle changes, or medical procedures such as surgery. Prevention includes regular check-ups and good hygiene practices.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-slide">
                            <div className="service-box s-box3">
                                <ion-icon name="ellipsis-horizontal-circle"></ion-icon>
                                <strong>Other</strong>
                                <p>Prevention and early detection are key, as is ongoing management to maintain optimal health.</p>
                                <button onClick={() => { navigate('/search-doctor') }}>Read More</button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <span className="service-btn">Contact Us For Need Any Help And Services <a href="/">Let's get Started</a></span>

        </section >
    )
}

export default CTA