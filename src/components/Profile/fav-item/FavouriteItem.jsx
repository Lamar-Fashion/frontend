import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import "../../../styles/profile/fav-item.css";
import {encryptAndSaveToStorage} from '../../../helpers/CryptoJS'
function FavouriteItem() {
    const [favArray, setFavArray] = useState([])
    
    const deleteItem=(indx,item)=>{
      favArray.splice(Number(indx), 1);
      encryptAndSaveToStorage('fav',favArray);

    }
    return (
        <>
        <section className="fav-item">
        <div className="lamar-container">
            {favArray&&
            favArray.map((item,indx)=>
            <>
          
        <div className="box">
          <div className="over-view">
           <div className='fav' onClick={()=>{
            deleteItem(indx,item)
            
          }}>

          <i className="fas fa-trash-alt" ></i>
            </div>
          </div>
          <div className="image">
          <img src={item.images[0]} alt='' className='img-product' />

            <Link
              to="/ProductDetails"
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: "smooth",
                });
             
                encryptAndSaveToStorage('product',item);

              }}
            >
              <div className="overlay">
                <h3>
                  Quick View <i className="far fa-eye"></i>
                </h3>
              </div>
            </Link>
          </div>
          <div className="info">
            <h3>{item.name}</h3>
            <h2>QAR {item.price}</h2>
          </div>
        </div>
            </>
            
        
        
        )}
            
            </div>
        </section>
           
            
        </>
    )
}

export default FavouriteItem