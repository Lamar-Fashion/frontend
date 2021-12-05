import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FixedHeader from './components/Header/FixedHeader';

function App() {
  return (
    <>
      <Router>
        <FixedHeader />
        <Header />

        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
