const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, autherization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Add user from the decoded payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is invalid" });
  }
}

module.exports = auth;
