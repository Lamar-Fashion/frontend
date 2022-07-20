/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from 'react';
import '../../styles/header-styles/Header.css';
import logo from '../../images/header/lamar-logo-small.png';
import { BsCartFill, BsFillHeartFill, BsPersonCircle } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { navigateAction,logOutAction,assignFavourite } from '../../store/actions';
import cookies from 'react-cookies';
import {decryptAndGetFromStorage,encryptAndSaveToStorage} from '../../helpers/CryptoJS';
import {instance,url} from '../../API/axios';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,role,isLoggedIn} = useSelector((state) => state.authReducer);
  const cartProductsNumber = useSelector((state) => state.cartReducer.cartProductsNumber);
  const favouritesNumber = useSelector((state) => state.favouriteReducer.favouritesNumber);
  console.log('favouritesNumber top',favouritesNumber);

  const [showVerticalNav, setshowVerticalNav] = useState(false);
  const [showDropHome, setShowDropHome] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [showSearchTextField, setShowSearchTextField] = useState(false);
  const [cartNumber, setCartNumber] = useState(decryptAndGetFromStorage('cartNumber') ? decryptAndGetFromStorage('cartNumber') : 0);
  const [favNumber, setFavNumber] = useState(decryptAndGetFromStorage('favNumber') ? decryptAndGetFromStorage('favNumber') : 0);
  const [y, setY] = useState(0);
  function scrollHandler() {
    setY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true);
    dispatch(assignFavourite(decryptAndGetFromStorage('favNumber') ? decryptAndGetFromStorage('favNumber') : 0));
  }, []);

  // trigger redux, save to storage, and render it
  useEffect(() => {
  encryptAndSaveToStorage('cartNumber',cartProductsNumber);

    setCartNumber(cartProductsNumber);
  }, [cartProductsNumber]);

  useEffect(() => {
    console.log('favouritesNumber',favouritesNumber);
  encryptAndSaveToStorage('favNumber',favouritesNumber);
// console.log('favouritesNumber',favouritesNumber);
  setFavNumber(favouritesNumber);
  }, [favouritesNumber]);

  //log out handler
  const logoutHandler = ()=>{
    console.log('from sign out');
    cookies.remove('token');
    dispatch(logOutAction());
    dispatch(assignFavourite(0));
    navigate('/');
    window.location.reload();
  }
  return (
    <>
      <section className={y > 0 ? 'header header-scroll' : 'header'}>
        {showVerticalNav && (
          <>
            <div
              className='close-vertical'
              onClick={() => {
                setshowVerticalNav(false);
              }}
            ></div>
            <div className='vertical-nav-container'>
              <ul className='main-nav-phone'>
                {role === 'admin' ? (
                  <li>
                    <Link
                      to='/Admin'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <a>Admin</a>
                    </Link>
                    <i
                      className={dropDown ? 'fas fa-angle-up' : 'fas fa-angle-down'}
                      onClick={() => {
                        setShowDropHome(!showDropHome);
                        setDropDown(!dropDown);
                      }}
                    ></i>
                    <ul className={showDropHome ? 'drop-ul-phone drop-ul-phone-scroll' : 'drop-ul-phone'}>
                      <li>
                        <Link
                          to='/PendingOrders'
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          Pending Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/DoneOrders'
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          Done Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/RejectedOrders'
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          Rejected Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/AllUsers'
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          All Users
                        </Link>
                      </li>
                      {/* <li>
                      <a href='#brands'>
                        collection
                      </a>
                    </li>
                    <li>
                      <a href='#collection'>products</a>
                    </li>
                    <li>
                      <a href='#feedback'>feedback</a>
                    </li> */}
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link
                      to='/'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <a>Home</a>
                    </Link>
                    <i
                      className={dropDown ? 'fas fa-angle-up' : 'fas fa-angle-down'}
                      onClick={() => {
                        setShowDropHome(!showDropHome);
                        setDropDown(!dropDown);
                      }}
                    ></i>
                    <ul className={showDropHome ? 'drop-ul-phone drop-ul-phone-scroll' : 'drop-ul-phone'}>
                      <li>
                        <Link
                          to='/Contact-us'
                          onClick={() => {
                            window.scrollTo({
                              left: 0,
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          contact us
                        </Link>
                      </li>
                      {/* <li>
                    <a href='#brands'>
                      collection
                    </a>
                  </li>
                  <li>
                    <a href='#collection'>products</a>
                  </li>
                  <li>
                    <a href='#feedback'>feedback</a>
                  </li> */}
                    </ul>
                  </li>
                )}
                <li>
                  <Link
                    to='/Abaya'
                    onClick={() => {
                      window.scrollTo({
                        left: 0,
                        top: 0,
                        behavior: 'smooth',
                      });
                      dispatch(navigateAction("all"));
                    }}
                  >
                    <a>
                      Abayas
                      {/* <i className='fas fa-angle-down'></i> */}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to='/Abaya' 
                   onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                    dispatch(navigateAction("New Arrival"));
                  }}>
                    <a>New Arrivals</a>
                  </Link>
                </li>
                <li>
                  <Link to='/Abaya' 
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                    dispatch(navigateAction("On Sales"));
                  }}>
                    <a>on Sales</a>
                  </Link>
                </li>

                {/* <li>
                <Link to="/Abaya" onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth",
                  });
                }}>
                  <a>
                    Abaya
                  </a>
                </Link>
                <i className={ dropDownA ? "fas fa-angle-up" : "fas fa-angle-down"} 
                      onClick={() => {
                        setShowDropAbay(!showDropAbay);
                        setDropDownA(!dropDownA);
                      }}
                    >

                </i>
                <ul
                  className={
                    showDropAbay
                      ? "drop-ul-phone drop-ul-phone-scroll"
                      : "drop-ul-phone"
                  }
                >
                  <li>
                    <a href="#lamar">lamar</a>
                  </li>
                  <li>
                    <a href="#mortaha">mortaha</a>
                  </li>
                  <li>
                    <a href="#neo">neo</a>
                  </li>
                  <li>
                    <a href="#shera">shera</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#shalat">Shalat</a>
              </li> */}
              </ul>
            </div>
          </>
        )}
        <div className={y > 0 ? 'lamar-container lamar-container-scroll ' : 'lamar-container'}>
          <ul className={y > 0 ? 'main-nav main-nav-scroll ' : 'main-nav'}>
            {role === 'admin' ? (
              <li>
                <Link
                  to='/Admin'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a>
                    Admin
                    <i className='fas fa-angle-down'></i>
                  </a>
                </Link>
                <ul className={y > 0 ? 'drop-ul-home-scroll' : 'drop-ul-home'}>
                  {/* <li>
                  <a href='#brands'>collection</a>
                </li>
                <li>
                  <a href='#collection'>products</a>
                </li>
                <li>
                  <a href='#feedback'>feedback</a>
                </li> */}
                  <li>
                    <Link
                      to='/PendingOrders'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      Pending Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/DoneOrders'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      Done Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/RejectedOrders'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      Rejected Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/AllUsers'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      All Users
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  to='/'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a>
                    Home
                    <i className='fas fa-angle-down'></i>
                  </a>
                </Link>
                <ul className={y > 0 ? 'drop-ul-home-scroll' : 'drop-ul-home'}>
                  {/* <li>
    <a href='#brands'>collection</a>
  </li>
  <li>
    <a href='#collection'>products</a>
  </li>
  <li>
    <a href='#feedback'>feedback</a>
  </li> */}
                  <li>
                    <Link
                      to='/Contact-us'
                      onClick={() => {
                        window.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      contact us
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <Link
                to='/Abaya'
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  });
                  dispatch(navigateAction("all"));

                }}
                
              >
                <a>
                  Abayas
                  {/* <i className='fas fa-angle-down'></i> */}
                </a>
              </Link>
              {/* <ul className={y > 0 ? 'drop-ul-home-scroll' : 'drop-ul-home'}>
                <li>
                  <a href='#lamar'>lamar</a>
                </li>
                <li>
                  <a href='#mortaha'>mortaha</a>
                </li>
                <li>
                  <a href='#neo'>neo</a>
                </li>
                <li>
                  <a href='#shera'>shera</a>
                </li>
              </ul> */}
            </li>
            <li>
              <Link  to='/Abaya'
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  });
                  dispatch(navigateAction("New Arrival"));

                }}>
                <a >New Arrivals</a>
              </Link>
            </li>
            <li>
              <Link  to='/Abaya'
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth',
                  });
                  dispatch(navigateAction("On Sales"));

                }}>
                <a >On Sales</a>
              </Link>
            </li>
          </ul>

          <div className={y > 0 ? 'image image-scroll ' : 'image'}>
            <Link
              to='/'
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              <img src={logo} alt='logo' className='logo' />
            </Link>
          </div>
          <section className={y > 0 ? 'rightContainer rightContainer-scroll ' : 'rightContainer'}>
            <div className='searchContainer'>
              <input type='text' name='search' placeholder='Search...' className={showSearchTextField ? 'input' : 'hidden-input'} />

              <a href='#' className='btn' onClick={() => setShowSearchTextField(!showSearchTextField)}>
                <i className='fas fa-search'></i>
              </a>
            </div>
            <ul className='right-nav'>
              <li>
                {!isLoggedIn && (
                  <Link
                    to='/SignIn'
                    onClick={() => {
                      window.scrollTo({
                        left: 0,
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <a className='a-sign' >
                      sign-in <i className='fas fa-sign-in-alt header-icons profile'></i>
                    </a>
                   </Link>
                )}
                {isLoggedIn && (
                  // <Link
                  //   to='/SignIn'
                  //   onClick={() => {
                  //     window.scrollTo({
                  //       left: 0,
                  //       top: 0,
                  //       behavior: 'smooth',
                  //     });
                  //   }}
                  // >
                    <a className='a-sign' onClick={logoutHandler}>
                      sign-out <i className='fas fa-sign-out-alt header-icons profile'></i>
                    </a>
                  // </Link>
                )}
              </li>
              <li>
                <Link
                  to='/Profile'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a>
                    <BsFillHeartFill className='header-icons fav' />

                    <strong className='number'>{favNumber}</strong>
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  to='/Cart'
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <a>
                    <BsCartFill className='header-icons cart' />

                    <strong className='number'>{cartNumber}</strong>
                  </a>
                </Link>
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
