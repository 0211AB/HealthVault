import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './Facilities.css'

const Facilities = () => {
    var data
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const location = useRef()
    const [url, setUrl] = useState()

    useEffect(() => {

        navigator?.geolocation?.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        });

        async function fetchData() {
            data = await axios.get(`https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${lat}&lon=${lon}&zoom=10`, {
                headers: {
                    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
                    'x-rapidapi-key': '7449b52200msh1221ff45cc1eb7ap10d0c2jsn7f19c18f3385',
                    'Access-Control-Allow-Origin': '*'
                }
            })
        }

        setUrl(`https://maps.google.com/maps/embed/v1/place?q=${data?.data?.display_name || 'Kolkata'}&key=AIzaSyB933ANy5iPjo3MpN9zNYztWeVcqy2KIY8&zoom=15`)

        fetchData();
    }, [lat, lon])

    const changeHandler = () => {
        setUrl(`https://maps.google.com/maps/embed/v1/search?q=hospitals+pharamacies+healthcare+health+urgentcare+medicalcollege+in+${location?.current?.value || data.data.display_name}&key=AIzaSyB933ANy5iPjo3MpN9zNYztWeVcqy2KIY8&zoom=14`)
    }

    return (
        <section className='fac-sec'>
            <h1 className='centered'>Nearby HealthCare Facilities</h1>
            <div id='map'>
                <form>
                    <div className="searchBox">
                        <input type="search" onChange={changeHandler} ref={location} placeholder="Search For Nearby Healthcare Facilities..." id="search-box" />
                    </div>
                </form>
                <iframe title='map' src={url} loading='lazy'></iframe>
            </div>
        </section >
    )
}

export default Facilities