import { useState } from "react";
import "../../../styles/profile/profile-info.css";
import { useSelector, useDispatch } from "react-redux";
import bcryptjs from "bcryptjs";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { instance, url } from "../../../API/axios";
import validateToken from "../../../helpers/validateToken";
import { logInAction, logOutAction } from "../../../store/actions/index";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function ProfileInfo() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, role } = useSelector((state) => state.authReducer);
  
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [oldPassword, setOldPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPass, setConfirmedNewPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [phoneNumberOTP, setPhoneNumberOTP] = useState("");

  //validate submit
  const validateSubmit = () => {
    if (editPassword) {
      if (
        firstName &&
        lastName &&
        phoneNumber &&
        email &&
        (email == user.email ? true : validEmail) &&
        isCorrectPassword &&
        newPassword &&
        confirmedNewPass &&
        newPassword == confirmedNewPass

      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        firstName &&
        lastName &&
        phoneNumber &&
        email &&
        (email == user.email ? true : validEmail) &&
        (firstName != user.firstName ||
          lastName != user.lastName ||
          email != user.email ||
          phoneNumber != user.phoneNumber  
        )

      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "firstName") setFirstName(e.target.value);
    if (e.target.name == "lastName") setLastName(e.target.value);
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
    if (e.target.name == "oldPassword") {
      setOldPassword(e.target.value);
      // compare old pass from DB with the entered one
      const valid = bcryptjs.compareSync(e.target.value, user.password);
      if (valid) setIsCorrectPassword(true);
      else setIsCorrectPassword(false);
    }
    if (e.target.name == "newPassword") setNewPassword(e.target.value);
    if (e.target.name == "confirmedNewPass") setConfirmedNewPass(e.target.value);
    if (e.target.name == "phoneNumberOTP") setPhoneNumberOTP(e.target.value);
  };

  const editPasswordMode = (e) => {
    e.preventDefault();
    setEditPassword(!editPassword);
  };

  // on submit handler
  const editProfileInfoOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if ((phoneNumber !== user.phoneNumber) && !isOTPSent) {
      sendOTPToPhoneNumber();
      return;
    }
    if ((phoneNumber && (phoneNumber !== user.phoneNumber)) && !phoneNumberVerified) {
      setError("Verify Your Phone Number.");
      return;
    }
    let updatedUser = {};
    
    if (editPassword) {
      updatedUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: newPassword,
        oldPassword,
      };
    } else {
      updatedUser = {
        firstName,
        lastName,
        email,
        phoneNumber
      };
    }
    setTimeout(async () => {
      try {
        //send req to DB and uodate user
        const response = await instance.put(
          url + "/user" + user.id,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrderDone(true);
        setIsLoading(false);

        const validatedUser = validateToken(response?.data?.user?.token);
        if (validatedUser) {
          dispatch(logInAction(validatedUser));
        } else {
          dispatch(logOutAction());
        }
      } catch (error) {
        error?.response?.data?.error
          ? setError(error.response.data.error)
          : setError("Error while updating user");
        console.error("Error while updating user", error);
      }
    }, 1000);
  };

 const verifyPhoneNumberOTP = async () => {
    if ((!phoneNumberOTP || (phoneNumberOTP && phoneNumberVerified))) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await instance.post(url + '/verifyOTP', {phoneNumber, OTP: phoneNumberOTP});
      setPhoneNumberVerified(true);
      setIsLoading(false);

    } catch (error) {
      setError(error.response.data.error)
    }

  };
  const sendOTPToPhoneNumber = async () => {
    setIsLoading(true);
    try {
      const response = await instance.post(url + '/sendOTP', {phoneNumber});
      setIsOTPSent(true);
      setIsLoading(false);

    } catch (error) {
      setError(error.response.data.error)
    }
  };
  return (
    <>
      <section className="profile-info-section">
        <div className="lamar-container">
          <div className="edit-profile">
            <i
              className="fas fa-user-edit"
              onClick={() => {
                setEditMode(!editMode);
              }}
            ></i>
          </div>
          {!editMode ? (
            <form action="">
              <div className="input-user">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  defaultValue={user.firstName + " " + user.lastName}
                  style={{ border: "none" }}
                />
              </div>
              <div className="input-user">
              <i className="fas fa-solid fa-phone"></i>
                <input
                  type="phone"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  defaultValue={user.phoneNumber}
                  style={{ border: "none" }}
                />
              </div>
              {user.email && <div className="input-pass">
                <i className="fas fa-mail-bulk"></i>
                <input
                  type="email1"
                  name="email1"
                  id="email1"
                  placeholder="email"
                  defaultValue={user.email}
                  style={{ border: "none" }}
                />
              </div>}
            </form>
          ) : (
            <>
              {!validEmail ||
                !email ||
                !firstName ||
                !lastName ||
                ((editPassword
                  ? isCorrectPassword
                    ? false
                    : oldPassword
                    ? true
                    : false
                  : false) && (
                  <>
                    <br />

                    {/* danger alert for incorrect inputs */}
                    <Stack
                      sx={{
                        width: "290px",
                        margin: "auto",
                        position: "relative",
                        top: "-10px",
                      }}
                      spacing={2}
                    >
                      <Alert severity="error">
                        {!firstName
                          ? "Enter First name"
                          : !lastName
                          ? "Enter Last Name"
                          : !email || !validEmail
                          ? "invalid email"
                          : editPassword
                          ? !isCorrectPassword
                            ? "incorrect password"
                            : false
                          : false}
                      </Alert>
                    </Stack>
                  </>
                ))}
              <form onSubmit={editProfileInfoOnSubmit}>
                <div className="input-user">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="first name"
                    value={firstName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-user">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="last name"
                    value={lastName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-user">
                    {/* <i className="fas fa-solid fa-phone"></i> */}
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      defaultCountry="JO"
                      style={{width: "100%"}}
                      required
                    />
                </div>
                <div className="input-pass">
                  <i className="fas fa-mail-bulk"></i>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="input-pass">
                  <i className="fas fa-user-edit"></i>

                  <button
                    placeholder="edit password"
                    id="edit-pass"
                    onClick={editPasswordMode}
                  >
                    edit password
                  </button>
                </div>
                {editPassword && (
                  <>
                    <div className="input-pass">
                      <i className="fas fa-unlock"></i>

                      <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Old password"
                        onChange={onChangeHandler}
                      />
                    </div>
                    {isCorrectPassword && (
                      <>
                        <div className="input-pass">
                          <i className="fas fa-unlock"></i>

                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="New password"
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="input-pass">
                          <i className="fas fa-unlock"></i>

                          <input
                            type="password"
                            name="confirmedNewPass"
                            id="confirmedNewPass"
                            placeholder="Confirm New Password"
                            onChange={onChangeHandler}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                {/* phone number verification */}
                {isOTPSent && <section className="verification-section">
                  {!phoneNumberVerified && <h4 className="text-danger">* Verification Code sent to {phoneNumber}</h4>}
                  <div className="verif-box">
                    <input
                      type="text"
                      name="phoneNumberOTP"
                      id="phoneNumberOTP"
                      placeholder="Type Verification Code"
                      onChange={onChangeHandler}
                    />
                    <button
                      className={(!phoneNumberOTP || (phoneNumberOTP && phoneNumberVerified)) ? "submit" : "submit active"}
                      type="button"
                      onClick={verifyPhoneNumberOTP}
                      disabled={(!phoneNumberOTP || (phoneNumberOTP && phoneNumberVerified))}
                    >
                      Verify
                    </button>
                  </div>
                  {phoneNumberVerified && <h4 className="text-success">{phoneNumber} Verified Successfully!</h4>}
                </section>}
                <button
                  type="submit"
                  className={validateSubmit() ? "submit" : "submit active"}
                  disabled={validateSubmit()}
                >
                  submit
                </button>
              </form>
            </>
          )}
          {isLoading && !error && (
            <div className="loading-state-container-profile">
              {" "}
              <LoadingState />
            </div>
          )}
        </div>
      </section>
      {orderDone && (
        <DualModal
          type="success"
          navigateTo="/Profile/1"
          text={"your data has been updated!"}
        />
      )}
      {error && (
        <DualModal
          type="error"
          navigateTo="/Profile/1"
          text={error ? error : "Something went wrong! <br/> please try again"}
          showHeader={true}
          // setCloseModalState={setError}
          // closeModalStateValue=""
        />
      )}
    </>
  );
}

export default ProfileInfo;
