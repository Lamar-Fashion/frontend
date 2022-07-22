import { React, useState, useEffect } from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import { v4 as uuidv4 } from 'uuid';
import lamar from '../../../images/brand/abaya.jpeg';
import neo from '../../../images/brand/test/brand13.jpg';
import ll from '../../../images/brand/test/brand11.jpg';
import l2 from '../../../images/brand/IMGL4545.jpg';
import { Link,useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector ,useDispatch} from 'react-redux';
import AddProductModal from '../../Admin/add-product/AddProductModal';
import EditProductModal from '../../Admin/edit-product/EditProductModal';
import { storage } from '../../../firebase';
import {instance, url} from '../../../API/axios';
import {decryptAndGetFromStorage,encryptAndSaveToStorage} from '../../../helpers/CryptoJS';
import {navigateAction,assignFavourite} from '../../../store/actions/index';
import LoadingState from '../../Shared/LoadingState';


const arralen =10;
function AbayaCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role, user,isLoggedIn} = useSelector((state) => state.authReducer);
  const category=useSelector((state) => state.navigationReducer.category);

  const [openAddproduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openModalById, setOpenModalById] = useState(null);
  const [showItems, setShowItems] = useState(15);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * showItems;

  const [isLoading, setIsLoading] = useState(false);

  const [allAbayas, setAllAbayas] = useState([]);
  const [displayedAbayas, setDisplayedAbayas] = useState([]);
  
  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleOpenEditProduct = (id) =>{
    setOpenModalById(id);
     setOpenEditProduct(true);
    }

//get all abayas
const getAllAbayas = async ()=>{
  setIsLoading(true);

  
    const abayas = await instance.get(url+'/allProducts');
    console.log('abayas',abayas);
    setAllAbayas(abayas.data);
    setIsLoading(false);
    

};
  // did mount
  useEffect(()=>{
    getAllAbayas();
  },[]);


 
 
