import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCySM79S08_H0A3PdKEDkPNeVLKfaipkvU",
    authDomain: "listtask1.firebaseapp.com",
    projectId: "listtask1",
    storageBucket: "listtask1.appspot.com",
    messagingSenderId: "74742747777",
    appId: "1:74742747777:web:ddfe7b39048644f9b8b380"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)