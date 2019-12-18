const router = require("express").Router();

const Users = require("../../../data/models/users-model");
const restricted = require("../../middleware/jwt-authorization");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
