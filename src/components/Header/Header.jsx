import React from 'react';
import '../../header-styles/Header.css';
import logo from '../../images/header/lamar-logo-small.png';
import { BsCartFill, BsHeart, BsPersonCircle } from 'react-icons/bs';

function Header() {
  return (
    <>
      <section className='header'>
        <div className='lamar-container'>
          <ul className='main-nav'>
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

          <div className='image'>
            <img src={logo} alt='logo' className='logo' />
          </div>
          <section className='rightContainer'>
            <div class='searchContainer'>
              <input type='text' name='search' placeholder='Search...' class='input' />

              <a href='#' class='btn'>
                <i class='fas fa-search'></i>
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
        </div>
      </section>
    </>
  );
}

export default Header;
