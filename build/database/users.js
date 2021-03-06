const { getDatabase } = require("./mongo");
const collectionName = "users";

// Insert new user
async function insertUser(user) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(user);
  return insertedId;
}

// Get all users
async function getUsers() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
}

module.exports = {
  insertUser,
  getUsers
};
