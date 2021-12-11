import { React, useState, useEffect } from 'react';
import '../../../styles/abaya-styles/abaya-filter.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}
function AbayaFilter() {
  const [showColorFilter, setShowColorFilter] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showSizeFilter, setShowSizeFilter] = useState(true);
  const [value, setValue] = useState([0, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <section className='abaya-filter'>
        <div className='color-container container'>
          <section className='head'>
            <h5 className='title'>Color</h5>
            <i
              className={showColorFilter ? 'fas fa-angle-up' : 'fas fa-angle-down'}
              onClick={() => {
                setShowColorFilter(!showColorFilter);
              }}
            ></i>
          </section>
          <section className={showColorFilter ? 'color-filter' : 'color-filter-hidden'}>
            <div className='color-box' style={{ backgroundColor: 'red' }}></div>
            <div className='color-box' style={{ backgroundColor: 'black' }}></div>
            <div className='color-box' style={{ backgroundColor: 'green' }}></div>
            <div className='color-box' style={{ backgroundColor: 'pink' }}></div>
            <div className='color-box' style={{ backgroundColor: 'yellow' }}></div>
            <div className='color-box' style={{ backgroundColor: 'brown' }}></div>
            <div className='color-box' style={{ backgroundColor: 'blue' }}></div>
            <div className='color-box' style={{ backgroundColor: 'gray' }}></div>
            <div className='color-box' style={{ backgroundColor: 'purple' }}></div>
            <div className='color-box' style={{ backgroundColor: 'orange' }}></div>
            <div className='color-box' style={{ backgroundColor: 'white' }}></div>
          </section>
        </div>
        <div className='price-container container'>
          <section className='head'>
            <h5 className='title'>Price</h5>
            <i
              className={showPriceFilter ? 'fas fa-angle-up' : 'fas fa-angle-down'}
              onClick={() => {
                setShowPriceFilter(!showPriceFilter);
              }}
            ></i>
          </section>
          <section className={showPriceFilter ? 'price-filter' : 'price-filter-hidden'}>
            <Box sx={{ width: 200 }}>
              <Slider getAriaLabel={() => 'price range'} value={value} onChange={handleChange} valueLabelDisplay='auto' getAriaValueText={valuetext} max={5000} min={0} color='secondary' />
            </Box>
            <p className='price-range'>
              {value[0]} QAR - {value[1]} QAR{' '}
            </p>
          </section>
        </div>
        <div className='size-container container'>
          <section className='head'>
            <h5 className='title'>Size</h5>
            <i
              className={showSizeFilter ? 'fas fa-angle-up' : 'fas fa-angle-down'}
              onClick={() => {
                setShowSizeFilter(!showSizeFilter);
              }}
            ></i>
          </section>
          <section className={showSizeFilter ? 'size-filter' : 'size-filter-hidden'}>
            <span className='size-box'>XS</span>
            <span className='size-box'>S</span>
            <span className='size-box'>M</span>
            <span className='size-box'>L</span>
            <span className='size-box'>XL</span>
          </section>
        </div>
      </section>
    </>
  );
}

export default AbayaFilter;
