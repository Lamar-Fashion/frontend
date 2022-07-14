import React from 'react';
import '../../../styles/home-styles/hero.css';
import hero6 from '../../../images/hero/hero6.jpg';
import { Link } from 'react-router-dom';
import {navigateAction} from '../../../store/actions/index';
import {useDispatch} from 'react-redux';

function Hero() {
  const dispatch = useDispatch();

  return (
    <>
      <div className='hero'>
        <div className='lamar-container'>
          <div className='info'>
            <div className='top-info'>
              <h3>A325s</h3>
              <h3>New Arrivals</h3>
              <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsa fuga ad quidem, labore in! Cupiditate voluptate nobis </h5>
            </div>
            <div className='bottom-info'>
              <h6> QAR 300 </h6>
              <Link to='/Abaya' onClick={()=>{
dispatch(navigateAction('all'));
}}>Shop Now</Link>
            </div>
          </div>
          <div className='imag-detail'>
            <div className='image'>
              <img src={hero6} alt='' />
            </div>
            <div className='add-cart'>
              <Link to='/Abaya'>
                <div className='plus-container'>
                  <i className='fas fa-arrow-right'></i>{' '}
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
