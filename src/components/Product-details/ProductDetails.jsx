import { React, useState, useEffect } from "react";
import "../../styles/product-details/product-details.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../store/actions";
import {
  decryptAndGetFromStorage,
  encryptAndSaveToStorage,
} from "../../helpers/CryptoJS";
import { instance, url } from "../../API/axios";
import { assignFavourite } from "../../store/actions/index";
import DualModal from "../Shared/DualModal";
import { checkProductDiscounts } from "../../helpers";

// @ts-ignore
import PinchZoomPan from "react-image-zoom-pan";
import LoadingState from "../Shared/LoadingState";
import { BsCartFill } from "react-icons/bs";

const tall = [
  47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
];

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { abayaId } = useParams();
  const { user, isLoggedIn } = useSelector((state) => state.authReducer);
  const {signInDiscount, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);

  const [message, setMessage] = useState(null);
  const [orderDone, setOrderDone] = useState(false);
  const [addedToFavItem, setAddedToFavItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [zoomImageActive, setZoomImageActive] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [selectedStyleSize, setSelectedStyleSize] = useState({
    show: false,
    id: "",
  });
  const [selectedStyleTall, setSelectedStyleTall] = useState({
    show: false,
    id: "",
  });
  const [selectedStyleColor, setSelectedStyleColor] = useState({
    show: false,
    id: "",
  });
  const [errorAlert, setErrorAlert] = useState(false);
  const [seccessAlert, setSeccessAlert] = useState(false);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(url + "/product/" + abayaId);
      const abaya = response.data[0];
      console.log('abyaaaa', abaya);
      setSelectedProduct({
        ...abaya,
        size: false,
        color: false,
        buttons: false,
        tall: false,
        quantity: 1,
      });
      setActiveImage(abaya.images[0]);
    } catch (error) {
      error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while getting product");
        console.error("Error while getting product", error.message);
    }
    setIsLoading(false);
    window.scrollTo({
      left: 0,
      top: 75,
      behavior: "smooth",
    });
  };
  //did mount
  useEffect(() => {
    getProduct();
  }, []);

  // add to cart handler
  const addEntry = (obj) => {
    let FavArray = decryptAndGetFromStorage("cart");
    if (FavArray == null) FavArray = [];
    let duplecated = false;
    for (let i = 0; i < FavArray.length; i++) {
      if (
        FavArray[i].colors === obj.colors &&
        FavArray[i].sizes === obj.sizes &&
        FavArray[i].code === obj.code &&
        FavArray[i].buttons === obj.buttons &&
        FavArray[i].description === obj.description &&
        FavArray[i].price === obj.price
      ) {
        FavArray[i].quantity = FavArray[i].quantity + 1;
        duplecated = true;
        break;
      }
    }
    if (!duplecated && FavArray.length !== 0) {
      FavArray.push(obj);
    }
    if (FavArray.length === 0) {
      FavArray.push(obj);
    }

    encryptAndSaveToStorage("cart", FavArray);

    // update redux with cart number
    dispatch(addToCartAction());
    setSelectedProduct({
      ...obj,
      size: false,
      color: false,
      buttons: false,
      tall: false,
      quantity: 1,
    });
    setSelectedStyleSize({ show: false, id: "" });
    setSelectedStyleTall({ show: false, id: "" });
    setSelectedStyleColor({ show: false, id: "" });

    setTimeout(() => {
      setSeccessAlert(false);
    }, 2000);
  };

  // add to favourite handler
  const addToFavourite = async (item) => {
    setAddedToFavItem(item);
    try {
      //check if the user loggedn in or not
      if (isLoggedIn) {
        // send to backend
        const addeddToFavourite = await instance.post(
          url + `/favourite`,
          { abayaId: item.id, userId: user.id },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (addeddToFavourite?.data?.msg === "already in your wishlist") {
          setMessage("already in your wishlist");
        } else {
          setMessage(null);
          dispatch(assignFavourite(addeddToFavourite.data.abayaId.length));
        }
        setOrderDone(true);
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          setOrderDone(false);
        }, 3000);
      } else {
        // ask him to log-in or signup
        navigate("/SignIn");
      }
    } catch (error) {
      error?.response?.data?.error
        ? setError(error.response.data.error)
        : setError("Error while adding to favourite");
      console.error("Error while adding to favourite", error.message);
    }
  };

  const zoomImageHandler = (e)=>{
    if (zoomImageActive && e.target.tagName == 'DIV') { //that means user clicking on black area to close the modal
      setZoomImageActive(false);
    } else {
      setZoomImageActive(true);
    }
  };
  const closeZoomScreen = (e)=>{
    setZoomImageActive(false);
  };

  return (
    <>
      <section className="product-d">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i>
              <span>Product Details</span>
            </div>
          </div>
        </div>
        {!isLoading && <>
        <div className="nav-container">
          {(selectedProduct.size === false ||
            selectedProduct.buttons === false ||
            selectedProduct.color === false) &&
            errorAlert && (
              <Alert severity="warning" id="alert">
                You need to choose options for your item.
              </Alert>
            )}
          {seccessAlert && (
            <Alert severity="success" id="alert">
              You added <strong>{selectedProduct.code}</strong> to your
              <Link to="/Cart">shopping cart</Link>
            </Alert>
          )}
          {selectedProduct.inStock == 0 && (
            <Alert severity="error" id="alert">
              out of stock!
            </Alert>
          )}
          {addedToFavItem && orderDone && (
            <Alert severity="success" id="alert">
              {message ? (
                message
              ) : (
                <>
                  
                  You added <strong>{addedToFavItem.code}</strong> to your
                  <Link to="/Profile/2">wishlist</Link>
                </>
              )}
            </Alert>
          )}
        </div>

        <div className="lamar-container">
          <div className="image-product">
            <div className={zoomImageActive ? 'big-image clicked' : 'big-image'} onClick={(e)=>zoomImageHandler(e)} onTouchStart={(e)=>zoomImageHandler(e)}>
              <PinchZoomPan id="testtt" maxScale={3} doubleTapBehavior="zoom">
                <img src={activeImage} alt="big_product_image" id="bigImage"/>
              </PinchZoomPan>
            </div>
            <div className="full-area-backgound" onClick={(e)=>closeZoomScreen(e)}></div>
            <div className="left-images">
              <Flicking circular={true}>
                {selectedProduct.images?.map((item, indx) => {
                  return (
                    <div
                      className="image"
                      key={item}
                      onClick={() => {
                        setActiveImage(item);
                      }}
                    >
                      <img src={item} alt={indx} />
                    </div>
                  );
                })}
              </Flicking>
            </div>
          </div>

          <div className="product-info">
            <div className="name-p">
              <h2>
                product code : <span>{selectedProduct.code}</span>
              </h2>

              <div className="price">
                <h2>
                  QAR <span>{checkProductDiscounts(selectedProduct.price, isLoggedIn, signInDiscount, selectedProduct.discount)}</span>
                </h2>
                <p>
                  <span>
                    *
                    {selectedProduct.status == "readyToWear"
                      ? "Ready To Wear"
                      : "يحتاج إلى تفصيل"}
                  </span>
                  {selectedProduct.inStock > 0 ? (
                    <span>
                      *Availabilty : available.
                    </span>
                  ) : (
                    <span className="not-Availabilty">
                      
                      *Availabilty : Out Of Stock
                    </span>
                  )}
                </p>
              </div>
              {selectedProduct.status === "readyToWear" && (
                <li>The Order Takes ( 1 - 5 ) days.</li>
              )}
              {selectedProduct.status === "notReadyToWear" && (
                <li>The Order Takes ( 1 - 2 ) Weeks.</li>
              )}
            </div>

            <div className="hr"></div>
            <div className="size-color">
              <div className="size">
                <h4>size :</h4>
                <div className="avialable">
                  {selectedProduct.sizes?.map((item, idx) => (
                    <button
                      className={
                        selectedStyleSize.show && selectedStyleSize.id === idx
                          ? "selected"
                          : ""
                      }
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, size: item });
                        setSelectedStyleSize({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.size === false && errorAlert && (
                  <span className="error-alert" id="error-size">
                    * this field is required
                  </span>
                )}
              </div>
              <div className="size">
                <h4>length :</h4>
                <div className="avialable">
                  {tall?.map((item, idx) => (
                    <button
                      className={
                        selectedStyleTall.show && selectedStyleTall.id === idx
                          ? "selected"
                          : ""
                      }
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, tall: item });
                        setSelectedStyleTall({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.tall === false && errorAlert && (
                  <span className="error-alert" id="error-size">
                    * this field is required
                  </span>
                )}
              </div>
              <div className="colors">
                <h4>color :</h4>
                <div className="avialable av-colors">
                  {selectedProduct.colors?.map((item, idx) => (
                    <button
                      className={
                        selectedStyleColor.show && selectedStyleColor.id === idx
                          ? "selected"
                          : ""
                      }
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, color: item });
                        setSelectedStyleColor({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.color === false && errorAlert && (
                  <span className="error-alert" id="error-color">
                    * this field is required
                  </span>
                )}
              </div>
            <div className="hr"></div>

              <div className="container-buttons">
                <div className="avialable">
                  <div className="buttuns">
                    <label htmlFor="buttuns" id="error-buttons">
                      buttuns:
                    </label>
                    <select
                      name="buttuns"
                      id="buttuns"
                      onChange={(e) => {
                        setSelectedProduct({
                          ...selectedProduct,
                          buttons: e.target.value,
                        });
                      }}
                    >
                      <option value="false">-- choose buttuns --</option>
                      <option value="with-buttuns-مع طقطق">
                        with-buttuns-مع طقطق
                      </option>
                      <option value="without-buttuns-بدون طقطق">
                        without-buttuns-بدون طقطق
                      </option>
                    </select>
                  </div>
                </div>
                {selectedProduct.buttons === false && errorAlert && (
                  <span className="error-alert">* this field is required </span>
                )}
              </div>
            </div>

            <div className="qun-product ">
              <div className="add-fav">
                <button onClick={() => addToFavourite(selectedProduct)}>
                  🖤
                </button>
              </div>
              <div className="add-to-cart">
                <button
                  onClick={async (e) => {
                    window.scrollTo({
                      left: 0,
                      top: 50,
                      behavior: "smooth",
                    });
                    if (selectedProduct.inStock > 0) {
                      if (
                        !selectedProduct.size ||
                        !selectedProduct.color ||
                        !selectedProduct.buttons ||
                        selectedProduct.buttons == "false"
                      ) {
                        setErrorAlert(true);
                      } else {
                        setSeccessAlert(true);

                        addEntry(selectedProduct);

                        setErrorAlert(false);
                      }
                    }
                  }}
                >
                  add to cart
                </button>
              </div>
              <div className="go-to-cart" onClick={()=> navigate("/Cart")}>
                <span>
                    <BsCartFill className="cart-icon" title="Go to Cart" />
                </span>
              </div>
            </div>
            <div className="hr"></div>

            <div className="about-p">
              <h4>
                category :
                <span className="vendor">
                  
                  {selectedProduct.category == "newArrivals" ? "New Arrivals" : "On Sales"}
                </span>
              </h4>
              <h4>About This Item :</h4>

              <p>{selectedProduct.description}</p>
            </div>
          </div>
        </div>
        </>}
        {isLoading && (
          <div className="loading-state-product-details">
            <LoadingState />
          </div>
        )}
      </section>
      {error && (
        <DualModal
          type="error"
          navigateTo={"/ProductDetails/" + selectedProduct.id}
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default ProductDetails;
