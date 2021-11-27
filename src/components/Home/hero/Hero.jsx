import React from 'react';
import '../../../home-styles/hero.css';
import { Carousel } from 'react-bootstrap';
import hero4 from '../../../images/hero/hero4.jpeg';
import hero5 from '../../../images/hero/hero5.jpeg';
import hero6 from '../../../images/hero/hero6.jpeg';
import shop2 from '../../../images/hero/hero2.png';
import shop3 from '../../../images/hero/hero3.png';
import 'bootstrap/dist/css/bootstrap.min.css';
function Hero() {
  return (
    <>
      <div className='hero'>
        <Carousel className='carousel' fade controls={false} indicators={false} pause={false}>
          <Carousel.Item className='lamar-container'>
           
              <div className="image">
            <img className='d-block w-100' src={hero4} alt='First slide' />

              </div>
            <div className="text">
              <h2 className="h1">
               marelaa price
              </h2>
              <h4 className="h2">Acting directore</h4>
            </div>
          </Carousel.Item>
          <Carousel.Item className='lamar-container'>
           
              <div className="image">
            <img className='d-block w-100' src={hero5} alt='First slide' />

              </div>
            <div className="text">
              <h2 className="h1">
               marelaa price
              </h2>
              <h4 className="h2">Acting directore</h4>
            </div>
          </Carousel.Item>
          <Carousel.Item className='lamar-container'>
           
              <div className="image">
            <img className='d-block w-100' src={hero6} alt='First slide' />

              </div>
            <div className="text">
              <h2 className="h1">
               marelaa price
              </h2>
              <h4 className="h2">Acting directore</h4>
            </div>
          </Carousel.Item>
          {/* <Carousel.Item className='carouselItem'>
            <img className='d-block w-100' src={shop2} alt='Second slide' />

           
          </Carousel.Item>
          <Carousel.Item className='carouselItem'>
            <img className='d-block w-100' src={shop3} alt='Third slide' />

          
          </Carousel.Item> */}
        </Carousel>
      </div>
    </>
  );
}

export default Hero;
