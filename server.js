//*********************
// Require Statements
//*********************
const express = require('express');
const mongodb = require('./database/index');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')
const routes = require('./routes/indexRoutes');
const playersRoutes = require('./routes/playersRoutes');
const gamesRoutes = require('./routes/gamesRoutes');
const { body } = require('express-validator');

//*********************
// App Configuration
//*********************
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    })
});

//*********************
// Middleware
//*********************

app
    .use(bodyParser.json())
    .use(sessionMiddleware)
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
    .use(cors({ origin: '*' }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

//*********************
// Routes
//*********************
app.use("/", routes);

app.use("/players", playersRoutes);

app.use("/games", gamesRoutes);

app.use("/api-docs", require('./routes/swagger'));

app.get("/", (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});



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