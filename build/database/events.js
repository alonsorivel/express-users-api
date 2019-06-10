const { getDatabase } = require("./mongo");

const collectionName = "events";

async function insertEvent(event) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(event);
  return insertedId;
}

async function getEvents() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
}

module.exports = {
  insertEvent,
  getEvents
};
