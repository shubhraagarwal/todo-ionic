import "firebase/auth";
import { resolve } from 'dns';
import firebase from 'firebase'; 
import { toast } from './toast';
import "firebase/firestore";
import "firebase/functions";
const config = {
    apiKey: "AIzaSyBZtnGyGJ5-dPsAK-srkyT8VEUcGy6JFJQ",
    authDomain: "todo-ionic-b8a55.firebaseapp.com",
    projectId: "todo-ionic-b8a55",
    storageBucket: "todo-ionic-b8a55.appspot.com",
    messagingSenderId: "703402151070",
    appId: "1:703402151070:web:f88a256cf61c60609abf8f",
    measurementId: "G-KSTF41ZRE8"
  };

const Firebase = firebase.initializeApp(config);

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
        if(user){
            resolve(user);
        } else{
            resolve(null)
        }
        unsubscribe()
    })
    })
    
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
console.log("Auth", auth);
export async function loginUser(email : string, password : string){
    try{
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(res, "SingIn");
    ;
    return true

    } catch(error){
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(res, "SignUp");
        loginUser(email, password); 
        return true
    }
}

export default Firebase;