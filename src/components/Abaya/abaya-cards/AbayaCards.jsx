import {React ,useState} from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import lamar from "../../../images/brand/test/brand12.jpeg"
import {Link} from "react-router-dom"
function AbayaCards() {
  const arralen=100 // array.length 
  const [showItems, setShowItems] = useState(15)
  let array=new Array(showItems).fill(0)
  return (
    <>
      <section className='abaya-cards' id='Abaya'>
        <div className="catagory">
          <div className="catag-path">
          <Link to="/">Home</Link> / <Link to="/abaya">abaya</Link>
          </div>
          <div className="catag-info">
          <div className="show-item">
            <label htmlFor="show-item">show: </label>
            <select name="show-item" id="show-item" onChange={(e)=>{
              if(e.target.value==="all") setShowItems(arralen) 
              else{
                setShowItems(Number(e.target.value))}
              }
              }>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="all">all</option>
            </select>
          </div>
          <div className="sort-item">
          <label htmlFor="sort-item">Brands :</label>
            <select name="sort-item" id="sort-item">
              <option value="all">all</option>
              <option value="lamar">lamar</option>
              <option value="neo">neo</option>
              <option value="mm">mm</option>
              <option value="s">s</option>
            </select>
          </div>
          </div>
          
        </div>
        <div className='lamar-container' id="abaya">
          {
            array.map(item=> <div className='box'>
            <div className="over-view">
              <div className="fav">
              <i class="fas fa-heart"></i>
              </div>
              <div className="fav">
              <i class="fas fa-heart"></i>
              </div>
              <div className="go-view">
              <i class="far fa-eye"></i>
              </div>
            </div>
            <div className="overlay"></div>
            <div className="image">
            <img src={lamar} alt="" className="img-product"/>
         <div className="shadow"></div>
            </div>
            <div className="info">
                <h3>lamar</h3>
                <p>Lorem ipsum dolor sit amet</p>
                <div className="price">
                  <span className="size">small</span>
                  <span className="price-p">QAR 1200</span>
                </div>
                <button className="add-cart"> add to cart </button>
            </div>
          </div>)
          }
        </div>
      </section>
    </>
  );
}

export default AbayaCards;
