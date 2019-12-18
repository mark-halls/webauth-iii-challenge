const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require(`jsonwebtoken`);
const Users = require("../../../data/models/users-model");
const userBodyValidation = require(`../../middleware/user-body-validation`);

const signToken = payload => {
  return jwt.sign(payload, "asasdf869a8sd6f8986", {
    expiresIn: "1h"
  });
};

// for endpoints beginning with /api/auth
router.post(
  "/register",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10); // 2 ^ n
    const token = signToken({ username: username });

    Users.add({ username, password: hash })
      .then(saved => {
        res.status(201).json({ token, saved });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

router.post(
  "/login",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken({ username: user.username });
          res.status(200).json({ token, message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

module.exports = router;
