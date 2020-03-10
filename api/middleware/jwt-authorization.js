const jwt = require(`jsonwebtoken`);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, "asasdf869a8sd6f8986", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
};
