const router = require('express').Router();
const { getRecipies, getRecipiesById, postRecipies } = require("../controllers/recipies");

router.get("/", getRecipies);
router.get("/:id", getRecipiesById);
router.post("/create", postRecipies);

module.exports = router;