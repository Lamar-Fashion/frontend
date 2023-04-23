import { handleImageSize } from "./imagesResizer";
import { storage } from "../firebase";
import { encryptAndSaveToStorage } from "./CryptoJS";

//get product price including all available discounts.
export function checkProductDiscounts (price, isLoggedIn, signInDiscount, productDiscount) {
    price = Number(price);
    signInDiscount = Number(signInDiscount);
    productDiscount = Number(productDiscount);
    
    let totalDiscountPercentage = 0;
    //check signing-in discount
    if (isLoggedIn && signInDiscount) {
        totalDiscountPercentage = signInDiscount;
    }
    //check product discount (for on sales products)
    if (productDiscount) {
        totalDiscountPercentage = totalDiscountPercentage + productDiscount;
    }
    let newPrice = (price*(100 - totalDiscountPercentage))/100;
    newPrice = Math.floor(newPrice / 5) * 5; //round price to near lowest five.
    return newPrice;
};

//upload images to firebase handler
export const uploadImagesToFirebase = async (images, directoryName, setImgUploadPercentage, setIndexOfUploadedIMG, callback) => {

    let counter = 0;
    let indexImgCounter = 0;
    let maxPrgressValue = 0;
    let imgUploadPercentage = 0;
    const arrayOfDownloadUrls = [];

    //this part to upload the images into Firebase
    for (const [key, value] of Object.entries(images)) {
      indexImgCounter++;
      const resizedImg = await handleImageSize(value);
      const file = resizedImg;
      const directory = directoryName;
      const currentdate = new Date();
      const datetime =
        currentdate.getDate() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getFullYear() +
        "@" +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();
      const name = datetime + " - " + file.name;
      const storageRef = storage.ref(`${directory}/${name}`);

      storageRef.put(file).on(
        "state_changed",
        (snapshot) => {
          //Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (maxPrgressValue < Number(progress).toFixed(0))
            maxPrgressValue = Number(progress).toFixed(0);
          if (maxPrgressValue > imgUploadPercentage) {
            imgUploadPercentage = maxPrgressValue;
           if(setImgUploadPercentage) setImgUploadPercentage(maxPrgressValue);

          }
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.error("error firebase, upload images", error);
          let err;
          error?.code
          ? err = error.code
          : err = "Uploading images Firebase Error!";
          callback(err, null);
          return;
          // switch (error.code) {
          //   case 'storage/unauthorized':
          //     //   User doesn't have permission to access the object
          //     break;
          //   case 'storage/canceled':
          //     //   User canceled the upload
          //     break;
          //   case 'storage/unknown':
          //     //   Unknown error occurred, inspect error.serverResponse
          //     break;
          //   default:
          // }
        },
        () => {
          if(setIndexOfUploadedIMG) setIndexOfUploadedIMG(indexImgCounter);

          //Upload completed successfully, now we can get the download URL
          storageRef.getDownloadURL().then(async (downloadURL) => {
            counter++;
            console.log("File available at", downloadURL);
            arrayOfDownloadUrls.push({[key]: downloadURL});

            if (counter == Object.keys(images).length) {
              callback(null, arrayOfDownloadUrls);
            }
            
          }).catch((error)=> {
            console.error("error firebase, getting download url", error);
            let err;
            error?.code
            ? err = error.code
            : err = "Getting Download urls images Firebase Error!";
            callback(err, null);
          });
        }
      );
    }
};

// delete the images from the firebase
export const deleteFirebaseImages = async (imagesFirebaseUrls) => {
  return new Promise (async (resolve, reject) => {

    try {
      for (let i = 0; i < imagesFirebaseUrls.length; i++) {
        let pictureRef = storage.refFromURL(imagesFirebaseUrls[i]);
        const deletedImg = await pictureRef.delete();
      }
      resolve("images deleted from Firebase successfully!");

    } catch (error) {
      console.error("DELETE Images From Firebase Error!", error);
      reject(error);
    }
  });
};

//validate file type, accept only images (jpg, jpeg, png)
export function validateFileTypeImage(key, file, validatedImagesObj) {
  const fileName = file.name;
  const idxDot = fileName.lastIndexOf(".") + 1;
  const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    validatedImagesObj[key] = file;
  } else {
    alert("Only jpg/jpeg and png files are allowed!");
  }
  return validatedImagesObj;
};

//reset cart
export function resetCart () {
  encryptAndSaveToStorage('cart', []);
  encryptAndSaveToStorage('cartNumber', 0);
  encryptAndSaveToStorage('total', 0);
};