import React from 'react'
import "../../styles/Header.css"
import logo from "../../images/lamar.jpg"
function Header() {
    return (
        <>
    
            <section className="header">
                <div className="container" >
                    <div className="image">
                   <img src={logo} alt="logo" className="logo"/>

                    </div>
                    <ul className="main-nav">
                        <li><a href="#hijab">Hijab</a></li>
                        <li><a href="#shalat">Shalat</a></li>
                        <li><a href="#hijab">Shalat</a></li>
                    </ul>
                </div>
            </section>
           
        </>
    )
}

export default Header
