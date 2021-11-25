import React from 'react'
import hero from "../../../images/hero.jpg"
import "../../../home-styles/hero.css"
function Hero() {
    return (
        <>
        <div className="hero">
        <img src={hero} alt="hero" width="100%" height="100%"/>

        </div>
            
        </>
    )
}

export default Hero
