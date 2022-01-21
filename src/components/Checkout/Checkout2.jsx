import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/checkout/checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout2() {
  const navigate = useNavigate();
  const InformationData = JSON.parse(window.sessionStorage.getItem('checkout_person_info'));
  let [values, setValues] = useState(JSON.parse(window.sessionStorage.getItem('checkout_person_info')) ? JSON.parse(window.sessionStorage.getItem('checkout_person_info')) : {});

  const cartArray = JSON.parse(window.sessionStorage.getItem('cart'));
  const total = JSON.parse(window.sessionStorage.getItem('total'));
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    window.sessionStorage.setItem('checkout_person_info', JSON.stringify(values));
    navigate('/Checkout3');
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <section className='checkout'>
        <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i>
              <Link to='/Cart' className='exat-path'>
                {' '}
                <span>cart</span>
              </Link>
              <i className='fas fa-angle-right'></i>{' '}
              <Link to='/Checkout' className='exat-path'>
                {' '}
                <span>Shipping</span>
              </Link>
              <i className='fas fa-angle-right'></i> <span>Payment</span>
            </div>
          </div>
        </div>

        <div className='lamar-container'>
          <h2>
            <span>
              Shipping <i className='far fa-check-circle'></i>
            </span>{' '}
            <i className='fas fa-angle-right'></i>{' '}
            <span className='active'>
              Review & Payments<span className='steps'>2</span>
            </span>
            <i className='fas fa-angle-right'></i>
            <span>
              Order Complete <span className='steps'>3</span>
            </span>
          </h2>
          <div className='container-payment'>
            <div className='Shipping-info'>
              <h4 className='Shipping-title'>Shipping Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td className='td1'>contact</td>
                    <td className='td2'>{InformationData.email}</td>
                    <td className='td3'>
                      <Link to='/Checkout'>change</Link>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className='td1'>Ship to</td>
                    <td className='td2'>{InformationData.city + ' ,' + InformationData.Zone}</td>
                    <td className='td3'>
                      <Link to='/Checkout'>change</Link>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className='td1'>Method</td>
                    <td className='td2'>Free Shipping - Free</td>
                    <td className='td3'>
                      <Link to='/Checkout'>change</Link>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className='tr-text'>
                    <textarea name='comment' id='comment' cols='30' rows='10' placeholder='Leave A Comment' value={values?.comment} onChange={handleChange}></textarea>
                  </tr>
                </tbody>
              </table>
              <button className='next' onClick={handleClick}>
                continue to payment
              </button>
            </div>
            <div className='summary'>
              <h3>Order summary</h3>
              <hr />
              <div className='container-info'>
                {cartArray?.map((item, indx) => {
                  return (
                    <>
                      <div className='info-products'>
                        <div className='info'>
                          <div className='image'>
                            <img src={item.images[0]} alt='' />
                            <div className='qunt'>
                              <h5>{item.quantity}</h5>
                            </div>
                          </div>
                          <div className='details'>
                            <h4>{item.name}</h4>
                            <p>size: {item.size}</p>
                            <p>color: {item.color}</p>
                            <p>tall: {item.tall}</p>
                            <p>buttons:{item.buttons}</p>
                          </div>
                        </div>
                        <div className='price'>
                          <h4>QAR {item.price}</h4>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              <hr />
              <div className='total'>
                <h4>Total</h4>
                <h4>QAR {total}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout2;
