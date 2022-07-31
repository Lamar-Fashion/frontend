

import { React, useState } from 'react';
import '../../styles/product-details/product-details.css';
import { Link,useNavigate } from 'react-router-dom';
import Flicking from '@egjs/react-flicking';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../store/actions';
// import {Spinner} from 'react-bootstrap'
import {decryptAndGetFromStorage,encryptAndSaveToStorage} from '../../helpers/CryptoJS';
import {instance, url} from '../../API/axios';
import {assignFavourite} from '../../store/actions/index';
import DualModal from '../Shared/DualModal';

// @ts-ignore
import PinchZoomPan from "react-image-zoom-pan";


function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const {user, isLoggedIn} = useSelector((state)=> state.authReducer);
 const [message, setMessage] = useState(null);
 const [orderDone, setOrderDone] = useState(false);
 const [addedToFavItem, setAddedToFavItem] = useState(null);
 const [error, setError] = useState(null);
//  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
 
 let obj =  decryptAndGetFromStorage('product');
 
 let images = obj.images;
 let firstImg = obj.images[0];
 const [state, setstate] = useState(firstImg);
  let code = obj.code;
  let price = obj.price;
  let size = obj.sizes;
  let color = obj.colors;
  let description = obj.description;
  let inStock = obj.inStock;
  let category = obj.category;
  const [selectedProduct, setSelectedProduct] = useState({
    ...obj,
    size: false,
    color: false,
    buttons: false,
    tall: false,
    quantity: 1,
  });
  const [selectedStyleSize, setSelectedStyleSize] = useState({
    show: false,
    id: '',
  });
  const [selectedStyleTall, setSelectedStyleTall] = useState({
    show: false,
    id: '',
  });
  const [selectedStyleColor, setSelectedStyleColor] = useState({
    show: false,
    id: '',
  });
  const [errorAlert, setErrorAlert] = useState(false);
  const [seccessAlert, setSeccessAlert] = useState(false);

  const addEntry = (obj) => {
    let FavArray = decryptAndGetFromStorage('cart');
    if (FavArray == null) FavArray = [];
    let duplecated = false;
    for (let i = 0; i < FavArray.length; i++) {
      if (
        FavArray[i].colors === obj.colors &&
        FavArray[i].sizes === obj.sizes &&
        FavArray[i].code === obj.code &&
        FavArray[i].buttons === obj.buttons &&
        FavArray[i].description === obj.description &&
        FavArray[i].price === obj.price
      ) {
        FavArray[i].quantity = FavArray[i].quantity + 1;
        duplecated = true;
        break;
      }
    }
    if (!duplecated && FavArray.length !== 0) {
      FavArray.push(obj);
    }
    if (FavArray.length === 0) {
      FavArray.push(obj);
    }

  encryptAndSaveToStorage('cart',FavArray);

    // update redux with cart number
    dispatch(addToCartAction());
    setSelectedProduct({
      ...obj,
      size: false,
      color: false,
      buttons: false,
      tall: false,
      quantity: 1,
    });
    setSelectedStyleSize({ show: false, id: '' });
    setSelectedStyleTall({ show: false, id: '' });
    setSelectedStyleColor({ show: false, id: '' });


    setTimeout(() => {
    setSeccessAlert(false);

    }, 2000);
  };
  const tall = [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

// add to favourite handler
const addToFavourite = async (item) => {
  setAddedToFavItem(item);
  try {

    //check if the user loggedn in or not 
    if (isLoggedIn) {

      // send to backend
      const addeddToFavourite = await instance.post(url+`/favourite`,{abayaId:item.id,userId:user.id},{
        headers:{
          authorization: `Bearer ${user.token}`
        }
      });
      console.log('addeddToFavourite.data',addeddToFavourite.data);
    if (addeddToFavourite?.data?.msg === 'already in your wishlist') {
      setMessage('already in your wishlist');
    }else{
      setMessage(null);
      dispatch(assignFavourite(addeddToFavourite.data.abayaId.length));
    }
      setOrderDone(true);
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
      setOrderDone(false);
        
      }, 3000);
    } else {
      // ask him to log-in or signup
      navigate('/SignIn')
    }

  } catch (error) {
    error?.response?.data?.error ?  setError(error.response.data.error) : setError('Error while adding to favourite');
    console.error('Error while adding to favourite',error.message);
  }
};

  return (
    <>
      <section className='product-d'>
        <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i> <span>Product Details</span>
            </div>
          </div>
        </div>

        <div className='nav-container'>
          
          {(selectedProduct.size === false || selectedProduct.buttons === false || selectedProduct.color === false) && errorAlert && (
            <Alert severity='warning' id='alert'>
              You need to choose options for your item.
            </Alert>
          )}
          {seccessAlert && (
            <Alert severity='success' id='alert'>
              You added <strong>{code}</strong> to your <Link to='/Cart'>shopping cart</Link>
            </Alert>
          )}
          {inStock === 0 && (
            <Alert severity='error' id='alert'>
              unfortunately this item doesn't exist right know
            </Alert>
          )}
{addedToFavItem && orderDone && <Alert severity='success' id='alert'>
              {message ? message : <> You added <strong>{addedToFavItem.code}</strong> to your <Link to='/Profile/2'>wishlist</Link></>}</Alert>}

        </div>

        <div className='lamar-container'>
          <div className='image-product'>
            <div className='big-image'>
              <PinchZoomPan maxScale={3}>
              <img src={state} alt='' />

              </PinchZoomPan>
            </div>

            <div className='left-images'>
              <Flicking circular={true}>
                {images.map((item, indx) => {
                  return (
                    <div
                      className='image'
                      key={item}
                      onClick={() => {
                        setstate(item);
                      }}
                    >
                      <img src={item} alt={indx} />
                    </div>
                  );
                })}
              </Flicking>
            </div>
          </div>

          <div className='product-info'>
            <div className='name-p'>
              <h2>
                product code : <span>{code}</span>
              </h2>

              <div className='price'>
                <h2>
                  QAR <span>{price}</span>
                </h2>
                <p>
                  <span>* {obj.status == 'readyToWear' ? 'Ready To Wear' : 'يحتاج إلى تفصيل'}</span>
                  {obj.inStock > 0 ? (
                    <span>
                      *Availabilty : (<strong>{obj.inStock}</strong>) Items In Stock
                    </span>
                  ) : (
                    <span className='not-Availabilty'> *Availabilty : Out Of Stock</span>
                  )}
                </p>
              </div>
              {obj.status === 'readyToWear' && <li>The Order Takes ( 1 - 5 ) days.</li>}
              {obj.status === 'notReadyToWear' && <li>The Order Takes ( 1 - 2 ) Weeks.</li>}
            </div>

            <div className='hr'></div>
            <div className='size-color'>
              <div className='size'>
                <h4>size :</h4>
                <div className='avialable'>
                  {size.map((item, idx) => (
                    <button
                      className={selectedStyleSize.show && selectedStyleSize.id === idx ? 'selected' : ''}
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, size: item });
                        setSelectedStyleSize({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.size === false && errorAlert && (
                  <span className='error-alert' id='error-size'>
                    * this field is required{' '}
                  </span>
                )}
              </div>
              <div className='size'>
                <h4>tall :</h4>
                <div className='avialable'>
                  {tall.map((item, idx) => (
                    <button
                      className={selectedStyleTall.show && selectedStyleTall.id === idx ? 'selected' : ''}
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, tall: item });
                        setSelectedStyleTall({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.tall === false && errorAlert && (
                  <span className='error-alert' id='error-size'>
                    * this field is required{' '}
                  </span>
                )}
              </div>
              <div className='colors'>
                <h4>color :</h4>
                <div className='avialable av-colors'>
                  {color.map((item, idx) => (
                    <button
                      className={selectedStyleColor.show && selectedStyleColor.id === idx ? 'selected' : ''}
                      key={item}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, color: item });
                        setSelectedStyleColor({ show: true, id: idx });
                      }}
                      // style={{ backgroundColor: item }}
                    >
                      {/* <span className="color-detail"> <strong  style={{ backgroundColor: item }}></strong> <h5>{item}</h5></span> */}
                      {item}
                    </button>
                  ))}
                </div>
                {selectedProduct.color === false && errorAlert && (
                  <span className='error-alert' id='error-color'>
                    * this field is required{' '}
                  </span>
                )}
              </div>
              <div className='container-buttons'>
                <div className='avialable'>
                  <div className='buttuns'>
                    <label htmlFor='buttuns' id='error-buttons'>
                      buttuns:
                    </label>
                    <select
                      name='buttuns'
                      id='buttuns'
                      onChange={(e) => {
                        setSelectedProduct({
                          ...selectedProduct,
                          buttons: e.target.value,
                        });
                      }}
                    >
                      <option value='false'>-- choose buttuns --</option>
                      <option value='with-buttuns-مع طقطق'>with-buttuns-مع طقطق</option>
                      <option value='without-buttuns-بدون طقطق'>without-buttuns-بدون طقطق</option>
                    </select>
                  </div>
                </div>
                {selectedProduct.buttons === false && errorAlert && <span className='error-alert'>* this field is required </span>}
              </div>
            </div>
            <div className='hr'></div>

            <div className='qun-product '>
              <div className='add-fav'>
                <button onClick={()=>addToFavourite(selectedProduct)}>🖤</button>
              </div>
              <div className='add-to-cart'>
                <button
                  onClick={async (e) => {
                    window.scrollTo({
                      left: 0,
                      top: 50,
                      behavior: 'smooth',
                    });
                    if (inStock > 0) {
                      if (!selectedProduct.size || !selectedProduct.color || !selectedProduct.buttons || selectedProduct.buttons == 'false') {
                        setErrorAlert(true);
                      } else {
                        setSeccessAlert(true);

                        addEntry(selectedProduct);

                        setErrorAlert(false);
                      }
                    }
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
            <div className='hr'></div>

            <div className='about-p'>
              <h4>
                catagory : <span className='vendor'> {category == 'newArrivals' ? 'New Arrivals':'On Sales'}</span>
              </h4>
              <h4>About This Item :</h4>

              <p>{description}</p>
            </div>
          </div>
        </div>
      </section>
      {error && <DualModal type='error' navigateTo = '/ProductDetails' text={error ? error : 'Something went wrong! <br/> please try again'} showHeader={true}/>}
    </>
  );
}

export default ProductDetails;
