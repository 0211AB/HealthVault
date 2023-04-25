import React from 'react'
import "./Subscribe.css"

const Subscribe = () => {
  return (
    <section id="subscribe">
        <h3>Subscribe For News Updates From HealthVault</h3>
        <form className='subscribe-box'>
            <input type="email" placeholder='example@email.com'></input>
            <button>Subscribe</button>
        </form>
    </section>
  )
}

export default Subscribe