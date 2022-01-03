import React from 'react';
import '../../styles/abaya-styles/abaya.css';
import AbayaCards from './abaya-cards/AbayaCards';
import AbayaFilter from './abaya-filter/AbayaFilter';
import AbayaHero from './abaya-hero/AbayaHero';
import { Link } from 'react-router-dom';

function Abaya() {
  return (
    <>
      <section className='abaya'>
       
        {/* <div className='lamar-container'> */}
        <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <span >Abaya</span>
          </div>
        </div>
      </div>
       <AbayaHero />
        <AbayaCards />
        {/* </div> */}
      </section>
    </>
  );
}

export default Abaya;
