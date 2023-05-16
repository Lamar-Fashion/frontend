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
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function Checkout() {
  const cartArray = decryptAndGetFromStorage("cart");
  const total = decryptAndGetFromStorage("total");
  const savedData = decryptAndGetFromStorage("checkout_person_info")
  ? decryptAndGetFromStorage("checkout_person_info")
  : {};

  const {role, user, isLoggedIn} = useSelector((state)=> state.authReducer);
  const {signInDiscount, shippingFees, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);

  const [showAnswer, setShowAnswer] = useState({ email: false, phone: false });
  const navigate = useNavigate();
  const [values, setValues] = useState(savedData);
  const [phone, setPhone] = useState(savedData.phone ? savedData.phone : "");

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    const valuesObj = {...values};
    valuesObj.phone = phone;
    encryptAndSaveToStorage("checkout_person_info", valuesObj);

    navigate("/Checkout2");
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }

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
              <i className="fas fa-angle-right"></i> <span>Shipping</span>
            </div>
          </div>
        </div>
        <div className="lamar-container">
          <h2>
            <span className="active">
              Shipping <span className="steps">1</span>
            </span>
            <i className="fas fa-angle-right"></i>
            <span>
              Payments <span className="steps">2</span>
            </span>
            <i className="fas fa-angle-right"></i>
            <span>
              Order Complete <span className="steps">3</span>
            </span>
          </h2>
          <div className="container-shiping">
            <form action="" onSubmit={handleSubmit}>
              <div className="email">
                <i className="fas fa-mail-bulk"></i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address *"
                  value={values?.email ? values.email : ''}
                  required
                  onChange={handleChange}
                />
                <i
                  className="far fa-question-circle question"
                  onClick={() => {
                    setShowAnswer({ email: !showAnswer.email });
                  }}
                >
                  {showAnswer.email && (
                    <div className="answer-q">
                      We'll send your order confirmation here.
                    </div>
                  )}
                </i>
              </div>
              <div className="phone">
                {/* <i className="fas fa-phone"></i> */}
                {/* <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number *"
                  required
                  onChange={handleChange}
                  value={values?.phone ? values.phone : ''}
                /> */}
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="QA"
                  style={{width: "100%"}}
                  required
                />
                <i
                  className="far fa-question-circle question"
                  onClick={() => {
                    setShowAnswer({ phone: !showAnswer.phone });
                  }}
                >
                  {showAnswer.phone && (
                    <div className="answer-q">For delivery questions.</div>
                  )}
                </i>
              </div>
              <div className="name">
                <div className="Fname">
                  <i className="fas fa-user-edit"></i>
                  <input
                    type="text"
                    name="Fname"
                    id="Fname"
                    value={values?.Fname ? values.Fname : ''}
                    placeholder="First Name *"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="Lname">
                  <i className="fas fa-user-edit"></i>
                  <input
                    type="text"
                    name="Lname"
                    id="Lname"
                    value={values?.Lname ? values.Lname : ''}
                    placeholder="Last Name *"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="country">
                <i className="fas fa-globe-africa"></i>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="country"
                  value={values?.country ? values.country : ''}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="city">
                <i className="fas fa-city"></i>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City *"
                  required
                  onChange={handleChange}
                  value={values?.city ? values.city : ''}
                />
              </div>
              <div className="zone">
                <i className="fas fa-city"></i>
                <input
                  type="text"
                  name="Zone"
                  id="Zone"
                  placeholder="Zone  *"
                  value={values?.Zone ? values.Zone : ""}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="address">
                <div className="Faddress">
                  <i className="fas fa-map-marked-alt"></i>
                  <input
                    type="text"
                    name="StreetAddress"
                    id="Faddress"
                    placeholder="Street Address *"
                    required
                    onChange={handleChange}
                    value={values?.StreetAddress ? values.StreetAddress : ''}
                  />
                </div>
                <div className="Laddress">
                  <i className="fas fa-building"></i>
                  <input
                    type="text"
                    name="FlatNumber"
                    id="Laddress"
                    placeholder="Building / Villa Number  *"
                    required
                    onChange={handleChange}
                    value={values?.FlatNumber ? values.FlatNumber : ""}
                  />
                </div>
              </div>

              <button className="next" type="submit">
                Next
              </button>
            </form>
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
                            <p>length:{item.tall}</p>
                            <p>buttons:{item.buttons}</p>
                          </div>
                        </div>
                        <div className="price">
                          <h4>QAR { checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount) }</h4>
                        </div>
                      </div>
                  );
                })}
              </div>

              <hr />
              <div className="sub-total">
                <h4>Shipping Fees</h4>
                <h5>QAR {shippingFees}</h5>
              </div>
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

export default Checkout;
