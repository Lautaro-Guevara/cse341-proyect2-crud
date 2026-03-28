//*********************
// Requirement Satements
//*********************
const { body, validationResult } = require('express-validator');
const validate = {};

// Validation rules for creating a new player
validate.createPlayerValidationRules = () => {
    return [
        body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .isString().withMessage('Name must be a string'),

        body('country')
        .notEmpty().withMessage('Country is required')
        .isLength({ min: 2 }).withMessage('Country must be at least 2 characters long')
        .isString().withMessage('Country must be a string'),

        body('rank')
        .notEmpty().withMessage('Rank is required')
        .isIn(['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster'])
        .withMessage('Rank must be one of the following: iron, bronze, silver, gold, platinum, diamond, master, grandmaster'),

        body('favoriteGame')
        .notEmpty().withMessage('Favorite game is required')
        .isLength({ min: 2 }).withMessage('Favorite game must be at least 2 characters long')
        .isString().withMessage('Favorite game must be a string'),

        body('age')
        .notEmpty().withMessage('Age is required')
        .isInt({ min: 1 }).withMessage('Age must be a positive integer'),
    ];
};

// Check validation results for creating a new player
validate.checkCreatePlayerValidation = (req, res, next) => {
    const { name, country, rank, favoriteGame, age } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for games
validate.gameValidationRules = () => {
    return [
        body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters long')
        .isString().withMessage('Title must be a string'),

        body('genre')
        .notEmpty().withMessage('Genre is required')
        .isLength({ min: 2 }).withMessage('Genre must be at least 2 characters long')
        .isString().withMessage('Genre must be a string'),

        body('year')
        .notEmpty().withMessage('Year is required')
        .isInt({ min: 1950, max: new Date().getFullYear() }).withMessage(`Year must be an integer between 1950 and ${new Date().getFullYear()}`),

        body('developer')
        .notEmpty().withMessage('Developer is required')
        .isLength({ min: 2 }).withMessage('Developer must be at least 2 characters long')
        .isString().withMessage('Developer must be a string'),

        body('platform')
        .notEmpty().withMessage('Platform is required')
        .isLength({ min: 2 }).withMessage('Platform must be at least 2 characters long')
        .isString().withMessage('Platform must be a string'),

        body('rating')
        .notEmpty().withMessage('Rating is required')
        .isFloat({ min: 0, max: 10 }).withMessage('Rating must be a number between 0 and 10'),

        body('multiplayer')
        .notEmpty().withMessage('Multiplayer is required')
        .isBoolean().withMessage('Multiplayer must be a boolean value'),    

        body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    ];
};


validate.checkGameValidation = (req, res, next) => {
    const { title, genre, year, developer, platform, rating, multiplayer, price } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = validate;
