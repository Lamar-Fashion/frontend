import {React,useState} from 'react'
import { Link } from "react-router-dom";
import "../../styles/checkout/checkout.css"
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const cartArray= JSON.parse(window.sessionStorage.getItem("cart"))
  const total= JSON.parse(window.sessionStorage.getItem("total"))
  const navigate = useNavigate();
  let [values, setValues] = useState(JSON.parse(window.sessionStorage.getItem('checkout_person_info'))?JSON.parse(window.sessionStorage.getItem('checkout_person_info')):{});

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  function handleSubmit (e){
    e.preventDefault();
    window.sessionStorage.setItem('checkout_person_info', JSON.stringify(values));
    navigate("/Checkout2");
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
    return (
        <>
        <section className="checkout">
        {/* <div className="lamar-container">
            <div className="nav">
            <div className="path">
            <Link to="/">
              <i class="fas fa-home"></i>
            </Link>
            <i class="fas fa-angle-right"></i> 
            <Link to="/Cart" className='path-span'>
             Cart 
            </Link>
            <i class="fas fa-angle-right"></i> 
            <span>Checkout </span>
          </div>
          <div className="check-livel">
          <span className='FLivel'> Shipping </span><i class="fas fa-check-circle"></i><i class="fas fa-angle-right"></i><span>Review & Payments</span>
          </div>

            </div>
          
        </div> */}

        <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <Link to='/Cart' className="exat-path"> <span >cart</span></Link> 
            <i class="fas fa-angle-right"></i> <span >checkout</span>
          </div>
         
        </div>
      </div>
        <div className="lamar-container">
                <h2><span className='active'>Shipping</span> <i class="fas fa-angle-right"></i> <span>Review & Payments</span></h2>
          <div className="container-shiping">
          <form action="" onSubmit={handleSubmit}>
                
              <div className="email">
              <i className="fas fa-mail-bulk"></i>
            <input type="email" name="email" id="email" placeholder="Email Address" 
            value={values?.email} required onChange={handleChange}/>
              </div>
              <div className="name">
                <div className="Fname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Fname" id="Fname" 
                value={values?.Fname} placeholder="First Name" required  onChange={handleChange}/ >

                </div>
                <div className="Lname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Lname" id="Lname" value={values?.Lname} placeholder="Last Name" required onChange={handleChange}/>

                </div>
  
              </div>
              <div className="company">
              <i class="fas fa-warehouse"></i>
            <input type="text" name="company" id="company" placeholder="Company Name"  value={values.company? values.company : ""} onChange={handleChange}/>
              </div>
              <div className="address">
                <div className="Faddress">
                <i class="fas fa-map-marked-alt"></i>
                <input type="text" name="Faddress" id="Faddress" placeholder="Street Address" required onChange={handleChange} 
                value={values?.Faddress}/ >

                </div>
                <div className="Laddress">
                <i class="fas fa-map-marked-alt"></i>
                <input type="text" name="Laddress" id="Laddress" placeholder="Street Address 2" onChange={handleChange}
                value={values?.Laddress?values.Laddress:"" } />

                </div>
              </div>
              <div className="city">
              <i class="fas fa-city"></i>
            <input type="text" name="city" id="city" placeholder="City" required onChange={handleChange}
             value={values?.city}/>
              </div>
              <div className="zip-code">
              <i class="far fa-keyboard"></i>
            <input type="text" name="zip_code" id="zip_code" placeholder="Zip/Postal Code" required onChange={handleChange}
            value={values?.zip_code}/>
              </div>
              <div className="country">
              <i class="fas fa-globe-africa"></i>
            <input type="text" name="country" id="country" placeholder="country" value="Qatar" />
              </div>
              <div className="phone">
              <i class="fas fa-phone"></i>
            <input type="tel" name="phone" id="phone" placeholder="Phone Number" required onChange={handleChange}
            value={values?.phone}/>
              </div>
              <button className="next" type='submit' > 
              {/* <Link to="/Checkout2" >Next</Link> */}
              next
              </button>
            </form>
            <div className="summary">
                <h3 >Order summary</h3>
                <hr />
                <div className="container-info">
                    {
                        cartArray?.map((item,indx)=>{
                            return(<>
                            
                        <div className="info-products">
                    <div className="info">
                      <div className="image">
                        <img
                          src={item.images[0]}
                          alt=""
                        />
                        <div className="qunt">
                          <h5>{item.quantity}</h5>
                        </div>
                      </div>
                      <div className="details">
                        <h4>
                        {item.name}
                        </h4>
                        <p>size: {item.size}</p>
                        <p>color: {item.color}</p>
                        <p>buttons:{item.buttons}</p>
                      </div>
                    </div>
                    <div className="price">
                      <h4>QAR {item.price}</h4>
                    </div>
                  </div>
                            </>)
                        })
                    }
                 
                  
                </div>

                <hr />
                <div className="total">
                  <h4>Total</h4>
                  <h4>QAR {total}</h4>
                </div>
              </div>
          </div>
            
        </div>

        </section>
            
        </>
    )
}

export default Checkout
