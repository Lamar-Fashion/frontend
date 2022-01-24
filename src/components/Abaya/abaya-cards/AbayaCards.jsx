import { React, useState, useEffect } from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import { v4 as uuidv4 } from 'uuid';
import lamar from '../../../images/brand/abaya.jpeg';
import neo from '../../../images/brand/test/brand13.jpg';
import ll from '../../../images/brand/test/brand11.jpg';
import l2 from '../../../images/brand/IMGL4545.jpg';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import AddProductModal from '../../Admin/add-product/AddProductModal';
import EditProductModal from '../../Admin/edit-product/EditProductModal';
import { storage } from '../../../firebase';
function AbayaCards() {
  const role = useSelector((state) => state.authReducer.role);
  const [openAddproduct, setOpenAddProduct] = useState(false);
  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const handleOpenEditProduct = () => setOpenEditProduct(true);

  let product = {
    images: [lamar, neo, ll, l2],
    name: 'A25sp5',
    price: '1300',
    color: ['black', 'red', 'blue'],
    size: ['s', 'm'],
    discrpition: ' Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd ',
    catagory: 'New Arrival',
    // catagory: 'On Sales',
    id: '',
    total_quantity: 5,
    status: 'ready to wear',
    // status:"needs elaboration"
  };

  const arralen = 50;
  const [showItems, setShowItems] = useState(15);
  let array = new Array(arralen).fill(product);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * showItems;
  const [catagory, setCatagory] = useState('all');
  useEffect(() => {
    setCatagory('On Sales');
  }, []);

  const addEntry = (product) => {
    let FavArray = JSON.parse(window.sessionStorage.getItem('fav'));
    if (FavArray == null) FavArray = [];
    FavArray.push(product);
    window.sessionStorage.setItem('fav', JSON.stringify(FavArray));
  };

  //handle sort by catagory
  function handleSort(e) {
    setCatagory(e.target.value);
  }

  // delete product handler
  function deleteHnadler(id) {
    // delete from backend

    // delete the images from the firebase
    let pictureRef = storage.refFromURL(
      'https://firebasestorage.googleapis.com/v0/b/lamar-fashion.appspot.com/o/products%2F3-1-2022%404%3A23%20-%20AW2eSkwg.jpeg?alt=media&token=2d2040d6-de5d-4f4b-b1fb-aebd0d0bfc1c'
    );
    pictureRef.delete().then(function () {
      console.log('image deleted from firebas');
    });
  }

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 100,
      behavior: 'smooth',
    });
  }, [pageNumber]);
  const displayUser =
    array.length &&
    array.slice(pagesVisited, pagesVisited + showItems).map((item, indx) => {
      return (
        <>
          <div className='box'>
            <div className='over-view to-cart'>
              <div
                className='fav'
                // onClick={() => {
                //   addEntry(item);
                // }}
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
                item.id = uuidv4();
                window.sessionStorage.setItem('product', JSON.stringify(item));
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
                  handleOpenEditProduct();
                }}
              >
                <div className='fav'>
                  <i class='fas fa-pen'></i>
                </div>
              </div>
            )}
            <EditProductModal setOpenEditProduct={setOpenEditProduct} openEditProduct={openEditProduct} />

            {role === 'admin' && (
              <div
                className='over-view delete'
                onClick={() => {
                  deleteHnadler();
                }}
              >
                <div className='fav'>
                  <i class='fas fa-trash-alt'></i>
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
                  item.id = uuidv4();
                  window.sessionStorage.setItem('product', JSON.stringify(item));
                }}
              >
                <div className='overlay'>
                  <h3>Quick View</h3>
                </div>
              </Link>
            </div>
            <div className='info'>
              <h3>{item.name}</h3>
              {item.catagory === 'New Arrival' ? (
                <h2>QAR {item.price}</h2>
              ) : (
                <h2 className='on-sale'>
                  <span className='first-price'> QAR {Math.floor((Number(item.price) * (Math.random() * (1.3 - 1.1) + 1.1)) / 10) * 10}</span>
                  QAR {item.price}
                </h2>
              )}
            </div>
          </div>
        </>
      );
    });
  const pageCount = Math.ceil(array.length / showItems);
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
              <i className='fas fa-angle-right'></i> <span>{catagory}</span>
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
                        setShowItems(arralen);
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
                  <label htmlFor='sort-item'>Catagory : </label>
                  <select name='sort-item' id='sort-item' value={catagory} onChange={handleSort}>
                    <option value='all'>All</option>
                    <option value='New Arrival'>New Arrival</option>
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
            {displayUser}
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
