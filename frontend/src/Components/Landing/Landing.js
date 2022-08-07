import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../Images/logo.gif'

const Landing = () => {
    return (
        <section className="home" id="home">

            <div className="image">
                <img src={logo} className='animate' alt="" />
            </div>

            <div className="content">
                <span>Stay Safe , Stay Healthy</span>
                <h3>Health<Link to='/'>Vault</Link></h3>
                <p>To strengthen the accessibility and equity of health services in a holistic healthcare programme approach and support the existing health systems in a ‘citizen-centric’ approach.</p>
                <Link to='/doctor/login' className="btn">Login</Link>
            </div>

        </section>
    )
}

export default Landing