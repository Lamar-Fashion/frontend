import { React, useState, useEffect } from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import lamar from '../../../images/brand/abaya.jpeg';
import neo from '../../../images/brand/test/brand13.jpg';
import ll from '../../../images/brand/test/brand11.jpg';
import l2 from '../../../images/brand/test/brand2.jpg';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
// import AbayaFilter from "../abaya-filter/AbayaFilter";
function AbayaCards() {
  const role = useSelector((state) => state.authReducer.role);

  let product = [
    {
      images: [lamar, neo, ll, l2],
      name: 'A25sp5',
      price: '1300',
      color: ['black', 'red', 'blue'],
      size: ['s', 'm'],
      discrpition: ' Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd Lormam amad k,amm a ka asdkkk askd; asd..kamsd la asd ',
      small_des: 'Lorem ipsum dolor',
      brand: 'lamar',
      id: 1,
    },
  ];

  const arralen = 50; // array.length
  const [showItems, setShowItems] = useState(15);
  let array = new Array(arralen).fill(0);
  const [pageNumber, setPageNumber] = useState(0);
  // const [showVerticalFilter, setShowVerticalFilter] = useState(false);
  const pagesVisited = pageNumber * showItems;
  const addEntry = (product) => {
    let FavArray = JSON.parse(window.localStorage.getItem('fav'));
    if (FavArray == null) FavArray = [];
    FavArray.push(product);
    window.localStorage.setItem('fav', JSON.stringify(FavArray));
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
        <div className='box'>
          <div className='over-view'>
            <div
              className='fav'
              onClick={() => {
                addEntry(product[0]);
              }}
            >
              <i class='fas fa-heart'></i>
            </div>
          </div>
          <div className='image'>
            <img src={product[0].images[0]} alt='' className='img-product' />
            <Link
              to='/ProductDetails'
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: 'smooth',
                });
                window.localStorage.setItem('product', JSON.stringify(product[0]));
              }}
            >
              <div className='overlay'>
                <h3>
                  Quick View <i class='far fa-eye'></i>
                </h3>
              </div>
            </Link>
          </div>
          <div className='info'>
            <h3>{product[0].name}</h3>
            <h2>QAR 1200</h2>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(array.length / showItems);
  const changePage = (event, value) => {
    setPageNumber(value - 1);
  };
  return (
    <>
      <section className='abaya-cards' id='Abaya'>
        {/* <div
          className={
            showVerticalFilter ? "vertical-filter" : "vertical-filter-hidden"
          }
        >
          <section className="filter-container">
            <AbayaFilter />
          </section>
        </div> */}
        <div className='catagory'>
          <div className='catag-path'>
            <Link to='/'>
              <i class='fas fa-home'></i>
            </Link>{' '}
            <i class='fas fa-angle-right'></i> <span>Abaya</span>
          </div>
          <div className='catag-info'>
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
            {console.log('role', role)}
            {role === 'admin' && <div className='sort-item'>+ add product</div>}
          </div>
          {/* <div
            className="phone-filters"
            onClick={() => setShowVerticalFilter(!showVerticalFilter)}
          >
            {showVerticalFilter ? (
              <i class="fas fa-times fa-sliders-h"></i>
            ) : (
              <i class="fas fa-sliders-h"></i>
            )}
          </div> */}
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
