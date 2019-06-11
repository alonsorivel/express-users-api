const request = require("supertest");

let server;
let curUserId;
let lastEventId;

describe("ALL ROUTES", () => {
  beforeAll(() => {
    server = require("../build/server");
  });

  afterAll(() => {
    server.close();
  });

  describe("GET / - API HOME", () => {
    it("should return 200 response - welcome message", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });

  describe("POST / - INSERT USER", () => {
    it("should return 201, user id, and message", async () => {
      const user = {
        email: "test@ns8.com",
        password: "passwordIsPizza",
        phone: "333-222-1111"
      };
      const res = await request(server)
        .post("/users")
        .send(user);

      const { user_id, message } = res.body;

      // Persist user id
      curUserId = user_id;

      expect(res.status).toBe(201);
      expect(message).toBe("New user added.");
    });
  });

  describe("POST / - INSERT EVENT", () => {
    it("should return 201, event id, and message", async () => {
      const event = {
        type: "LOGIN",
        user_id: curUserId
      };
      const res = await request(server)
        .post("/events")
        .send(event);

      const { event_id, message } = res.body;

      // Persist event id
      lastEventId = event_id;

      expect(res.status).toBe(201);
      expect(message).toBe("New event added.");
    });
  });

  describe("GET / - GET ALL USERS", () => {
    it("should return 200 and user object", async () => {
      const res = await request(server).get("/users");
      const { _id } = res.body[0];

      expect(res.status).toBe(200);
      expect(_id).toBe(curUserId);
    });
  });

  describe("GET / - GET ALL EVENTS", () => {
    it("should return 200 and event object", async () => {
      const res = await request(server).get("/events");
      const { _id, user_id } = res.body[0];

      expect(res.status).toBe(200);
      expect(_id).toBe(lastEventId);
      expect(user_id).toBe(curUserId);
    });
  });

  describe("GET / - GET ALL EVENTS FOR A SINGLE USER", () => {
    it("should return 200 and event object", async () => {
      const res = await request(server).get(`/events/${curUserId}`);
      const { _id, user_id } = res.body[0];

      expect(res.status).toBe(200);
      expect(_id).toBe(lastEventId);
      expect(user_id).toBe(curUserId);
    });
  });

  describe("GET / - GET ALL EVENTS FOR LAST DAY", () => {
    it("should return 200 and event object", async () => {
      const res = await request(server).get("/events/lastday");
      const { _id, user_id } = res.body[0];

      expect(res.status).toBe(200);
      expect(_id).toBe(lastEventId);
      expect(user_id).toBe(curUserId);
    });
  });
});
