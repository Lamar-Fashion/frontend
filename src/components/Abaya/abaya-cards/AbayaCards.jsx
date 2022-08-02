import { React, useState, useEffect } from "react";
import "../../../styles/abaya-styles/abaya-cards.css";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import AddProductModal from "../../Admin/add-product/AddProductModal";
import EditProductModal from "../../Admin/edit-product/EditProductModal";
import { storage } from "../../../firebase";
import { instance, url } from "../../../API/axios";
import { encryptAndSaveToStorage } from "../../../helpers/CryptoJS";
import { navigateAction, assignFavourite } from "../../../store/actions/index";
import LoadingState from "../../Shared/LoadingState";
import Alert from "@mui/material/Alert";
import DualModal from "../../Shared/DualModal";

const arralen = 10;

function AbayaCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, user, isLoggedIn } = useSelector((state) => state.authReducer);
  const category = useSelector((state) => state.navigationReducer.category);

  const [openAddproduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openModalById, setOpenModalById] = useState(null);
  const [showItems, setShowItems] = useState(15);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * showItems;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);
  const [addedToFavItem, setAddedToFavItem] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  const [allAbayas, setAllAbayas] = useState([]);
  const [displayedAbayas, setDisplayedAbayas] = useState([]);

  const [openDeletModal, setOpenDeletModal] = useState(false);
  const [message, setMessage] = useState(null);

  const handleOpenAddProduct = () => setOpenAddProduct(true);

  const handleOpenEditProduct = (id) => {
    setOpenModalById(id);
    setOpenEditProduct(true);
  };

  //get all abayas
  const getAllAbayas = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const abayas = await instance.get(url + "/allProducts");
        setAllAbayas(abayas.data);
        setIsLoading(false);
      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while getting products");
        console.error("Error while getting products", error.message);
      }
    }, 50);
  };
  // did mount
  useEffect(() => {
    getAllAbayas();
  }, []);

  // add to favourite handler
  const addToFavourite = async (item) => {
    setAddedToFavItem(item);
    try {
      //check if the user loggedn in or not

      if (isLoggedIn) {
        // send to backend
        const addeddToFavourite = await instance.post(
          url + `/favourite`,
          { abayaId: item.id, userId: user.id },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (addeddToFavourite?.data?.msg === "already in your wishlist") {
          setMessage("already in your wishlist");
        } else {
          setMessage(null);
          dispatch(assignFavourite(addeddToFavourite.data.abayaId.length));
        }
        setOrderDone(true);
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          setOrderDone(false);
        }, 3000);
      } else {
        // ask him to log-in or signup
        navigate("/SignIn");
      }
    } catch (error) {
      error?.response?.data?.error
        ? setError(error.response.data.error)
        : setError("Error while adding to favourite");
      console.error("Error while adding to favourite", error.message);
    }
  };

  //handle sort by category
  function handleSort(e) {
    dispatch(navigateAction(e.target.value));
  }

  // delete product handler
  async function deleteHnadler(item) {
    setIsLoading(true);
    try {
      // delete from backend
      const deletedProduct = await instance.delete(url + `/product${item.id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      // delete the images from the firebase
      for (let i = 0; i < item.images.length; i++) {
        let pictureRef = storage.refFromURL(item.images[i]);
        const deletedImg = await pictureRef.delete();
      }
      setIsLoading(false);
      setDeletedItem(null);
      setOpenDeletModal(false);

      window.location.reload();
    } catch (error) {
      error?.response?.data?.error
        ? setError(error.response.data.error)
        : setError("delete product error");
      console.error("delete product error", error.message);
    }
  }

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 100,
      behavior: "smooth",
    });
  }, [pageNumber]);

  useEffect(() => {
    const displayedAbayas =
      allAbayas.length &&
      allAbayas
        .filter((item) => {
          if (category === "all") {
            return item;
          } else if (category == "New Arrival") {
            return item.category == "newArrivals";
          } else if (category == "On Sales") {
            return item.category == "onSales";
          }
        })
        .slice(pagesVisited, pagesVisited + showItems)
        .map((item, indx) => {
          return (
            <div key={item.id} className="box">
              <div className="over-view to-cart">
                <div
                  className="fav"
                  onClick={() => {
                    addToFavourite(item);
                  }}
                >
                  <i className="fas fa-heart"></i>
                </div>
              </div>
              <Link
                to="/ProductDetails"
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth",
                  });

                  encryptAndSaveToStorage("product", item);
                }}
              >
                <div className="over-view">
                  <div className="fav">
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                </div>
              </Link>
              {role == "admin" && (
                <div
                  className="over-view edit"
                  onClick={() => {
                    handleOpenEditProduct(item.id);
                  }}
                >
                  <div className="fav">
                    <i className="fas fa-pen"></i>
                  </div>
                </div>
              )}
              {openEditProduct && item.id == openModalById && (
                <EditProductModal
                  key={item}
                  abaya={item}
                  setOpenEditProduct={setOpenEditProduct}
                  openEditProduct={openEditProduct}
                />
              )}

              {role === "admin" && (
                <div
                  className="over-view delete"
                  onClick={() => {
                    setDeletedItem(item);
                    setOpenDeletModal(true);
                  }}
                >
                  <div className="fav">
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              )}
              <div className="image">
                <img src={item.images[0]} alt="" className="img-product" />
                {/* <div className='img-box' style={{"backgroundImage": `url(${item.images[0]})`}}></div> */}
                <Link
                  to="/ProductDetails"
                  onClick={() => {
                    window.scrollTo({
                      left: 0,
                      top: 0,
                      behavior: "smooth",
                    });
                    encryptAndSaveToStorage("product", item);
                  }}
                >
                  <div className="overlay">
                    <h3>Quick View</h3>
                  </div>
                </Link>
              </div>
              <div className="info">
                <h3>{item.code}</h3>
                {item.category == "newArrivals" ? (
                  <h2>QAR {item.price}</h2>
                ) : (
                  <h2 className="on-sale">
                    <span className="first-price">
                      
                      QAR
                      {Math.floor(
                        (Number(item.price) *
                          (Math.random() * (1.3 - 1.1) + 1.1)) /
                          10
                      ) * 10}
                    </span>
                    QAR {item.price}
                  </h2>
                )}
              </div>
            </div>
          );
        });

    setDisplayedAbayas(displayedAbayas);
  }, [allAbayas, openEditProduct, category, pageNumber]);

  const pageCount = Math.ceil(
    allAbayas?.filter((item) => {
      if (category === "all") {
        return item;
      } else if (category == "New Arrival") {
        return item.category === "newArrivals";
      } else if (category == "On Sales") {
        return item.category === "onSales";
      }
    }).length / showItems
  );

  const changePage = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <>
      <section className="abaya">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i> <span>Abayas </span>
              <i className="fas fa-angle-right"></i>
              <span>
                {category == "New Arrival" ? "New Arrivals" : category}
              </span>
            </div>
          </div>
        </div>
        <div className="lamar-container">
          <div className="container-abaya-hero">
            <div className="abaya-hero">
              <h4 className="hero-text">shop Abaya & find modern deisgns</h4>
            </div>
          </div>
        </div>
        {!isLoading && (
          <section className="abaya-cards" id="Abaya">
            <div className="nav-container">
              <div className="nav-info">
                <div className="left-info">
                  <div className="show-item">
                    <label htmlFor="show-item">show: </label>
                    <select
                      name="show-item"
                      id="show-item"
                      onChange={(e) => {
                        if (e.target.value === "all" && showItems !== arralen) {
                          setShowItems(arralen + 10);
                          setPageNumber(0);
                        } else if (showItems !== e.target.value) {
                          setPageNumber(0);
                          setShowItems(Number(e.target.value));
                        }
                      }}
                    >
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="all">all</option>
                    </select>
                  </div>

                  <div
                    className={
                      role === "admin" ? "sort-item" : "sort-item shrink-width"
                    }
                  >
                    <label htmlFor="sort-item">Category : </label>
                    <select
                      name="sort-item"
                      id="sort-item"
                      value={category}
                      onChange={handleSort}
                    >
                      <option value="all">All</option>
                      <option value="New Arrival">New Arrivals</option>
                      <option value="On Sales">On Sales</option>
                    </select>
                  </div>
                  {role === "admin" && (
                    <div
                      className="sort-item"
                      onClick={() => {
                        handleOpenAddProduct();
                      }}
                    >
                      + add product
                    </div>
                  )}
                  <AddProductModal
                    setOpenAddProduct={setOpenAddProduct}
                    openAddproduct={openAddproduct}
                  />
                </div>
              </div>
            </div>
            {addedToFavItem && orderDone && (
              <Alert severity="success" id="alert">
                {message ? (
                  message
                ) : (
                  <>
                    
                    You added <strong>{addedToFavItem.code}</strong> to your
                    <Link to="/Profile/2">wishlist</Link>
                  </>
                )}
              </Alert>
            )}
            <div className="lamar-container" id="abaya">
              {!isLoading && displayedAbayas.length > 0 && displayedAbayas}
              {!isLoading &&
                displayedAbayas.length == 0 &&
                "You have no products yet!"}
            </div>

            <div className="pagaination">
              {showItems !== arralen && ( // here i put arralength becouse in onCahnge we put this value instade of "all" !!
                <Pagination
                  count={pageCount}
                  color="secondary"
                  onChange={changePage}
                />
              )}
            </div>
          </section>
        )}
        {isLoading && (
          <div className="loading-state-abaya">
            <LoadingState />
          </div>
        )}
      </section>
      {deletedItem && openDeletModal && (
        <DualModal
          type="error"
          navigateTo="/Abaya"
          text={`are you sure to delete this product: ${deletedItem.code} ?`}
          deleteHandler={() => deleteHnadler(deletedItem)}
          setOpenDeletModal={setOpenDeletModal}
          setDeletedItem={setDeletedItem}
        />
      )}
      {error && (
        <DualModal
          type="error"
          navigateTo="/Abaya"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default AbayaCards;
