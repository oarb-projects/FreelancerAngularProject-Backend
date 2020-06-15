const express = require('express');
const usuarios = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const Usuario = require("../models/Usuario");
const db = require('../database/db.js');
// const Compania = db.Compania ;
const Usuario = db.User;
const Compania=db.Compania;
// Detalle_Alta



usuarios.use(cors());

process.env.SECRET_KEY = 'secret';

// Oscar Rosete Deliverable
usuarios.get('/vendedores/:company_id', (req, res) => {
    console.log(req.params.company_id)
    Compania.findAll({
        where: {
            com_id:req.params.company_id
        },    
        include: [{
          model: Usuario,
          as: 'Sellers',
          where:{
              usu_activo:1
          }
        }]
      }).then( loc => {
        res.json(loc[0].Sellers)
    })
})

usuarios.post('/vendedores/:company_id', (req, res) => {
    const usuarioData = {
        usu_nombre: req.body.nombre,
        usu_apellido: req.body.apellido,
        usu_correo: req.body.correo,
        usu_password: req.body.password,
        usu_telefono_personal: req.body.telefonoPersonal,
        usu_telefono_oficina: req.body.telefonoOficina,
        usu_pagina_web: req.body.paginaWeb,
        usu_id_rol: 1,
        usu_activo: 1
    }

    Usuario.findOne({        
        where: {
            usu_correo: req.body.correo
        }
    }).then(usuario => {
        if (!usuario) {
            let hash = bcrypt.hashSync(usuarioData.usu_password, 10);
            usuarioData.usu_password = hash;
            console.log("======post request")
            console.log(req.params.company_id)
            Compania.findAll({
                where: {
                    com_id:req.params.company_id
                }
            }).then( company => {
                Usuario.create(usuarioData).then(usuario => {
                    // console.log(usuario)
                    company[0].addSellers([usuario]).then(associatedTasks => {
                        // you will get an empty array
                        // res.json(associatedTasks)
                        res.json(associatedTasks)
                    }).catch(err=>{
                        console.log("eror set sellers")
                    })
                    
                }).catch(err => {
                    console.log("hubo error en creacion")
                    console.log(err)
                    res.send('error: ' + err);
                });
            })
        }
        else{
            res.json({error:"existent user"})
        }
    })
    .catch(err => {
        res.json({error:"db error"})
    });
})

usuarios.delete('/profile/:user_id',(req,res)=>{
    console.log("delete route")
    Usuario.findOne({
        where:{
            usu_id:req.params.user_id
        }
    }).then((user)=>{
        // console.log(req.params.user_id)
        // console.log(req.body)
        user.update({
            usu_activo:0
        }).then((user)=>{
            res.json(user)
        })
    }).catch(()=>{
        res.send("something went wrong")
    })

})


//REGISTRO
usuarios.post('/register', (req, res) => {
    const today = new Date();
    const usuarioData = {
        usu_nombre: req.body.nombre,
        usu_apellido: req.body.apellido,
        usu_correo: req.body.correo,
        usu_password: req.body.password,
        usu_telefono_personal: req.body.telefonoPersonal,
        usu_telefono_oficina: req.body.telefonoOficina,
        usu_pagina_web: req.body.paginaWeb,
        usu_id_rol: 1,
        usu_activo: 1
        //nombreCompania: registerFormValue.nombreCompania,        
    }

    Usuario.findOne({        
        where: {
            usu_correo: req.body.correo
        }
    }).then(usuario => {
        if (!usuario) {
            let hash = bcrypt.hashSync(usuarioData.usu_password, 10);
            usuarioData.usu_password = hash;
            
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
            usu_id: decoded.usu_id
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