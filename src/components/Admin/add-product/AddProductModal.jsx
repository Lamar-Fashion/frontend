import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../../styles/admin/add-product/addProduct-modal.css";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { storage } from "../../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { instance, url } from "../../../API/axios";
import { useSelector } from "react-redux";
import ProgressState from "../../Shared/ProgressState";
import DualModal from "../../Shared/DualModal";
import { handleImageSize } from "../../../helpers/imagesResizer";
import { uploadImagesToFirebase, validateFileTypeImage } from "../../../helpers";

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
  maxHeight: "90vh",
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
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

function AddProductModal({ openAddproduct, setOpenAddProduct }) {
  const user = useSelector((state) => state.authReducer.user);

  const [colorsSelected, setColorsSelected] = useState(null);
  const [sizesSelected, setSizesSelected] = useState(null);
  const [productData, setProductData] = useState({ productIamges: [] });
  const [images, setImages] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [addToHomePage, setAddToHomePage] = useState(null);
  const [imgUploadPercentage, setImgUploadPercentage] = useState(0);
  const [indexOfUploadedIMG, setIndexOfUploadedIMG] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  // handle change for colors selection
  const colorsHandleChange = (selected) => {
    let colorValues = selected.map((color) => color.value);
    setColorsSelected(selected);
    setProductData({ ...productData, colors: colorValues });
  };

  // handle change for sizes selection
  const sizesHandleChange = (selected) => {
    let sizeValues = selected.map((size) => size.value);
    setSizesSelected(selected);
    setProductData({ ...productData, sizes: sizeValues });
  };

  // onSubmit function
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    uploadImagesToFirebase (images, 'products', setImgUploadPercentage, setIndexOfUploadedIMG, async (err, arrayOfDownloadUrls) => {
      if (err) {
        setError(err);
        return;
      }
      if (!arrayOfDownloadUrls) {
        arrayOfDownloadUrls = [];
      }

      try {
        //convert array of objects to array of strings (download urls)
        const arrayOfUrls = [];
        arrayOfDownloadUrls.forEach((urlObj, idx) => arrayOfUrls.push(urlObj[Object.keys(urlObj)[idx]]));
        productData.productIamges.push(...arrayOfDownloadUrls);
        // send req to backend
        const addedProduct = await instance.post(
          url + "/product",
          productData,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrderDone(true);
        setIsLoading(false);

      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while adding product");
        console.error("Error while adding product", error.message);
      }

    });
  
  };

  // on change handler
  const handleChange = (e) => {
    if (e.target.name == "images") {
      const validatedImagesObj = {};
      for (const [key, value] of Object.entries(e.target.files)) {
        setImages(validateFileTypeImage(key, value, validatedImagesObj));
      }
    } else {
      if (e.target.name == "addToHomePage") {
        if (e.target.value === "true") {
          setAddToHomePage(true);
        }
        if (e.target.value === "false") {
          setAddToHomePage(false);
        }
      }

      if (e.target.name === "discount") {
        let discount = e.target.value; 
        if (discount < 0) {
          discount = 0;
        }
        if (discount > 100) {
          discount = 100;
        }
        e.target.value = discount;
        setProductData({ ...productData, discount: discount });
        return;
      }

      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // verify the user to enter the whole data before submission
    if (
      Object.values(images)?.length >= 1 &&
      productData?.colors?.length >= 1 &&
      productData?.sizes?.length >= 1 &&
      productData.category &&
      productData.code &&
      productData.totalInStock &&
      productData.description &&
      productData.status &&
      productData.price &&
      (productData.addToHomePage == "false" ||
        productData.addToHomePage == "true")
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [productData]);

  // Close modal handler
  function handleClose() {
    setOpenAddProduct(false);
    // reset all states
    setProductData({ productIamges: [] });
    setImages({});
    setIsValid(false);
    setAddToHomePage(null);
    setColorsSelected([]);
    setSizesSelected([]);
    setOrderDone(false);
    setIsLoading(false);
    setImgUploadPercentage(0);
    setIndexOfUploadedIMG(1);
  }

  return (
    <>
      <Modal
        open={openAddproduct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ThemeProvider theme={theme}>
          <Box sx={style} className="box-container">
            <div className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Product Form:
              </Typography>
              <i className="fas fa-times" onClick={handleClose}></i>
            </div>
            <div className="form-container">
              <form className="add-from" onSubmit={submitHandler}>
                <div className="product-brand">
                  <label htmlFor="category">Category :</label>
                  <select
                    name="category"
                    required
                    id="category"
                    onChange={handleChange}
                  >
                    <option value="">--choose option--</option>
                    <option value="newArrivals">New Arrivals</option>
                    <option value="onSales">On Sales</option>
                  </select>
                </div>
                <div className="collection">
                  <label htmlFor="status">Status :</label>
                  <select
                    name="status"
                    required
                    id="status"
                    onChange={handleChange}
                  >
                    <option value="">--choose option--</option>
                    <option value="notReadyToWear">يحتاج الى تفصيل</option>
                    <option value="readyToWear">Ready To Wear</option>
                  </select>
                </div>
                <div className="code">
                  <input
                    type="text"
                    name="code"
                    required
                    id="code"
                    placeholder="Product Code"
                    onChange={handleChange}
                  />
                </div>
                <div className="description">
                  <textarea
                    type="text"
                    name="description"
                    required
                    id="description"
                    placeholder="Product Description"
                    onChange={handleChange}
                  />
                </div>
                <div className="price">
                  <input
                    type="number"
                    name="price"
                    required
                    id="price"
                    placeholder="Product Price"
                    onChange={handleChange}
                  />
                </div>
                { productData.category === "onSales" &&  <div className="discount">
                Discount
                <br/>
                  <input
                    type="number"
                    name="discount"
                    required
                    id="discount"
                    placeholder=""
                    onChange={handleChange}
                    style={{width: "50px"}}
                    max="100"
                    min="0"
                  />
                  %
                </div>}
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
                  <label htmlFor="colors">Colors :</label>
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
                  <input
                    type="number"
                    name="totalInStock"
                    required
                    id="totalInStock"
                    placeholder="Total in Stock"
                    onChange={handleChange}
                  />
                </div>

                <div className="images">
                  <label htmlFor="images">upload images</label>
                  <input
                    type="file"
                    multiple
                    name="images"
                    required
                    id="images"
                    placeholder="Product images"
                    onChange={handleChange}
                    accept="image/png,image/jpeg"
                  />
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
                      checked={addToHomePage == true}
                      onChange={handleChange}
                    />
                    <label htmlFor={true}>yes</label>
                    <input
                      type="radio"
                      id="addToHomePage"
                      name="addToHomePage"
                      value={false}
                      checked={addToHomePage == false}
                      onChange={handleChange}
                    />
                    <label htmlFor={false}>no</label>
                  </section>
                </div>

                <button
                  type="submit"
                  value="create an account"
                  className="submit"
                  disabled={!isValid}
                >
                  add product
                </button>
              </form>
              <br />
              {!isValid && <p>You must fill the form..</p>}
            </div>
          </Box>
          {isLoading && !error && (
            <section className="progress-container">
              <span>uploading images</span>
              <div className="flex-row">
                <ProgressState
                  count={imgUploadPercentage}
                  style={{ opacity: 1, width: `${imgUploadPercentage}%` }}
                />
                <span>
                  {indexOfUploadedIMG}/{Object.keys(images).length}
                </span>
              </div>
            </section>
          )}

          {orderDone && (
            <DualModal
              type="success"
              navigateTo="/Abaya"
              showHeader={true}
              text={"your product has been added successfully"}
            />
          )}
          {error && (
            <DualModal
              type="error"
              navigateTo="/Abaya"
              text={
                error ? error : "Something went wrong! <br/> please try again"
              }
              showHeader={true}
            />
          )}
        </ThemeProvider>
      </Modal>
    </>
  );
}

export default AddProductModal;
