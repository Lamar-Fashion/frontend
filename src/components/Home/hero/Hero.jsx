import React from 'react';
import '../../../styles/home-styles/hero.css';
import { Carousel } from 'react-bootstrap';
import hero4 from '../../../images/hero/hero4.jpg';
import hero5 from '../../../images/hero/hero5.jpg';
import hero6 from '../../../images/hero/hero6.jpg';
import h1 from "../../../images/hero/h1.jpeg"
import h2 from "../../../images/hero/h2.jpeg"
import h3 from "../../../images/hero/h3.jpeg"
import 'bootstrap/dist/css/bootstrap.min.css';
function Hero() {
  return (
    <>
      <div className='hero'>
        <Carousel className='carousel' fade controls={false} indicators={false} pause={false}>
          <Carousel.Item className='item1'>
            <img src={h1} alt="" />
            {/* <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={h1} alt='First slide' />
              </div>
              <div className='text first-text'>
                <h2 className='h1'>new arrivals</h2>
                <h4 className='h2'>Style & Comfort</h4>
              </div>
            </div> */}
          </Carousel.Item>

          <Carousel.Item className='item2'>
          <img src={h2} alt="" />
            {/* <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={h2} alt='First slide' />
              </div>
              <div className='text second-text'>
                <h2 className='h1'>Define fashion</h2>
                <h4 className='h2'>with Lamar</h4>
              </div>
            </div> */}
          </Carousel.Item>
          <Carousel.Item className='item3'>
          <img src={h3} alt="" />
            {/* <div className='lamar-container'>
              <div className='image'>
                <img className='d-block w-100' src={h3} alt='First slide' />
              </div>
              <div className='text third-text'>
                <h2 className='h1 '>stand out</h2>
                <h4 className='h2 '>from the crowd</h4>
              </div>
            </div> */}
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default Hero;
