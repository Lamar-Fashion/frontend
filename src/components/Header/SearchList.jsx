import { useNavigate } from "react-router-dom";
import { encryptAndSaveToStorage } from "../../helpers/CryptoJS";
import "../../styles/header-styles/search-list.css";

function SearchList({ products, setSearchResult, setShowSearchResultList }) {
  const navigate = useNavigate();

  const goToProductDetails = (item) => {
    encryptAndSaveToStorage("product", item);
    setSearchResult([]);
    setShowSearchResultList(false);
    navigate("/ProductDetails");
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="search-modal" className="search-list-box">
      {products.length > 0 &&
        products.map((item, idx) => {
          return (
            <secction
              className="item-box"
              key={item.id}
              onClick={() => goToProductDetails(item)}
            >
              <div className="img-box">
                <img src={item.images[0]} alt="image" />
              </div>
              <div className="data-box">
                <span className="data-item">
                  <p>code:</p>
                  <strong>{item.code}</strong>
                </span>
        
                <span className="data-item">
                  <p>price:</p>
                  <strong>QAR {item.price}</strong>
                </span>
              </div>
            </secction>
          );
        })}
      {!products.length && (
        <secction className="no-results-box">no results found</secction>
      )}
    </div>
  );
}

export default SearchList;
