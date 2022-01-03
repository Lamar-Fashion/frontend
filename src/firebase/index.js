import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCsLWVoSt7qReMWhrfz_uR6lIJHKUTvuQc',
  authDomain: 'lamar-fashion.firebaseapp.com',
  projectId: 'lamar-fashion',
  storageBucket: 'lamar-fashion.appspot.com',
  messagingSenderId: '762994950837',
  appId: '1:762994950837:web:b5d5ae98f7d848189cb4fc',
  measurementId: 'G-BB7P0D90FP',
};
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
