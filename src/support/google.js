import firebase from 'firebase'

// untuk login di google
var config = {
    apiKey: "AIzaSyDdpCmcDXGkVljyKl3cLRcGklymlZ_2Itw",
    authDomain: "login-with-817ff.firebaseapp.com",
    databaseURL: "https://login-with-817ff.firebaseio.com",
    projectId: "login-with-817ff",
    storageBucket: "login-with-817ff.appspot.com",
    messagingSenderId: "96149030467"
};

firebase.initializeApp(config)
export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();