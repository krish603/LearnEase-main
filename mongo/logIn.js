const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/loginDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Set up view engine (optional, for rendering login page, if using a template engine)
// app.set('view engine', 'ejs');

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html"); // You will create a simple login.html file
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (user) {
    // Compare passwords using bcrypt (or plain text, if no hashing)
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Password matched, authenticate user
      req.session.user = user;
      res.send("Login successful!");
    } else {
      res.send("Incorrect password!");
    }
  } else {
    res.send("User not found!");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
