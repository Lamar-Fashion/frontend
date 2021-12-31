import { React, useState } from 'react';
import '../../styles/product-details/product-details.css';
import { Link } from 'react-router-dom';
import Flicking from '@egjs/react-flicking';
function ProductDetails() {
  let obj = JSON.parse(window.localStorage.getItem('product'));
  let images = obj.images;
  let firstImg = obj.images[0];
  const [state, setstate] = useState(firstImg);
  let name = obj.name;
  let price = obj.price;
  let size = obj.size;
  let color = obj.color;
  let descrp = obj.discrpition;
  const [selectedProduct, setSelectedProduct] = useState({ ...obj, size: false, color: false, buttons: false });
  const [selectedStyleSize, setSelectedStyleSize] = useState({ show: false, id: '' });
  const [selectedStyleColor, setSelectedStyleColor] = useState({ show: false, id: '' });

  const addEntry = (obj) => {
    let FavArray = JSON.parse(window.localStorage.getItem('cart'));
    if (FavArray == null) FavArray = [];
    FavArray.push(obj);
    window.localStorage.setItem('cart', JSON.stringify(FavArray));
  };
  return (
    <>
      <section className='product-d'>
        <div className='lamar-container'>
          <div className='path'>
            <Link to='/'>
              <i class='fas fa-home'></i>
            </Link>
            <i class='fas fa-angle-right'></i> <span>Product Detail</span>
          </div>
        </div>
        <div className='lamar-container'>
          <div className='image-product'>
            <div className='big-image'>
              <img src={state} alt='' />
            </div>
            <div className='left-images'>
              <Flicking circular={true}>
                {images.map((item) => {
                  return (
                    <div
                      className='image'
                      onClick={() => {
                        setstate(item);
                      }}
                    >
                      <img src={item} alt='' />
                    </div>
                  );
                })}
              </Flicking>
            </div>
          </div>
          <div className='product-info'>
            <div className='name-p'>
              <h2>
                product Num : <span>{name}</span>
              </h2>
              <div className='price'>
                <h2>
                  QAR <span>{price}</span>
                </h2>
                <p>
                  <span>Availabilty :</span> In Stock
                </p>
              </div>
              <li>The Order Takes 1 To 2 Weeks.</li>
            </div>
            <hr />
            <div className='size-color'>
              <div className='size'>
                <h4>size</h4>
                <div className='avialable'>
                  {size.map((item, idx) => (
                    <button
                      className={selectedStyleSize.show && selectedStyleSize.id === idx ? 'selected' : ''}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, size: item });
                        setSelectedStyleSize({ show: true, id: idx });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className='colors'>
                <h4>color</h4>
                <div className='avialable'>
                  {color.map((item, idx) => (
                    <button
                      className={selectedStyleColor.show && selectedStyleColor.id === idx ? 'selected' : ''}
                      onClick={() => {
                        setSelectedProduct({ ...selectedProduct, color: item });
                        setSelectedStyleColor({ show: true, id: idx });
                      }}
                      style={{ backgroundColor: item }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            <div className='qun-product'>
              <div className='buttuns'>
                <label htmlFor='buttuns'>buttuns:</label>
                <select name='buttuns' id='buttuns' onChange={(e) => setSelectedProduct({ ...selectedProduct, buttons: e.target.value })}>
                  <option value='false'>-- choose buttuns --</option>
                  <option value='with-buttuns-مع طقطق'>with-buttuns-مع طقطق</option>
                  <option value='without-buttuns-بدون طقطق'>without-buttuns-بدون طقطق</option>
                </select>
              </div>
              <div className='add-fav'>
                <button>🖤</button>
              </div>
              <div className='add-to-cart'>
                <button
                  onClick={() => {
                    if (!selectedProduct.size || !selectedProduct.color || !selectedProduct.buttons || selectedProduct.buttons == 'false') {
                      alert(
                        `please select ${!selectedProduct.size ? 'size ,' : ' '} ${!selectedProduct.color ? 'color ,' : ' '} ${
                          !selectedProduct.buttons || selectedProduct.buttons == 'false' ? 'buttons (طقطق أ, بدون طقطق)' : ' '
                        }`
                      );
                    } else {
                      addEntry(selectedProduct);
                      console.log('selectedProduct', selectedProduct);
                    }
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
            <hr />

            <div className='about-p'>
              <h4>
                Vendor : <span className='vendor'> {obj.brand}</span>
              </h4>
              <h4>About This Item :</h4>

              <p>{descrp}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
