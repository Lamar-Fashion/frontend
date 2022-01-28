import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../../styles/admin/add-product/addProduct-modal.css";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { storage } from "../../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  height: "92.5vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  // paddingBottom: '5px',
  paddingTop: "45px",
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
// dumy data from backend
let dumyObj = {
  addToHomePage: "no",
  category: "onSales",
  code: "aderwq",
  status: "notReadyToWear",
  sizes: [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
  ],
  totalInStock: 15,
  description: "some description here",
  price: "100",
  colors: [
    { value: "ocean1", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
  ],
};
function EditProductModal({ setOpenEditProduct, openEditProduct }) {
  const [colorsSelected, setColorsSelected] = useState(null);
  const [sizesSelected, setSizesSelected] = useState(null);
  const [productData, setProductData] = useState({ productIamges: [] });
  const [images, setImages] = useState({});
  const [isValid, setIsValid] = useState(false);
  // dumy data
  const [dumyData, setdumyData] = useState(dumyObj);

  // did mount
  useEffect(() => {
    // get product data from backend
    // dumy data

    setSizesSelected(dumyData.sizes);
    setColorsSelected(dumyData.colors);
    setProductData({
      ...productData,
      addToHomePage: dumyData.addToHomePage,
      totalInStock: dumyData.totalInStock,
      category: dumyData.category,
      price: dumyData.price,
      code: dumyData.code,
      status: dumyData.status,
      sizes: dumyData.sizes,
      colors: dumyData.colors,
      description: dumyData.description,
    });
  }, []);

  // handle change for colors selection
  const colorsHandleChange = (selected) => {
    setColorsSelected(selected);
    setProductData({ ...productData, sizes: selected });
    // if the user edit anything allow him to submit
    setIsValid(true);
  };
  // handle change for sizes selection
  const sizesHandleChange = (selected) => {
    setSizesSelected(selected);
    setProductData({ ...productData, colors: selected });
    // if the user edit anything allow him to submit
    setIsValid(true);
  };

  // onSubmit function
  const submitHandler = (e) => {
    try {
      e.preventDefault();

      // this part to upload the images into Firebase
      // for (const [key, value] of Object.entries(images)) {
      //   // to handle 'unknown error', its uploading two extra images: undefined & item'
      //   // if (value.name == undefined) {
      //   //   break;
      //   // }
      //   const file = value;
      //   const directory = 'products';
      //   const currentdate = new Date();
      //   const datetime = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear() + '@' + currentdate.getHours() + ':' + currentdate.getMinutes();
      //   const name = datetime + ' - ' + file.name;
      //   console.log('file.name', file.name);
      //   const storageRef = storage.ref(`${directory}/${name}`);

      //   storageRef.put(file).on(
      //     'state_changed',
      //     (snapshot) => {
      //       //   Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       console.log('Upload is ' + progress + '% done');
      //       switch (snapshot.state) {
      //         case 'paused':
      //           console.log('Upload is paused');
      //           break;
      //         case 'running':
      //           console.log('Upload is running');
      //           break;
      //         default:
      //       }
      //     },
      //     (error) => {
      //       switch (error.code) {
      //         case 'storage/unauthorized':
      //           //   User doesn't have permission to access the object
      //           break;
      //         case 'storage/canceled':
      //           //   User canceled the upload
      //           break;
      //         case 'storage/unknown':
      //           //   Unknown error occurred, inspect error.serverResponse
      //           break;
      //         default:
      //       }
      //     },
      //     () => {
      //       //   Upload completed successfully, now we can get the download URL
      //       storageRef.getDownloadURL().then(async (downloadURL) => {
      //         console.log('File available at', downloadURL);
      //         productData.productIamges.push(downloadURL);
      //       });
      //     }
      //   );
      // }

      setOpenEditProduct(false);
      console.log(
        "edited obj ready to go to the backend: productData",
        productData
      );
      // reset all states
      // setProductData({ productIamges: [] });
      // setImages({});
      // setIsValid(false);
      // setColorsSelected(null);
      // setSizesSelected(null);
    } catch (e) {
      console.log("Edit Product Error", e.message);
    }
  };

  // validate file type, accept only images (jpg, jpeg, png)
  // let obj = {};
  // function validateFileType(key, file) {
  //   let fileName = file.name;
  //   let idxDot = fileName.lastIndexOf('.') + 1;
  //   let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  //   if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
  //     obj[key] = file;
  //   } else {
  //     alert('Only jpg/jpeg and png files are allowed!');
  //   }
  //   return obj;
  // }

  // on change handler
  const handleChange = (e) => {
    // if (e.target.name == 'images') {
    //   for (const [key, value] of Object.entries(e.target.files)) {
    //     setImages(validateFileType(key, value));
    //   }
    // } else {
    setProductData({ ...productData, [e.target.name]: e.target.value });
    // }

    // if the user edit anything allow him to submit
    setIsValid(true);
  };

  // Close modal handler
  function handleClose() {
    setOpenEditProduct(false);
    // reset all states
    // setProductData({ productIamges: [] });
    // setImages({});
    // setIsValid(false);
    // setColorsSelected(null);
    // setSizesSelected(null);
  }
  return (
    <>
      <Modal
        open={openEditProduct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ThemeProvider theme={theme}>
          <Box sx={style}>
            <div className="modal-header">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Product Form:
              </Typography>
              <i class="fas fa-times" onClick={handleClose}></i>
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
                    <option value="">--choose option--</option>
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
                    name="totalInStock"
                    required
                    id="totalInStock"
                    placeholder="Total in Stock"
                    value={productData?.totalInStock}
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
                      value="yes"
                      onChange={handleChange}
                      checked={
                        productData?.addToHomePage == "yes" ? true : false
                      }
                    />
                     <label for="yes">yes</label>
                     {" "}
                    <input
                      type="radio"
                      id="addToHomePage"
                      name="addToHomePage"
                      value="no"
                      onChange={handleChange}
                      checked={
                        productData?.addToHomePage == "no" ? true : false
                      }
                    />
                     <label for="no">no</label>
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
        </ThemeProvider>
      </Modal>
    </>
  );
}

export default EditProductModal;
