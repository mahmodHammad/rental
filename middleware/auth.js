const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.header("x-authUser");
  if (!token) return res.status(401).send("access denied , no token provided");

  try {
    const decoded = jwt.verify(token, "will be changed later");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;
