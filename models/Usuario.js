module.exports = (sequelize,Sequelize) => {
    const Usuario=sequelize.define('usuario',{
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
        usu_correo_valido: {
            type: Sequelize.INTEGER
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
        timestamps:false,
        tableName: 'USUARIO'
    })
return Usuario
}