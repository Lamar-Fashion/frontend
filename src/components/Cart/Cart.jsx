import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Cart/cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../../store/actions';
function Cart() {
  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState(JSON.parse(window.sessionStorage.getItem('cart')));
  const [quantity, setQuantity] = useState({});
  const [total, setTotal] = useState(0);
  window.sessionStorage.setItem('total', JSON.stringify(total));

  useEffect(() => {}, [quantity]);
  useEffect(() => {
    let summ = 0;
    cartArray?.map((item) => (summ += Number(item.price) * Number(item.quantity)));
    setTotal(summ);
  }, []);

  const deleteItem = (item, indx) => {
    cartArray.splice(Number(indx), 1);
    window.sessionStorage.setItem('cart', JSON.stringify(cartArray));
    console.log('item', item);
    // update redux with cart number
    dispatch(removeFromCartAction(item.quantity));
    setTotal(total - Number(item.price));
  };
  const addItem = (item, indx) => {
    setQuantity({ ...quantity, [indx]: quantity[indx] ? quantity[indx] + 1 : 2 });
    cartArray[indx].quantity = item.quantity + 1;
    window.sessionStorage.setItem('cart', JSON.stringify(cartArray));
    // update redux with cart number
    dispatch(addToCartAction());
    setTotal(total + Number(item.price));
  };
  const decresItem = (item, indx) => {
    if (item.quantity > 1) {
      setQuantity({ ...quantity, [indx]: quantity[indx] ? quantity[indx] - 1 : 1 });
      cartArray[indx].quantity = item.quantity - 1;
      window.sessionStorage.setItem('cart', JSON.stringify(cartArray));
      // update redux with cart number
      dispatch(removeFromCartAction());
      setTotal(total - item.price);
    }
  };
  return (
    <>
      {cartArray?.length > 0 ? (
        <section className='cart-lamar' id='Cart'>
          <div className='nav-container'>
            <div className='nav-info'>
              <div className='left-nav'>
                <Link to='/'>
                  <i className='fas fa-home i-home'></i>
                </Link>
                <i className='fas fa-angle-right'></i> <span>Shoping Cart</span>
              </div>
              {/* <div className="right-nav">
            <Link to="/Checkout"> <span className="exat-path">Next</span> </Link>
          </div> */}
            </div>
          </div>
          <div className='lamar-container'>
            <table
              className='cart-table'
              //  style={{ width: '90%', margin: '0 auto' }}
            >
              <thead className='cart-table-head'>
                <tr className='cart-table-head-r'>
                  <th className='col1'>
                    <span>Item</span>
                  </th>
                  <th className='col2'>
                    <span>Price</span>
                  </th>
                  <th className='col3'>
                    <span>Quantity</span>
                  </th>
                  <th className='col4'>
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              {cartArray?.map((item, indx) => {
                return (
                  <tbody>
                    <tr className='cart-table-body-r'>
                      <td className='col1'>
                        <div className='info'>
                          <div className='image'>
                            <img src={item.images[0]} alt='' />
                          </div>
                          <div className='info-shop'>
                            <h4>{item.name}</h4>
                            <p>
                              <span>size : </span>
                              <strong className='cart-size'>{item.size}</strong>
                            </p>
                            <p>
                              <span>color : </span> {item.color}
                            </p>
                            <p>
                              <span>tall :</span> {item.tall}
                            </p>
                            <p>
                              <span>buttons :</span> {item.buttons}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='col2'>
                        QAR <span>{item.price}</span>
                      </td>
                      <td className='col3'>
                        <div className='quantity'>
                          <div className='decrease'>
                            <i
                              className='fas fa-minus-square'
                              onClick={() => {
                                decresItem(item, indx);
                              }}
                            ></i>
                          </div>
                          <div className='quantity-q'>
                            {/* <span>{quantity[indx] ? quantity[indx] : 1}</span> */}
                            <span>{cartArray[indx].quantity}</span>
                          </div>
                          <div className='incress'>
                            <i
                              className='fas fa-plus-square'
                              onClick={() => {
                                addItem(item, indx);
                              }}
                            ></i>
                          </div>
                        </div>
                      </td>
                      <td className='col4'>
                        <div className='actions'>
                          <i
                            className='fas fa-trash'
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
            <div className='summary'>
              <h3>summary</h3>
              <hr />
              <div className='sub-total'>
                <h4>Subtotal</h4>
                <h5>QAR {total}</h5>
              </div>
              <div className='sub-total'>
                <h4>Shipping (Free Shipping - Free)</h4>
                <h5>QAR 0.00</h5>
              </div>
              <hr />
              <div className='order-total'>
                <h4 className='order-total-h2'>Order Total</h4>
                <h5 className='order-total-h2'>QAR {total}</h5>
              </div>
              <Link to='/Checkout'> next </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className='cart-empty'>
          <div className='nav-container'>
            <div className='nav-info'>
              <div className='left-nav'>
                <Link to='/'>
                  <i className='fas fa-home i-home'></i>
                </Link>
                <i className='fas fa-angle-right'></i> <span>Shoping Cart</span>
              </div>
            </div>
          </div>
          <div className='cart-container'>
            <i className='fas fa-shopping-bag'></i>
            <p>You have no items in your shopping cart.</p>
            <Link to='/Abaya'> Continue Shopping </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
