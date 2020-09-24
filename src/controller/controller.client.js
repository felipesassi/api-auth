const AuthUsers = require('../model/model.client');

const writeClientData = async (data) => {
    await AuthUsers.create(data);
}

const verifyAPIKey = async (data) => {
    const apiKey = await AuthUsers.findAll({
        where: {
            apikey: data
        }
    })
    if (apiKey.length == 0) {
        return false;
    }
    else{
        return true;
    }    
}

const getClientData = async (data) => {
    const userData = await AuthUsers.findAll({
        where: {
            apikey: data
        }
    })
    return userData[0].dataValues;
}

const refreshClientCount = async (count, apiKey) => {
    await AuthUsers.update({count}, {
        where: {
            apikey: apiKey
        }
    })
}

module.exports = {
    writeClientData,
    verifyAPIKey,
    getClientData,
    refreshClientCount
}
