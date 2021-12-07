import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FixedHeader from './components/Header/FixedHeader';
import Abaya from './components/Abaya/Abaya';

function App() {
  return (
    <>
      <Router>
        <FixedHeader />
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Abaya' element={<Abaya />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
