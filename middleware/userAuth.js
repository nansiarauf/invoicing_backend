const jwt = require("jsonwebtoken");

//SET A TOKEN
const protectRoute = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(403).send("You are not authorised");

  //VERIFY TOKEN
  const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  req.user = verifyToken;
  next();
};
module.exports = protectRoute;
