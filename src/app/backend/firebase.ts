import * as firebase from 'firebase';

// init firebase
const APIKEY = 'AIzaSyCLvmeedTEtyqfmuMT1Ls9OfgfM0AaQWVY';

const config = {
  apiKey: APIKEY,
  authDomain: 'angular-pm.firebaseio.com',
  storageBucket: 'angular-pm.appspot.com',
  databaseURL: 'https://angular-pm.firebaseio.com',
};

firebase.initializeApp(config);

export default firebase;


