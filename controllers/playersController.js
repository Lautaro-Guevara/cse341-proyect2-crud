//*************************
// Require Statements
//*************************
const database = require('../database/index');
const { ObjectId } = require('mongodb');

//*************************
// Controller Functions
//*************************

// Get all players
const getAllPlayers = async (req, res, next) => {
    //#swagger.tags = ['Players']
    try {
    const result = await database.getDb().collection('players').find();
    
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }).catch((err) => {
        res.status(500).json({ error: 'Failed to fetch players' });
    });
    } catch (error) {
        next(error);
    }
};

// Get a player by ID
const getPlayerById = async (req, res) => {
    //#swagger.tags = ['Players']
    try {
    const db = database.getDb();
    const playerId = new ObjectId(req.params.id);

    // Validate the player ID
    if (!ObjectId.isValid(playerId)) {
        return res.status(400).json({ error: 'Invalid player ID' });
    }

    result = await db.collection('players').find({ _id: playerId });

    result.toArray().then((lists) => {
        if (lists.length === 0) {
            res.status(404).json({ error: 'Player not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    }).catch((err) => {
        res.status(500).json({ error: 'Failed to fetch player' });
    });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the player' });
    }

};

// Create a new player
const createPlayer = async (req, res) => {
    //#swagger.tags = ['Players']
    try {
    const db = database.getDb();

    const newPlayer = {
        name: req.body.name,
        country: req.body.country,
        rank: req.body.rank,
        favoriteGame: req.body.favoriteGame,
        age: req.body.age
    };


    const response = await db.collection('players').insertOne(newPlayer);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else{
        res.status(500).json(response.error || 'Failed to create new player');
    }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the player' });
    }
};

// Update a player by ID
const updatePlayer = async (req, res) => {
    //#swagger.tags = ['Players']
    try {
        // conect to the database
        const db = database.getDb();
        // get the player ID from the request parameters
        const playerId = new ObjectId(req.params.id);
        // Validate the player ID
        if (!ObjectId.isValid(playerId)) {
        return res.status(400).json({ error: 'Invalid player ID' });
    }

    // new player data from the request body
    const updatedPlayer = {
        name: req.body.name,
        country: req.body.country,
        rank: req.body.rank,
        favoriteGame: req.body.favoriteGame,
        age: req.body.age
    };

    const response = await db.collection('players').replaceOne({ _id: playerId }, updatedPlayer);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Failed to update player');
    }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the player' });
    }

};

// Delete a player by ID
const deletePlayer = async (req, res) => {
    //#swagger.tags = ['Players']
    try {
        const db = database.getDb();
        const playerId = new ObjectId(req.params.id);

    const response = await db.collection('players').deleteOne({ _id: playerId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Failed to delete player');
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the player' });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
};