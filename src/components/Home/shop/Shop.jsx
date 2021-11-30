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
        <div className="lamar-container">
        
          <section className='leftSection'>
            <h3 className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore fugiat enim perferendis rerum reiciendis quos hic atque, sunt qui libero doloremque distinctio alias modi quis at
            </h3>
            <button className='button shopBtn'>Shop Now</button>
          </section>
          <section className='rightSection'>
            <div className="image1 shopImg">
            <img src={shop1} alt='' className=' img1' />
            </div>
            <div className="image2 shopImg">

            <img src={shop2} alt='' className=' img2' />
            </div>
            <div className="image3 shopImg">
            <img src={shop3} alt='' className=' img3' />
            </div>
            <div className="image4 shopImg">

            <img src={shop4} alt='' className=' img4' />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Shop;
