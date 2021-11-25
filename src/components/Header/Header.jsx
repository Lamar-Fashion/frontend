import React from 'react'
import "../../header-styles/Header.css"
import logo from "../../images/logonew.png"
function Header() {
    return (
        <>
    
            <section className="header">
                <div className="container" >
                    

                    <div className="image">
                   <img src={logo} alt="logo" className="logo"/>
                   <div>
                       <input type="email" name="" id="" />
                   </div>

                    </div>
                    <ul className="main-nav">
                        <li><a href="#hijab">Hijab</a></li>
                        <li><a href="#shalat">Shalat</a></li>
                        <li><a href="#hijab">Shalat</a></li>
                        <li><a href="#hijab">Hijab</a></li>
                        <li><a href="#shalat">Shalat</a></li>
                        
                    </ul>
                </div>
            </section>
           
        </>
    )
}

export default Header
