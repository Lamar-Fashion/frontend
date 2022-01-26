import { useState } from 'react';
import '../../../styles/admin/pending-orders/order.css';

function Order({ order, idx }) {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <div className='orderContainer'>
        <span>{idx + 1}</span>
        {openDetails && (
          <div className='detailsBox'>
            <section className='orderInfo'>
              <h5 className='title-info'>Order Info:</h5>
              <table className='order-table'>
                <tr>
                  <th>order Status:</th>
                  <td>{order.orderStatus}</td>
                </tr>
                <tr className='order-row'>
                  <th>Order ID</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Is Paid Successfully?</th>
                </tr>
                <tr className='order-row'>
                  <td>{order.orderId}</td>
                  <td>{order.orderTotalPrice}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.isPaidSuccessfully}</td>
                </tr>
                <tr className='order-column'>
                  <th>Order ID</th>
                  <td>{order.orderId}</td>
                </tr>
                <tr className='order-column'>
                  <th>Total Price</th>
                  <td>{order.orderTotalPrice}</td>
                </tr>
                <tr className='order-column'>
                  <th>Payment Method</th>
                  <td>{order.paymentMethod}</td>
                </tr>
                <tr className='order-column'>
                  <th>Is Paid Successfully?</th>
                  <td>{order.isPaidSuccessfully}</td>
                </tr>
                <tr>
                  <th>client Comments:</th>
                  <td>{order.clientComments}</td>
                </tr>
              </table>
            </section>
            <section className='clientInfo'>
              <h5 className='title-info'>Client Info:</h5>
              <table className='client-table'>
                <tr className='client-row'>
                  <th>Name</th>
                  <th>phone</th>
                  <th>email</th>
                  <th>country</th>
                  <th>city</th>
                  <th>Zone</th>
                  <th>Street Address</th>
                  <th>Flat Number</th>
                </tr>
                <tr className='client-row'>
                  <td>{order.Fname + ' ' + order.Lname}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>{order.country}</td>
                  <td>{order.city}</td>
                  <td>{order.Zone}</td>
                  <td>{order.StreetAddress}</td>
                  <td>{order.FlatNumber}</td>
                </tr>
                <tr className='client-column'>
                  <th>Name</th>
                  <td>{order.Fname + ' ' + order.Lname}</td>
                </tr>
                <tr className='client-column'>
                  <th>phone</th>
                  <td>{order.phone}</td>
                </tr>
                <tr className='client-column'>
                  <th>email</th>
                  <td>{order.email}</td>
                </tr>
                <tr className='client-column'>
                  <th>country</th>
                  <td>{order.country}</td>
                </tr>
                <tr className='client-column'>
                  <th>city</th>
                  <td>{order.city}</td>
                </tr>
                <tr className='client-column'>
                  <th>Zone</th>

                  <td>{order.Zone}</td>
                </tr>
                <tr className='client-column'>
                  <th>Street</th>
                  <td>{order.StreetAddress}</td>
                </tr>
                <tr className='client-column'>
                  <th>Flat Num.</th>
                  <td>{order.FlatNumber}</td>
                </tr>
              </table>
            </section>

            <section className='productsContainer'>
              {order.orderedProducts.map((product, idx) => {
                return (
                  <>
                    <div className='product'>
                      <img src={product.image} alt='prdoctImage' />
                      <table className='product-table'>
                        <tr className='product-row'>
                          <th>model Num.</th>
                          <th>price</th>
                          <th>quantity</th>
                          <th>color</th>
                          <th>size</th>
                          <th>length</th>
                          <th>buttouns</th>
                          <th>in Stock Qnt.</th>
                          <th>availability</th>
                          <th>category</th>
                          <th>status</th>
                          <th>delivery Time</th>
                        </tr>
                        <tr className='product-row'>
                          <td>{product.modelNum}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.color}</td>
                          <td>{product.size}</td>
                          <td>{product.length}</td>
                          <td>{product.buttouns}</td>
                          <td>{product.inStockQuantity}</td>
                          <td>{product.availability}</td>
                          <td>{product.category}</td>
                          <td>{product.status}</td>
                          <td>{product.status == 'ready to wear' ? '1-5 days' : '1-2 weeks'}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>model Num.</th>
                          <td>{product.modelNum}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>price</th>
                          <td>{product.price}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>quantity</th>
                          <td>{product.quantity}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>color</th>
                          <td>{product.color}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>size</th>
                          <td>{product.size}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>length</th>
                          <td>{product.length}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>buttouns</th>
                          <td>{product.buttouns}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>in Stock Qnt.</th>
                          <td>{product.inStockQuantity}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>availability</th>
                          <td>{product.availability}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>category</th>
                          <td>{product.category}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>status</th>
                          <td>{product.status}</td>
                        </tr>
                        <tr className='product-column'>
                          <th>delivery Time</th>
                          <td>{product.status == 'ready to wear' ? '1-5 days' : '1-2 weeks'}</td>
                        </tr>
                      </table>
                    </div>
                  </>
                );
              })}
            </section>

            <section className='control'>
              <button className='button'>Done</button>
              <button className='button'>Reject</button>
            </section>
          </div>
        )}

        {!openDetails && (
          <div className='smallBox'>
            <span className='orderId'>
              Order ID: <span>{order.orderId}</span>
            </span>
            <span className='total-price'>
              Total Price: <span>{order.orderTotalPrice}</span>
            </span>
            <span className='status'>
              Status: <span>{order.orderStatus}</span>
            </span>
          </div>
        )}
        <i
          className={openDetails ? 'fas fa-angle-up' : 'fas fa-angle-down'}
          onClick={() => {
            setOpenDetails(!openDetails);
          }}
        ></i>
      </div>
    </>
  );
}

export default Order;
