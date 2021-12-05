/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from 'react';
import '../../header-styles/Header.css';
import logo from '../../images/header/lamar-logo-small.png';
import { BsCartFill, BsHeart, BsPersonCircle } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';

function Header() {
  const [showVerticalNav, setshowVerticalNav] = useState(false);
  const [y, setY] = useState(window.scrollY);
  window.onscroll = function () {
    setY(window.scrollY);
  };

  useEffect(() => {
    console.log('y', y);
  }, [y]);

  return (
    <>
      <section className={y > 0 ? 'header header-scroll' : 'header'}>
        {showVerticalNav && (
          <div className='vertical-nav-container'>
            <ul className='main-nav-phone'>
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
          </div>
        )}
        <div className={y > 0 ? 'lamar-container lamar-container-scroll ' : 'lamar-container'}>
          <ul className={y > 0 ? 'main-nav main-nav-scroll ' : 'main-nav'}>
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

          <div className={y > 0 ? 'image image-scroll ' : 'image'}>
            <img src={logo} alt='logo' className='logo' />
          </div>
          <section className={y > 0 ? 'rightContainer rightContainer-scroll ' : 'rightContainer'}>
            <div className='searchContainer'>
              <input type='text' name='search' placeholder='Search...' className='input' />

              <a href='#' className='btn'>
                <i className='fas fa-search'></i>
              </a>
            </div>
            <ul className='right-nav'>
              <li>
                <a href='#profile'>
                  <BsPersonCircle className='header-icons profile' />
                </a>
              </li>
              <li>
                <a href='#favourite'>
                  <BsHeart className='header-icons fav' />

                  <strong className='number'>5</strong>
                </a>
              </li>
              <li>
                <a href='#cart'>
                  <BsCartFill className='header-icons cart' />

                  <strong className='number'>5</strong>
                </a>
              </li>
            </ul>
          </section>
          <div
            className={showVerticalNav ? 'three-dashs active' : 'three-dashs'}
            onClick={() => {
              setshowVerticalNav(!showVerticalNav);
            }}
          >
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
