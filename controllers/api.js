const login = (usersCollection, bcrypt) => async (req, res) => {
    const { username, password, rememberMe } = req.body;
    if (!username || !password) {
        console.log('empty username/password during login');
        return res.status(400).json('Invalid login credentials. Try again.');
    }
    else {
        try {
            const userDoc = await usersCollection.where('username', '==', username).get();
            const user = userDoc.docs.map(doc => doc.data());

            if (user.length === 0) {
                return res.status(200).json('No users matching username found.');
            }
            else {
                bcrypt.compare(password, user[0].password, function (err, match) {
                    if (err) {
                        console.log('Error comparing password hashes: ', err);
                        return res.status(200).json('Internal server error, please try again.');
                    }

                    // match === true if hash matches
                    if (match) {
                        req.session.rememberMe = rememberMe;
                        req.session.user = user[0].username;
                        if (!rememberMe) {
                            req.session.cookie.expires = false;
                        }
                        return res.status(200).json('Successfully logged in!');
                    } else {
                        return res.status(200).json('Incorrect username or password.');
                    }
                });
            }
        }
        catch (err) {
            console.log(`Error querying users: ${err}`);
            return res.json('Internal server error, please try again.');
        }
    }
};

const signup = (usersCollection, bcrypt) => async (req, res) => {
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

            if (usernameExists) {
                return res.status(400).json('Username already exists. Choose a different username.');
            }
            else {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) {
                        console.log(`Error hashing: ${err}`);
                        return res.status(500).json('Internal server error, please try again.');
                    }
                    else {
                        try {
                            await usersCollection.add({ username: username, password: hash });
                            req.session.user = username;
                            req.session.rememberMe = true;
                            return res.status(200).json('Successfully signed up!');
                        }
                        catch (err) {
                            console.log(`Error adding user: ${err}`);
                            return res.status(500).json('Internal server error, please try again.');
                        }
                    }
                });
            }
        }
        catch (err) {
            console.log(`Error querying existing users: ${err}`);
            return res.json('Internal server error, please try again.');
        }
    }
};

const logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log('Error logging out: ', err);
            res.status(500).json('Error logging out, try again.');
        } else {
            res.status(200).json('success');
        }
    });
};

const isLoggedIn = (req, res) => {
    if (req.session.rememberMe === false && req.session.user) {
        req.session.cookie.expires = false;
        res.status(200).json(req.session.user);
    }
    else if (req.session.rememberMe && req.session.user) {
        res.status(200).json(req.session.user);
    }
    else {
        res.status(200).json('not logged in');
    }
};

module.exports = { login, signup, logout, isLoggedIn }