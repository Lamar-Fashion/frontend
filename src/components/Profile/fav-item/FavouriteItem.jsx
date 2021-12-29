import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import "../../../styles/profile/fav-item.css"

function FavouriteItem() {
    const [favArray, setFavArray] = useState([])
    useEffect(() => {
      setFavArray(JSON.parse(window.localStorage.getItem("fav")))
    }, [favArray])
    // let array=new Array(10).fill(0)
    const deleteItem=async(indx,item)=>{
     await favArray.splice(Number(indx), 1);
    await  window.localStorage.setItem("fav",JSON.stringify(favArray))
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

          <i class="fas fa-trash-alt" ></i>
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
                window.localStorage.setItem(
                  "product",
                  JSON.stringify(item)
                );
              }}
            >
              <div className="overlay">
                <h3>
                  Quick View <i class="far fa-eye"></i>
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