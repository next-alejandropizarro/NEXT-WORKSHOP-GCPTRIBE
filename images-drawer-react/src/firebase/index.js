import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}

export const database = firebase.firestore();
