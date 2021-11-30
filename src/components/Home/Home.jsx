import { React, useState } from 'react';
import Brand from './brand/Brand';
import Hero from './hero/Hero';
import Feedback from './feedback/Feedback';
import Products from './products/Products';
import Shop from './shop/Shop';

function Home() {
  const [y, setY] = useState(window.scrollY);
  window.onscroll = function () {
    setY(window.scrollY);
  };
  return (
    <>
      {Number(y) >= 120 && (
        <button
          className='go-up'
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          <i className='fas fa-angle-up'></i>
        </button>
      )}

      <Hero />
      <Brand />
      {/* <Shop /> */}
      <Products />
      <Feedback />
    </>
  );
}

export default Home;
