// Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialise
const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

// Connect to DB
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Server connected to DB"))
  .catch((err) => console.log(err));

// Server PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
