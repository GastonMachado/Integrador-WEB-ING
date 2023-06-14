import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
// import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"

// const firebaseConfig = {

//   apiKey: "AIzaSyCWmfK2h-EN_jH32cZdBHOvk4AZVk2vYjE",

//   authDomain: "integrador-web-ing.firebaseapp.com",

//   projectId: "integrador-web-ing",

//   storageBucket: "integrador-web-ing.appspot.com",

//   messagingSenderId: "226439318269",

//   appId: "1:226439318269:web:ea8436880c13843506cc94",

//   measurementId: "G-PJ1MCR8M9V"

// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
