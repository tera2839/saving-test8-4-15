import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC8VYfzYNMWprge3b_f4KgFFEDxjMTtd1Q",
  authDomain: "saving-app-3m21d.firebaseapp.com",
  projectId: "saving-app-3m21d",
  storageBucket: "saving-app-3m21d.appspot.com",
  messagingSenderId: "564836673081",
  appId: "1:564836673081:web:1a729e7b865c8b42110fe8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()


export { auth, provider};

export default db;