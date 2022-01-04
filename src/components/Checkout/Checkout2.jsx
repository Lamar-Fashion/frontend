import React from "react";
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css";
import { useHistory } from "react-router-dom";
function Checkout2() {
  const InformationData = JSON.parse(
    window.sessionStorage.getItem("checkout_person_info")
  );
  const cartArray= JSON.parse(window.sessionStorage.getItem("cart"))
  const total= JSON.parse(window.sessionStorage.getItem("total"))
  
  return (
    <>
      <section className="checkout">
         <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i className="fas fa-home i-home"></i></Link>  
            <i className="fas fa-angle-right"></i>
            <Link to='/Cart' className="exat-path"> <span >cart</span></Link> 
            <i className="fas fa-angle-right"></i> <Link to='/Checkout' className="exat-path"> <span >Shipping</span></Link> 
            <i className="fas fa-angle-right"></i> <span >Payment</span>
          </div>
         
        </div>
      </div>

        <div className="lamar-container">
    
        <h2><span >Shipping <i className="far fa-check-circle"></i></span> <i className="fas fa-angle-right"></i> <span className='active'>Review & Payments<span className='steps'>2</span></span></h2>
            <div className="container-payment">
              <div className="Shipping-info">
                  <h4 className="Shipping-title">Shipping Info</h4>
                <table>
                  <tbody>
                    <tr>
                      <td className="td1">contact</td>
                      <td className="td2">{InformationData.email}</td>
                      <td className="td3">
                        <Link to="/Checkout">change</Link>
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td className="td1">Ship to</td>
                      <td className="td2">
                        {InformationData.Faddress +
                          " ," +
                          InformationData.Laddress}
                      </td>
                      <td className="td3">
                        <Link to="/Checkout">change</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="next">continue to payment</button>
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
  );
}

export default Checkout2;