// add to favourite handler
  const addToFavourite = async (item) => {
    
    try {

      //check if the user loggedn in or not 

      if (isLoggedIn) {
        // send to backend
        const addeddToFavourite = await instance.post(url+`/favourite`,{abayaId:item.id,userId:user.id},{
          headers:{
            authorization: `Bearer ${user.token}`
          }
        });
        console.log('addeddToFavourite',addeddToFavourite);
        dispatch(assignFavourite(addeddToFavourite.data.abayaId.length));
      } else {
        // ask him to log-in or signup
        navigate('/SignIn')
      }

    } catch (error) {
      console.error('Error while adding to favourite')
    }
  };

  //handle sort by category
  function handleSort(e) {
    console.log('e.target.value',e.target.value);
    // setCatagory(e.target.value);
    dispatch(navigateAction(e.target.value))
  }

  // delete product handler
 async function deleteHnadler(item) {

  try {
        // delete from backend
const deletedProduct = await instance.delete(url+`/product${item.id}`,{
  headers:{
    authorization: `Bearer ${user.token}`
  }
});

console.log('deleted product',deletedProduct.data);

    // delete the images from the firebase
    for (let i = 0; i < item.images.length; i++) {
      let pictureRef = storage.refFromURL(item.images[i]);
      const deletedImg= await pictureRef.delete();
       console.log(`image #${i+1} deleted from firebas`);
      
    }

console.log('all deleted');
window.location.reload();
// item.images.forEach((img,idx)=>{
//   let pictureRef = storage.refFromURL(img);
//   pictureRef.delete().then(function () {
//     console.log(`image #${idx+1} deleted from firebas`);
//     if (idx == item.images.length-1) {
//      window.location.reload();
//     }
//   });
// });
    
  } catch (error) {
    console.error('delete product error',error.message)
  }

  }

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 100,
      behavior: 'smooth',
    });
  }, [pageNumber]);



 useEffect(()=>{
  console.log('category',category);
  const displayedAbayas =
  allAbayas.length &&
  allAbayas.filter(item=> {
    if(category==="all"){
    return item
  }else if(category=='New Arrival'){
    return item.category=='newArrivals'
  }else if(category=='On Sales'){
    return item.category=='onSales'
  }

}).slice(pagesVisited, pagesVisited + showItems).map((item, indx) => {
    return (
        <div key={item.id} className='box'>
          <div className='over-view to-cart'>
            <div
              className='fav'
              onClick={() => {
                addToFavourite(item);
              }}
            >
              <i className='fas fa-heart'></i>
            </div>
          </div>
          <Link
            to='/ProductDetails'
            onClick={() => {
              window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth',
              });

             
              encryptAndSaveToStorage('product',item);

            }}
          >
            <div className='over-view'>
              <div className='fav'>
                <i className='fas fa-shopping-bag'></i>
              </div>
            </div>
          </Link>
          {role === 'admin' && (
            <div
              className='over-view edit'
              onClick={() => {
                handleOpenEditProduct(item.id);
              }}
            >
              <div className='fav'>
                <i className='fas fa-pen'></i>
              </div>
            </div>
          )}
          {openEditProduct && item.id ==openModalById && <EditProductModal key={item}  abaya={item} setOpenEditProduct={setOpenEditProduct} openEditProduct={openEditProduct} />}

          {role === 'admin' && (
            <div
              className='over-view delete'
              onClick={() => {
                deleteHnadler(item);
              }}
            >
              <div className='fav'>
                <i className='fas fa-trash-alt'></i>
              </div>
            </div>
          )}
          <div className='image'>
            <img src={item.images[0]} alt='' className='img-product' />
            <Link
              to='/ProductDetails'
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: 'smooth',
                });
                encryptAndSaveToStorage('product',item);
              }}
            >
              <div className='overlay'>
                <h3>Quick View</h3>
              </div>
            </Link>
          </div>
          <div className='info'>
            <h3>{item.code}</h3>
            {item.category == 'newArrivals' ? (
              <h2>QAR {item.price}</h2>
            ) : (
              <h2 className='on-sale'>
                <span className='first-price'> QAR {Math.floor((Number(item.price) * (Math.random() * (1.3 - 1.1) + 1.1)) / 10) * 10}</span>
                QAR {item.price}
              </h2>
            )}
          </div>
        </div>
    );
  });

  setDisplayedAbayas(displayedAbayas);
 },[allAbayas,openEditProduct,category]);



  const pageCount = Math.ceil(allAbayas?.filter(item=> {
    if(category==="all"){
    return item
  }
  else if(category=='New Arrival'){
    return item.category==='newArrivals'
  }
  else if(category=='On Sales'){
    return item.category==='onSales'
  }

}).length / showItems);



  const changePage = (event, value) => {
    setPageNumber(value - 1);
  };


  return (
    <>
      <section className='abaya'>
        <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i> <span>Abayas </span>
              <i className='fas fa-angle-right'></i> <span>{category == 'New Arrival' ? 'New Arrivals' : category}</span>
            </div>
          </div>
        </div>
        <div className='lamar-container'>
          <div className='container-abaya-hero'>
            <div className='abaya-hero'>
              <h4 className='hero-text'>shop Abaya & find modern deisgns</h4>
            </div>
          </div>
        </div>
        <section className='abaya-cards' id='Abaya'>
          <div className='nav-container'>
            <div className='nav-info'>
              <div className='left-info'>
                <div className='show-item'>
                  <label htmlFor='show-item'>show: </label>
                  <select
                    name='show-item'
                    id='show-item'
                    onChange={(e) => {
                      if (e.target.value === 'all' && showItems !== arralen) {
                        setShowItems(arralen+10);
                        setPageNumber(0);
                      } else if (showItems !== e.target.value) {
                        setPageNumber(0);
                        setShowItems(Number(e.target.value));
                      }
                    }}
                  >
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                    <option value='all'>all</option>
                  </select>
                </div>
                <div className='sort-item'>
                  <label htmlFor='sort-item'>Category : </label>
                  <select name='sort-item' id='sort-item' value={category} onChange={handleSort}>
                    <option value='all'>All</option>
                    <option value='New Arrival'>New Arrivals</option>
                    <option value='On Sales'>On Sales</option>
                  </select>
                </div>
                {role === 'admin' && (
                  <div
                    className='sort-item'
                    onClick={() => {
                      handleOpenAddProduct();
                    }}
                  >
                    + add product
                  </div>
                )}
                <AddProductModal setOpenAddProduct={setOpenAddProduct} openAddproduct={openAddproduct} />
              </div>
            </div>
          </div>

          <div className='lamar-container' id='abaya'>
            {!isLoading && displayedAbayas.length > 0 && displayedAbayas}
            {!isLoading && displayedAbayas.length == 0 && 'You have no products yet!'}
            {isLoading && <LoadingState/>}
          </div>

          <div className='pagaination'>
            {showItems !== arralen && ( // here i put arralength becouse in onCahnge we put this value instade of "all" !!
              <Pagination count={pageCount} color='secondary' onChange={changePage} />
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default AbayaCards;
