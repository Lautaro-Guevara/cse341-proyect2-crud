//*************************
// Require Statements
//*************************
const database = require('../database/index');
const { ObjectId } = require('mongodb');

//*************************
// Controller Functions
//*************************

// Get all games
const getAllGames = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
    const result = await database.getDb().collection('games').find();

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }).catch((err) => {
        res.status(500).json({ error: 'Failed to fetch games' });
    });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching games' });
    }
}

// Get a game by ID
const getGameById = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
    const gameId = new ObjectId(req.params.id);

    // Validate the game ID
    if (!ObjectId.isValid(gameId)) {
        return res.status(400).json({ error: 'Invalid game ID' });
    }

    const result = await database.getDb().collection('games').find({ _id: gameId });

    result.toArray().then((lists) => {
        if (lists.length === 0) {
            res.status(404).json({ error: 'Game not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    }).catch((err) => {
        res.status(500).json({ error: 'Failed to fetch game' });
    });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the game' });
    }
}

// Add a new game
const addGame = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
    const newGame = {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        developer: req.body.developer,
        platform: req.body.platform,
        rating: req.body.rating,
        multiplayer: req.body.multiplayer,
        price: req.body.price
    }

    const response = await database.getDb().collection('games').insertOne(newGame);

    if(response.acknowledged) {
        res.status(201).json(response);
    } else{
        res.status(500).json(response.error || 'Failed to create new game');
    }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the game' });
    }

}

// Update a game by ID
const updateGame = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
    const db = database.getDb();
    const gameId = new ObjectId(req.params.id);

    // Validate the game ID
    if (!ObjectId.isValid(gameId)) {
        return res.status(400).json({ error: 'Invalid game ID' });
    }

    const existingGame = await db.collection('games').findOne({ _id: gameId });

    if (!existingGame) {
        return res.status(404).json({ error: 'Game not found' });
    }

    const updatedGame = {
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        developer: req.body.developer,
        platform: req.body.platform,
        rating: req.body.rating,
        multiplayer: req.body.multiplayer,
        price: req.body.price
    }

    const response = await db.collection('games').updateOne({ _id: gameId }, { $set: updatedGame });

    if(response.modifiedCount > 0) {
        res.status(200).json(response);
    } else{
        res.status(500).json(response.error || 'Failed to update game');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the game' });

}}

// Delete a game by ID
const deleteGame = async (req, res) => {
    //#swagger.tags = ['Games']
    try {
    const db = database.getDb();
    const gameId = new ObjectId(req.params.id);

    // Validate the game ID
    if (!ObjectId.isValid(gameId)) {
        return res.status(400).json({ error: 'Invalid game ID' });
    }

    const response = await db.collection('games').deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Failed to delete game');
    }
} catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the game' });}
}

// Export the controller functions
module.exports = {
    getAllGames,
    getGameById,
    addGame,
    updateGame,
    deleteGame
}