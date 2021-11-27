/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import shera from '../../../images/brand/shera.png';
import lamar from '../../../images/brand/lamar.png';
import neo from '../../../images/brand/neo.png';
import '../../../home-styles/products.css';
function Slider() {
    return (
        <>
        <section className="multi-slider">
        <div className='lamar-container'>
          <ul id='autoWidth' className='cs-hidden'>
            <li className='item-a'>
              <div className='box'>
                <div className='slide-img'>
                  <img src={shera} alt='' />

                  <div className='overlay'>
                    <a href='#' className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#'>alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#' className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-b'>
              <div className='box'>
                <div className='slide-img'>
                <img src={lamar} alt='' />

                  <div className='overlay'>
                    <a href='#' className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#'>alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#' className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-c'>
              <div className='box'>
                <div className='slide-img'>
                <img src={neo} alt='' />

                  <div className='overlay'>
                    <a href='#' className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href=''>alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#' className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-d'>
              <div className='box'>
                <div className='slide-img'>
                <img src={lamar} alt='' />

                  <div className='overlay'>
                    <a href='#' className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#' >alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#'  className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-e'>
              <div className='box'>
                <div className='slide-img'>
                <img src={shera} alt='' />

                  <div className='overlay'>
                    <a href='#'  className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#' >alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#'  className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-f'>
              <div className='box'>
                <div className='slide-img'>
                <img src={lamar} alt='' />

                  <div className='overlay'>
                    <a href='#'  className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#' >alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#'  className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-g'>
              <div className='box'>
                <div className='slide-img'>
                <img src={neo} alt='' />

                  <div className='overlay'>
                    <a href='#'  className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#' >alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#'  className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
            <li className='item-h'>
              <div className='box'>
                <div className='slide-img'>
                <img src={shera} alt='' />

                  <div className='overlay'>
                    <a href='#'  className='buy-btn'>
                      buy now
                    </a>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#' >alio kksmk</a>
                    <span>lamar</span>
                  </div>

                  <a href='#'  className='price'>
                    $230
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </section>
        
            
        </>
    )
}

export default Slider
