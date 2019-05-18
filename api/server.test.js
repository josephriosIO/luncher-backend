const request = require("supertest");

const server = require("./server");

describe("server endpoints", () => {
  it("sets the enviroment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
