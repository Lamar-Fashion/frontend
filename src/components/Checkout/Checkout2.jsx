import React from 'react'
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css"
function Checkout2() {
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
          <span > <Link to="/Checkout">Shipping</Link> </span><i class="fas fa-angle-right"></i><span className='FLivel'>Review & Payments</span><i class="fas fa-check-circle"></i>
          </div>
            </div>
        </div>
        <div className="lamar-container">
            <form action="">
                <h2>Review & Payments</h2>
                <h4>here will be payament methode</h4>
                </form>
                </div>
        </section>
        </>
    )
}

export default Checkout2
