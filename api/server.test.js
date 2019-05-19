const request = require("supertest");

const server = require("./server");

describe("server endpoints", () => {
  it("sets the enviroment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("GET /", () => {
    it("server is running", async () => {
      // use the squad
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
  describe("school endpoints", () => {
    describe("Register POST /", () => {
      let data = {
        name: "Schoolcdv Name",
        username: `test${Math.random()}`,
        password: `PASS${Math.random()}`
      };
      it("should return an 201 okay status", async () => {
        const response = await request(server)
          .post("/api/schools/register")
          .send(data);
        expect(response.status).toBe(201);
      });

      it("should return JSON object with new school", async () => {
        let data = {
          name: "Schoolcdv Name",
          username: `test${Math.random()}`,
          password: `PASS${Math.random()}`
        };
        const response = await request(server)
          .post("/api/schools/register")
          .send(data);
        expect(response.body).toHaveProperty("id");
      });

      it("should return application/json type", async () => {
        const response = await request(server).post("/api/schools/register");
        expect(response.type).toEqual("application/json");
      });
    });
    describe("Login Post /", () => {
      it("should return an 200 okay status", async () => {
        const data = {
          name: "Diablo Valley College",
          username: "diablostaff1",
          password: "password"
        };
        const response = await request(server)
          .post("/api/schools/login")
          .send(data);
        expect(response.status).toBe(200);
      });
    });
  });
});
