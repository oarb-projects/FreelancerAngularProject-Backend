const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
    'usuario',
    {
        usu_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        usu_nombre: {
            type: Sequelize.STRING
        },
        usu_apellido: {
            type: Sequelize.STRING
        },
        usu_correo: {
            type: Sequelize.STRING
        },
        usu_password: {
            type: Sequelize.STRING
        },
        usu_fecha_nacimiento: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        usu_telefono_personal: {
            type: Sequelize.STRING
        },
        usu_telefono_oficina: {
            type: Sequelize.STRING
        },
        usu_pagina_web: {
            type: Sequelize.STRING
        },
        usu_id_rol: {
            type: Sequelize.INTEGER
        },
        usu_activo: {
            type: Sequelize.INTEGER
        }        
    },
    {
        timestamps: false
    }, 
    {
        tableName: 'USUARIO'
    }
)