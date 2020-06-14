const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
    'producto',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        precio: {
            // type: Sequelize.NUMBER
            type: Sequelize.FLOAT
        },
        imagen: {
            type: Sequelize.STRING
        },
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)