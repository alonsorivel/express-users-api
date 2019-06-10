const express = require("express");
const router = express.Router();
const { insertUser, getUsers } = require("../database/users");
const Joi = require("@hapi/joi");

// Set endpoint to insert new user
router.post("/", async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = req.body;
  await insertUser(user);

  res.status(200).send({ message: "New user added." });
});

// Set endpoint to get all users
router.get("/", async (req, res, next) => {
  res.status(200).send(await getUsers());
});

function validateUser(entry) {
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phone: Joi.string()
      .regex(/^\d{3}-\d{3}-\d{4}$/)
      .required()
  };

  return Joi.validate(entry, schema);
}

module.exports = router;
