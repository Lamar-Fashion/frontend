import CryptoJS from 'crypto-js';


// encrypt & save to session storage
export const encryptAndSaveToStorage = (key,value) => {
    // encrypt the data by CryptoJS
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), process.env.REACT_APP_SECRET_KEY).toString();
    window.sessionStorage.setItem(key, ciphertext);
}
// decrypt & get from session storage
export const decryptAndGetFromStorage = (key) => {
    const ciphertext = window.sessionStorage.getItem(key);
    if (ciphertext) {
        // Decrypt the data
      const bytes  = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      const data =  JSON.parse(originalText);
      return data;
    }else{
        return null;
    }
}