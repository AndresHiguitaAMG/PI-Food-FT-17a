const { Diet } = require("../db");

const getDiets = async(req, res, next) => {
    try{
        const dbInfo = Diet.findAll() 
        if(dbInfo.length)
        return res.status(200).json(dbInfo)
        else{
            return res.status(400).json({message: "No se pudo procesar su solicitud"})
        }
    }catch{
        return res.status(400).json({message: "Error"})
    }
}

module.exports = {
    getDiets
}