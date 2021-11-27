import React from 'react'
import "../../../home-styles/brand.css"
import lamar from "../../../images/img1-removebg-preview.png"
import mortaha from "../../../images/img2-removebg-preview.png"
import neo from "../../../images/img3-removebg-preview.png"
import shera from "../../../images/img4--removebg-preview.png"
function Brand() {
    return (
        <>
            <section className="brand">
                <div className="title-section">
                <h2 className="main-title">
                    brands 
                </h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus illum vel cupiditate dolorum laborum!</p>

                </div>
                <div className="container">
                    <div className="item1" >
                        <div className="image">
                        <img src={lamar} alt="lamar"/>

                        </div>
                        <h3>lamar
                            
                        </h3>
                    </div>
                    <div className="item2" >
                    <div className="image">
                        <img src={mortaha} alt="mortaha"/>

                        </div>
                        <h3>shera</h3>
                    </div>
                    <div className="item3" >
                    <div className="image">
                        <img src={neo} alt="neo"/>

                        </div>
                        <h3>neo</h3>
                    </div>
                    <div className="item4" >
                    <div className="image">
                        <img src={shera} alt="shera"/>

                        </div>
                        <h3>mortaha</h3>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Brand
