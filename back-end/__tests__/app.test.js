const express = require("express");
const app = require("../app");
const connection = require("../index");
const seed = require("../seed.mongodb");
const request = require("supertest");
const { ObjectId } = require("mongodb");

beforeEach(() => seed());

describe("GET /sights/:sight_id", () => {
  test("returns the correct sight object matching the sight id given", () => {
    return request(app)
      .get("/api/sights/25475389")
      .expect(200)
      .then(({ body }) => {
        const sights = body;
        expect(sights).toHaveProperty("_id");
        expect(sights).toEqual(
          expect.objectContaining({
            id: 25475389,
            lat: 51.5265807,
            lon: -0.1292505,
            tags: {
              amenity: "cafe",
              name: "Woburn Cafe",
            },
          })
        );
      });
  });
  test("404: returns a not found error when passed a valid but non-existent id", () => {
    return request(app)
      .get("/api/sights/230")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns a bad request when passed an invalid id", () => {
    return request(app)
      .get("/api/sights/peanuts")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("GET /api/users", () => {
  test("returns status 200 when all users found", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body;
        expect(users.length).toEqual(5);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              avatar: expect.any(String),
              settings: {
                searchRadius: expect.any(Number),
                location: {
                  lon: expect.any(Number),
                  lat: expect.any(Number),
                },
              },
            })
          );
        });
      });
  });
});
describe("GET /api/users/:username", () => {
  test("200 Returns correct user when specific user id is passed through", () => {
    return request(app)
      .get("/api/users/JamesO")
      .expect(200)
      .then(({ body }) => {
        const user = body;
        expect(user).toHaveProperty("_id");
        expect(user).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
            settings: {
              searchRadius: 60,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
  test("404: returns a not found error when passed a valid but non-existent username", () => {
    return request(app)
      .get("/api/users/peanuts")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("POST /api/users", () => {
  test("200 Posts new user with correct properties", () => {
    const newUser = {
      username: "MrPeanut",
      settings: {
        searchRadius: 790,
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        const newUser = body;
        expect(newUser).toEqual(
          expect.objectContaining({
            username: "MrPeanut",
            settings: {
              searchRadius: 790,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
  test("400 returns bad request if incorrect input given", () => {
    const newUser = {
      username: "MrPeanut",
      settings: {
        searchRadius: "peanuts",
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("400 returns bad request if missing required input", () => {
    const newUser = {
      settings: {
        searchRadius: 60,
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("PATCH /api/users/:username", () => {
  test("200 Correctly updates the user with send updates", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
            settings: {
              searchRadius: 100,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
  test("404 Error if User does not Exist", () => {
    return request(app)
      .patch("/api/users/JamesP")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400 Error if Update Data is malformed", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: "peanuts",
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("200 code if only partial update", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
            settings: {
              searchRadius: 100,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
});
