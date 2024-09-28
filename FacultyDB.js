var falcultyData = {
  firstName: firstName,
  lastName: lastName,
  dateOfBirth: dateOfBirth,
  address: address,
};

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:2701/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("faculty_db");

  // Get user input (replace with your methods for getting input)
  var firstName = "John";
  var lastName = "Doe";
  var dateOfBirth = "1995-01-01";
  var address = "";

  var studentData = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    address: address,
  };

  dbo.collection("students").insertOne(studentData, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
