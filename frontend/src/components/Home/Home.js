import React from 'react'

import Hero from '../Hero/Hero'
import Search from '../Search/Search'
import Services from '../Services/Services'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../Footer/Footer'
import Testimonials from '../Testimonials/Testimonials'
import CTA from '../CTA/CTA'

const Home = () => {
    return (
        <>
            <Hero />
            <Search />
            <Services />
            <CTA/>
            <WhyChooseUs />
            <Testimonials />
            <Subscribe />
            <Footer />
        </>
    )
}

export default Home