const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// Load user
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json({ user }));
});

// Register user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).send("Please send all details");

  const existsUser = await User.findOne({ email });
  if (existsUser) return res.status(400).send("User already exists");

  const newUser = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  if (hash) {
    newUser.password = hash;
  }

  try {
    const saved = await newUser.save();
    const token = jwt.sign({ id: saved.id }, process.env.SECRET);
    if (saved) return res.json({ token, saved });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
