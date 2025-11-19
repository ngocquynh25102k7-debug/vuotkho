// Firebase helper (client-side) - uses compat build for simple API
// USAGE: replace firebaseConfig below with your Firebase project's config

// Example config (replace with your project values):
// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

(function () {
  // Do not initialize automatically; user must call initFirebase with their config
  window.initFirebase = function (firebaseConfig) {
    if (!firebaseConfig) {
      console.warn(
        "initFirebase called without config. Remote DB will not be available."
      );
      return;
    }
    if (window.firebaseInitialized) return;
    if (!window.firebase) {
      console.error(
        "Firebase SDK not loaded. Include firebase-app-compat.js and firebase-firestore-compat.js before this file."
      );
      return;
    }
    try {
      firebase.initializeApp(firebaseConfig);
      window.db = firebase.firestore();
      window.firebaseInitialized = true;
      console.info("Firebase initialized (Firestore)");
    } catch (e) {
      console.error("Firebase init error", e);
    }
  };

  window.saveCustomerRemote = async function (customer) {
    if (!window.db) throw new Error("Firestore not initialized");
    // ensure id exists
    if (!customer.id) customer.id = Date.now().toString();
    await window.db.collection("customers").doc(customer.id).set(customer);
    return customer.id;
  };

  window.loadCustomersRemote = async function () {
    if (!window.db) throw new Error("Firestore not initialized");
    const snapshot = await window.db.collection("customers").get();
    return snapshot.docs.map((d) => d.data());
  };

  window.deleteCustomerRemote = async function (id) {
    if (!window.db) throw new Error("Firestore not initialized");
    await window.db.collection("customers").doc(id).delete();
  };
})();
