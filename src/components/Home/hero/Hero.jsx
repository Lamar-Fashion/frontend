import React from 'react';
import '../../../styles/home-styles/hero.css';
import hero6 from '../../../images/hero/hero6.jpg';
import { Link } from 'react-router-dom';
function Hero() {
  return (
    <>
      <div class='hero'>
        <div class='lamar-container'>
          <div class='info'>
            <div class='top-info'>
              <h3>A325s</h3>
              <h3>New Arrivals</h3>
              <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsa fuga ad quidem, labore in! Cupiditate voluptate nobis </h5>
            </div>
            <div class='bottom-info'>
              <h6> QAR 300 </h6>
              <Link to='/Abaya'>Shop Now</Link>
            </div>
          </div>
          <div class='imag-detail'>
            <div class='image'>
              <img src={hero6} alt='' />
            </div>
            <div class='add-cart'>
              <Link to='/Abaya'>
                <div className='plus-container'>
                  <i class='fas fa-arrow-right'></i>{' '}
                </div>
                <h6>Discover</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
