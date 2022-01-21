import { React, useState } from "react";
import "../../styles/product-details/product-details.css";
import { Link } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
import Alert from "@mui/material/Alert";
// import {Spinner} from 'react-bootstrap'

function ProductDetails() {
  let obj = JSON.parse(window.sessionStorage.getItem("product"));
  let images = obj.images;
  let firstImg = obj.images[0];
  const [state, setstate] = useState(firstImg);
  let name = obj.name;
  let price = obj.price;
  let size = obj.size;
  let color = obj.color;
  let descrp = obj.discrpition;
  let total_quantity=obj.total_quantity
  const [selectedProduct, setSelectedProduct] = useState({
    ...obj,
    size: false,
    color: false,
    buttons: false,
    tall: false,
    quantity: 1,
  });
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

  const addEntry = (obj) => {
    let FavArray = JSON.parse(window.sessionStorage.getItem("cart"));
    if (FavArray == null) FavArray = [];
    let duplecated = false;
    for (let i = 0; i < FavArray.length; i++) {
      if (
        FavArray[i].color === obj.color &&
        FavArray[i].size === obj.size &&
        FavArray[i].name === obj.name &&
        FavArray[i].buttons === obj.buttons &&
        FavArray[i].descrp === obj.descrp &&
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

    window.sessionStorage.setItem("cart", JSON.stringify(FavArray));
    setTimeout(() => {
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
    }, 2000);
  };
  const tall = [
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
  ];





  return (
    <>
      <section className="product-d">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i> <span>Product Detail</span>
            </div>
          </div>
        </div>

        <div className="nav-container">
          {(selectedProduct.size === false ||
            selectedProduct.buttons === false ||
            selectedProduct.color === false) &&
            errorAlert && (
              <Alert severity="warning" id="alert">
                You need to choose options for your item.
              </Alert>
            )}
          {selectedProduct.size &&
            selectedProduct.buttons &&
            selectedProduct.color &&
            seccessAlert && (
              <Alert severity="success" id="alert">
                You added <strong>{name}</strong> to your{" "}
                <Link to="/Cart">shopping cart</Link>
              </Alert>
            )}
          {total_quantity===0 && (
            <Alert severity="error" id="alert">
              unfortunately this item doesn't exist right know
            </Alert>
          )}
        </div>

        <div className="lamar-container">
          <div className="image-product">
            <div className="big-image">
          
              
               <img src={state} alt="" />
            
             
            </div>
           
            <div className="left-images">
              <Flicking circular={true}>
                {images.map((item,indx) => {
                  return (
                    <div
                      className="image"
                      onClick={() => {
                        setstate(item);
                      }}
                    >
                      <img  src={item} alt={indx} />
                    </div>
                  );
                })}
              </Flicking>
            </div>
          </div>

          <div className="product-info">
            <div className="name-p">
              <h2>
                product Num : <span>{name}</span>
              </h2>

              <div className="price">
                <h2>
                  QAR <span>{price}</span>
                </h2>
                <p>
                  <span>* {obj.status}</span>
                    {obj.total_quantity>0 ?<span> *Availabilty : (<strong>{obj.total_quantity}</strong>) Items In Stock</span>:<span className="not-Availabilty"> *Availabilty : Out Of  Stock</span>}
                
                </p>
              </div>
              {obj.status === "ready to wear" && (
                <li>The Order Takes ( 1 - 5 ) days.</li>
              )}
              {obj.status === "needs elaboration" && (
                <li>The Order Takes ( 1 - 2 ) Weeks.</li>
              )}
            </div>

            <div className="hr"></div>
            <div className="size-color">
              <div className="size">
                <h4>size :</h4>
                <div className="avialable">
                  {size.map((item, idx) => (
                    <button
                      className={
                        selectedStyleSize.show && selectedStyleSize.id === idx
                          ? "selected"
                          : ""
                      }
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
                    * this field is required{" "}
                  </span>
                )}
              </div>
              <div className="size">
                <h4>tall :</h4>
                <div className="avialable">
                  {tall.map((item, idx) => (
                    <button
                      className={
                        selectedStyleTall.show && selectedStyleTall.id === idx
                          ? "selected"
                          : ""
                      }
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
                    * this field is required{" "}
                  </span>
                )}
              </div>
              <div className="colors">
                <h4>color :</h4>
                <div className="avialable av-colors">
                  {color.map((item, idx) => (
                    <button
                      className={
                        selectedStyleColor.show && selectedStyleColor.id === idx
                          ? "selected"
                          : ""
                      }
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, color: item });
                        setSelectedStyleColor({ show: true, id: idx });
                      }}
                      // style={{ backgroundColor: item }}
                    >
                      {/* <span className="color-detail"> <strong  style={{ backgroundColor: item }}></strong> <h5>{item}</h5></span> */}
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.color === false && errorAlert && (
                  <span className="error-alert" id="error-color">
                    * this field is required{" "}
                  </span>
                )}
              </div>
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
            <div className="hr"></div>

            <div className="qun-product ">
              <div className="add-fav">
                <button>🖤</button>
              </div>
              <div className="add-to-cart">
                <button
                  onClick={async (e) => {
                    window.scrollTo({
                      left: 0,
                      top: 50,
                      behavior: "smooth",
                    });
                    if (total_quantity>0) {
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
            </div>
            <div className="hr"></div>

            <div className="about-p">
              <h4>
              catagory : <span className="vendor"> {obj.catagory}</span>
              </h4>
              <h4>About This Item :</h4>

              <p>{descrp}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
