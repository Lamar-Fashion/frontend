import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/sign-styles/sign-in.css";
import validateToken from "../../../helpers/validateToken";
import { useDispatch } from "react-redux";
import { instance, url } from "../../../API/axios";
import {
  logInAction,
  logOutAction,
  assignFavourite,
  setAdminSettings,
  clearAdminSettings,
  resetCartAction
} from "../../../store/actions/index";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { resetCart } from "../../../helpers";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
      ) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
    if (e.target.name == "password") setPassword(e.target.value);
  };

  // get favourite handler >> to get fav number for first time and before the user goes to his wishlist.
  const getFavouriteHandler = async (user, callback) => {
    try {
      setIsLoading(true);
      const response = await instance.get(url + `/favourite/${user.id}`, {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      setIsLoading(false);
      dispatch(assignFavourite(response.data.length));

      if (callback) callback();
    } catch (error) {
      error?.response?.data?.error
        ? setError(error.response.data.error)
        : setError("error while getting favourites");
      console.error("error while getting favourites", error.message);
    }
  };

  const fetchAdminSettings = async (user, callback) => {
    try {
      const response = await instance.get(url + "/adminSettings", {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      if (response && response.data) {
        callback(null, response.data);
      } else {
        callback(null, null);
      }
    } catch (error) {
      callback(error, null);
    }
  };
  const saveDefaultAdminSettings = async (user, callback) => {
    const adminSettings = {
      signInDiscount: 0,
      shippingFees: 50,
      other: {},
      promoCodes: [
        //promo code obj will look like this:
        // {
        // code: "",
        // discountPercentage: 0,
        // type: "", // noLimit/maxLimit/oneTimeUse >> per phone number.
        // maxLimit: 0,
        // counter: 0,
        // usedByPhoneNumbers: [],
        // expirationDate: "",
        // isActive: false
        // }
      ],
      hero: {
        mainText: "",
        subText: "",
        buttonText: "",
        arrowText: "",
        imageUrl: ""
      },
      collection: {
        imageOneUrl: "",
        imageTwoUrl: "",
        imageThreeUrl: ""
      },
    };
    try {
      const response = await instance.post(url + "/adminSettings", adminSettings, 
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      callback(null, 'saved');
      
    } catch (error) {
      callback(error, null);
    }
  };

  const handleAdminSettings = (user) => {
    return new Promise ((resolve, reject) => {
      //get admin settings. (first row)
      fetchAdminSettings(user, (err, adminSettings) => {
        if (err) {
          reject('Error While getting admin settings');
          return;
        }

        if (adminSettings) {
          //set admin settings to reducer.
          dispatch(setAdminSettings(adminSettings));
          resolve();
        } else {
          //save default to database.
          saveDefaultAdminSettings(user, (err, adminSettings) => {
            if (err) {
              reject('Error While save default admin settings');
              return;
            }
            //set admin settings to reducer. >> same as initial state.
            resolve();
          });
        }
      });
    });
      
  };

  const signInHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const loggedInUser = await instance.post(
          url + "/signin",
          {},
          {
            auth: {
              username: phoneNumber,
              password,
            },
          }
        );
        const user = validateToken(loggedInUser.data.token);
        if (user) {
          if (user.role === "admin") {
            handleAdminSettings(user).then(()=>{
              setIsLoading(false);
              dispatch(logInAction(user));
              dispatch(resetCartAction());
              resetCart();
              getFavouriteHandler(user, () => {
                navigate("/Profile/1");
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              });
            })
            .catch((err)=>{
              console.error(err);
              setError(err);
            });
            return;
          }
          setIsLoading(false);

          dispatch(logInAction(user));
          dispatch(resetCartAction());
          resetCart();
          getFavouriteHandler(user, () => {
            navigate("/Profile/1");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          });
        }

        e.target.reset();
      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("error while signing in");
        console.error("error while signing in", error.message);
      }
    }, 1000);
  };

  return (
    <>
      <div className="sign-in" id="sign-in">
        <div className="nav-container">
          <div className="nav-info">
            <div className="left-nav">
              <Link to="/">
                <i className="fas fa-home i-home"></i>
              </Link>
              <i className="fas fa-angle-right"></i> <span>SignIn</span>
            </div>
            <div className="right-nav">
              <Link to="/SignUp">
                {" "}
                <span className="exat-path">create an account</span>{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className="lamar-container">
          <form onSubmit={signInHandler}>
            <h2>sign in</h2>

            <div className="input-user">
              {/* <i className="fas fa-solid fa-phone"></i> */}
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="JO"
                required
              />
            </div>
            {/* <div className="input-user">
              <i className="fas fa-mail-bulk"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={onChangeHandler}
              />
            </div> */}

            <div className="input-pass">
              <i className="fas fa-unlock"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={onChangeHandler}
              />
            </div>
            <button
              type="submit"
              className={
                phoneNumber && password && !error && !isLoading
                  ? "submit active"
                  : "submit"
              }
              disabled={!(phoneNumber && password && !error && !isLoading)}
            >
              submit
            </button>
          </form>

          {isLoading && !error && (
            <div className="loading-state-container-signin">
              <LoadingState />
            </div>
          )}
        </div>
      </div>
      {error && (
        <DualModal type={"error"} navigateTo={"/SignIn"} text={error} />
      )}
    </>
  );
}

export default SignIn;
