//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');
const axios = require('axios');
// const ro = 'https://api.spoonacular.com/recipes/';
// const flag = '&addRecipeInformation=true';
require('dotenv').config();
const {PORT} = process.env;

//arreglo de tipos de dietas --> descomentar para pre-cargar
var diets = ['See All', 'Gluten Free', 'Dairy Free', 'Ketogenic', 'Lacto Ovo Vegetarian', 'Vegan', 'Pescatarian', 'Paleolithic', 'Primal', 'Whole 30', 'FODMAP Friendly'];

// Syncing all the models at once.
conn.sync({force: true}).then(() => {  //le quite el force: true
  server.listen(PORT, () => {
    //axios.get(`${ro}complexSearch?${apiKey}${flag}`);
    //podria usar un bulkCreate pero hago un map donde convierto los strings a objetos
    diets = diets.map(d => {return {name: d}});
    diets = diets.map(d => Diet.create(d));
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
