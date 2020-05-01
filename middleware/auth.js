const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(400).send("Access denied, No token");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
}

module.exports = auth;
