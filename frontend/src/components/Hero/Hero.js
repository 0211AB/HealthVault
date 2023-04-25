import React, { useContext} from 'react'
import Navigation from '../Navigation/Navigation'
import './Hero.css'
import hero_img from "../../Images/hero-img.png"
import { Link } from 'react-router-dom'
import AuthContext from '../../store/AuthContext'


const Hero = () => {
    const authCtx = useContext(AuthContext)
    
    return (
        <section id="hero">
            <Navigation />
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Simplify your healthcare journey with HealthVault</h1>
                    <p>Take control of your healthcare with HealthVault. Securely track your medical history, schedule appointments, and receive personalized health recommendations.
                    </p>
                    <div className='hero-text-btns'>
        
                        <Link to={(authCtx.isLoggedIn === false) || (authCtx.isLoggedIn && authCtx.isDoctor) ? '/signup' : `/patient/${authCtx.id}`}>I am Patient</Link>
                        <Link to={(authCtx.isLoggedIn === false) || (authCtx.isLoggedIn && authCtx.isDoctor === false) ? '/signup' : `/doctor/${authCtx.id}`}>I am Doctor</Link>
                    </div>
                </div>
                <div className="hero-img">
                    <img src={hero_img} alt="Hero"></img>
                </div>
            </div>
        </section>
    )
}

export default Hero