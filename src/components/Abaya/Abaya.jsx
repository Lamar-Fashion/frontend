import React from 'react';
import '../../styles/abaya-styles/abaya.css';
import AbayaCards from './abaya-cards/AbayaCards';
import AbayaFilter from './abaya-filter/AbayaFilter';
import AbayaHero from './abaya-hero/AbayaHero';
function Abaya() {
  return (
    <>
      <section className='abaya'>
        <AbayaHero />
        <div className='lamar-container'>
          <AbayaCards />
        </div>
      </section>
    </>
  );
}

export default Abaya;
