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
        <div className="lamar-container">
          <div className="nav">
            <div className="path">
              <Link to="/">
                <i class="fas fa-home"></i>
              </Link>
              <i class="fas fa-angle-right">
                <Link to="/Checkout" className="path-span">
                  Shipping
                </Link>
                <i class="fas fa-angle-right"></i>
              </i>{" "}
              <span>Checkout </span>
            </div>
            <div className="check-livel">
              <span>
                {" "}
                <Link to="/Checkout">Shipping</Link>{" "}
              </span>
              <i class="fas fa-angle-right"></i>
              <span className="FLivel">Review & Payments</span>
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
        </div>
        <div className="lamar-container">
          <form action="" className="form-check2">
            <h2>Review & Payments</h2>

            <section className="Review">
              <div className="Shipping-info">
                <table>
                  <h4 className="Shipping-title">Shipping Info</h4>
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
                <h4 className="Shipping-title">Shipping summary</h4>
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
                  <h2>QAR {total}</h2>
                </div>
              </div>
            </section>
          </form>
        </div>
      </section>
    </>
  );
}

export default Checkout2;
