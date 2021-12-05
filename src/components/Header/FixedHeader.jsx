import React from 'react';
import '../../header-styles/fixed-header.css';

function FixedHeader() {
  return (
    <>
      <div className='fixed-header'>
        <div className='lamar-container'>
          <section className='contact-container'>
            <div className='contact-info location'>
              <i className='fas fa-map-marker-alt fa-fw icon'></i>

              <p className='contact-text'>Suhaim Bin Hamad Street, Doha, Qatar</p>
            </div>
            <div className='contact-info'>
              <i className='fas fa-phone-volume fa-fw icon'></i>

              <p className='contact-text'>+974 5010 9900</p>
            </div>
            <div className='contact-info email'>
              <i class='far fa-envelope icon'></i>
              <p className='contact-text'>lamar@lamar-fashion.com</p>
            </div>
          </section>
          <section className='icons-container'>
            <div className='icons'>
              <i class='fab fa-facebook'></i>
            </div>
            <div className='icons'>
              <i class='fab fa-instagram'></i>
            </div>
            <div className='icons'>
              <i class='fab fa-twitter'></i>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default FixedHeader;
