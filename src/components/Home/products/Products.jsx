import React from 'react';
import '../../../home-styles/products.css';
import Slider from './Slider';

function Products() {
  return (
    <>
      <section className='products'>
        <div className='title-section'>
          <h2 className='main-title'> Collection</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus illum vel cupiditate dolorum laborum!</p>
        </div>
        <Slider />
      </section>
    </>
  );
}

export default Products;
