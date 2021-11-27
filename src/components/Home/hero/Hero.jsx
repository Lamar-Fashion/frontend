import React from 'react';
import hero from '../../../images/hero.jpg';
import '../../../home-styles/hero.css';
import { Carousel } from 'react-bootstrap';
import shop1 from '../../../images/hero/hero1.png';
import shop2 from '../../../images/hero/hero2.png';
import shop3 from '../../../images/hero/hero3.png';
import shop4 from '../../../images/shop/shop4.jpeg';

function Hero() {
  return (
    <>
      <div className='hero'>
        <Carousel className='carousel' fade controls={false} indicators={false} pause={false}>
          <Carousel.Item className='carouselItem'>
            <img className='d-block w-100' src={shop1} alt='First slide' />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className='carouselItem'>
            <img className='d-block w-100' src={shop2} alt='Second slide' />

            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className='carouselItem'>
            <img className='d-block w-100' src={shop3} alt='Third slide' />

            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Hero;
