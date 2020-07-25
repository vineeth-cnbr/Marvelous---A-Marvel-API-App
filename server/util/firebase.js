var admin = require("firebase-admin");

var serviceAccount = require("./credentials");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marvel-land.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// db.ref().child("questions").push().set({ field: 123}).then(data => {
// console.log("da",data)
// }).catch(error => { console.log(error)});

module.exports=db;
