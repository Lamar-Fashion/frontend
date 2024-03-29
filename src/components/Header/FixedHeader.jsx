/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/header-styles/fixed-header.css';

function FixedHeader() {
  return (
    <>
      <div className='fixed-header'>
        <div className='lamar-container'>
          <section className='contact-container'>
            <div className='contact-info'>
              <i className='fab fa-whatsapp fa-fw icon'></i>
              <a className='contact-text' href='http://wa.me/+97466881109' target='_blank'>
                +974 66881109
              </a>
            </div>
            <div className='contact-info email'>
              <i className='far fa-envelope icon'></i>
              <a className='contact-text' href='mailto:info@lamarfashion.qa' target='_blank'>
                info@lamarfashion.qa
              </a>
            </div>
          </section>
          <section className='icons-container'>
            <a className='icons' href='https://m.facebook.com/Lamar-Fashion-Qatar-100896018825886/' target='_blank'>
              <i className='fab fa-facebook'></i>
            </a>

            <a className='icons' href='https://www.instagram.com/lamarfashion.qa?utm_medium=copy_link' target='_blank'>
              <i className='fab fa-instagram'></i>
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

export default FixedHeader;
