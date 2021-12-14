import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Cart/cart.css";
function Cart() {
  let array = new Array(5).fill(0);
  return (
    <>
      {/* <section className="cart-empty">
            <div className="lamar-container">
                <div className="path">
                <Link to='/'><i class="fas fa-home"></i></Link>  <i class="fas fa-angle-right"></i>  <span>Shoping Cart</span>
                </div>
            </div>
            <div className="cart-container">
            <i class='fas fa-shopping-bag'></i>
            <p>You have no items in your shopping cart.</p>
           <Link to="/"> Continue Shopping </Link>
            </div>
            </section> */}

      <section className="cart-lamar">
          <div className="lamar-container">
          <div className="cart-container ">
          <div className="path">
            <Link to="/">
              <i class="fas fa-home"></i>
            </Link>{" "}
            <i class="fas fa-angle-right"></i> <span>Shoping Cart</span>
          </div>
          <div className="checkout-cart">
              <Link to="/Checkout">Go To Checkout </Link>
          </div>
          <div className="total">
              <h4>Order Total :  <span>QAR 3600 </span></h4>
          </div>
        </div>
          </div>
        
        <div className="lamar-container">
          <table
            className="cart-table"
            style={{ width: "90%", margin: "0 auto" }}
          >
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
            <tbody>
              <tr className="cart-table-body-r">
                <td className="col1">
                  <div className="info">
                    <div className="image">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xTAf2dSMKFMnjf1Px4nC7J0P-HKTHIWLYA&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className="info-shop">
                      <h4>lamar</h4>
                      <p>
                        <span>size :</span> small
                      </p>
                      <p>
                        <span>color :</span> black
                      </p>
                    </div>
                  </div>
                </td>
                <td className="col2"> QAR 1200</td>
                <td className="col2">
                    <div className="quantity">
                        <div className="decrease"><i class="fas fa-minus-square"></i> </div>
                        <div className="quantity-q"><span >1 </span></div>
                        <div className="incress"><i class="fas fa-plus-square"></i></div>
                        </div> 
                        </td>
                <td className="col2">
                    <div className="actions">
                    <i class="far fa-edit"></i>
                    <i class="fas fa-trash"></i></div> </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="cart-table-body-r">
                <td className="col1">
                  <div className="info">
                    <div className="image">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xTAf2dSMKFMnjf1Px4nC7J0P-HKTHIWLYA&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className="info-shop">
                      <h4>lamar</h4>
                      <p>
                        <span>size :</span> small
                      </p>
                      <p>
                        <span>color :</span> black
                      </p>
                    </div>
                  </div>
                </td>
                <td className="col2"> QAR 1200</td>
                <td className="col2">
                    <div className="quantity">
                        <div className="decrease"><i class="fas fa-minus-square"></i> </div>
                        <div className="quantity-q"><span >1 </span></div>
                        <div className="incress"><i class="fas fa-plus-square"></i></div>
                        </div> 
                        </td>
                <td className="col2">
                    <div className="actions">
                    <i class="far fa-edit"></i>
                    <i class="fas fa-trash"></i></div> </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="cart-table-body-r">
                <td className="col1">
                  <div className="info">
                    <div className="image">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xTAf2dSMKFMnjf1Px4nC7J0P-HKTHIWLYA&usqp=CAU"
                        alt=""
                      />
                    </div>
                    <div className="info-shop">
                      <h4>lamar</h4>
                      <p>
                        <span>size :</span> small
                      </p>
                      <p>
                        <span>color :</span> black
                      </p>
                    </div>
                  </div>
                </td>
                <td className="col2"> QAR 1200</td>
                <td className="col2">
                    <div className="quantity">
                        <div className="decrease"><i class="fas fa-minus-square"></i> </div>
                        <div className="quantity-q"><span >1 </span></div>
                        <div className="incress"><i class="fas fa-plus-square"></i></div>
                        </div> 
                        </td>
                <td className="col2">
                    <div className="actions">
                    <i class="far fa-edit"></i>
                    <i class="fas fa-trash"></i></div> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Cart;
