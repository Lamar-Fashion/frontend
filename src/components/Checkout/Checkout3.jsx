import {React,useState} from "react";
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css";
import { useNavigate } from 'react-router-dom';
import pay_pal from '../../images/header/PayPal.svg.png';


function Checkout3() {
  const total= JSON.parse(window.sessionStorage.getItem("total"))

  const handleCahnge=e=>{
      console.log(e.target.value);
  }



  const cartArray= JSON.parse(window.sessionStorage.getItem("cart"))
    return (
        <>
         <section className="checkout">

         <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i className="fas fa-home i-home"></i></Link>  
            <i className="fas fa-angle-right"></i>
            <Link to='/Cart' className="exat-path"> <span >cart</span></Link> 
            <i className="fas fa-angle-right"></i> 
            <Link to='/Checkout' className="exat-path"> <span >Shipping</span></Link> 
            <i className="fas fa-angle-right"></i>
            <Link to='/Checkout2' className="exat-path"> <span >Payment</span></Link>
            <i className="fas fa-angle-right"></i>
            <span >Order Complete</span>
          </div>
        </div>
      </div>

      <div className="lamar-container">
        <h2>
            <span >Shipping <i className="far fa-check-circle"></i></span> 
            <i className="fas fa-angle-right"></i> 
            <span >Review & Payments <i className="far fa-check-circle"></i>
            </span>
        <i className="fas fa-angle-right"></i> <span className='active'>Order Complete <span className='steps'>3</span></span>
        </h2>
        <div className="container-complete-order">
              <div className="complete-order">

                <h4 className="Shipping-title">Payment Method</h4>

                <div className="pay-method">
                    <form action="" onChange={()=>{
                        console.log();
                    }}>
                        <div className="pay">
                        <div className="cash">
                        <input type="radio" name="cash" value="cash" onChange={handleCahnge}
                        />
                        <label htmlFor="cash" >Cash On Delivery</label>
                        </div>
                        <div className="image">
                            <img src="https://daraghmeh.com/themes/storefront/public/images/cod-draghmeh.png" alt="" />
                        </div>
                        </div>
                        <div className="pay">
                        <div className="cash">
                        <input type="radio" name="card_on_delivery"  value="card_on_delivery"/>
                        <label htmlFor="card_on_delivery">Credit Card On Delivery</label>
                        </div>
                        <div className="image">
                            <img src="https://daraghmeh.com/themes/storefront/public/images/creditCardOnDelivery.png" alt="" />
                        </div>
                        </div>
                        
                        <div className="pay">
                        <div className="cash">
                        <input type="radio" name="credit_card"  value="credit_card"/>
                        <label htmlFor="credit_card">Credit/Debit Card Payment</label>
                        </div>
                        <div className="image">
                            <img src="https://daraghmeh.com/themes/storefront/public/images/mastercard-visa.png" alt="" />
                        </div>
                        </div>
                        <div className="pay">
                        <div className="cash">
                        <input type="radio" name="Pay-Pal"  value="Pay-Pal"/>
                        <label htmlFor="Pay-Pal">Pay-Pal Payment</label>
                        </div>
                        <div className="image-pay">
                            <img src={pay_pal} alt="" />
                        </div>
                        </div>

                        <button className="next" type="submit"> confirm order</button>


                    </form>

                </div>
              </div>
              <div className="summary">
                <h3 >Order summary</h3>
                <hr />
                <div className="container-info">
                    {
                        cartArray?.map((item,indx)=>{
                            return(<>
                            
                        <div className="info-products">
                    <div className="info">
                      <div className="image">
                        <img
                          src={item.images[0]}
                          alt=""
                        />
                        <div className="qunt">
                          <h5>{item.quantity}</h5>
                        </div>
                      </div>
                      <div className="details">
                        <h4>
                        {item.name}
                        </h4>
                        <p>size: {item.size}</p>
                        <p>color: {item.color}</p>
                        <p>buttons:{item.buttons}</p>
                      </div>
                    </div>
                    <div className="price">
                      <h4>QAR {item.price}</h4>
                    </div>
                  </div>
                            </>)
                        })
                    }
                 
                  
                </div>

                <hr />
                <div className="total">
                  <h4>Total</h4>
                  <h4>QAR {total}</h4>
                </div>
              </div>
              </div>
      </div>
         </section>
            
        </>
    )
}

export default Checkout3
