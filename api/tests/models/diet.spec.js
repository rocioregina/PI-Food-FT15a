const { Diet, conn } = require("../../src/db.js");
const chai = require('chai');
const { expect } = chai;

chai.use(require('chai-as-promised'))

describe("Diet model", () => {
  beforeEach(() => {
    Diet.sync({force: true});
  });
  before(async() => {
    try {
      await conn.authenticate()
    } catch (error) {
      console.error(error.message)
    }
  })
  describe("Validators", () => {
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Diet.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
    });
  });
});
