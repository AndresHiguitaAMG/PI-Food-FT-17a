const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipiesRouter = require("./recipies");
const dietRouter = require("./diets");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipiesRouter)
router.use("/diets", dietRouter)


module.exports = router;
