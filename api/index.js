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
const { conn, Recipe, Diet } = require('./src/db.js');
// const { v4: uuidv4 } = require('uuid');

const loadDiets = [
"Gluten Free", "Ketogenic", 
"Vegetarian", "Lacto-Vegetarian",
"Ovo-Vegetarian","Vegan", 
"Pescetarian", "Paleo", 
"Primal", "Whole 30",	
];

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    
    loadDiets.forEach(el =>{
      Promise.all([Diet.create({name: el})])
    })

    // Recipe.create({
    //   title: 'Arepa de Huevo',
    //   image: 'https://okdiario.com/img/recetas/2017/04/21/arepa-y-huevo.jpg',
    //   summary:
    //     'Esta es una deliciosa receta de la costa caribeña de Colombia. Estas populares arepas de maíz a menudo se preparan en los pequeños mercados callejeros y verá una larga cola de clientes esperando para comprarlas.',
    //   score: 99.5,
    //   healthScore: 55,
    //   instructions:
    //     'En un recipiente mezclar la harina la sal. Vertir el agua caliente lentamente y revolver con una cuchara a medida que se va agregando mas agua. Mezclar muy bien hasta que conforme una masa consistente, dejar reposar por 10 minutos o hasta que sea posible manipularla. Tomar una pequeña porcion y colocarla en una superficie plana cubierta con una bolsa plastica o vinilo. Dejar la masa dentro de la bolsa y luego usar un rodillo para aplanarla. Con un cortador de galletas u otro cortador hacer circulos del tamaño deseado. Precalentar el aceite y freirlas a fuego medio. Cuando esten un poco doradas sacarlas a una superficie segura. Con un cuchillo hacer un corte en uno le sus lados de mas o menos 4 o 5 centimetros, haciendo espacio para introducir el huevo. Se coloca el huevo en un pocillo, se agrega sal y pimienta al gusto y luego se vierte dentro de la arepa. Se asegura la arepa con un poco mas de masa y luego se frie otra vez. Cuando este dorado por un lado darle la vuelta. Sacar la arepa a una plato con papel de cocina para que absorva el exceso de aceite. Servir caliente.',
    // });  
  });
}); 
