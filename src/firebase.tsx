import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyANuhTLVhAkTMQqZmvUS-b5c4vabl240qs",
  authDomain: "covid-tracer-4166f.firebaseapp.com",
  databaseURL: "https://covid-tracer-4166f.firebaseio.com",
  projectId: "covid-tracer-4166f",
  storageBucket: "covid-tracer-4166f.appspot.com",
  messagingSenderId: "660174248009",
  appId: "1:660174248009:android:f2ff0a588b9e6ccc680798",
};
firebase.initializeApp(config);

export default firebase;
