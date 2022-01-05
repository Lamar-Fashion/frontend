import { React, useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FixedHeader from './components/Header/FixedHeader';
import Abaya from './components/Abaya/Abaya';
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

function App() {
  const [y, setY] = useState(window.scrollY);
  window.onscroll = function () {
    setY(window.scrollY);
  };
  return (
    <>
      <Router>
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
          <Route exact path='/Abaya' element={<Abaya />} />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/SignUp' element={<SignUp />} />
          <Route exact path='/AboutUs' element={<AboutUs />} />
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/Checkout' element={<Checkout />} />
          <Route exact path='/Checkout2' element={<Checkout2 />} />
          <Route exact path='/Checkout3' element={<Checkout3 />} />
          <Route exact path='/DeliveryPolicy' element={<DeliveryPolicy />} />
          <Route exact path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route exact path='/ProductDetails' element={<ProductDetails />} />
          <Route exact path='/Profile' element={<Profile />} />
          <Route exact path='/Contact-us' element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
