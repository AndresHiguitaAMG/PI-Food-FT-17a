const router = require('express').Router();
const { getRecipes, getRecipesById, postRecipes } = require("../controllers/recipes");

router.get("/", getRecipes);
router.get("/:id", getRecipesById);
router.post("/create", postRecipes);

module.exports = router;