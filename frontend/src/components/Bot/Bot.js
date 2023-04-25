import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import './Bot.css'

const Bot = () => {
    return (
        <>
            <Navigation />
            <section className="med-sec">
                <h1 className="centered">AI POWERED MEDICAL BOT</h1>
                <div id="bot">
                    <iframe title="chatbox" src="https://dodxtx.shinyapps.io/EMSC/">
                    </iframe>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Bot