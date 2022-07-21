/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import '../../styles/footer-styles/footer.css';
import master from '../../images/header/MasterCard_Logo.svg.png';
import visa from '../../images/header/Visa_Logo.png';
import apple_pay from '../../images/header/apple-pay.png';
import cash from '../../images/header/cash-on-delivery.png';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
      <div className='footer'>
        <div className='lamar-container'>
          <div className='box'>
            <h4>Lamar Fashion</h4>
            <ul className='social'>
              <li>
                <a href='https://m.facebook.com/Lamar-Fashion-Qatar-100896018825886/' className='facebook' target='_blank'>
                  <i className='fab fa-facebook-f'></i>
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/lamarfashion.qa?utm_medium=copy_link' className='instagram' target='_blank'>
                  <i className='fab fa-instagram'></i>
                </a>
              </li>
              {/* <li>
                <a href='https://m.facebook.com/Lamar-Fashion-Qatar-100896018825886/' className='twitter' target='_blank'>
                  <i className='fab fa-twitter'></i>
                </a>
              </li> */}
            </ul>
            <p className='text'>Lamar Fashion,You Can Find Us All Time 
            Lorem ipsum dolor sit,</p>
          </div>
          <div className='box'>
            <ul className='links'>
              <li>
                <Link
                  to='/AboutUs'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <i className='fas fa-angle-double-right'></i> About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/DeliveryPolicy'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <i className='fas fa-angle-double-right'></i> Delivery
                </Link>
              </li>
              <li>
                <Link
                  to='/PrivacyPolicy'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <i className='fas fa-angle-double-right'></i> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='/Contact-us'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <i className='fas fa-angle-double-right'></i> Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className='box'>
            <div className='container-line'>
              <div className='line'>
                <i className='fas fa-map-marker-alt fa-fw'></i>
                <div className='info'>
                  <span>Doha, Qatar</span>
                </div>
              </div>
              <div className='line'>
                <i className='far fa-paper-plane fa-fw'></i>
                <div className='info'>
                  <span>
                    <a href='mailto:Info@lamarfashion.qa' target='_blank'>
                      Info@lamarfashion.qa
                    </a>
                  </span>
                </div>
              </div>
              <div className='line'>
                <i className='fab fa-whatsapp fa-fw'></i>
                <div className='info'>
                  <span>
                    <a href='http://wa.me/+97466881109' target='_blank'>
                      +974 66881109
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='box footer-gallery'>
            <img src='https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg' alt='' />
            <img src='https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg' alt='' />
            <img src='https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg' alt='' />
            <img src='https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg' alt='' />
            <img src='https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg' alt='' />
            <img src='https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg' alt='' />
          </div>
        </div>
        <div className='footer-pay'>
          <div className='lamar-container'>
            <p className='copyright' > <a className='copyright' href='http://wa.me/+96288846082' target='_blank'>Powered By A.A 💻
              </a></p>
            <div className='info-pay'>
              {/* <a href='#policy'>
                <div className='image'>
                  <img src={visa} alt='' />
                </div>
              </a>
              <a href='#policy'>
                <div className='image pay-pal'>
                  <img src={apple_pay} alt='' />
                </div>
              </a>
              <a href='#policy'>
                <div className='image'>
                  <img src={master} alt='' />
                </div>
              </a> */}
              <a href='#policy'>
                <div className='image'>
                  <img src={cash} alt='' />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
