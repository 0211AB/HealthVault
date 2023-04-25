import React from "react";
import { useEffect, useState, useRef } from "react";
import "./Facilities.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Facilities = () => {
    var data;
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const location = useRef();
    const [url, setUrl] = useState();

    useEffect(() => {
        navigator?.geolocation?.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });

        async function fetchData() {
            // eslint-disable-next-line 
            data = await fetch(
                `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${lat}&lon=${lon}&zoom=10`,
                {
                    headers: {
                        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                        "x-rapidapi-key":
                            "7449b52200msh1221ff45cc1eb7ap10d0c2jsn7f19c18f3385",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        setUrl(
            `https://maps.google.com/maps/embed/v1/place?q=${data?.data?.display_name || "Kolkata"
            }&key=AIzaSyB933ANy5iPjo3MpN9zNYztWeVcqy2KIY8&zoom=13`
        );

        fetchData();
    }, [lat, lon]);

    const changeHandler = () => {
        setUrl(
            `https://maps.google.com/maps/embed/v1/search?q=hospitals+pharamacies+healthcare+health+urgentcare+medicalcollege+in+${location?.current?.value || data.data.display_name
            }&key=AIzaSyB933ANy5iPjo3MpN9zNYztWeVcqy2KIY8&zoom=14`
        );
    };

    return (
        <>
            <Navigation />
            <section className="fac-sec">
                <section id="subscribe">
                    <h3>Nearby Facilities</h3>
                    <form className='subscribe-box'>
                        <input
                            type="search"
                            onChange={changeHandler}
                            ref={location}
                            placeholder="Search For Nearby Healthcare Facilities..."
                            id="search-box"
                            autoComplete="off"
                        />
                        <button>Search</button>
                    </form>
                </section>

                <div id="map">
                    <iframe title="map" src={url} loading="lazy"></iframe>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Facilities;