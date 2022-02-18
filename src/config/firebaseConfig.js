import firebase from "@firebase/app-compat";
import "@firebase/firestore-compat";
import "@firebase/auth-compat";

const firebaseConfig = {
  apiKey: "AIzaSyBUqxx51qeN6H3H1t3n980S0NoY1h51zoY",
  authDomain: "projekt-plan.firebaseapp.com",
  projectId: "projekt-plan",
  storageBucket: "projekt-plan.appspot.com",
  messagingSenderId: "585701561390",
  appId: "1:585701561390:web:595d0ab976458dedbcfbbf",
  measurementId: "G-GM967DS45P",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });

export default firebase;
