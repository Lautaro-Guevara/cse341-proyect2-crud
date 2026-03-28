//*********************
// Require Statements
//*********************
const express = require('express');
const mongodb = require('./database/index');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/indexRoutes');
const playersRoutes = require('./routes/playersRoutes');
const gamesRoutes = require('./routes/gamesRoutes');

//*********************
// App Configuration
//*********************
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

//*********************
// Middleware
//*********************
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})


//*********************
// Routes
//*********************
app.use("/", routes);

app.use("/players", playersRoutes);

app.use("/games", gamesRoutes);

app.use("/api-docs", require('./routes/swagger'));



//*********************
// Start Server
//*********************
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database initialized');
        app.listen(PORT, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    }
});