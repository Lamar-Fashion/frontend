import "../../../styles/admin/all-users/all-users.css";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instance, url } from "../../../API/axios";
import { useSelector } from "react-redux";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";

function AllUsers() {
  const user = useSelector((state) => state.authReducer.user);

  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch all users handler
  const fetchAllUsersHandler = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await instance.get(url + "/users", {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        setIsLoading(false);
        setAllUsers(response.data);
      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while getting all users");
        console.error("Error while getting all users", error.message);
      }
    }, 50);
  };

  useEffect(() => {
    // get all users
    if (user) fetchAllUsersHandler();
  }, [user]);

  return (
    <>
      <div className="all-users ">
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
              <span>All Users</span>
            </div>
          </div>
        </div>
        <div className="lamar-container">
          <div className="container-admin-hero">
            <div className="admin-hero">
              <h4 className="hero-text">All Users</h4>
            </div>
          </div>
          {!isLoading && (
            <div className="pageIntro">
              <div className="total-number">All Users: {allUsers.length}</div>
              <div className="intro">All Regestered Users</div>
            </div>
          )}
          <section className="bigContainer">
            {!isLoading &&
              allUsers.map((user, idx) => {
                return (
                  <div className="userContainer" key={user.id}>
                    <span>{idx + 1}</span>
                    <img
                      src="https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
                      alt="avator"
                    />
                    <div className="data">
                      <h5>{user.firstName + " " + user.lastName}</h5>
                      <h5>{user.email}</h5>
                    </div>
                  </div>
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
          navigateTo="/AllUsers"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default AllUsers;
