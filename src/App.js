import { React, useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FixedHeader from './components/Header/FixedHeader';
import SignIn from './components/Sign/sign-in/SignIn';
import SignUp from './components/Sign/sign-up/SignUp';
import AboutUs from './components/About-us/AboutUs';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Checkout2 from './components/Checkout/Checkout2';
import DeliveryPolicy from './components/Policy/DeliveryPolicy';
import PrivacyPolicy from './components/Policy/PrivacyPolicy';
import ProductDetails from './components/Product-details/ProductDetails';
import Profile from './components/Profile/profile/Profile';
import ContactUs from './components/Contact-us/ContactUs';
import Checkout3 from './components/Checkout/Checkout3';
import AbayaCards from './components/Abaya/abaya-cards/AbayaCards';
import AllUsers from './components/Admin/all-users/AllUsers';
import PendingOrders from './components/Admin/pending-orders/PendingOrders';
import DoneOrders from './components/Admin/done-orders/DoneOrders';
import RejectedOrders from './components/Admin/rejected-orders/RejectedOrders';
import AdminSettings from './components/Admin/admin-settings/AdminSettings';
import Admin from './components/Admin/Admin';
import validateToken from './helpers/validateToken';
import { useDispatch, useSelector } from 'react-redux';
import {logOutAction, logInAction, setAdminSettings} from './store/actions/index';
import { instance, url } from "./API/axios";
import LoadingState from './components/Shared/LoadingState';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, role } = useSelector((state) => state.authReducer);

  const [y, setY] = useState(window.scrollY);
  const [isLoading, setIsLoading] = useState(false);
  
  window.onscroll = function () {
    setY(window.scrollY);

    //hide search result list if user scrolls
    const searchResultModal = document.querySelector('#search-modal');
    if(searchResultModal)  searchResultModal.style.display= 'none';
  };

  // get admin settings on reload.
  const fetchAdminSettings = async (user, callback) => {
    try {
      setIsLoading(true);
      let headers = {};
      if (user && user.token && user.role == 'admin') {
        headers = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
      }
      const response = await instance.get(url + "/adminSettings", headers);
      if (response && response.data) {
        callback(null, response.data);
      } else {
        callback(null, null);
      }
      //make delay for loading to be like real loading not flickering when response was fast.
      setTimeout(() => {
        setIsLoading(false);
      }, 750);

    } catch (error) {
      callback(error, null);
      setIsLoading(false);

    }
  };

  useEffect(() => {
    // check if the token exists in the cookies, so keep the user loggedin
    const user = validateToken();
    if(user) dispatch(logInAction(user));
    // else dispatch(logOutAction());

    //fetch admin settings
    fetchAdminSettings(user, (err, adminSettings) => {
      if (err) {
        console.error('Error getting admin Settings', err);
        return;
      }

      if (adminSettings) {
        dispatch(setAdminSettings(adminSettings));
      }

    });

  },[]);
 
  window.onbeforeunload = function () {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <>
      {isLoading && (
          <LoadingState />
      )}
      {!isLoading && <Router>
        {Number(y) >= 120 && (
          <button
            className='go-up'
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <i className='fas fa-angle-up'></i>
          </button>
        )}
        <FixedHeader />
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Abaya' element={<AbayaCards />} />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/SignUp' element={<SignUp />} />
          <Route exact path='/AboutUs' element={<AboutUs />} />
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/Checkout' element={<Checkout />} />
          <Route exact path='/Checkout2' element={<Checkout2 />} />
          <Route exact path='/Checkout3' element={<Checkout3 />} />
          <Route exact path='/DeliveryPolicy' element={<DeliveryPolicy />} />
          <Route exact path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route exact path='/ProductDetails/:abayaId' element={<ProductDetails />} />
          <Route exact path='/Profile/:path' element={<Profile />} />
          <Route exact path='/Contact-us' element={<ContactUs />} />
          <Route exact path='/AllUsers' element={<AllUsers />} />
          <Route exact path='/AdminSettings' element={<AdminSettings />} />
          <Route exact path='/PendingOrders' element={<PendingOrders />} />
          <Route exact path='/DoneOrders' element={<DoneOrders />} />
          <Route exact path='/RejectedOrders' element={<RejectedOrders />} />
          <Route exact path='/Admin' element={<Admin />} />
        </Routes>
        <Footer />
      </Router>}
    </>
  );
}

export default App;
