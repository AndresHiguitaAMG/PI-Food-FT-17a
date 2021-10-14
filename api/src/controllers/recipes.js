const { Recipe, Diet, Op } = require("../db");
const axios = require("axios");
 
//Función que me trae lo requrido para la ruta principal.  
//Ordenamiento, paginado y filtrado por name.   
const getRecipes = async(req, res, next) => {
    try{
        let {
            name,
            order,
            page
        } = req.query

        let myInfo
        let allRecipesDb
        let allData = []
        page = page ? page : 1;
        const recipePerPage = 9;
        //#region name 
        if(name && name !== ""){ // 
            const allRecipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5616593d87bb417abf9ee23a7d64f0bc&addRecipeInformation=true&query=${name}&number=100`)
            myInfo = await allRecipesApi.data.results.map(el => {
                return {
                    image: el.image,
                    name: el.title,
                    diets: el.diets
                }
            }) 
            allRecipesDb = await Recipe.findAll({
                where:{
                    name:{ //ojo
                        [Op.iLike]: `%${name}%` 
                    }
                }
            })
            allData = allRecipesDb.concat(myInfo)
        }else{
            const allRecipesApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=5616593d87bb417abf9ee23a7d64f0bc&addRecipeInformation=true&number=100")
            myInfo = await allRecipesApi.data.results.map(el => {
                return {
                    image: el.image,
                    name: el.title,
                    diets: el.diets,
                    id: el.id 
                }
            }) 
            allRecipesDb = await Recipe.findAll({include: [Diet]})
            allData = allRecipesDb.concat(myInfo)
        }
        //#endregion
        
        //#region order
        if(order === "asc" || !order || order === ""){
            allData = allData.sort((a, b) =>{
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            })
        }else{
            allData = allData.sort((a, b) =>{
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            }) 
        }   


        // if(order === "asc" || !order){ 
        //     allData = allData.sort((a, b) => {
        //         return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        //     })
        // }else{
        //     allData = allData.sort((a, b) =>{
        //         return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        // }  

        //#endregion

        //#region page                             //ej: si es page es 2 va dar 1
        let result = allData.slice((recipePerPage * (page - 1)), (recipePerPage * (page - 1)) + recipePerPage) 
        //#endregion
        return res.json({
            //Envío al front el resultado, lo que van a mostrar, en pocas palabras la pagina cortada
            result: result,
            //Resultado total
            count: allData.length}); 
    }catch(err){
        next(err)
    }
}

//Mi función para buscar por id, ruta detalle
const getRecipesById = async(req, res, next) => { 
    const id = req.params.id;
    if(id){
        try {
            if(!id.includes("-")){
                const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=5616593d87bb417abf9ee23a7d64f0bc`)             
                    const info = {
                        image: idApi.data.image,
                        name: idApi.data.title,
                        dishTypes: idApi.data.dishTypes,
                        diets: idApi.data.diets,
                        summary: idApi.data.summary,
                        score: idApi.data.spoonacularScore,
                        healthScore: idApi.data.healthScore,
                        instructions: idApi.data.instructions   
                    }
                    res.json(info)
                }else{
                    const Db = await Recipe.findOne({
                        where: {
                            id: id
                        },
                        include: Diet
                    })
                    const recipieDb = {
                        image: Db.image,
                        name: Db.title,
                        dishTypes: Db.dishTypes,
                        diets: Db.diets,
                        summary: Db.summary,
                        score: Db.spoonacularScore,
                        healthScore: Db.healthScore,
                        instructions: Db.instructions
                    }
                    if(!Db){
                        return res.status(400).send({message: "No se encontro"})
                    }
                    return res.json(recipieDb)
                }
            }catch(err){
                return res.status(400).send({message: "No se pudo procesar su solicitud"})
            }
        }
    } 

//Mi función post, ruta de creación
const postRecipes = async(req, res, next) => {
    try{
        const { name, summary, spoonacularScore, healthScore, instructions, diets} = req.body;
        let createRecipe = await Recipe.create({
            
            image: "https://cdn.imusa.com.co/resources/2016/12/Slide-34jpg.jpg",
            name, 
            summary, 
            spoonacularScore: parseFloat(spoonacularScore), 
            healthScore: parseFloat(healthScore), 
            instructions
        })
        const dietsDb = await Diet.findAll({where: {name: diets}})
        await createRecipe.addDiets(dietsDb) //Linkeo, siempre prural
        return res.status(200).send("Creado con exito")
    }catch(err){
        next(err)
    };
}




// const postRecipes = async(req, res, next) => {
//     const { name, summary, score, healthScore, instructions, diets } = req.body;
//     let recipie = {
//         name, 
//         summary, 
//         score, 
//         healthScore, 
//         instructions, 
//     }
//     Recipe.create(recipie)
//     .then(recipie => {
//         recipie.addDiet(diets)
//         res.json({...recipie, diets})
//     })
//     .catch((err) => next(err))
// };

//Para probar el paginado y el order &order=asd&page=1

//Para crear una receta desde PgAmin  
// INSERT INTO recipes (id, title, summary, instructions)
// VALUES 
// ('715084de-1fc8-11ec-9621-0242ac130002', 'name1', 'summary1', 'pasos1'),
// ('88200b26-1fc8-11ec-9621-0242ac130002', 'name2', 'summary2',  'pasos2'),
// ('91f98190-1fc8-11ec-9621-0242ac130002', 'name3', 'summary3', 'pasos3');




// let recipie = {
//     title, 
//     summary, 
//     score, 
//     healthScore, 
//     instructions, 
//     diets 
// }

// Recipie.create(recipie)  //Estas funciones siempre van a ser promesas
// .then(recipie => {
//     res.json(recipie)
// })
// .catch((error) => next(error)) //endware




// let recipieCreated = await Recipe.create({
    //     title, 
    //     summary, 
    //     score, 
    //     healthScore, 
    //     instructions
    // })

    // let dietsDb = await Diet.findAll({
    //     where: {
    //         name: diets
    //     }
    // })
    // recipieCreated.addDiet(dietsDb)
    // res.send("Receta creada con exito")

    
    //Api Key de respaldo; 9996e0bf1e1a4619a2b8ea70d569d4e2, bd3e698405694cb0b432069507533f26, e16d3c55137f44619f594e09eafac924, dcff187f29484cbbb733200386ce3ce3, e10fe56e7a0d47bcb9d7d89920042c7a, 88354d401c3049a5b30a5a022eebf8bd
module.exports = {
    getRecipes,
    getRecipesById,
    postRecipes
}



