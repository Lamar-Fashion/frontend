import React from 'react';
import '../../../styles/abaya-styles/abaya-hero.css';
import lamar from '../../../images/header/lamar-logo-small.png';
function AbayaHero() {
  let array = new Array(30).fill(1);

  return (
    <>
      <div className='container-abaya-hero'>
        <div className='abaya-hero'>
          <h4 className='hero-text'>shop Abaya & find modern deisgns</h4>
        </div>
      </div>
    </>
  );
}

export default AbayaHero;
