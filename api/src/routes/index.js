const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Recipe, Diet} = require('../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
//guardo urls
const ro = 'https://api.spoonacular.com/recipes/';
const flag = '&addRecipeInformation=true';
//importo la apikey
require('dotenv').config();
const {apiKey} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET /recipes?name="..."
router.get(`/recipes${name}`, async function(req, res){
      const {name} = req.query;
      if(name){
        const recipesDB = await Recipe.findAll({
          where: {
            //hacer coincidir la palabra con el contenido?
              name: {[Op.like]: `%${name}%`}
          }
        })
        var response = await axios.get(`${ro}complexSearch?${apiKey}${flag}`);
        var recipesAPI = response.data.results.filter(receta => {
            receta.title.toUpperCase().includes(name.toUpperCase());
        });
        return res.json(recipesAPI.concat(recipesDB));
      }
    }
});

//GET /recipes/{idRecipe}
router.get("/recipes/:id", async function(req, res){
    try{
      const {id} = req.params;
      const recipe = await Recipe.findByPk(id, {
          include: Diet
        });
      if(!recipe){
          const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${apiKey}`);
          }
      res.json(recipe);
    }
    catch(err){
      next(err);
    }
});

//GET /types
router.get("/types", async function(req, res){
    const diets = await Diet.findAll();
    res.json(diets);
});

//POST /recipe
router.post("/recipe", async function(req, res){
    const {name, resume, punctuation, healthy, steps} = req.body;
    Recipe.create({
      name,
      resume,
      punctuation,
      healthy,
      steps
    });
})

module.exports = router;
