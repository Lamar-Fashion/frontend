import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Cart/cart.css';
function Cart() {
  const [cartArray, setCartArray] = useState(JSON.parse(window.localStorage.getItem('cart')));
  const [quantity, setQuantity] = useState({});
  const [total, setTotal] = useState(0);
  let price = cartArray.map((item) => item.price);
  let sum = 0;

  // useEffect(() => {
  //   setCartArray(JSON.parse(window.localStorage.getItem('cart')));

  //   for (let i = 0; i < price.length; i++) {
  //     sum += Number(price[i]);
  //   }
  // }, [cartArray, sum]);
  useEffect(() => {
    console.log('quantity', quantity);
  }, [quantity]);
  useEffect(() => {
    let summ = 0;

    console.log('cartArray', cartArray);
    cartArray.map((item) => (summ += Number(item.price)));
    setTotal(summ);
  }, []);

  const deleteItem = (item, indx) => {
    console.log(indx);
    cartArray.splice(Number(indx), 1);
    window.localStorage.setItem('cart', JSON.stringify(cartArray));
    setTotal(total - Number(item.price));
  };
  const addItem = (item, indx) => {
    setQuantity({ ...quantity, [indx]: quantity[indx] ? quantity[indx] + 1 : 2 });
    setTotal(total + Number(item.price));
  };
  const decresItem = (item, indx) => {
    if (quantity[indx] > 1) {
      // setQuantity(quantity - 1);
      setQuantity({ ...quantity, [indx]: quantity[indx] ? quantity[indx] - 1 : 1 });

      setTotal(total - item.price);
    }
  };
  return (
    <>
      {cartArray.length > 0 ? (
        <section className='cart-lamar' id='Cart'>
          <div className='lamar-container'>
            <div className='cart-container '>
              <div className='path'>
                <Link to='/'>
                  <i class='fas fa-home'></i>
                </Link>{' '}
                <i class='fas fa-angle-right'></i> <span>Shoping Cart</span>
              </div>

              <div className='total'>
                <h4>
                  Order Total :{' '}
                  <span>
                    QAR <span>{total}</span>{' '}
                  </span>
                </h4>
                <div className='go-check'>
                  <Link to='/Checkout'>
                    Next <i class='fas fa-angle-right'></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='lamar-container'>
            <table className='cart-table' style={{ width: '90%', margin: '0 auto' }}>
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
              {cartArray.map((item, indx) => {
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
                              <span>size :</span>
                              {item.size.map((i) => (
                                <strong className='cart-size'>{i}</strong>
                              ))}
                            </p>
                            <p>
                              <span>color :</span> {item.color.map((i) => i + ' ') + ' '}
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
                              class='fas fa-minus-square'
                              onClick={() => {
                                decresItem(item, indx);
                              }}
                            ></i>
                          </div>
                          <div className='quantity-q'>
                            <span>{quantity[indx] ? quantity[indx] : 1}</span>
                          </div>
                          <div className='incress'>
                            <i
                              class='fas fa-plus-square'
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
                            class='fas fa-trash'
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
          </div>
        </section>
      ) : (
        <section className='cart-empty'>
          <div className='lamar-container'>
            <div className='path'>
              <Link to='/'>
                <i class='fas fa-home'></i>
              </Link>{' '}
              <i class='fas fa-angle-right'></i> <span>Shoping Cart</span>
            </div>
          </div>
          <div className='cart-container'>
            <i class='fas fa-shopping-bag'></i>
            <p>You have no items in your shopping cart.</p>
            <Link to='/'> Continue Shopping </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;