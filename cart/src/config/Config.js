import * as firebase from 'firebase'
import 'firebae/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDe-Z9WAeiXItb98Pmlvk2QTN-x12HDaPM",
    authDomain: "cursos-c2a5e.firebaseapp.com",
    projectId: "cursos-c2a5e",
    storageBucket: "cursos-c2a5e.appspot.com",
    messagingSenderId: "561674158483",
    appId: "1:561674158483:web:889e62fc8293dd807ce866",
    measurementId: "G-HYSLGNM96G"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export { auth, db, storage }