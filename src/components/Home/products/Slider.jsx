/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import abaya from '../../../images/brand/IMGL4545.jpg';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../../styles/home-styles/products.css';
import Flicking from "@egjs/react-flicking";
function Slider() {

  let product = {
    images: [abaya, abaya, abaya],
    name: 'A25sp5',
    price: '1300',
    color: ['black', 'red', 'blue'],
    size: ['s', 'm'],
    discrpition: ' Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd ',
    catagory: 'New Arrival',
    // catagory: 'On Sales',
    id: '',
    total_quantity:5,
    status:"ready to wear"
    // status:"needs elaboration"
  };
  let product2 = {
    images: [abaya, abaya, abaya],
    name: 'A25sp5',
    price: '1300',
    color: ['black', 'red', 'blue'],
    size: ['s', 'm'],
    discrpition: ' Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd ',
    catagory: 'On Sales',
    // catagory: 'On Sales',
    id: '',
    total_quantity:5,
    status:"ready to wear"
    // status:"needs elaboration"
  };
  let array=new Array(4).fill(product)
  let array2=new Array(4).fill(product2)
  return (
    <>
      <section className='multi-slider'>
        <div className='lamar-container'>
        <Flicking circular={true} >
       {
         array.map((item,indx)=>
         <div className='box' >
                <div className='slide-img'>
                  <img src={item.images[0]} alt='' />

                  <div className='overlay'>
                  <Link className='buy-btn'
              to='/ProductDetails'
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: 'smooth',
                });
                item.id = uuidv4();
                window.sessionStorage.setItem('product', JSON.stringify(item));
              }}
            >  buy now</Link>
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#'>{item.name}</a>
                    <span>{item.catagory}</span>
                  </div>

                 {
                   item.catagory==="New Arrival"?<a href='#' className='price'>
                   QAR {item.price}
                 </a>:<a href='#' className='price on-sale'>
                 <span className='first-price'> QAR {Math.floor(Number(item.price) * 
                  ( Math.random() * (1.3 - 1.1) + 1.1)/10)*10}</span>
                  </a>
                 } 
                </div>
              </div>)
       }
        {
         array2.map((item,indx)=>
         <div className='box' >
                <div className='slide-img'>
                  <img src={item.images[0]} alt='' />

                  <div className='overlay'>
                  <Link className='buy-btn'
              to='/ProductDetails'
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: 'smooth',
                });
                item.id = uuidv4();
                window.sessionStorage.setItem('product', JSON.stringify(item));
              }}
            >  buy now</Link>
                
                  </div>
                </div>

                <div className='details'>
                  <div className='type'>
                    <a href='#'>{item.name}</a>
                    <span>{item.catagory}</span>
                  </div>

                 {
                   item.catagory==="New Arrival"?<a href='#' className='price'>
                   QAR {item.price}
                 </a>:<a href='#' className='price on-sale'>
                    <span className='first-price'> QAR {Math.floor(Number(item.price) * 
                  ( Math.random() * (1.3 - 1.1) + 1.1)/10)*10}</span>
                    QAR {item.price}
                  </a>
                 } 
                </div>
              </div>)
       }
              
        
        
         

      
        </Flicking>
         
        </div>
      </section>
    </>
  );
}

export default Slider;
