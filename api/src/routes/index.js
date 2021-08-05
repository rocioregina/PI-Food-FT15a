const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Recipe, Diet} = require('../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

//importo la apikey
require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET /recipes?name="..."
router.get("/recipes", async function(req, res, next){
    try{
      const {name} = req.query;
      if(name){
        //recupero recetas de la base de datos
        const recipesDB = await Recipe.findAll({
          where: {
            //verifico que name este contenido en el nombre
              title: {[Op.like]: `%${name}%`}
          }
        });
        //console.log(recipesDB);
        //recupero recetas de la api
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
        //.data porque axios trae asi la informacion
        let recipesAPI = response.data.results.filter(receta => {
            //toUpperCase hará coincidir ambos strings
            return receta.title.toUpperCase().includes(name.toUpperCase());
        });
        recipesAPI = recipesAPI.map((r) => {
            return{
                title: r.title,
                summary: r.summary,
                spoonacularScore: r.spoonacularScore,
                healthScore: r.healthScore,
                analyzedInstructions: r.analyzedInstructions,
                image: r.image,
                dietss: r.diets
            };
        });

        //console.log(recipesAPI);
        return res.json(recipesAPI.concat(recipesDB));
      }
      return res.status(404).json('Enter a valid name');
    }
    catch(err){
      next(err);
    }
});

//GET /recipes/{idRecipe}
router.get("/recipes/:id", async function(req, res, next){
    try{
      const {id} = req.params;
      //recupero receta con id de la base de datos
      if(id.length >= 10 && typeof id === "string"){
        const recipe = await Recipe.findByPk(id, {
          include: Diet
        });
        return res.json(recipe);
      }
        //si no la encontre en la db, busco en la api
        const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${API_KEY}`);
        recipe = {
            title: recipeAPI.data.title,
            summary: recipeAPI.data.summary,
            spoonacularScore: recipeAPI.data.spoonacularScore,
            healthScore: recipeAPI.data.healthScore,
            analyzedInstructions: recipeAPI.data.analyzedInstructions,
            image: recipeAPI.data.image,
            dietss: recipeAPI.data.diets
        }
        return res.json(recipe);
      }
    catch(err){
      next(err);
    }
});

//GET /types
router.get("/types", async function(req, res){
    //busco los tipos de dieta en la base de datos
    const diets = await Diet.findAll();
    res.json(diets);
});

const funcion = async function(array){
  const d = await Diet.findAll({raw: true, where: { name: {[Op.or]: array } } });
  return d.map(e => e.id);
}

//POST /recipe
router.post("/recipe", async function(req, res, next){
  try{
    const {title, summary, spoonacularScore, healthScore, analyzedInstructions, image, diets} = req.body;
    //creo una receta con los datos recibidos
    const recipeCreated = await Recipe.findOrCreate({
      where: {
      id: uuidv4(),
      title,
      summary,
      spoonacularScore
      healthScore,
      analyzedInstructions,
      image
      }
    });
    // console.log(diets);
    const die = await funcion(diets);
    // console.log(recipeCreated);
    await recipeCreated[0].setDiets(die);
    res.json({msg: "Recipe uploaded."});
  }
  catch(err){
    next(err);
  }
})

module.exports = router;
