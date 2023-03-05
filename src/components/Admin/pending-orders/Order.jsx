import { useState } from "react";
import "../../../styles/admin/pending-orders/order.css";
import { instance, url } from "../../../API/axios";
import { useSelector } from "react-redux";

function Order({ order, idx, from }) {
  const user = useSelector((state) => state.authReducer.user);
  const [openDetails, setOpenDetails] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [showRejectionNote, setShowRejectionNote] = useState(false);

  const updatePendingOrder = async (order, newStatus) => {
    if (newStatus === "rejected" && !rejectionNote) {
      setShowRejectionNote(true);
      return;
    }

    try {
      let updatedOrder = order;
      updatedOrder.orderStatus = newStatus;
      if (newStatus === "rejected") {
        updatedOrder.rejectionNote = rejectionNote;
      }
      const response = await instance.put(
        url + `/order${updatedOrder.id}`,
        updatedOrder,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("edit order error", error.message);
    }
  };
  
  return (
    <>
      <div className="orderContainer">
        <span>{idx + 1}</span>
        {openDetails && (
          <div className="detailsBox">
            <section className="orderInfo">
              <h5 className="title-info">Order Info:</h5>
              <table className="order-table">
                <tbody>
                  <tr>
                    <th>order Status:</th>
                    <td>{order.orderStatus}</td>
                  </tr>
                  { order.orderStatus === "rejected" && order.rejectionNote && <tr>
                    <th>Rejection Note:</th>
                    <td>{order.rejectionNote}</td>
                  </tr>}
                  <tr className="order-row">
                    <th>Order ID</th>
                    <th>Total Price</th>
                    {order.promoCodeInfo.isPromoCodeUsed && 
                    <td></td>
                    }
                    <th>Promo Code Applied</th>
                    <th>Promo Code Discount %</th>
                    <th>Payment Method</th>
                    <th>Is Paid Successfully?</th>
                  </tr>
                  <tr className="order-row">
                    <td>{order.orderId}</td>
                    <td className={order.promoCodeInfo.isPromoCodeUsed ? "line-through" : ""}>QAR {order.totalPrice}</td>
                    {order.promoCodeInfo.isPromoCodeUsed && 
                    <td>{order.promoCodeInfo.totalPromoApplied} QAR</td>
                    }
                    <td>{order.promoCodeInfo.isPromoCodeUsed ? order.promoCodeInfo.promoCode.code : ""}</td>
                    <td>{order.promoCodeInfo.isPromoCodeUsed ? order.promoCodeInfo.promoCode.discountPercentage + " %" : ""}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{from == "done" ? "true" : "false"}</td>
                  </tr>
                  <tr className="order-column">
                    <th>Order ID</th>
                    <td>{order.orderId}</td>
                  </tr>
                  <tr className="order-column">
                    <th>Total Price</th>
                    <td className={order.promoCodeInfo.isPromoCodeUsed ? "line-through" : ""}>{order.totalPrice} QAR</td>
                  </tr>
                  {order.promoCodeInfo.isPromoCodeUsed && <tr className="order-column">
                    <th></th>
                    <td>{order.promoCodeInfo.totalPromoApplied} QAR</td>
                  </tr>}
                  <tr className="order-column">
                    <th>Promo Code Applied</th>
                    <td>{order.promoCodeInfo.isPromoCodeUsed ? order.promoCodeInfo.promoCode.code : ""}</td>
                  </tr>
                  <tr className="order-column">
                    <th>Promo Code Discount %</th>
                    <td>{order.promoCodeInfo.isPromoCodeUsed ? order.promoCodeInfo.promoCode.discountPercentage + " %" : ""}</td>
                  </tr>
                  <tr className="order-column">
                    <th>Payment Method</th>
                    <td>{order.paymentMethod}</td>
                  </tr>
                  <tr className="order-column">
                    <th>Is Paid Successfully?</th>
                    <td>{from == "done" ? "true" : "false"}</td>
                  </tr>
                  <tr>
                    <th>client Comments:</th>
                    <td>
                      {order.personalInfo.comment
                        ? order.personalInfo.comment
                        : "no comments"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="clientInfo">
              <h5 className="title-info">Client Info:</h5>
              <table className="client-table">
                <tbody>
                  <tr className="client-row">
                    <th>Name</th>
                    <th>phone</th>
                    <th>email</th>
                    <th>country</th>
                    <th>city</th>
                    <th>Zone</th>
                    <th>Street Address</th>
                    <th>Building Number</th>
                  </tr>

                  <tr className="client-row">
                    <td>
                      {order.personalInfo.Fname +
                        " " +
                        order.personalInfo.Lname}
                    </td>
                    <td>{order.personalInfo.phone}</td>
                    <td>{order.personalInfo.email}</td>
                    <td>{order.personalInfo.country}</td>
                    <td>{order.personalInfo.city}</td>
                    <td>{order.personalInfo.Zone}</td>
                    <td>{order.personalInfo.StreetAddress}</td>
                    <td>{order.personalInfo.FlatNumber}</td>
                  </tr>
                  <tr className="client-column">
                    <th>Name</th>
                    <td>
                      {order.personalInfo.Fname +
                        " " +
                        order.personalInfo.Lname}
                    </td>
                  </tr>
                  <tr className="client-column">
                    <th>phone</th>
                    <td>{order.personalInfo.phone}</td>
                  </tr>
                  <tr className="client-column">
                    <th>email</th>
                    <td>{order.personalInfo.email}</td>
                  </tr>
                  <tr className="client-column">
                    <th>country</th>
                    <td>{order.personalInfo.country}</td>
                  </tr>
                  <tr className="client-column">
                    <th>city</th>
                    <td>{order.personalInfo.city}</td>
                  </tr>
                  <tr className="client-column">
                    <th>Zone</th>

                    <td>{order.personalInfo.Zone}</td>
                  </tr>
                  <tr className="client-column">
                    <th>Street</th>
                    <td>{order.personalInfo.StreetAddress}</td>
                  </tr>
                  <tr className="client-column">
                    <th>Building Num.</th>
                    <td>{order.personalInfo.FlatNumber}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="productsContainer">
              {order.productInfo.map((product, idx) => {
                return (
                  <div className="product" key={product.id}>
                    <img src={product.images[0]} alt="prdoctImage" />
                    <table className="product-table">
                      <tbody>
                        <tr className="product-row">
                          <th>model Num.</th>
                          <th>price</th>
                          <th>quantity</th>
                          <th>color</th>
                          <th>size</th>
                          <th>length</th>
                          <th>buttons</th>
                          <th>in Stock Qnt.</th>
                          <th>availability</th>
                          <th>category</th>
                          <th>status</th>
                          <th>delivery Time</th>
                        </tr>
                        <tr className="product-row">
                          <td>{product.code}</td>
                          <td>QAR {product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.color}</td>
                          <td>{product.size}</td>
                          <td>{product.tall}</td>
                          <td>{product.buttons}</td>
                          <td>{product.inStock}</td>
                          <td>
                            {product.inStock > 0 ? "in Stock" : "Out Of Stock"}
                          </td>
                          <td>
                            {product.category == "newArrivals"
                              ? "New Arrivals"
                              : "On Sales"}
                          </td>
                          <td>
                            {product.status == "readyToWear"
                              ? "Ready To Wear"
                              : "يحتاج الى تفصيل"}
                          </td>
                          <td>
                            {product.status == "readyToWear"
                              ? "1-5 days"
                              : "1-2 weeks"}
                          </td>
                        </tr>
                        <tr className="product-column">
                          <th>model Num.</th>
                          <td>{product.code}</td>
                        </tr>
                        <tr className="product-column">
                          <th>price</th>
                          <td>QAR {product.price}</td>
                        </tr>
                        <tr className="product-column">
                          <th>quantity</th>
                          <td>{product.quantity}</td>
                        </tr>
                        <tr className="product-column">
                          <th>color</th>
                          <td>{product.color}</td>
                        </tr>
                        <tr className="product-column">
                          <th>size</th>
                          <td>{product.size}</td>
                        </tr>
                        <tr className="product-column">
                          <th>length</th>
                          <td>{product.tall}</td>
                        </tr>
                        <tr className="product-column">
                          <th>buttons</th>
                          <td>{product.buttons}</td>
                        </tr>
                        <tr className="product-column">
                          <th>in Stock Qnt.</th>
                          <td>{product.inStock}</td>
                        </tr>
                        <tr className="product-column">
                          <th>availability</th>
                          <td>
                            {product.inStock > 0 ? "in Stock" : "Out Of Stock"}
                          </td>
                        </tr>
                        <tr className="product-column">
                          <th>category</th>
                          <td>
                            {product.category == "newArrivals"
                              ? "New Arrivals"
                              : "On Sales"}
                          </td>
                        </tr>
                        <tr className="product-column">
                          <th>status</th>
                          <td>
                            {product.status == "readyToWear"
                              ? "Ready To Wear"
                              : "يحتاج الى تفصيل"}
                          </td>
                        </tr>
                        <tr className="product-column">
                          <th>delivery Time</th>
                          <td>
                            {product.status == "readyToWear"
                              ? "1-5 days"
                              : "1-2 weeks"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </section>
            {showRejectionNote && 
              <textarea className={showRejectionNote && !rejectionNote ?"error rejection-note": "rejection-note"} type="text" placeholder="rejection note" onChange={(e)=> setRejectionNote(e.target.value)}>
              </textarea>
            }
            {showRejectionNote && !rejectionNote && <span className="text-danger">Required.</span>}
            {order.orderStatus == "pending" && (
              <section className="control">
                <button
                  className="button"
                  onClick={() => updatePendingOrder(order, "done")}
                >
                  Done
                </button>
                <button
                  className="button"
                  onClick={() => updatePendingOrder(order, "rejected")}
                >
                  Reject
                </button>
              </section>
            )}
          </div>
        )}

        {!openDetails && (
          <div className="smallBox">
            <span className="orderId">
              Order ID: <span>{order.orderId}</span>
            </span>
            <span className="total-price">
              Total Price: <span>QAR {order.promoCodeInfo.isPromoCodeUsed ? order.promoCodeInfo.totalPromoApplied : order.totalPrice}</span>
            </span>
            <span className="status">
              Status: <span>{order.orderStatus}</span>
            </span>
          </div>
        )}
        <i
          className={openDetails ? "fas fa-angle-up" : "fas fa-angle-down"}
          onClick={() => {
            setOpenDetails(!openDetails);
          }}
        ></i>
      </div>
    </>
  );
}

export default Order;
