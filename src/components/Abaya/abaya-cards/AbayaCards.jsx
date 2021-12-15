import { React, useState } from 'react';
import '../../../styles/abaya-styles/abaya-cards.css';
import lamar from '../../../images/brand/test/brand12.jpg';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import AbayaFilter from '../abaya-filter/AbayaFilter';
function AbayaCards() {
  const arralen = 50; // array.length
  const [showItems, setShowItems] = useState(15);
  let array = new Array(arralen).fill(0); // to test the pagenation you can enter 40 for example
  const [pageNumber, setPageNumber] = useState(0);
  const [showVerticalFilter, setShowVerticalFilter] = useState(false);
  const usersPerPage = showItems;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUser =
    array.length &&
    array.slice(pagesVisited, pagesVisited + usersPerPage).map((item, indx) => {
      return (
        <div className='box'>
          <div className='over-view'>
            <div className='fav'>
              <i class='fas fa-shopping-bag'></i>
            </div>
            <div className='fav'>
              <i class='fas fa-heart'></i>
            </div>
            <div className='go-view'>
              <i class='far fa-eye'></i>
            </div>
          </div>
          <div className='overlay'></div>
          <div className='image'>
            <img src={lamar} alt='' className='img-product' />
            <div className='shadow'></div>
          </div>
          <div className='info'>
            <h3>lamar</h3>
            <p>Lorem ipsum dolor sit amet</p>
            <div className='price'>
              <span className='size'>small</span>
              <span className='price-p'>QAR 1200</span>
            </div>
            <button className='add-cart'> add to cart </button>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(array.length / usersPerPage);
  const changePage = (event, value) => {
    setPageNumber(value - 1);
    console.log(value);
  };
  return (
    <>
      <section className='abaya-cards' id='Abaya'>
        <div className={showVerticalFilter ? 'vertical-filter' : 'vertical-filter-hidden'}>
          <section className='filter-container'>
            <AbayaFilter />
          </section>
        </div>
        <div className='catagory'>
          <div className='catag-path'>
            <Link to='/'><i class="fas fa-home"></i></Link>  <i class="fas fa-angle-right"></i>  <span>Abaya</span>
          </div>
          <div className='catag-info'>
            <div className='show-item'>
              <label htmlFor='show-item'>show: </label>
              <select
                name='show-item'
                id='show-item'
                onChange={(e) => {
                  if (e.target.value === 'all') setShowItems(arralen);
                  else {
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
          </div>
          <div className='phone-filters' onClick={() => setShowVerticalFilter(!showVerticalFilter)}>
            {showVerticalFilter ? <i class='fas fa-times fa-sliders-h'></i> : <i class='fas fa-sliders-h'></i>}
          </div>
        </div>
        <div className='lamar-container' id='abaya'>
          {displayUser}
        </div>

        <div className='pagaination'>
          {showItems !== arralen && ( // here i put arralength becouse in onCahnge we put this value instade of "all" !!
            <Pagination count={pageCount} color='primary' onChange={changePage} />
          )}
        </div>
      </section>
    </>
  );
}

export default AbayaCards;
