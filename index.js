const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const favicon = require('serve-favicon');
const api = require('./controllers/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'client/build')))

const COOKIE_SECRET = 'keyboard cat';
app.use(session({
    name: 'user_sid',
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

let serviceAccount = {};
try {
    serviceAccount = require('./service-account.json');
}
catch(err) {
    serviceAccount.type = process.env.type;
    serviceAccount.project_id = process.env.project_id;
    serviceAccount.private_key_id = process.env.private_key_id;
    serviceAccount.private_key = process.env.private_key;
    serviceAccount.client_email = process.env.client_email;
    serviceAccount.client_id = process.env.client_id;
    serviceAccount.auth_uri = process.env.auth_uri;
    serviceAccount.token_uri = process.env.token_uri;
    serviceAccount.auth_provider_x509_cert_url = process.env.auth_provider_x509_cert_url;
    serviceAccount.client_x509_cert_url = process.env.client_x509_cert_url;
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kanban-9c05f.firebaseio.com"
});

const db = admin.firestore();

const usersCollection = db.collection('users');
const boardsCollection = db.collection('boards');

// logs in user
app.post('/api/login', api.login(usersCollection, bcrypt));

// registers a new user
app.post('/api/signup', api.signup(usersCollection, boardsCollection, bcrypt));

// logs out user
app.get('/api/logout', api.logout);

// checks if user is logged in and returns username
app.get('/api/isloggedin', api.isLoggedIn);

// gets all kanban boards for logged in user
app.get('/api/boards', api.boards(boardsCollection));

// updates kanban boards for logged in uesr
app.post('/api/boards', api.updateBoards(boardsCollection));

// serves production build of website
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

// 404, no matching route found
app.use((_, res) => {
    res.status(404).json("Invalid API route");
});

// route for handling errors
app.use((err, _, res) => {
    res.status(400).json(err);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});