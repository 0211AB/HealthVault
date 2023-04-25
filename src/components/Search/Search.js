import React from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    return (
        <div className='appointment-search-container'>
            <h3>Find Best Healthcare</h3>
            <div className='appointment-search'>
                <div className='appo-search-box'>
                    <ion-icon name="search"></ion-icon>
                    <input type="text" placeholder='Search Doctor Here'></input>
                </div>
                <div className='appo-search-box'>
                    <ion-icon name="location"></ion-icon>
                    <input type="text" placeholder='Search Location Here'></input>
                </div>
                <button onClick={() => { navigate(`/search-doctor`) }}>
                    <ion-icon name="search"></ion-icon>
                </button>
            </div>
        </div>
    )
}

export default Search