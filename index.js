const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const serviceAccount = require('./service-account.json');

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
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
});

// registers a new user
app.post('/api/signup', async (req, res) => {
    console.log('start signup route');
    let { username, password } = req.body;

    if (!username || !password) {
        console.log('empty username/password during signup');
        return res.send('invalid signup credentials');
    }
    else {
        username = username.trim();
        try {
            const existingUser = await usersCollection.where('username', '==', username).get();
            const usernameExists = existingUser.docs.some(doc => doc.data().username === username);
            console.log('usernameExists', usernameExists);

            if (usernameExists) {
                return res.send('username exists');
            }
            else {
                console.log('signing up user');
                bcrypt.hash(password, 10, async (err, hash) => {
                    console.log('finished hashing');
                    console.log(err, hash);
                    if (err) {
                        console.log(`Error hashing: ${err}`);
                        return res.send('error hashing password');
                    }
                    else {
                        try {
                            await usersCollection.add({ username: username, password: hash });
                            req.session.user = username;
                            console.log('successfully signed up user');
                            return res.send('signed up user');
                        }
                        catch(err) {
                            console.log(`Error adding user: ${err}`);
                            return res.send('error signing up user');
                        }
                    }
                });
            }
        }
        catch(err) {
            console.log(`Error querying existing users: ${err}`);
            return res.send('error querying existing users');
        }
    }
});

// logs out user
app.get('/api/logout', (req, res) => {

});

// checks if user is logged in and returns username
app.get('/api/isloggedin', (req, res) => {

});

// 404, no matching route found
app.use((_, res) => {
    res.status(404).send("Invalid API route");
});

// route for handling errors
app.use((err, _, res) => {
    res.status(400).send(err);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});