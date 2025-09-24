const express = require('express');
const router = express.Router();
const guitarRoutesController = require('../controllers/guitarsRoutesController');

router.get("/", guitarRoutesController.getAllGuitars);
router.get("/:searchQuery", guitarRoutesController.getAllGuitarsByQuery);

module.exports = router;