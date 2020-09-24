const express = require('express');
const router = require('./router/router');
const app = express()
app.use(express.json())
const port = 5000;

app.get('/', async (req, res) => {
    res.send('API authentication tests.');
})

app.use('/', router);

app.listen(port);