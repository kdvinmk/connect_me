const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Please enter email and password");

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User does not exist");

  if (user) {
    bcrypt.compare(password, user.password).then((isValid) => {
      if (!isValid) return res.status(400).send("Password is invalid");
      const token = jwt.sign({ id: user.id }, process.env.SECRET);
      res.json({ token, user });
    });
  }
});

module.exports = router;
