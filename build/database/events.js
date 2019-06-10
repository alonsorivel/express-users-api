const { getDatabase } = require("./mongo");
const collectionName = "events";

// Insert new event
async function insertEvent(event) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(event);
  return insertedId;
}

// Get all events for all users
async function getEvents() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
}

// Get all events for a single user
async function getEventsByUser(user_id) {
  const database = await getDatabase();
  const query = {
    user_id: user_id
  };
  return await database
    .collection(collectionName)
    .find(query)
    .toArray();
}

// Get all events for the last day
async function getEventsLastDay() {
  const midnight = new Date(new Date().setHours(-24, 0, 0, 0));
  const database = await getDatabase();
  const query = {
    created: { $gte: midnight.getTime() }
  };
  return await database
    .collection(collectionName)
    .find(query)
    .toArray();
}

module.exports = {
  insertEvent,
  getEvents,
  getEventsByUser,
  getEventsLastDay
};
