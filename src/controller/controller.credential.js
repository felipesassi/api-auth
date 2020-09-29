const AuthAdmins = require('../model/model.credentials');
const { unsubscribe } = require('../router/router');

const createUser = async (data) => {
    await AuthAdmins.create(data);
}

const userExists = async (data) => {
    const { username } = data;

    const user = await AuthAdmins.findAll({
        where: {
            username
        }
    })

    if (user.length != 0) {
        return false;
    }
    else {
        return true;
    }
}

const verifyUser = async (data) => {

    const { username, password } = data;

    const user = await AuthAdmins.findAll({
        where: {
            username,
            password
        }
    })
    if (user.length != 0){
        return true;
    }
    else {
        return false
    }
}


module.exports = {
    createUser,
    userExists,
    verifyUser,
}
