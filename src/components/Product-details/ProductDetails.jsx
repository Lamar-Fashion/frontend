import { React, useState } from "react";
import "../../styles/product-details/product-details.css";
import { Link } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
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
  const [selectedProduct, setSelectedProduct] = useState({
    ...obj,
    size: false,
    color: false,
    buttons: false,
    quantity: 1,
  });
  const [selectedStyleSize, setSelectedStyleSize] = useState({
    show: false,
    id: "",
  });
  const [selectedStyleColor, setSelectedStyleColor] = useState({
    show: false,
    id: "",
  });
  const [errorAlert, setErrorAlert] = useState(false);

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
    alert("added to cart thank you     ");
    setSelectedProduct({
      ...obj,
      size: false,
      color: false,
      buttons: false,
      quantity: 1,
    });
    setSelectedStyleSize({ show: false, id: "" });
    setSelectedStyleColor({ show: false, id: "" });
  };
  return (
    <>
      <section className="product-d">
      
        <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <span >Product Detail</span>
          </div>
        </div>
      </div>
        <div className="lamar-container">
          <div className="image-product">
            <div className="big-image">
              <img src={state} alt="" />
            </div>
            <div className="left-images">
              <Flicking circular={true}>
                {images.map((item) => {
                  return (
                    <div
                      className="image"
                      onClick={() => {
                        setstate(item);
                      }}
                    >
                      <img src={item} alt="" />
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
                  <span>Availabilty :</span> In Stock
                </p>
              </div>
              <li>The Order Takes 1 To 2 Weeks.</li>
            </div>
            <hr />
            <div className="size-color">
              <div className="size">
                <h4>size</h4>
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
                {selectedProduct.size===false && errorAlert&& (
                  <span className="error-alert" id="error-size">* this field is required </span>
                )}
              </div>
              <div className="colors">
                <h4>color</h4>
                <div className="avialable">
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
                      style={{ backgroundColor: item }}
                    ></button>
                  ))}
                </div>
                {selectedProduct.color===false && errorAlert && (
                  <span className="error-alert" id="error-color">* this field is required </span>
                )}
              </div>
              <div className="avialable">
              <div className="buttuns">
                <label htmlFor="buttuns" id="error-buttons">buttuns:</label>
                <select
                  name="buttuns"
                  id="buttuns"
                  onChange={(e) =>
                    { 
                    setSelectedProduct({
                      ...selectedProduct,
                      buttons: e.target.value,
                    })
                  
                  }
                    
                  }
                  
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
              {selectedProduct.buttons===false &&errorAlert&& (
                  <span className="error-alert">* this field is required </span>
                )}
              </div>
             
            </div>
            <hr />
            <div className="qun-product">
              <div className="add-fav">
                <button>🖤</button>
              </div>
              <div className="add-to-cart">
                <button
                  onClick={(e) => {
                    if (
                      !selectedProduct.size ||
                      !selectedProduct.color ||
                      !selectedProduct.buttons ||
                      selectedProduct.buttons == "false"
                    ) {
                      setErrorAlert(true);
                     
                      alert(
                        `please select ${
                          !selectedProduct.size ? "size ," : " "
                        } ${!selectedProduct.color ? "color ," : " "} ${
                          !selectedProduct.buttons ||
                          selectedProduct.buttons == "false"
                            ? "buttons (طقطق أ, بدون طقطق)"
                            : " "
                        }`
                      );
                    } else {
                      addEntry(selectedProduct);
                      setErrorAlert(false);
                    }
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
            <hr />

            <div className="about-p">
              <h4>
                Vendor : <span className="vendor"> {obj.brand}</span>
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
