import "../../../styles/admin/general-settings/general-settings.css";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instance, url } from "../../../API/axios";
import { useSelector, useDispatch } from "react-redux";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";
import { clearAdminSettings, setAdminSettings } from "../../../store/actions";

function AdminSettings() {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const adminSettings = useSelector((state) => state.adminSettingsReducer);

  const [signInDiscount, setSignInDiscount] = useState(adminSettings.signInDiscount);
  const [promoCodes, setPromoCodes] = useState(adminSettings.promoCodes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setSignInDiscount(adminSettings.signInDiscount);
    setPromoCodes(adminSettings.promoCodes);
  }, [adminSettings]);

  const handleChange = (e) => {
    if (e.target.name === "signInDiscount") {
        setSignInDiscount(e.target.value);
    }
  };

  const saveGeneralSettings = async () => {
    setIsLoading(true);
    const updatedSettings = adminSettings;
    updatedSettings.signInDiscount = signInDiscount;
    updatedSettings.promoCodes = promoCodes;
    try {
        const response = await instance.put(url + "/adminSettings1", updatedSettings, {
            headers: {
            authorization: `Bearer ${user?.token}`,
            },
        });
        setIsLoading(false);
        dispatch(setAdminSettings(updatedSettings));
    } catch (error) {
        error?.response?.data?.error
            ? setError(error.response.data.error)
            : setError("Error while saving admin settings");
        console.error("Error while saving admin settings", error.message);
    }
  };

  return (
    <>
      <div className="general-settings">
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
              <span>General Settings</span>
            </div>
          </div>
        </div>
        <div className="lamar-container">
          <div className="container-admin-hero">
            <div className="admin-hero">
              <h4 className="hero-text">General Settings</h4>
            </div>
          </div>
          <section className="bigContainer">
            {!isLoading && 
            <>
                <div className="signin-discount" >
                    <span>discount percentage on signing-in:</span>
                    <input type="number" name="signInDiscount" value={signInDiscount} onChange={handleChange}/>%
                </div>
                <button className="button" onClick={saveGeneralSettings}>Save</button>
            </>
            }

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
          navigateTo="/AdminSettings"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
        />
      )}
    </>
  );
}

export default AdminSettings;
