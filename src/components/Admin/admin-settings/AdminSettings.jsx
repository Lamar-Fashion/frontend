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

function AdminSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const adminSettings = useSelector((state) => state.adminSettingsReducer);

  const [signInDiscount, setSignInDiscount] = useState(adminSettings.signInDiscount);
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

  
  useEffect(() => {
    setSignInDiscount(adminSettings.signInDiscount);
    setPromoCodes(adminSettings.promoCodes);
  }, [adminSettings]);
  
 
  const handleChange = (e) => {

    if (e.target.name === "signInDiscount") {
        setSignInDiscount(e.target.value);
    }
    if (e.target.name == "imageOneUrl") {
      const validatedImagesObj = {};
      const validatedFile = validateFileTypeImage(0, e.target.files[0], validatedImagesObj);
      setImageOne(validatedFile);
      console.log('imageOne', imageOne );
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
                    <input type="number" name="signInDiscount" value={signInDiscount} onChange={handleChange}/>%
                </div>

                <hr/>

                <h2>Hero :</h2>

                <span>Hero Image:</span>
                <img className="collection-images" src={adminSettings.hero.imageUrl ? adminSettings.hero.imageUrl : heroImg} alt="heroImg"/>
                <input
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
                <input type="text" name="mainText" maxLength={100} value={mainText} onChange={(e)=> setMainText(e.target.value)}/>

                <span>Sub text:</span>
                <tooltip>*max length: 100 character</tooltip>
                <input type="text" name="subText" maxLength={100} value={subText} onChange={(e)=> setSubText(e.target.value)}/>

                <span>Button text:</span>
                <tooltip>*max length: 40 character</tooltip>
                <input type="text" name="buttonText" maxLength={40} value={buttonText} onChange={(e)=> setButtonText(e.target.value)}/>

                <span>Arrow text:</span>
                <tooltip>*max length: 100 character</tooltip>
                <input type="text" name="arrowText" maxLength={100} value={arrowText} onChange={(e)=> setArrowText(e.target.value)}/>

                <hr/>

                <h2>Collection Images:</h2>

                <span>New Arrivals Image:</span>
                <img className="collection-images" src={adminSettings.collection.imageOneUrl ? adminSettings.collection.imageOneUrl : newArrivalsImg} alt="imageOneUrl"/>
                <input
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
                  type="file"
                  name="imageThreeUrl"
                  required
                  placeholder="Abaya image"
                  onChange={handleChange}
                  accept="image/png,image/jpeg"
                />

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
