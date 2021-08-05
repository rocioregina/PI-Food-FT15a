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
// require('dotenv').config();
// const {apiKey} = process.env;

//arreglo de tipos de dietas
var diets = ['gluten_free', 'ketogenic', 'vegetarian', 'lacto_vegetarian',
'ovo_vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30'];

// Syncing all the models at once.
conn.sync().then(() => {  //le quite el force
  server.listen(3015, () => {
    //axios.get(`${ro}complexSearch?${apiKey}${flag}`);
    //podria usar un bulkCreate pero hago un map donde convierto los strings a objetos
    diets = diets.map(d => {return {name: d}});
    diets = diets.map(d => Diet.create(d));
    console.log('%s listening at 30nn'); // eslint-disable-line no-console
  });
});
