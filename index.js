const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 404, no matching route found
app.use((req, res) => {
    res.status(404).send("Invalid API route");
});

// route for handling errors
app.use((err, req, res) => {
    res.status(400).send(err);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});