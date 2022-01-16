import * as React from "react";
import { Link } from "react-router-dom";
import "../../../styles/profile/profile.css";
import FavouriteItem from "../fav-item/FavouriteItem";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileInfo from "./ProfileInfo";
import { useSelector } from "react-redux";

function Profile() {
  const [value, setValue] = React.useState("1");
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <section className="profile-lamar">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i> <span>profile</span>
            </div>
          </div>
        </div>
        {
          isLoggedIn?
          <div className="container-divs">
          <div className="lamar-container">
            <div className="card-profile">
              <div className="image">
                <img
                  src="https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
                  alt="logo-profile"
                />
              </div>
              <h2>
                <span>soso</span> kiker
              </h2>
            </div>
          </div>
          <div className="lamar-container">
            <Box sx={{ width: "100%" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1 }} className="nav-info-profile">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Personal Info"
                      value="1"
                      className="Tab-profile"
                    />
                    <Tab
                      label="Your Wishlist."
                      value="2"
                      className="Tab-profile"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1" className="TabPanel-profile">
                  <ProfileInfo />
                </TabPanel>
                <TabPanel value="2" className="TabPanel-profile">
                  {" "}
                  <FavouriteItem />{" "}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
        : <div className="lamar-container">
          <div className='sign-container'>
          <i class="fas fa-sign-in-alt"></i>
            <p>You need to be signd in </p>
            <Link to='/SignIn'> Sign In  </Link>
          </div>
        </div>
        }
        
      </section>
    </>
  );
}

export default Profile;
