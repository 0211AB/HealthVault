import React from 'react'
import Login from './Login'
import Navigation from '../Navigation/Navigation'

import signinimg from '../../Images/signin.svg'

const Signin = () => {
    return (
        <>
            <Navigation />
            <main>
                <div className="signup-box">
                    <div className="inner-signup-box">
                        <div className="forms-wrap">
                            <Login />
                        </div>

                        <div className="carousel">
                            <div className="images-wrapper">
                                <img src={signinimg} className="image img-1 show" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Signin