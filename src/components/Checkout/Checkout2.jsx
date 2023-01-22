import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {
  decryptAndGetFromStorage,
  encryptAndSaveToStorage,
} from "../../helpers/CryptoJS";
import { checkProductDiscounts } from "../../helpers";
import DualModal from "../Shared/DualModal";

function Checkout2() {
  const navigate = useNavigate();
  const InformationData = decryptAndGetFromStorage("checkout_person_info");
  const {role, user, isLoggedIn} = useSelector((state)=> state.authReducer);
  const {signInDiscount, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);
  let [values, setValues] = useState(
    decryptAndGetFromStorage("checkout_person_info")
      ? decryptAndGetFromStorage("checkout_person_info")
      : {}
  );
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const cartArray = decryptAndGetFromStorage("cart");
  const total = decryptAndGetFromStorage("total");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleClick = () => {
    encryptAndSaveToStorage("checkout_person_info", values);
    setProceedToPayment(true);
  };
  return (
    <>
      <section className="checkout">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i>
              <Link to="/Cart" className="exat-path">
                <span>cart</span>
              </Link>
              <i className="fas fa-angle-right"></i>
              <Link to="/Checkout" className="exat-path">
                <span>Shipping</span>
              </Link>
              <i className="fas fa-angle-right"></i> <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="lamar-container">
          <h2>
            <span>
              Shipping <i className="far fa-check-circle"></i>
            </span>
            <i className="fas fa-angle-right"></i>
            <span className="active">
              Review & Payments<span className="steps">2</span>
            </span>
            <i className="fas fa-angle-right"></i>
            <span>
              Order Complete <span className="steps">3</span>
            </span>
          </h2>
          <div className="container-payment">
            <div className="Shipping-info">
              <h4 className="Shipping-title">Shipping Info</h4>
              <table>
              <tbody>
                  <tr>
                    <td className="td1">phone number</td>
                    <td className="td2">{InformationData.phone}</td>
                    <td className="td3">
                      <Link to="/Checkout">change</Link>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="td1">contact email</td>
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
                      {InformationData.city + " ," + InformationData.Zone}
                    </td>
                    <td className="td3">
                      <Link to="/Checkout">change</Link>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="tr-text">
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="10"
                      placeholder="Leave a comment"
                      value={values?.comment}
                      onChange={handleChange}
                    ></textarea>
                  </tr>
                </tbody>
              </table>
              <button className="next" onClick={handleClick}>
                continue to payment
              </button>
            </div>
            <div className="summary">
              <h3>Order summary</h3>
              <hr />
              <div className="container-info">
                {cartArray?.map((item, indx) => {
                  return (
                      <div className="info-products" key={item?.id}>
                        <div className="info">
                          <div className="image">
                            <img src={item.images[0]} alt="" />
                            <div className="qunt">
                              <h5>{item.quantity}</h5>
                            </div>
                          </div>
                          <div className="details">
                            <h4>{item.name}</h4>
                            <p>size: {item.size}</p>
                            <p>color: {item.color}</p>
                            <p>length: {item.tall}</p>
                            <p>buttons:{item.buttons}</p>
                          </div>
                        </div>
                        <div className="price">
                          <h4>QAR {checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount)}</h4>
                        </div>
                      </div>
                  );
                })}
              </div>

              <hr />
              <div className="sub-total">
                <h4>Shipping Fees</h4>
                <h5>QAR 50.00</h5>
              </div>
              <div className="total">
                <h4>Total</h4>
                <h4>QAR {total}</h4>
              </div>
            </div>
          </div>
        </div>
        {proceedToPayment && <DualModal
          type="success"
          title="تأكيد الطلب"
          navigateTo="/Checkout3"
          showHeader={true}
          successButtonText="إتمام عملية الدفع"
          text={ " :مجموع طلبك هو" + '<br/>' + total + " QAR "}
          />}
      </section>
    </>
  );
}

export default Checkout2;
