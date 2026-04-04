//*********************
// Require Statements
//*********************
const express = require('express');
const router = express.Router();
const controller = require('../controllers/gamesController');
const validation = require('../validation/validation');
const errorHandler = require('../utilities/utilities')
const { isAuthenticated } = require('../utilities/middleware');

//*********************
// Routes
//*********************

// Get all games
router.get("/", errorHandler.handleErrors(controller.getAllGames));

// Get a game by ID
router.get("/:id", errorHandler.handleErrors(controller.getGameById));

// Create a new game
router.post(
    "/",
    isAuthenticated,
    validation.gameValidationRules(),
    validation.checkGameValidation,
    errorHandler.handleErrors(controller.addGame)
);

// Update a game by ID
router.put(
    "/:id",
    isAuthenticated,

    validation.gameValidationRules(),
    validation.checkGameValidation,
    errorHandler.handleErrors(controller.updateGame)
);

// Delete a game by ID
router.delete("/:id", isAuthenticated, errorHandler.handleErrors(controller.deleteGame));

module.exports = router;