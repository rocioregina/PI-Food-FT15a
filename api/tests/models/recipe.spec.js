const { Recipe, conn } = require('../../src/db.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

describe('Recipe model', () => {
  // before(() => {
  //   this.enableTimeouts(false);
  //   conn.authenticate().catch((err) => {
  //     console.error("Unable to connect to the database:", err);
  //   });
  // });
  before(async() => {
    try {
      await conn.authenticate()
    } catch (error) {
      console.error(error.message)
    }
  })
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should work when its a valid title', () => {
        return expect(Recipe.create({ title: 'Milanesa a la napolitana', summary: 'es una milanesa' })).to.eventually.fulfilled;
      });
      it('deberia lanzar un error al intentar crear titulos dobles', async () => {
        await Recipe.create({title: 'pasta', summary: 'es una pasta'});
        return expect(Recipe.create({title: 'pasta', summary: 'es una pasta'})).to.eventually.rejectedWith(Error);
      })
    });
  });
});
