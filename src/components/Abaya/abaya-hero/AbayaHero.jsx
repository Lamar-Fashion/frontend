import React from 'react';
import '../../../styles/abaya-styles/abaya-hero.css';
import lamar from '../../../images/header/lamar-logo-small.png';
function AbayaHero() {
  let array = new Array(30).fill(1);

  return (
    <>
      <div className='container-abaya-hero'>
        <div className='abaya-hero'>
          <div className='info-text'>
            <h3> fashion</h3>
            <h2>abaya</h2>
            <button
              className='shop-now'
              onClick={() => {
                window.location.href = '#Abaya';
              }}
            >
              shop-now
            </button>
          </div>
        </div>
        <div className='abaya-slider'>
          <div className='slide-trick'>
            {array.map((item) => (
              <div className='slide'>
                <img src={lamar} alt='' width='65px' height='45px' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AbayaHero;
