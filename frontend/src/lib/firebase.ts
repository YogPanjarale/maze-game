	// Import the functions you need from the SDKs you need
	
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCXwLqBil0-kve6P_IHM795cQVE-97zdJg",
      authDomain: "maze-game-beta.firebaseapp.com",
      projectId: "maze-game-beta",
      storageBucket: "maze-game-beta.appspot.com",
      messagingSenderId: "320210455924",
      appId: "1:320210455924:web:52ddee6dac22365b2cb021",
      measurementId: "G-2XZLCK65TM"
    };
    
    // Initialize Firebase
   export  const app = initializeApp(firebaseConfig);
    export const analytics = getAnalytics(app);