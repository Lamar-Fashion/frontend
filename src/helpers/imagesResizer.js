import Resizer from "react-image-file-resizer";


// check image width handler
const checkImageWidth = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          resolve(image.width);
          return image.width;
        };
        reader.onerror = (err) => reject(err);
      };
    });
};


// resize image handler
const resizeImage = (file) => {
  let quality = 100;
  //4MB image file
  if (file.size > 4000000) {
    quality = 90;
  }
  //8MB image file
  if (file.size > 8000000) {
    quality = 85;
  }
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      3500,
      1969,
      "JPEG",
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};

// image size handler
export const handleImageSize = async (img) => {
    const width = await checkImageWidth(img);
if (width <= 1440) {
      return img;
    } else {
     const resizedImage = await resizeImage(img);
    
     return resizedImage;
    }
};