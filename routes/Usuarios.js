const express = require('express');
const usuarios = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Usuario = require("../models/Usuario");
usuarios.use(cors());

process.env.SECRET_KEY = 'secret';

//REGISTRO
usuarios.post('/register', (req, res) => {
    const today = new Date();
    const usuarioData = {
        usu_nombre: req.body.correo,
        usu_apellido: req.body.apellido,
        usu_correo: req.body.correo,
        usu_password: req.body.password,
        /*usu_fecha_nacimiento,
        usu_telefono_personal,
        usu_telefono_oficina,
        usu_pagina_web,
        usu_id_rol,
        usu_activo*/
    }

    Usuario.findOne({        
        where: {
            usu_correo: req.body.correo
        }
    }).then(usuario => {
        if (!usuario) {
            let hash = bcrypt.hashSync(usuarioData.password, 10);
            usuarioData.password = hash;
            
            Usuario.create(usuarioData)
                .then(usuario => {
                    let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.json({ token: token });
                }).catch(err => {
                    res.send('error: ' + err);
                });
        } else {
            res.json({ error: 'Usuario ya existe' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});

//LOGIN
usuarios.post('/login', (req, res) => {
    console.log(req.body);
    Usuario.findOne({
        where: {
            usu_correo: req.body.correo
        }            
    }).then(usuario => {
        if(bcrypt.compareSync(req.body.password, usuario.usu_password)) {
            let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            });
            res.json({ token: token });
        } else {
            res.send('Usuario no existe');
        }
    }).catch(err => {        
        res.send('error: ' + err);
    });    
});

//PROFILE
usuarios.get('/profile', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    Usuario.findOne({
        where: {
            id: decoded.id
        }
    }).then(usuario => {
        if(usuario) {
            res.json(usuario);
        } else {
            res.send('Usuario no existe');
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});

module.exports = usuarios