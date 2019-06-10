const express = require("express");
const router = express.Router();
const { insertEvent, getEvents } = require("../database/events");
const Joi = require("@hapi/joi");

// Set endpoint to insert new event
router.post("/", async (req, res, next) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { type, user_id } = req.body;
  const event = {
    type: type,
    user_id: user_id,
    created: Date.now()
  };

  await insertEvent(event);

  res.status(200).send({ message: "New event added." });
});

// Set endpoint to get all events
router.get("/", async (req, res, next) => {
  res.status(200).send(await getEvents());
});

function validateEvent(entry) {
  const schema = {
    type: Joi.string().required(),
    user_id: Joi.string().required()
  };

  return Joi.validate(entry, schema);
}

module.exports = router;
