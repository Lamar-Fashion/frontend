import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Cart/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../../store/actions";
import {
  decryptAndGetFromStorage,
  encryptAndSaveToStorage,
} from "../../helpers/CryptoJS";
import { checkProductDiscounts } from "../../helpers";

function Cart() {
  const dispatch = useDispatch();
  const {role, user, isLoggedIn} = useSelector((state)=> state.authReducer);
  const {signInDiscount, shippingFees, promoCodes, hero, collection} = useSelector((state) => state.adminSettingsReducer);

  const [cartArray, setCartArray] = useState(decryptAndGetFromStorage("cart"));
  const [quantity, setQuantity] = useState({});
  const [total, setTotal] = useState(0);
  encryptAndSaveToStorage("total", total);

  useEffect(() => {
    let sum = 0;
    cartArray?.map(
      (item) => {
        sum += checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount) * Number(item.quantity);

      }
    );
    //add delivery fees
    sum = sum + shippingFees;
    setTotal(sum);
  }, []);

  const deleteItem = (item, indx) => {
    cartArray.splice(Number(indx), 1);
    encryptAndSaveToStorage("cart", cartArray);

    // update redux with cart number
    dispatch(removeFromCartAction(item.quantity));
    setTotal(total - checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount) * Number(item.quantity));
  };

  const addItem = (item, indx) => {
    setQuantity({
      ...quantity,
      [indx]: quantity[indx] ? quantity[indx] + 1 : 2,
    });
    cartArray[indx].quantity = item.quantity + 1;
    encryptAndSaveToStorage("cart", cartArray);

    // update redux with cart number
    dispatch(addToCartAction());
    setTotal(total + checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount));
  };

  const decresItem = (item, indx) => {
    if (item.quantity > 1) {
      setQuantity({
        ...quantity,
        [indx]: quantity[indx] ? quantity[indx] - 1 : 1,
      });
      cartArray[indx].quantity = item.quantity - 1;
      encryptAndSaveToStorage("cart", cartArray);
      // update redux with cart number
      dispatch(removeFromCartAction());
      setTotal(total - checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount));
    }
  };
  
  return (
    <>
      {cartArray?.length > 0 ? (
        <section className="cart-lamar" id="Cart">
          <div className="nav-container">
            <div className="nav-info">
              <div className="left-nav">
                <Link to="/">
                  <i className="fas fa-home i-home"></i>
                </Link>
                <i className="fas fa-angle-right"></i> <span>Shoping Cart</span>
              </div>
            </div>
          </div>
          <div className="lamar-container">
            <table className="cart-table">
              <thead className="cart-table-head">
                <tr className="cart-table-head-r">
                  <th className="col1">
                    <span>Item</span>
                  </th>
                  <th className="col2">
                    <span>Price</span>
                  </th>
                  <th className="col3">
                    <span>Quantity</span>
                  </th>
                  <th className="col4">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              {cartArray?.map((item, indx) => {
                return (
                  <tbody key={item?.id}>
                    <tr className="cart-table-body-r">
                      <td className="col1">
                        <div className="info">
                          <div className="image">
                            <img src={item.images[0]} alt="" />
                          </div>
                          <div className="info-shop">
                            <h4>{item.code}</h4>
                            <p>
                              <span>size : </span>
                              <strong className="cart-size">{item.size}</strong>
                            </p>
                            <p>
                              <span>color : </span> {item.color}
                            </p>
                            <p>
                              <span>length :</span> {item.tall}
                            </p>
                            <p>
                              <span>buttons :</span> {item.buttons}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="col2">
                        QAR <span>{checkProductDiscounts(item.price, isLoggedIn, signInDiscount, item.discount)}</span>
                      </td>
                      <td className="col3">
                        <div className="quantity">
                          <div className="decrease">
                            <i
                              className="fas fa-minus-square"
                              onClick={() => {
                                decresItem(item, indx);
                              }}
                            ></i>
                          </div>
                          <div className="quantity-q">
                            <span>{cartArray[indx].quantity}</span>
                          </div>
                          <div className="incress">
                            <i
                              className="fas fa-plus-square"
                              onClick={() => {
                                addItem(item, indx);
                              }}
                            ></i>
                          </div>
                        </div>
                      </td>
                      <td className="col4">
                        <div className="actions">
                          <i
                            className="fas fa-trash"
                            onClick={() => {
                              deleteItem(item, indx);
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="summary">
              <h3>summary</h3>
              <hr />
              <div className="sub-total">
                <h4>Subtotal</h4>
                <h5>QAR {total - shippingFees}</h5>
              </div>
              <div className="sub-total">
                <h4>Shipping Fees</h4>
                <h5>QAR {shippingFees}</h5>
              </div>
              <hr />
              <div className="order-total">
                <h4 className="order-total-h2">Order Total</h4>
                <h5 className="order-total-h2">QAR {total}</h5>
              </div>
              <Link to="/Checkout"> next </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart-empty">
          <div className="nav-container">
            <div className="nav-info">
              <div className="left-nav">
                <Link to="/">
                  <i className="fas fa-home i-home"></i>
                </Link>
                <i className="fas fa-angle-right"></i> <span>Shoping Cart</span>
              </div>
            </div>
          </div>
          <div className="cart-container">
            <i className="fas fa-shopping-bag"></i>
            <p>You have no items in your shopping cart.</p>
            <Link to="/Abaya"> Continue Shopping </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
