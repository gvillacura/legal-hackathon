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

// const getKeywords = async () => {
//   let result = [];

//   await db
//     .collection("keywords")
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         result.push({
//           keyword: doc.data().keyword,
//           email: doc.data().email,
//         });
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return result;
// };

const findKeywords = (keyword) => {
  let asignationData;

  // if (keyword === "") {
  //   asignationData = {
  //     email: ["cs-hackathon@outlook.com", "lba-hackathon@outlook.com"],
  //     incharge: "sin asignacion",
  //   };
  //   return asignationData;
  // } else {
  return db
    .collection("keywords")
    .where("keyword", "==", keyword)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        asignationData = {
          email: doc.data().email,
          email2: doc.data().email2,
          incharge: doc.data().incharge,
          keyword: doc.data().keyword,
        };
      });
      return asignationData;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  // }
};

const saveData = (data) => {
  db.collection("users")
    .add({
      assignedAgent: data.assignedAgent,
      team: data.team,
      customerId: data.customerId,
      date: data.date,
      status: "pending",
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  // let docRef = db.collection('orders').doc('email');

  // let newData = docRef.set({
  //   assignedAgent: data.assignedAgent,
  //   team: data.team,
  //   customerId: data.customerId,
  //   date: data.date,
  //   status: "pending",
  // });
};

module.exports = { saveData, findKeywords };
