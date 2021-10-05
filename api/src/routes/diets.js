const router = require('express').Router();
const { getDiets } = require("../controllers/diets");

router.get("/", getDiets)

module.exports = router;
