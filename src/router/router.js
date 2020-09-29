const express = require('express');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { cypherKey } = require('../auth/auth');
const { writeClientData, verifyAPIKey, clientExists, getClientData, refreshClientCount } = require('../controller/controller.client');
const { createUser, userExists, verifyUser } = require('../controller/controller.credential');

const router = express.Router()

async function loginApplication(req, res) {
    const { username } = req.body;
    const userInfo = {
        'username': req.body.username,
        'password': CryptoJS.SHA256(req.body.password).toString()
    }
    if (await verifyUser(userInfo)) {
        const token = jwt.sign({ username }, 'NIA', {
            expiresIn: '24h'
        })
        res.json({'token': token});
    }
    else {
        res.status(401).send('Invalid username or password')
    }
}   

function createNewUser(req, res) {
    const auth = req.headers.auth;
    if (!auth) { return res.status(401).send('Invalid JWT') }
    try{
        jwt.verify(auth, 'NIA');
    }
    catch (error) {
        console.log(error);
        res.status(401).send('Invalid JWT')
        return;
    }
    const userInfo = {
        'username': req.body.username,
        'password': CryptoJS.SHA256(req.body.password).toString()
    }
    if (userExists(req.body.username)){return res.status(401).send('Username already exists.')}
    createUser(userInfo);
    const { username } = req.body;
    const token = jwt.sign({ username }, 'NIA', {
        expiresIn: '1h'
    })
    res.json({'message': 'User created', 'token': token});
}

function createNewClient(req, res) {
    const { username, permission, count, maxCount }= req.body;
    const auth = req.headers.auth;
    if (!auth) { return res.status(401).send('Invalid JWT') }
    try{
        jwt.verify(auth, 'NIA');
    }
    catch (error) {
        console.log(error);
        res.status(401).send('Invalid JWT')
        return;
    }

    const apiKey = cypherKey(username);
    const data = {apikey: apiKey, permission, count, maxCount};
    writeClientData(data);
    res.send(`API Key created - ${apiKey}`);
}

async function protectedRoute_1 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getClientData(auth);
    if(permission != 1) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshClientCount(count, auth);
    res.send('Authenticated')
}

async function protectedRoute_2 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getClientData(auth);
    if (permission != 2) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshClientCount(count, auth);
    res.send('Authenticated')
}

async function protectedRoute_3 (req, res) {
    const auth = req.headers.auth;
    if (!auth) {return res.status(405).send('Application needs API key.')}
    const trueKey = await verifyAPIKey(auth);
    if (!trueKey) {return res.status(405).send('Invalid API key.')}
    let { permission, count } = await getClientData(auth);
    if(permission != 3) {return res.status(405).send('You need credentials.')}
    count = count + 1;
    refreshClientCount(count, auth);
    res.send('Authenticated')
}

router.post('/login', loginApplication);
router.post('/create/user', createNewUser);
router.post('/create/client', createNewClient);
router.get('/1', protectedRoute_1);
router.get('/2', protectedRoute_2);
router.get('/3', protectedRoute_3);

module.exports = router;