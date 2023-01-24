import React from "react";
import "../../../styles/home-styles/hero.css";
import heroImage from "../../../images/hero/hero6.jpg";
import { Link } from "react-router-dom";
import { navigateAction } from "../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";

function Hero() {
  const dispatch = useDispatch();
  const {signInDiscount, promoCodes, hero, collection} = useSelector((state)=> state.adminSettingsReducer);

  return (
    <>
      <div className="hero">
        <div className="lamar-container">
          <div className="info">
            <div className="top-info">
              {/* <h3>A325s</h3>
              <h3>New Arrivals</h3> */}
              <h3>{hero && hero.mainText ? hero.mainText : "Discover our new collections"}</h3>
              <h5 className="sub-title">
                {/* this should be dynamic text by admin */}
                {hero && hero.subText ? hero.subText : "A325s, New Arrivals "}
              </h5>
            </div>
            <div className="bottom-info">
              {/* <h6> QAR 300 </h6> */}
              <Link
                to="/Abaya"
                onClick={() => {
                  dispatch(navigateAction("all"));
                }}
              >
                {hero && hero.buttonText ? hero.buttonText : "Shop Now"}
              </Link>
            </div>
          </div>
          <div className="imag-detail">
            <div className="image">
              <img src={hero.imageUrl ? hero.imageUrl : heroImage} alt="hero_image" />
            </div>
            <div className="add-cart">
              <Link to="/Abaya">
                <div className="plus-container">
                  <i className="fas fa-arrow-right"></i>
                </div>
                <h6>{hero && hero.arrowText ? hero.arrowText : "Discover"}</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
