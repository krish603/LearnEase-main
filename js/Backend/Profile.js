const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Collage-Management-System", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a Mongoose schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/users", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: "Error creating user" }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${1109}`);
});
