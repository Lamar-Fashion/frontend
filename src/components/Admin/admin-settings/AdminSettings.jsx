import "../../../styles/admin/general-settings/general-settings.css";
import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { instance, url } from "../../../API/axios";
import { useSelector, useDispatch } from "react-redux";
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";
import { clearAdminSettings, setAdminSettings } from "../../../store/actions";
import { deleteFirebaseImages, uploadImagesToFirebase, validateFileTypeImage } from "../../../helpers";
import newArrivalsImg from "../../../images/brand/new-arrivals.jpeg";
import onSalesImg from "../../../images/brand/on-sales.jpeg";
import abayaImg from "../../../images/brand/abaya.jpeg";
import heroImg from "../../../images/hero/hero6.jpg";
const samplePromos = [{
  code: "AHM-150",
  discountPercentage: 30,
  type: "noLimit", //noLimit/maxLimit/oneTimeUse >> per phone number.
  maxLimit: 0, //this for maxLimit type only.
  counter: 0,
  usedByPhoneNumbers: [],
  expirationDate: "",
  isActive: true
}];

function AdminSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const adminSettings = useSelector((state) => state.adminSettingsReducer);

  const [signInDiscount, setSignInDiscount] = useState(adminSettings.signInDiscount);
  const [shippingFees, setShippingFees] = useState(adminSettings.shippingFees);
  const [promoCodes, setPromoCodes] = useState(adminSettings.promoCodes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mainText, setMainText] = useState(adminSettings.hero.mainText);
  const [subText, setSubText] = useState(adminSettings.hero.subText);
  const [buttonText, setButtonText] = useState(adminSettings.hero.buttonText);
  const [arrowText, setArrowText] = useState(adminSettings.hero.arrowText);
  const [imageOne, setImageOne] = useState({});
  const [imageTwo, setImageTwo] = useState({});
  const [imageThree, setImageThree] = useState({});
  const [heroImage, setHeroImage] = useState({});


  //promo codes states.
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [type, setType] = useState("noLimit");
  const [maxLimit, setMaxLimit] = useState(0);
  const [isWithExpirationDate, setIsWithExpirationDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");

  
  useEffect(() => {
    setSignInDiscount(adminSettings.signInDiscount);
    setShippingFees(adminSettings.shippingFees);
    setPromoCodes(adminSettings.promoCodes);
  }, [adminSettings]);
  
 
  const handleChange = (e) => {

    if (e.target.name === "signInDiscount") {
        setSignInDiscount(e.target.value);
    }
    if (e.target.name === "shippingFees") {
        setShippingFees(e.target.value);
    }
    if (e.target.name == "imageOneUrl") {
      const validatedImagesObj = {};
      const validatedFile = validateFileTypeImage(0, e.target.files[0], validatedImagesObj);
      setImageOne(validatedFile);
    }
    if (e.target.name == "imageTwoUrl") {
      const validatedImagesObj = {};
      const validatedFile = validateFileTypeImage(0, e.target.files[0], validatedImagesObj);
      setImageTwo(validatedFile);
    }
    if (e.target.name == "imageThreeUrl") {
      const validatedImagesObj = {};
      const validatedFile = validateFileTypeImage(0, e.target.files[0], validatedImagesObj);
      setImageThree(validatedFile);
    }

    if (e.target.name == "heroImage") {
      const validatedImagesObj = {};
      const validatedFile = validateFileTypeImage(0, e.target.files[0], validatedImagesObj);
      setHeroImage(validatedFile);
    }

    //promo codes section
    if (e.target.name === "code") {
      setCode(e.target.value); 
    }
    if (e.target.name === "discountPercentage") {
      setDiscountPercentage(e.target.value < 100 ? e.target.value : 100); 
    }
    if (e.target.name === "type") {
      setType(e.target.value); 
    }
    if (e.target.name === "maxLimit") {
      setMaxLimit(e.target.value); 
    }
    if (e.target.name === "expirationDate") {
      setExpirationDate(e.target.value); 
    }
    if (e.target.name === "isWithExpirationDate") {
      setIsWithExpirationDate(e.target.value); 
    }

  };

  const addPromoCode = (e) => {
    e.preventDefault();
    const addPromoCodeObj = {
      code,
      discountPercentage,
      type,
      maxLimit,
      counter: 0,
      usedByPhoneNumbers: [],
      expirationDate,
      isActive: true //should be active on creation time. //on server side will handle promo code deactivation.
    };
    let isPromoExists = false;
    promoCodes.forEach(promo => {
      if (addPromoCodeObj.code == promo.code) {
        isPromoExists = true;
      }
    });
    if (!isPromoExists) {
      setPromoCodes([...promoCodes, addPromoCodeObj]);
      //reset all fields
      setCode("");
      setDiscountPercentage(0);
      setType("noLimit");
      setMaxLimit(0);
      setIsWithExpirationDate(false);
      setExpirationDate("");


    } else if (code) {
      alert("Promo Code already exists!")
    }

  };

  const deletePromoCode = (deletePromo) => {
    const updatedPromoCodes = [...promoCodes];
    promoCodes.forEach((promo, idx) => {
      if (deletePromo.code == promo.code) {
        updatedPromoCodes.splice(idx, 1);
        setPromoCodes([...updatedPromoCodes]);
        return;
      }
    });
  };

  const saveGeneralSettings = () => {

    setIsLoading(true);
    const hero = {
      mainText,
      subText,
      buttonText,
      arrowText,
      imageUrl: adminSettings.hero.imageUrl
    };
    const collection = {
      imageOneUrl: adminSettings.collection.imageOneUrl,
      imageTwoUrl: adminSettings.collection.imageTwoUrl,
      imageThreeUrl: adminSettings.collection.imageThreeUrl
    };

    const uploadImages = {};
    const deleteImages = [];

    if (imageOne[0]) {
      uploadImages.imageOne = imageOne[0];
      if(adminSettings.collection.imageOneUrl) deleteImages.push(adminSettings.collection.imageOneUrl);
    }
    if (imageTwo[0]) {
      uploadImages.imageTwo = imageTwo[0];
      if(adminSettings.collection.imageTwoUrl) deleteImages.push(adminSettings.collection.imageTwoUrl);
    }
    if (imageThree[0]) {
      uploadImages.imageThree = imageThree[0];
      if(adminSettings.collection.imageThreeUrl) deleteImages.push(adminSettings.collection.imageThreeUrl);
    }
    if (heroImage[0]) {
      uploadImages.heroImage = heroImage[0];
      if(adminSettings.hero.imageUrl) deleteImages.push(adminSettings.hero.imageUrl);
    }

    if (Object.keys(uploadImages).length > 0) {
      uploadImagesToFirebase (uploadImages, 'admin', false, false, async (err, arrayOfDownloadUrls) => {
        if (err) {
          setError(err);
          return;
        }
        if (!arrayOfDownloadUrls) {
          arrayOfDownloadUrls = [];
        }

        //delete old images from Firebase.
        try {
          await deleteFirebaseImages(deleteImages)
        } catch (error) {
          setError("DELETE Images From Firebase Error!");
        };
  
        arrayOfDownloadUrls.forEach((urlObj, idx) => {

          const url = urlObj[Object.keys(urlObj)[0]];

          switch (Object.keys(urlObj)[0]) {
            case "imageOne":
              collection.imageOneUrl = url;
              break;
            case "imageTwo":
              collection.imageTwoUrl = url;
              break;
            case "imageThree":
              collection.imageThreeUrl = url;
              break;
            case "heroImage":
              hero.imageUrl = url;
              break;
          
            default:
              break;
          };

        });

        updateAdminSettings();
  
      });

    } else {

      updateAdminSettings();
      
    }

    async function updateAdminSettings () {
      const updatedSettings = adminSettings;
      updatedSettings.signInDiscount = signInDiscount;
      updatedSettings.shippingFees = shippingFees;
      updatedSettings.other = {};
      updatedSettings.promoCodes = promoCodes;
      updatedSettings.hero = hero;
      updatedSettings.collection = collection;
      try {
          const response = await instance.put(url + "/adminSettings1", updatedSettings, {
              headers: {
              authorization: `Bearer ${user?.token}`,
              },
          });
          setTimeout(() => {
            setIsLoading(false);
          }, 750);
          dispatch(setAdminSettings(updatedSettings));
      } catch (error) {
          error?.response?.data?.error
              ? setError(error.response.data.error)
              : setError("Error while saving admin settings");
          console.error("Error while saving admin settings", error.message);
      }
    };
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
          {!isLoading && <section className="bigContainer">
            <>
                <div className="signin-discount" >
                    <h2>Sign-In Discount:</h2>
                    <span>discount percentage on signing-in:</span>
                    <input className="input-field text-align-center" type="number" name="signInDiscount" value={signInDiscount} onChange={handleChange}/>%
                </div>

                <hr/>
                <div className="signin-discount" >
                    <h2>Shipping Fees:</h2>
                    {/* <span></span> */}
                    <input className="input-field text-align-center" placeholder="50" type="number" name="shippingFees" value={shippingFees} onChange={handleChange}/> QAR
                </div>

                <hr/>

                <h2>Hero :</h2>

                <span>Hero Image:</span>
                <img className="collection-images" src={adminSettings.hero.imageUrl ? adminSettings.hero.imageUrl : heroImg} alt="heroImg"/>
                <input
                  className="input-field"
                  type="file"
                  name="heroImage"
                  required
                  placeholder="Hero image"
                  onChange={handleChange}
                  accept="image/png,image/jpeg"
                />

                <hr/>

                <h4>Hero Texts:</h4>

                <span>Main text:</span>
                <tooltip>*max length: 100 character</tooltip>
                <input className="input-field" type="text" name="mainText" maxLength={100} value={mainText} onChange={(e)=> setMainText(e.target.value)}/>

                <span>Sub text:</span>
                <tooltip>*max length: 100 character</tooltip>
                <input className="input-field" type="text" name="subText" maxLength={100} value={subText} onChange={(e)=> setSubText(e.target.value)}/>

                <span>Button text:</span>
                <tooltip>*max length: 40 character</tooltip>
                <input className="input-field" type="text" name="buttonText" maxLength={40} value={buttonText} onChange={(e)=> setButtonText(e.target.value)}/>

                <span>Arrow text:</span>
                <tooltip>*max length: 100 character</tooltip>
                <input className="input-field" type="text" name="arrowText" maxLength={100} value={arrowText} onChange={(e)=> setArrowText(e.target.value)}/>

                <hr/>

                <h2>Collection Images:</h2>

                <span>New Arrivals Image:</span>
                <img className="collection-images" src={adminSettings.collection.imageOneUrl ? adminSettings.collection.imageOneUrl : newArrivalsImg} alt="imageOneUrl"/>
                <input
                  className="input-field"
                  type="file"
                  name="imageOneUrl"
                  required
                  placeholder="New Arrivals image"
                  onChange={handleChange}
                  accept="image/png,image/jpeg"
                />

                <hr/>

                <span>On Sales Image:</span>
                <img className="collection-images" src={adminSettings.collection.imageTwoUrl ? adminSettings.collection.imageTwoUrl : onSalesImg} alt="imageTwoUrl"/>
                <input
                  className="input-field"
                  type="file"
                  name="imageTwoUrl"
                  required
                  placeholder="On Sales image"
                  onChange={handleChange}
                  accept="image/png,image/jpeg"
                />

                <hr/>

                <span>Abaya Image:</span>
                <img className="collection-images" src={adminSettings.collection.imageThreeUrl ? adminSettings.collection.imageThreeUrl : abayaImg} alt="imageThreeUrl"/>
                <input
                  className="input-field"
                  type="file"
                  name="imageThreeUrl"
                  required
                  placeholder="Abaya image"
                  onChange={handleChange}
                  accept="image/png,image/jpeg"
                />

                <hr/>

                <h2>Promo Codes</h2>

                <h4>Adding Promo Codes:</h4>
            
                <form className="promo-codes-box">
                  <span className="input-box">
                    <label htmlFor="code">Promo Code</label>
                    <input className="input-field" type="text" name="code" value={code} placeholder="Type your promo code" onChange={handleChange} />
                  </span>
                  <span className="input-box">
                    <label htmlFor="discountPercentage">Discount Percentage:</label>
                    <div>
                    <input className="input-field text-align-center" type="number" value={discountPercentage} placeholder="0" name="discountPercentage" min={0} max={100} onChange={handleChange} />%
                    </div>
                  </span>
                  <span className="input-box">
                    <label htmlFor="type">Select Promo Code Type:</label>
                    <select className="input-field" name="type" value={type} onChange={handleChange}>
                      <option value={"noLimit"}>No Limitation</option>
                      <option value={"maxLimit"}>Expire After a certain use number</option>
                      <option value={"oneTimeUse"}>One Time Use Per User</option>
                    </select>
                  </span>

                  { type === "maxLimit" && <span className="input-box">
                    <label htmlFor="maxLimit">Max Limit:</label>
                    <input className="input-field" type="number" placeholder="0" name="maxLimit" value={maxLimit} min={0} onChange={handleChange} />
                  </span>}

                  <span className="input-box">
                    <label htmlFor="isWithExpirationDate">With/Without Expiration Data:</label>
                    <select className="input-field" name="isWithExpirationDate" value={isWithExpirationDate} onChange={handleChange}>
                      <option value={true}>With Expiration Date</option>
                      <option value={false}>Without Expiration Date</option>
                    </select>
                  </span>

                  { isWithExpirationDate && <span className="input-box">
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input className="input-field" type="date" min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]} placeholder="0" name="expirationDate" value={expirationDate} onChange={handleChange} />
                  </span>}

                  <span className="input-box" style={{alignSelf: 'end'}}>
                    <button className="button" type="submit" onClick={addPromoCode}>Add Promo Code</button>
                  </span>
                  

                </form>
                

                <hr/>

                <h4>Promo Codes List:</h4>
                <div className="grid-container">
                  <span>Code:</span>
                  <span>Discount Percentage:</span>
                  <span>Type:</span>
                  <span>Max Limit:</span>
                  <span>Counter:</span>
                  <span>Expiration Date:</span>
                  <span>Is Active:</span>
                  <span>Delete Promo</span>
                </div>
                  {promoCodes?.map(promo => {
                    return (
                      <div className="grid-container">
                        <span>{promo.code}</span>
                        <span>{promo.discountPercentage}</span>
                        <span>{promo.type}</span>
                        <span>{promo.maxLimit ? promo.maxLimit : "N/A"}</span>
                        <span>{promo.counter}</span>
                        <span>{promo.expirationDate ? promo.expirationDate : "N/A" }</span>
                        <span style={{"color": promo.isActive ? "green" : "red"}}>{promo.isActive ? "True" : "False"}</span>
                        <span>
                          <i className="fas fa-trash-alt"  onClick={()=> deletePromoCode(promo)}></i>
                        </span>
                      </div>
                    );
                  })}
                  {!promoCodes?.length && <span>You Have No Promo Codes.</span>}
                <hr/>

                <button className="button" onClick={saveGeneralSettings}>Save</button>
            </>
          </section>}
          {isLoading && (
            <div className="loading-state-container">
              <LoadingState />
            </div>
          )}
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
