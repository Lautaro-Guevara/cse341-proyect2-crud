//****************
// Require Statements
//****************
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

//****************
// Database Configuration
//****************
dotenv.config();

let _db;

//****************
// Initialize Database
//***************
const initDb = (callback) =>{

    // If the database is already initialized, return it
    if(_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    
    // Connect to the database
    MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
        _db = client.db();
        callback(null, _db);
    })
    .catch((err) => {
        callback(err);
    });
};

//****************
// Get Database
//****************
const getDb = () => {
    if(!_db) {
        throw Error("Database not initialized");
    }
    return _db;
};

//****************
// Export Functions
//****************
module.exports = {
    initDb,
    getDb
};
