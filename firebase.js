const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCso3HR0s7mw4PiMDiWSeFU3Qs9PllvVyM",
  authDomain: "legal-hackathon-2dd8f.firebaseapp.com",
  databaseURL: "https://legal-hackathon-2dd8f.firebaseio.com",
  projectId: "legal-hackathon-2dd8f",
  storageBucket: "legal-hackathon-2dd8f.appspot.com",
  messagingSenderId: "744466968848",
  appId: "1:744466968848:web:02af147b5940117640b595",
  measurementId: "G-SZV0QX7EGE",
};

const app = firebase.initializeApp(firebaseConfig);
var db = app.firestore();

const getKeywords = async () => {
  let result = [];

  await db
    .collection("keywords")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          keyword: doc.data().keyword,
          email: doc.data().email,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};

const findKeywords = (keyword) => {
  return db
    .collection("keywords")
    .where("keyword", "==", keyword)
    .get()
    .then(function (querySnapshot) {
      let asignationData;
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        asignationData = {
          email: doc.data().email,
          incharge: doc.data().incharge,
        };
      });
      return asignationData;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

module.exports = { getKeywords, findKeywords };
