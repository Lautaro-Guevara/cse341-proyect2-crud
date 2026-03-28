//*********************
// Require Statements
//*********************
const express = require('express');
const router = express.Router();
const controller = require('../controllers/playersController');
const validation = require('../validation/validation');
const errorHandler = require('../utilities/utilities')

//*********************
// Routes
//*********************

// Get all players
router.get(
    "/",
    errorHandler.handleErrors(controller.getAllPlayers)
);

// Get a player by ID
router.get("/:id", errorHandler.handleErrors(controller.getPlayerById));

// Create a new player
router.post(
    "/",
    validation.createPlayerValidationRules(),
    validation.checkCreatePlayerValidation,
    errorHandler.handleErrors(controller.createPlayer)
);

// Update a player by ID
router.put(
    "/:id",
    validation.createPlayerValidationRules(),
    validation.checkCreatePlayerValidation,
    errorHandler.handleErrors(controller.updatePlayer)
);

// Delete a player by ID
router.delete("/:id", errorHandler.handleErrors(controller.deletePlayer));

module.exports = router;
