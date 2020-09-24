const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('AuthDB', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

const AuthAdmins = sequelize.define('AuthAdmins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.INTEGER
    },
})

module.exports = AuthAdmins;