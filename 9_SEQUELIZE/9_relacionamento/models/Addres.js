const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = require("./User");

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    },
});

// criando o relacionamento 
Address.belongsTo(User); // criando UserId na tabela Address

module.exports = Address;