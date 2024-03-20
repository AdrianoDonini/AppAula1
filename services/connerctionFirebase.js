import { initializeApp} from "firebase/app";
import firebase from 'firebase/compat/app'; 

//autenticação de email e senha 

import 'firebase/compat/auth'; 

//trabalha com o banco de dados criado no firebase 

import 'firebase/compat/database';  



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8WJjDE0hR7uljWRPFXZ5BdDNDzHCfp6k",
  authDomain: "dbcrudddmi-9e6de.firebaseapp.com",
  projectId: "dbcrudddmi-9e6de",
  storageBucket: "dbcrudddmi-9e6de.appspot.com",
  messagingSenderId: "202241292959",
  appId: "1:202241292959:web:cfc342bc0d3b699d9240aa"
};

if (!firebase.apps.length) { 

  // Initialize Firebase 

   firebase.initializeApp(firebaseConfig); 

  } 
export default firebase; 

 