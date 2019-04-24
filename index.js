const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const serviceAccount = require('./service-account.json');
const api = require('./controllers/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const COOKIE_SECRET = 'keyboard cat';
app.use(session({
    name: 'user_sid',
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kanban-9c05f.firebaseio.com"
});

const db = admin.firestore();

const usersCollection = db.collection('users');

// logs in user
app.post('/api/login', api.login(usersCollection, bcrypt));

// registers a new user
app.post('/api/signup', api.signup(usersCollection, bcrypt));

// logs out user
app.get('/api/logout', api.logout);

// checks if user is logged in and returns username
app.get('/api/isloggedin', api.isLoggedIn);

// 404, no matching route found
app.use((_, res) => {
    res.status(404).json("Invalid API route");
});

// route for handling errors
app.use((err, _, res) => {
    res.status(400).json(err);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});