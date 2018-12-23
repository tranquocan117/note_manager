 import * as firebase from 'firebase'
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDgD9gbaeitlmXdR5JDzKK2H6y6NEAISos",
    authDomain: "notereact-1bc0b.firebaseapp.com",
    databaseURL: "https://notereact-1bc0b.firebaseio.com",
    projectId: "notereact-1bc0b",
    storageBucket: "notereact-1bc0b.appspot.com",
    messagingSenderId: "1022038076764"
  };

  firebase.initializeApp(config);
  export const noteData=firebase.database().ref('DataNote');
  