import { React, useState, useEffect } from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import { v4 as uuidv4 } from 'uuid';
import lamar from '../../../images/brand/abaya.jpeg';
import neo from '../../../images/brand/test/brand13.jpg';
import ll from '../../../images/brand/test/brand11.jpg';
import l2 from '../../../images/brand/test/brand2.jpg';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import AddProductModal from './AddProductModal';
function AbayaCards() {
  const role = useSelector((state) => state.authReducer.role);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  let product = {
    images: [lamar, neo, ll, l2],
    name: 'A25sp5',
    price: '1300',
    color: ['black', 'red', 'blue'],
    size: ['s', 'm'],
    discrpition: ' Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd ',
    small_des: 'Lorem ipsum dolor',
    brand: 'lamar',
    id: '',
  };

  const arralen = 50; // array.length
  const [showItems, setShowItems] = useState(15);
  let array = new Array(arralen).fill(product);
  const [pageNumber, setPageNumber] = useState(0);
  // const [showVerticalFilter, setShowVerticalFilter] = useState(false);
  const pagesVisited = pageNumber * showItems;
  const addEntry = (product) => {
    let FavArray = JSON.parse(window.sessionStorage.getItem('fav'));
    if (FavArray == null) FavArray = [];
    FavArray.push(product);
    window.sessionStorage.setItem('fav', JSON.stringify(FavArray));
  };

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
                 <i className="fas fa-shopping-bag"></i>
              </div>
            </div>
            </Link>
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
                  <h3>
                    Quick View
                  </h3>
                </div>
              </Link>
            </div>
            <div className='info'>
              <h3>{item.name}</h3>
              <h2>QAR 1200</h2>
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
      <section className='abaya-cards' id='Abaya'>
        <div className="nav-container">
        <div className="nav-info">
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
              <label htmlFor='sort-item'>Brands :</label>
              <select name='sort-item' id='sort-item'>
                <option value='all'>all</option>
                <option value='lamar'>lamar</option>
                <option value='neo'>neo</option>
                <option value='mm'>mm</option>
                <option value='s'>s</option>
              </select>
            </div>
            {role === 'admin' && (
              <div
                className='sort-item'
                onClick={() => {
                  handleOpen();
                }}
              >
                {/* <Link to='/addProduct'>+ add product</Link> */}+ add product
              </div>
            )}
            <AddProductModal setOpen={setOpen} open={open} />
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
    </>
  );
}

export default AbayaCards;
