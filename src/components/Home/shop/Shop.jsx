import React from 'react';
import '../../../home-styles/shop.css';
import shop1 from '../../../images/shop/shop1.jpeg';
import shop2 from '../../../images/shop/shop2.jpeg';
import shop3 from '../../../images/shop/shop3.jpeg';
import shop4 from '../../../images/shop/shop4.jpeg';
function Shop() {
  return (
    <>
      <section className='shop'>
        <div className='bigContainer'>
          <section className='rightSection'>
            <h3 className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore fugiat enim perferendis rerum reiciendis quos hic atque, sunt qui libero doloremque distinctio alias modi quis at,
              laborum quam dolorem. Similique.
            </h3>
            <button className='button shopBtn'>Shop Now</button>
          </section>
          <section className='leftSection'>
            <img src={shop1} alt='' className='shopImg img1' />
            <img src={shop2} alt='' className='shopImg img2' />
            <img src={shop3} alt='' className='shopImg img3' />
            <img src={shop4} alt='' className='shopImg img4' />
          </section>
        </div>
      </section>
    </>
  );
}

export default Shop;
