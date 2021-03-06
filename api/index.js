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
// const { v4: uuidv4 } = require('uuid');

const loadDiets = [
  "Gluten Free", "Ketogenic", 
  "Vegetarian", "Lacto-Vegetarian", 
  "Ovo-Vegetarian","Vegan", 
  "Pescetarian", "Paleo", 
  "Primal", "Whole 30",	
  ]; 

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console 
    
    loadDiets.forEach(el =>{
      Promise.all([Diet.create({name: el})]) 
    })
    // const promesadiets = loadDiets.map(el => Diet.findOrCreate({where: {name: el}}))
    // await Promise.all(promesadiets)
  });
}); 
