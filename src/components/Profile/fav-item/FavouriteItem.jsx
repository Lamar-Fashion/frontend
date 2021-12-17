import React from 'react'
import { Link } from 'react-router-dom';
import lamar from '../../../images/brand/test/brand11.jpg';
import "../../../styles/profile/fav-item.css"

function FavouriteItem() {
    let array=new Array(10).fill(0)
    return (
        <>
        <section className="fav-item">
        <div className="lamar-container">
            {array.map(item=><div className='box'>
          <div className='over-view'>
          <div className='fav'>
          <i class="fas fa-trash-alt"></i>
            </div>
            <div className='fav'>
              <i class='fas fa-shopping-bag'></i>
            </div>
            
            <div className='go-view'>
              <Link to="/ProductDetails" onClick={()=>{
                window.scrollTo({
                  left:0,
                  top:0,
                  behavior: "smooth"
                })
              }}><i class='far fa-eye' ></i></Link>
            </div>
          </div>
          <div className='overlay'></div>
          <div className='image'>
            <img src={lamar} alt='' className='img-product' />
            <div className='shadow'></div>
          </div>
          <div className='info'>
            <h3>lamar</h3>
            <p>Lorem ipsum dolor sit amet</p>
            <div className='price'>
              <span className='size'>small</span>
              <span className='price-p'>QAR 1200</span>
            </div>
            <button className='add-cart'> add to cart </button>
          </div>
        </div>)}
            
            </div>
        </section>
           
            
        </>
    )
}

export default FavouriteItem
