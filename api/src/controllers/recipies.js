const { Recipe, Diet, Op } = require("../db");
const axios = require("axios");
 
//Función que me trae lo requrido para la ruta principal.
//Ordenamiento, paginado y filtrado por name.
const getRecipies = async(req, res, next) => {
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
        const recipePerPage = 5;
        //#region name
        if(name && name !== ""){
            const allRecipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4f9962859661481c85e5e8be7498795e&addRecipeInformation=true&query=${name}&number=100`)
            myInfo = await allRecipesApi.data.results.map(el => {
                return {
                    image: el.image,
                    title: el.title,
                    diets: el.diets
                }
            }) 
            allRecipesDb = await Recipe.findAll({
                where:{
                    title:{
                        [Op.iLike]: `%${name}%` 
                    }
                }
            })
            allData = allRecipesDb.concat(myInfo)
        }else{
            const allRecipesApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=4f9962859661481c85e5e8be7498795e&addRecipeInformation=true&number=100")
            myInfo = await allRecipesApi.data.results.map(el => {
                return {
                    image: el.image,
                    title: el.title,
                    diets: el.diets
                }
            }) 
            allRecipesDb = await Recipe.findAll({include: Diet})
            allData = allRecipesDb.concat(myInfo)
        }
        //#endregion
        
        //#region order
        if(order === "asc" || !order || order === ""){
            allData = allData.sort((a, b) =>{
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            })
        }else{
            allData = allData.sort((a, b) =>{
                return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
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

        //#region page
        let result = allData.slice((recipePerPage * (page - 1)), 9) 
        //#endregion
        return res.json(result); 
    }catch(err){
        next(err)
    }
}

const getRecipiesById = async(req, res, next) => {
    const id = req.params.id;
    if(id){
        try {
            if(!id.includes("-")){
                const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=4f9962859661481c85e5e8be7498795e`)             
                    const info = {
                        image: idApi.data.image,
                        title: idApi.data.title,
                        diets: idApi.data.diets,
                        sumnary: idApi.data.sumnary,
                        score: idApi.data.score,
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
                        title: Db.title,
                        diets: Db.diets,
                        sumnary: Db.sumnary,
                        score: Db.score,
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


const postRecipies = async(req, res, next) => {
    const { title, summary, score, healthScore, instructions, diets } = req.body;
    let recipie = {
        title, 
        summary, 
        score, 
        healthScore, 
        instructions, 
    }
    Recipe.create(recipie)
    .then(recipie => {
        recipie.addDiet(diets)
        res.json({...recipie, diets})
    })
    .catch((err) => next(err))
};




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

module.exports = {
    getRecipies,
    getRecipiesById,
    postRecipies
}



