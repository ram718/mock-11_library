const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.status(400).send({ msg: "Wrong credentials" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Login failed" });
  }
};

module.exports = { auth };
