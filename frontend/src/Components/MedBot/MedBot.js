import React from 'react'
import './MedBot.css'

const MedBot = () => {
    return (
        <section className='med-sec'>
            <h1 className='centered'>AI POWERED MEDICAL BOT</h1>
            <div id="map" >
                <iframe title='chatbox' src='https://dodxtx.shinyapps.io/EMSC/'> </iframe>
            </div>
        </section>
    )
}

export default MedBot