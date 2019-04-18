const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kanban-9c05f.firebaseio.com"
});

const db = admin.firestore();

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