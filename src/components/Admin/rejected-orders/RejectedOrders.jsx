import { useEffect, useState } from "react";
import Order from "../pending-orders/Order";
import "../../../styles/admin/admin.css";
import { useNavigate, Link } from "react-router-dom";
import { instance, url } from "../../../API/axios";
import { useSelector } from "react-redux";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";

function RejectedOrders() {
  const user = useSelector((state) => state.authReducer.user);

  const [allRejectedOrders, setAllRejectedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch all rejected orders handler
  const fetchAllRejectedOrders = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await instance.get(url + "/rejectedOrders", {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        setIsLoading(false);
        setAllRejectedOrders(response.data);
      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while getting rejected orders");
        console.error("Error while getting rejected orders", error.message);
      }
    }, 50);
  };
  
  useEffect(() => {
    if (user) fetchAllRejectedOrders();
  }, [user]);

  return (
    <>
      <div className="pending-orders">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i>
              <Link to="/Admin" className="exat-path">
                <span>Admin</span>
              </Link>
              <i className="fas fa-angle-right"></i>
              <span>Rejected Orders</span>
            </div>
          </div>
        </div>

        <div className="lamar-container">
          <div className="container-admin-hero">
            <div className="admin-hero">
              <h4 className="hero-text">Rejected Orders </h4>
            </div>
          </div>
          {!isLoading && (
            <div className="pageIntro">
              <div className="total-number">
                Total: <span>{allRejectedOrders.length}</span>
              </div>
              <div className="intro">All Rejected Orders</div>
            </div>
          )}
          <section className="bigContainer">
            {!isLoading &&
              allRejectedOrders.map((order, idx) => {
                return (
                  <Order
                    order={order}
                    from={"rejected"}
                    idx={idx}
                    key={order.orderId}
                  />
                );
              })}
            {isLoading && (
              <div className="loading-state-container">
                <LoadingState />
              </div>
            )}
          </section>
        </div>
      </div>
      {error && (
        <DualModal
          type="error"
          navigateTo="/RejectedOrders"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default RejectedOrders;
