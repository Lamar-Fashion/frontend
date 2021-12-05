import React from 'react';
import '../../../home-styles/hero.css';
import { Carousel } from 'react-bootstrap';
import hero4 from '../../../images/hero/hero4.jpeg';
import hero5 from '../../../images/hero/hero5.jpeg';
import hero6 from '../../../images/hero/hero6.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
function Hero() {
  return (
    <>
      <div className='hero'>
        <Carousel className='carousel' fade controls={false} indicators={false} pause={false}>
          <Carousel.Item className='item1'>
            <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={hero4} alt='First slide' />
              </div>
              <div className='text'>
                <h2 className='h1'>new arrivals</h2>
                <h4 className='h2'>Style & Comfort</h4>
              </div>
              <section className='lamar-logo'>www.lamar-fashion.com</section>
            </div>
          </Carousel.Item>

          <Carousel.Item className='item2'>
            <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={hero5} alt='First slide' />
              </div>
              <div className='text'>
                <h2 className='h1'>Lamar Fashion</h2>
                <h4 className='h2'>match your needs..</h4>
              </div>
              <section className='lamar-logo'>www.lamar-fashion.com</section>
            </div>
          </Carousel.Item>
          <Carousel.Item className='item3'>
            <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={hero6} alt='First slide' />
              </div>
              <div className='text'>
                <h2 className='h1'>50% off</h2>
                <h4 className='h2'>shop now</h4>
              </div>
              <section className='lamar-logo'>www.lamar-fashion.com</section>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Hero;
