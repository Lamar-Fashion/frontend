/* eslint-disable no-mixed-operators */
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/checkout/checkout.css";
import apple_pay from "../../images/header/apple-pay.png";
import cash from "../../images/shop/cash.png";
import {
  decryptAndGetFromStorage,
  encryptAndSaveToStorage,
} from "../../helpers/CryptoJS";
import { instance, url } from "../../API/axios";
import { useSelector, useDispatch } from "react-redux";
import { resetCartAction } from "../../store/actions/index";
import LoadingState from "../Shared/LoadingState";
import DualModal from "../Shared/DualModal";
import { checkProductDiscounts } from "../../helpers";

function Checkout3() {
  const dispatch = useDispatch();
  const {role, user, isLoggedIn} = useSelector((state)=> state.authReducer);
  const {signInDiscount, shippingFees, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);
  const total = decryptAndGetFromStorage("total");
  const cartArray = decryptAndGetFromStorage("cart");
  const checkout_person_info = decryptAndGetFromStorage("checkout_person_info");

  const [state, setstate] = useState("");
  const [policy, setPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  const [verifiedPromoCode, setVerifiedPromoCode] = useState("");
  const [totalPromoApplied, setTotalPromoApplied] = useState("");

  useEffect(()=>{
    const verifiedPromoCode = decryptAndGetFromStorage("verifiedPromoCode");
    const totalPromoApplied = decryptAndGetFromStorage("totalPromoApplied");
    if (verifiedPromoCode) {
      setVerifiedPromoCode(verifiedPromoCode);
    }
    if (totalPromoApplied) {
      setTotalPromoApplied(totalPromoApplied);
    }
  },[]);

  const handleCahnge = (e) => {
    setstate(e.target.value);
  };

  const handlePolicy = () => {
    setPolicy(!policy);
  };
  
  const makeOrderHandler = async (e) => {
    e.preventDefault();
    if (isLoading || orderDone) return;

    let bookedData = {
      productInfo: cartArray,
      personalInfo: checkout_person_info,
      totalPrice: total,
    };
    if (verifiedPromoCode) {
      bookedData.verifiedPromoCode = verifiedPromoCode;
    }
    if (totalPromoApplied) {
      bookedData.totalPromoApplied = totalPromoApplied;
    }
    setIsLoading(true);
    setTimeout(async () => {
      let options = {};
      if (user && user.token) {
        options = {
          headers: {
            authorization: `Bearer ${user?.token}`,
          }
        };
      }
      try {
        const bookedOrder = await instance.post(url + "/addToCart", bookedData, options);

        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("totalPromoApplied");
        sessionStorage.removeItem("verifiedPromoCode");
        dispatch(resetCartAction());
        encryptAndSaveToStorage("total", 0);
        encryptAndSaveToStorage("cartNumber", 0);
        setIsLoading(false);
        setOrderDone(true);
      } catch (error) {
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("totalPromoApplied");
        sessionStorage.removeItem("verifiedPromoCode");
        dispatch(resetCartAction());
        encryptAndSaveToStorage("total", 0);
        encryptAndSaveToStorage("cartNumber", 0);

        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("book order error");
        console.error("book order error", error.message);
      }
    }, 1000);
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
              <i className="fas fa-angle-right"></i>
              <Link to="/Checkout2" className="exat-path">
                <span>Payment</span>
              </Link>
              <i className="fas fa-angle-right"></i>
              <span>Order Complete</span>
            </div>
          </div>
        </div>

        <div className="lamar-container">
          <h2>
            <span>
              Shipping <i className="far fa-check-circle"></i>
            </span>
            <i className="fas fa-angle-right"></i>
            <span>
              Review & Payments <i className="far fa-check-circle"></i>
            </span>
            <i className="fas fa-angle-right"></i>
            <span className="active">
              Order Complete <span className="steps">3</span>
            </span>
          </h2>
          <div className="container-complete-order">
            <div className="complete-order">
              <h4 className="Shipping-title">Payment Method</h4>

              <div className="pay-method">
                <form action="" onSubmit={makeOrderHandler}>
                  <div className="pay">
                    <div className="cash">
                      <input
                        type="radio"
                        name="pay"
                        value="cash"
                        id="cash"
                        onChange={handleCahnge}
                      />
                      <label htmlFor="cash">Cash On Delivery (COD)</label>
                    </div>
                    <div className="image">
                      <img
                        src="https://daraghmeh.com/themes/storefront/public/images/cod-draghmeh.png"
                        alt=""
                      />
                    </div>
                  </div>
                  {/* <div className="pay">
                    <div className="cash">
                      <input
                        type="radio"
                        name="pay"
                        value="card_on_delivery"
                        id="card_on_delivery"
                        onChange={handleCahnge}
                      />
                      <label htmlFor="card_on_delivery">
                        Credit Card On Delivery
                      </label>
                    </div>
                    <div className="image">
                      <img
                        src="https://daraghmeh.com/themes/storefront/public/images/creditCardOnDelivery.png"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="pay">
                    <div className="cash">
                      <input
                        type="radio"
                        name="pay"
                        value="credit_card"
                        id="credit_card"
                        onChange={handleCahnge}
                      />
                      <label htmlFor="credit_card">
                        Credit/Debit Card Payment
                      </label>
                    </div>
                    <div className="image">
                      <img
                        src="https://daraghmeh.com/themes/storefront/public/images/mastercard-visa.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="pay">
                    <div className="cash">
                      <input
                        type="radio"
                        name="pay"
                        value="Pay-Pal"
                        id="Pay-Pal"
                        onChange={handleCahnge}
                      />
                      <label htmlFor="Pay-Pal">Apple-Pay Payment</label>
                    </div>
                    <div className="image">
                      <img src={apple_pay} alt="" />
                    </div>
                  </div> */}
                  {state === "credit_card" && (
                    <div className="credit_card">
                      <i className="fas fa-money-check"></i>
                      <p>
                        After clicking “Complete order”, you will be redirected
                        to Mastercard - Visacard - Payment Gateway Services -
                        Simplify to complete your purchase securely.
                      </p>
                    </div>
                  )}
                  {state === "Pay-Pal" && (
                    <div className="credit_card">
                      <i className="fas fa-money-check"></i>
                      <p>
                        After clicking “Complete order”, you will be redirected
                        to Pay-Pal Payment Gateway Services - Simplify to
                        complete your purchase securely.
                      </p>
                    </div>
                  )}
                  <div className="place-order">
                    <div className="Conditions">
                      <input
                        type="checkbox"
                        name="place-order"
                        id="place-order"
                        onClick={handlePolicy}
                      />
                      <label htmlFor="place-order">
                        <span>I agree to the </span>
                        <Link
                          to="/DeliveryPolicy"
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          Terms & Conditions
                        </Link>
                      </label>
                    </div>

                    {(state && policy && (
                      <button
                        className={
                          isLoading || orderDone || error
                            ? "next not-place"
                            : "next"
                        }
                        type="submit"
                      >
                        {!isLoading && !orderDone && "complete order"}
                        {!isLoading && orderDone && "Done"}
                        {error && "Failed"}
                        {isLoading && !error && (
                          <div className="loading-state-container">
                            {" "}
                            <LoadingState />
                          </div>
                        )}
                      </button>
                    )) || <div className="not-place"> complete order</div>}
                  </div>
                </form>
              </div>
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
                <h5>QAR {shippingFees}</h5>
              </div>
              <div className="total">
                <h4>Total</h4>
                <h4 className={totalPromoApplied ? "line-through" : ""}>QAR {total}</h4>
              </div>
              {totalPromoApplied && <div className="total">
                <h5></h5>
                <h4>QAR {totalPromoApplied}</h4>
              </div>}
              <hr />
              {verifiedPromoCode && <h5>"{verifiedPromoCode.code}" promo code applied</h5>}
            </div>
          </div>
        </div>
      </section>
      {orderDone && (
        <DualModal
          type="success"
          navigateTo="/Abaya"
          text={"will get in touch soon for delivery."}
        />
      )}
      {error && (
        <DualModal
          type="error"
          navigateTo="/Abaya"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default Checkout3;
