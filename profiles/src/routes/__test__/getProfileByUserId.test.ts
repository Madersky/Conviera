import request from "supertest";

import { app } from "../../app";

it("disallows not logged users to get any data", async () => {
  await request(app).get("/api/profiles/").send().expect(401);
});

it("allows logged in user to get data", async () => {
  const response = await request(app)
    .get("/api/profiles/")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
