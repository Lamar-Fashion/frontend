import React from 'react'
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css"
function Checkout() {
    return (
        <>
        <section className="checkout">
        <div className="lamar-container">
            <div className="nav">
            <div className="path">
            <Link to="/">
              <i class="fas fa-home"></i>
            </Link>
            <i class="fas fa-angle-right"></i> <span>Checkout </span>
          </div>
          <div className="check-livel">
          <span className='FLivel'> Shipping </span><i class="fas fa-check-circle"></i><i class="fas fa-angle-right"></i><span>Review & Payments</span>
          </div>

            </div>
          
        </div>
        <div className="lamar-container">
            <form action="">
                <h2>Shipping Address</h2>
                
              <div className="email">
              <i className="fas fa-mail-bulk"></i>
            <input type="email" name="email" id="email" placeholder="Email Address" required />
              </div>
              <div className="name">
                <div className="Fname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Fname" id="Fname" placeholder="First Name" required / >

                </div>
                <div className="Lname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Lname" id="Lname" placeholder="Last Name" required/>

                </div>
  
              </div>
              <div className="company">
              <i class="fas fa-warehouse"></i>
            <input type="text" name="company" id="company" placeholder="Company Name"/>
              </div>
              <div className="address">
                <div className="Faddress">
                <i class="fas fa-map-marked-alt"></i>
                <input type="text" name="Faddress" id="Faddress" placeholder="Street Address" required / >

                </div>
                <div className="Laddress">
                <i class="fas fa-map-marked-alt"></i>
                <input type="text" name="Laddress" id="Laddress" placeholder="Street Address 2"/>

                </div>
              </div>
              <div className="city">
              <i class="fas fa-city"></i>
            <input type="text" name="city" id="city" placeholder="City" required/>
              </div>
              <div className="zip-code">
              <i class="far fa-keyboard"></i>
            <input type="text" name="zip-code" id="zip-code" placeholder="Zip/Postal Code" required/>
              </div>
              <div className="country">
              <i class="fas fa-globe-africa"></i>
            <input type="text" name="country" id="country" placeholder="country" value="Qutar"/>
              </div>
              <div className="phone">
              <i class="fas fa-phone"></i>
            <input type="tel" name="phone" id="phone" placeholder="Phone Number" required />
              </div>
              <Link to="/Checkout2"  className="next">Next</Link>
            </form>
        </div>
        </section>
            
        </>
    )
}

export default Checkout
