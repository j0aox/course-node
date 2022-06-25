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

User.hasMany(Address); // usuário tem vários endereços
// criando o relacionamento 
Address.belongsTo(User); // criando UserId na tabela Address, endereço pertence a um usuário

module.exports = Address;