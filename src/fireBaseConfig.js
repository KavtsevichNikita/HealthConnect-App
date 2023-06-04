import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
   apiKey: "AIzaSyBx7mSWsDeimZ1X4qPZESyeQCtUy1bs0Dg",
   authDomain: "healthy-843d5.firebaseapp.com",
   projectId: "healthy-843d5",
   storageBucket: "healthy-843d5.appspot.com",
   messagingSenderId: "116191245504",
   appId: "1:116191245504:web:eed3390cf2ceff4a92a925",
   measurementId: "G-QL7V1B4DM8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDataBase = getFirestore(app);


export default firestoreDataBase;