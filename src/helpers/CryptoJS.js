import CryptoJS from 'crypto-js';


// encrypt & save to session storage
export const encryptAndSaveToStorage = (key,value) => {
    // encrypt the data by CryptoJS
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), process.env.REACT_APP_SECRET_KEY).toString();
    window.sessionStorage.setItem(key, ciphertext);
}
// decrypt & get from session storage
export const decryptAndGetFromStorage = (key) => {

    let ciphertext = window.sessionStorage.getItem(key);
    if (ciphertext) {
        // Decrypt the data
      let bytes  = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      let data =  JSON.parse(originalText);
      return data;
    }else{
        return null;
    }
}