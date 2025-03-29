import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBPVVZQq9KLXNBYXzpbv4Bu7HUQ_wgN3J8",
    authDomain: "ticketdistro-211db.firebaseapp.com",
    databaseURL: "https://ticketdistro-211db-default-rtdb.firebaseio.com",
    projectId: "ticketdistro-211db",
    storageBucket: "ticketdistro-211db.firebasestorage.app",
    messagingSenderId: "18027535020",
    appId: "1:18027535020:web:3c5e238b872ded7f451d09",
    measurementId: "G-PV0T8LPK55"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update };