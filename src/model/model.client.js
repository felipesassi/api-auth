const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('AuthDB', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

const AuthUsers = sequelize.define('AuthUsers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apikey: {
        type: DataTypes.STRING
    },
    permission: {
        type: DataTypes.INTEGER
    },
    count: {
        type: DataTypes.INTEGER
    },
    maxCount: {
        type: DataTypes.INTEGER
    }
})

module.exports = AuthUsers;