/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/home-styles/products.css";
import Flicking from "@egjs/react-flicking";
import {
  decryptAndGetFromStorage,
  encryptAndSaveToStorage,
} from "../../../helpers/CryptoJS";
import { instance, url } from "../../../API/axios";
import { checkProductDiscounts } from "../../../helpers";
import { useSelector } from "react-redux";

function Slider() {
  const { role, user, isLoggedIn } = useSelector((state) => state.authReducer);
  const {signInDiscount, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);

  const [homePageProducts, setHomePageProducts] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);

  //get home page abayas
  const getHomePageProducts = async () => {
    const abayas = await instance.get(url + "/homePageProducts");
    setHomePageProducts(abayas.data);
  };
  
  // did mount
  useEffect(() => {
    getHomePageProducts();
  }, []);

  useEffect(() => {
    const rendered = homePageProducts?.map((item, indx) => {
      return (
        <div className="box" key={item.id}>
          <div className="slide-img">
            <img src={item.images[0]} alt="" />

            <div className="overlay">
              <Link
                className="buy-btn"
                to={"/ProductDetails/" + item.id}
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {" "}
                buy now
              </Link>
            </div>
          </div>

          <div className="details">
            <div className="type">
              <a href="#">{item.code}</a>
              <span>
                {item.category === "newArrivals" ? "New Arrivals" : "On Sales"}
              </span>
            </div>

            {item.category === "newArrivals" && !(isLoggedIn && signInDiscount) ? (
              <a href="#" className="price">
                QAR {item.price}
              </a>
            ) : (
              <div>
                <a href="#" className="price">
                QAR {checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount)}
                </a>
                {((item?.discount && item.discount != 0) || (isLoggedIn && signInDiscount)) && <a href="#" className="price on-sale">
                  <span className="first-price">
                    QAR {item.price}
                  </span>
                </a>}
              </div>
            )}
          </div>
        </div>
      );
    });

    setRenderedProducts(<Flicking circular={true}>{rendered}</Flicking>);
  }, [homePageProducts]);

  return (
    <>
      <section className="multi-slider">
        <div className="lamar-container">{renderedProducts}</div>
      </section>
    </>
  );
}

export default Slider;
