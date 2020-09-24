const CryptoJS = require('crypto-js');
const config = require('./config')

function cypherKey(key) {
    const cypherText = CryptoJS.AES.encrypt(key, config.secret).toString()
    return cypherText;
}

function uncypherKey(key) {
    const uncypherText = CryptoJS.AES.decrypt(key, config.secret).toString(CryptoJS.enc.Utf8)
    return uncypherText;
}

module.exports = {
    cypherKey, 
    uncypherKey
}
