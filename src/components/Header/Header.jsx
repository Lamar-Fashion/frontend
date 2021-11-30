/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from 'react';
import '../../header-styles/Header.css';
import logo from '../../images/header/lamar-logo-small.png';
import { BsCartFill, BsHeart, BsPersonCircle } from 'react-icons/bs';

function Header() {
  const [showDashes, setshowDashes] = useState(false);
  return (
    <>
      <section className='header'>
        <div className='lamar-container'>
          {false && (
            <ul className={!showDashes ? 'main-nav' : 'main-nav-phone'}>
              <li>
                <a href='#home'>Home</a>
              </li>
              <li>
                <a href='#Abaya'>Abaya</a>
              </li>
              <li>
                <a href='#shalat'>Shalat</a>
              </li>
            </ul>
          )}

          <div className='image'>
            <img src={logo} alt='logo' className='logo' />
          </div>
          <section className='rightContainer'>
            <div className='searchContainer'>
              <input type='text' name='search' placeholder='Search...' className='input' />

              <a href='#' className='btn'>
                <i className='fas fa-search'></i>
              </a>
            </div>
            <ul className='right-nav'>
              <li>
                <a href='#profile'>
                  <BsPersonCircle className='header-icons' />
                </a>
              </li>
              <li>
                <a href='#favourite'>
                  <BsHeart className='header-icons' />
                </a>
              </li>
              <li>
                <a href='#cart'>
                  <BsCartFill className='header-icons' />
                </a>
              </li>
            </ul>
          </section>
          <div className={!showDashes ? 'three-dashs' : 'hidden-three-dashs'} onClick={() => setshowDashes(!showDashes)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
