import React from 'react'
import Navigation from '../Navigation/Navigation'
import Register from './Register'
import './Signup.css'
import signupimg from '../../Images/signup2.svg'

const Signup = () => {

    return (
        <>
            <Navigation />
            <main>
                <div className="signup-box">
                    <div className="inner-signup-box">
                        <div className="forms-wrap">
                            <Register />
                        </div>

                        <div className="carousel">
                            <div className="images-wrapper">
                                <img src={signupimg} className="image img-2 show" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Signup