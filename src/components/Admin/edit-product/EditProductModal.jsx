import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../../styles/admin/add-product/addProduct-modal.css";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { instance,url } from "../../../API/axios";
import { Link,useNavigate } from 'react-router-dom';
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});
// material-ui styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "60%",
  [theme.breakpoints.down(992)]: {
    width: "80%",
  },
  [theme.breakpoints.down(531)]: {
    width: "95%",
  },
  maxHeight: '93vh',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",

};

// color options
const colourOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

// size options
const sizeOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

// for react-select library (for multiple selection)
const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};


function EditProductModal({abaya, setOpenEditProduct, openEditProduct }) {
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();

  const [colorsSelected, setColorsSelected] = useState(null);
  const [sizesSelected, setSizesSelected] = useState(null);
  const [productData, setProductData] = useState(abaya);
  const [isValid, setIsValid] = useState(false);
  const [addToHomePage, setAddToHomePage] = useState(abaya.addToHomePage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

console.log('addToHomePage',addToHomePage);
  // did mount
  useEffect(() => {
    console.log('item',abaya);
    // add label & value for react-selector
    const colors = abaya.colors.map(color=> { return {value: color, label:color}});
    const sizes = abaya.sizes.map(size=> { return {value: size, label:size}});
    setSizesSelected(sizes);
    setColorsSelected(colors);
    setProductData({
      ...productData,
      addToHomePage: abaya.addToHomePage,
      inStock: abaya.inStock,
      category: abaya.category,
      price: abaya.price,
      code: abaya.code,
      status: abaya.status,
      sizes: abaya.sizes,
      colors: abaya.colors,
      description: abaya.description,
    });
  }, []);

  // handle change for colors selection
  const colorsHandleChange = (selected) => {
    let colorValues = selected.map(color=> color.value);
    setColorsSelected(selected);
    setProductData({ ...productData, colors: colorValues });
    // if the user edit anything allow him to submit
    setIsValid(true);
  };
  // handle change for sizes selection
  const sizesHandleChange = (selected) => {
    let sizeValues = selected.map(size=> size.value);
    setSizesSelected(selected);
    setProductData({ ...productData, sizes: sizeValues });
    // if the user edit anything allow him to submit
    setIsValid(true);
  };

  // onSubmit function
  const submitHandler =  (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async() => {
      
    try {
const editedAbaya = await instance.put(url+`/product${productData.id}`,productData,{
  headers: {
    authorization: `Bearer ${user.token}`
  }
});
setIsLoading(true);
setOrderDone(true);
      // setOpenEditProduct(false);
      // navigate(0);
      } catch (error) {
        error?.response?.data?.error ?  setError(error.response.data.error) : setError('Error while editing product');
      console.log("Edit Product Error", error.message);
    }
  }, 1000);

  };



  // on change handler
  const handleChange = (e) => {
   console.log('e.target.value',e.target.value);
   if(e.target.name=='addToHomePage') {
if (e.target.value === 'true') {
  setAddToHomePage(true);
  
}
if (e.target.value === 'false') {
  setAddToHomePage(false);
  
}
   }

    setProductData({ ...productData, [e.target.name]: e.target.value });

    // if the user edit anything allow him to submit
    setIsValid(true);
  };

  // Close modal handler
  function handleClose() {
    setOpenEditProduct(false);
  }
  return (
    <>
      <Modal
        open={openEditProduct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
      >
        <ThemeProvider theme={theme}>
          <Box sx={style} className='box-container'>
            <div className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Product Form:
              </Typography>
              <i className="fas fa-times" onClick={handleClose}></i>
            </div>
            <div className="form-container">
              <form className="add-from" action="" onSubmit={submitHandler}>
                <div className="product-brand">
                  <label>Category :</label>
                  <select
                    name="category"
                    required
                    id="category"
                    onChange={handleChange}
                    value={productData?.category}
                  >
                    <option value="">--choose option--</option>
                    <option value="newArrivals">New Arrivals</option>
                    <option value="onSales">On Sales</option>
                  </select>
                </div>
                <div className="collection">
                  <label>Status :</label>
                  <select
                    name="status"
                    required
                    id="status"
                    onChange={handleChange}
                    value={productData?.status}
                  >
                    <option value="" >--choose option--</option>
                    <option value="notReadyToWear">يحتاج الى تفصيل</option>
                    <option value="readyToWear">Ready To Wear</option>
                  </select>
                </div>
                <div className="code">
                  <label>Code :</label>
                  <input
                    type="text"
                    name="code"
                    required
                    id="code"
                    placeholder="Product Code"
                    onChange={handleChange}
                    value={productData?.code}
                  />
                </div>
                <div className="description">
                  <label>Description :</label>
                  <textarea
                    type="text"
                    name="description"
                    required
                    id="description"
                    placeholder="Product Description"
                    onChange={handleChange}
                    value={productData?.description}
                  />
                </div>
                <div className="price">
                  <label>Price :</label>
                  <input
                    type="number"
                    name="price"
                    required
                    id="price"
                    placeholder="Product Price"
                    onChange={handleChange}
                    value={productData?.price}
                  />
                </div>
                <div className="sizes">
                  <label htmlFor="sizes">Sizes :</label>
                  <ReactSelect
                    options={sizeOptions}
                    isMulti
                    required
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={sizesHandleChange}
                    allowSelectAll={true}
                    value={sizesSelected}
                  />
                </div>
                <div className="colors">
                  <label>Colors :</label>
                  <ReactSelect
                    options={colourOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={colorsHandleChange}
                    allowSelectAll={true}
                    value={colorsSelected}
                  />
                </div>
                <div className="availability">
                  <label>Total in Stock :</label>
                  <input
                    type="number"
                    name="inStock"
                    required
                    id="inStock"
                    placeholder="Total in Stock"
                    value={productData?.inStock}
                    onChange={handleChange}
                  />
                </div>
                <div className="images">
                  {/* <input type='file' multiple name='images' required id='images' placeholder='Product images' onChange={handleChange} accept='image/png,image/jpeg' /> */}
                </div>
                <div className="addToHomePage">
                  <label htmlFor="addToHomePage">
                    Add this product to the Home page?{" "}
                  </label>
                  <br />
                  <section>
                    <input
                      type="radio"
                      id="addToHomePage"
                      name="addToHomePage"
                      value={true}
                      onChange={handleChange}
                      checked={addToHomePage == true}
                    />
                     <label htmlFor={true}>yes</label>
                     
                    <input
                      type="radio"
                      id="addToHomePage" 
                      name="addToHomePage"
                      value={false}
                      onChange={handleChange}
                      checked={addToHomePage == false}
                    />
                     <label htmlFor={false} > no</label>
                  </section>
                </div>

                <button
                  type="submit"
                  value="create an account"
                  className="submit"
                  disabled={!isValid}
                >
                  edit product
                </button>
              </form>
              <br />
              {!isValid && <p>you didn't edit anything yet!</p>}
            </div>
          </Box>
          {isLoading &&  !error && <section className='progress-container'>
     <LoadingState/>
          </section>}

          {orderDone  && <DualModal type='success' navigateTo = '/Abaya' showHeader={true} text={"your product has been updated successfully"}/>}
        {error && <DualModal type='error' navigateTo = '/Abaya' text={error ? error : 'Something went wrong! <br/> please try again'} showHeader={true}/>}
        </ThemeProvider>
      </Modal>
    </>
  );
}

export default EditProductModal;
