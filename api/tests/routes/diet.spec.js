/* eslint-disable import/no-extraneous-dependencies */
const chai = require("chai");
const { expect } = chai;
const session = require("supertest-session");
const app = require("../../src/app.js");

let agent = null;

chai.use(require("chai-uuid"));

describe("Recipe routes", () => {
  beforeEach(() => {
    agent = session(app);
  });
  describe("/recipes?name", () => {
    it("should get 200 and id, title and summary property in response", async () => {
      await agent
        .get("/recipes?name=rice")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          res.body.forEach((r) => {
            expect(r).to.have.property("id");
            expect(r).to.have.property("title");
            expect(r).to.have.property("summary");
          });
        });
    });
  });
  describe("/recipes/:id", () => {
    it("should get 200 and id, title and summary property in response", async () => {
      await agent
        .get("/recipes/12")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("title");
            expect(res.body).to.have.property("summary");
        });
    });
  });
  xdescribe("/recipes", () => {
    it("deberia devolver la receta creada con un id en formato UUID", async () => {
      const response = await agent
        .post("/recipes")
        .send({ title: "Vegetarian Paella", summary: "Typical dish from Spain", diets: ["dairy_free"] });
      expect(response.status).to.eql(200);
      const recipe = response.body;
      expect(recipe.id).to.be.a.uuid();

    });
  });
});
