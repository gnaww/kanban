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
app.post('/api/login', async (req, res) => {
    console.log('start login route');
    const { username, password } = req.body;

    if (!username || !password) {
        console.log('empty username/password during login');
        return res.status(400).json('Invalid login credentials. Try again.');
    }
    else {
        try {
            const userDoc = await usersCollection.where('username', '==', username).get();
            const user = userDoc.docs.map(doc => doc.data());
            console.log('user', user);

            if (user.length === 0) {
                return res.status(200).json('No users matching username found.');
            }
            else {
                bcrypt.compare("B4c0/\/", user[0].password, function (err, res) {
                    if (err) {
                        console.log('Error comparing password hashes: ', err);
                        return res.status(200).json('Internal server error, please try again.');
                    }

                    // res === true if hash matches
                    if (res) {
                        req.session.user = user[0].username;
                        return res.status(200).json('Successfully logged in!');
                    } else {
                        return res.status(200).json('Incorrect username or password.');
                    }
                });
            }
        }
        catch(err) {
            console.log(`Error querying users: ${err}`);
            return res.json('Internal server error, please try again.');
        }
    }
});

// registers a new user
app.post('/api/signup', async (req, res) => {
    console.log('start signup route');
    let { username, password } = req.body;

    if (!username || !password) {
        console.log('empty username/password during signup');
        return res.status(400).json('Invalid sign up credentials. Try again.');
    }
    else {
        username = username.trim();
        try {
            const existingUser = await usersCollection.where('username', '==', username).get();
            const usernameExists = existingUser.docs.some(doc => doc.data().username === username);
            console.log('usernameExists', usernameExists);

            if (usernameExists) {
                return res.status(400).json('Username already exists. Choose a different username.');
            }
            else {
                console.log('signing up user');
                bcrypt.hash(password, 10, async (err, hash) => {
                    console.log('finished hashing');
                    if (err) {
                        console.log(`Error hashing: ${err}`);
                        return res.status(500).json('Internal server error, please try again.');
                    }
                    else {
                        try {
                            await usersCollection.add({ username: username, password: hash });
                            req.session.user = username;
                            console.log('successfully signed up user');
                            return res.status(200).json('Successfully signed up!');
                        }
                        catch(err) {
                            console.log(`Error adding user: ${err}`);
                            return res.status(500).json('Internal server error, please try again.');
                        }
                    }
                });
            }
        }
        catch(err) {
            console.log(`Error querying existing users: ${err}`);
            return res.json('Internal server error, please try again.');
        }
    }
});

// logs out user
app.get('/api/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log('Error logging out: ', err);
            res.status(500).json('Error logging out, try again.');
        } else {
            console.log('successfully logged out');
            res.status(200).json('success');
        }
    });
});

// checks if user is logged in and returns username
app.get('/api/isloggedin', (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    }
    else {
        res.status(200).json('not logged in');
    }
});

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