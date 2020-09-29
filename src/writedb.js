const { createUser } = require('./controller/controller.credential');
const CryptoJS = require('crypto-js');

createUser({
    username: 'admin',
    password: CryptoJS.SHA256('admin').toString()
})