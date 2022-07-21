/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';
import abaya from '../../../images/brand/IMGL4545.jpg';
import { Link } from 'react-router-dom';
import '../../../styles/home-styles/products.css';
import Flicking from "@egjs/react-flicking";
import {decryptAndGetFromStorage,encryptAndSaveToStorage} from '../../../helpers/CryptoJS';
import { instance,url } from '../../../API/axios';

function Slider() {
const [homePageProducts, setHomePageProducts] = useState([]);
const [renderedProducts, setRenderedProducts] = useState([]);

  //get home page abayas
const getHomePageProducts = async ()=>{
  const abayas = await instance.get(url+'/homePageProducts');
  console.log('abayas',abayas);
  setHomePageProducts(abayas.data);
  };
    // did mount
    useEffect(()=>{
      getHomePageProducts();
    },[]);

    
console.log('renderedProducts',renderedProducts);
    useEffect(()=>{
    const rendered= homePageProducts?.map((item,indx)=>{
        return <div className='box' key={item.id} >
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
          
encryptAndSaveToStorage('product',item);

           }}
         >  buy now</Link>
               </div>
             </div>

             <div className='details'>
               <div className='type'>
                 <a href='#'>{item.code}</a>
                 <span>{item.category === "newArrivals" ? 'New Arrivals' : 'On Sales'}</span>
               </div>

              {
                item.category === "newArrivals" ?<a href='#' className='price'>
                QAR {item.price}
              </a>:
              <div>
              <a href='#' className='price'>
              QAR {item.price}
            </a>
              <a href='#' className='price on-sale'>
              <span className='first-price'> QAR {Math.floor(Number(item.price) * 
               ( Math.random() * (1.3 - 1.1) + 1.1)/10)*10}</span>
               </a>
              </div>

              } 
             </div>
           </div>});
           
           setRenderedProducts(
            <Flicking circular={true} >

            {rendered}
        </Flicking>
        );
          
          },[homePageProducts]);

  return (
    <>
      <section className='multi-slider'>
        <div className='lamar-container'>
        {/* <Flicking circular={true} > */}
       {renderedProducts}
        {/* {
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
                encryptAndSaveToStorage('product',item);

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
       } */}
              
        
        
         

      
        {/* </Flicking> */}
         
        </div>
      </section>
    </>
  );
}

export default Slider;
