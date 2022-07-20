/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/header-styles/fixed-header.css';
import axios from 'axios';

function FixedHeader() {
  const testAPI = async()=>{
    const data = {
      "turn": "white",
      "bitboard": [
          {
              "low": 604035840,
              "high": 16187400
          },
          {
              "low": 66,
              "high": 1074266112
          },
          {
              "low": 36,
              "high": 603979776
          },
          {
              "low": 129,
              "high": 2164260864
          },
          {
              "low": 8,
              "high": 134217728
          },
          {
              "low": 16,
              "high": 268435456
          },
          {
              "low": 604036095,
              "high": 0
          },
          {
              "low": 0,
              "high": 4261347336
          }
      ]
    }
      const resp = await axios.post(`https://ph17zlvy1k.execute-api.us-east-1.amazonaws.com/Prod/find-move`,JSON.stringify(data),{
        headers:{
          "x-api-key" : "0MvB1JLGlk1xdPHuuLJa08pWZd5G3eWU519bjXbK"

        }
      });
    
      console.log('resss',resp);
    }
  return (
    <>
      <div className='fixed-header'>
        <div className='lamar-container'>
          <section className='contact-container'>
            {/* <div className='contact-info location'>
              <i className='fas fa-map-marker-alt fa-fw icon'></i>

              <p className='contact-text'>Suhaim Bin Hamad Street, Doha, Qatar</p>
            </div> */}
            <div className='contact-info'>
              <i className='fab fa-whatsapp fa-fw icon'></i>
              <a className='contact-text' href='http://wa.me/+97466881109' target='_blank'>
                +974 66881109
              </a>
            </div>
            <div className='contact-info email'>
              <i className='far fa-envelope icon'></i>
              <a className='contact-text' href='mailto:Info@lamarfashion.qa' target='_blank'>
                Info@lamarfashion.qa
              </a>
            </div>
          </section>
          <section className='icons-container'>
            <a className='icons' href='https://m.facebook.com/Lamar-Fashion-Qatar-100896018825886/' target='_blank'>
              <i className='fab fa-facebook'></i>
            </a>
            <a onClick={testAPI}>test</a>

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
