const { create } = require('../model/model.credentials');
const AuthAdmins = require('../model/model.credentials');

const createUser = async (data) => {
    await AuthAdmins.create(data);
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
    verifyUser,
}
