const express = require('express');
const { cypherKey } = require('../auth/auth')
const { writeData, verifyAPIKey, getUserData, refreshUserCount } = require('../controller/controller.client')

const router = express.Router()

function createUser(req, res) {
    const {username, permission, count }= req.body;
    const apiKey = cypherKey(username);
    const data = {apikey: apiKey, permission, count};
    writeData(data);
    res.send(`API Key created - ${apiKey}`);
}

async function protectedRoute_1 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getUserData(auth);
    if(permission != 1) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshUserCount(count, auth);
    res.send('Authenticated')
}

async function protectedRoute_2 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getUserData(auth);
    if (permission != 2) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshUserCount(count, auth);
    res.send('Authenticated')
}

async function protectedRoute_3 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getUserData(auth);
    if(permission != 3) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshUserCount(count, auth);
    res.send('Authenticated')
}

router.post('/create/key', createUser);
router.get('/1', protectedRoute_1);
router.get('/2', protectedRoute_2);
router.get('/3', protectedRoute_3);

//router.use

module.exports = router;