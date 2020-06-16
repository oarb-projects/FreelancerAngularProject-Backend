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
const Detalle_Alta=db.Detalle_Alta;
const Detalle_Baja=db.Detalle_Baja;
// Detalle_Alta



usuarios.use(cors());

process.env.SECRET_KEY = 'secret';

// Oscar Rosete Deliverable BEGINS
//Get All Sellers
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
//Generate Seller
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
                        let detail={
                            com_id:associatedTasks[0].com_id,
                            usu_id:associatedTasks[0].usu_id
                        }
                        Detalle_Alta.create(detail).then((createdDetail)=>{
                            console.log("====added to detalle alta")
                            console.log(detail)  
                            console.log(createdDetail)  
                            res.json({
                                detail:createdDetail,
                                associatedTasks:associatedTasks
                            })
                        })
                    }).catch(err=>{
                        console.log("==========eror set sellers")
                        console.log(err)
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
//Delete Seller
usuarios.delete('/profile/:user_id',(req,res)=>{
    console.log("==============delete route")
    Usuario.findOne({
        where:{
            usu_id:req.params.user_id
        }
    }).then((user)=>{
        console.log(req.params.user_id)
        console.log(req.body)
        user.update({
            usu_activo:0
        }).then((user)=>{
            // res.json(user)
            console.log("===detail object")
            let detail={
                com_id: Number(req.body.company),
                usu_id:req.body.userId
            }
            console.log(detail)
            Detalle_Baja.create(detail).then((createdDetail)=>{
                console.log("====added to detalle alta")
                console.log(detail)  
                console.log(createdDetail)  
                res.json({
                    detail:createdDetail,
                    user
                })
            })
        })
    }).catch(()=>{
        res.send("something went wrong")
    })

})
//Get Seller Info
usuarios.get('/profile/:user_id', (req, res) => {
    Usuario.findOne({        
        where: {
            usu_id: req.params.user_id
        }
    }).then(usuario => {
        if (usuario) {
            console.log(req.params.user_id);
            res.json(usuario);
            // console.log(usuario);
        }
        else{
            res.json({
                usuario:"no existe"
            })
        }
    })
})
//Edit Seller
usuarios.post('/profile/:user_id', (req, res) => {
    console.log("you are trying to modify an user");
    console.log(req.body)
    let modifiedUser=req.body;
    Usuario.findOne({        
        where: {
            usu_id: req.params.user_id
        }
    }).then(usuario => {
        if (usuario) {
            usuario.update(modifiedUser).then((user)=>{
                res.json(user)
            })
        }
        else{
            res.json({
                usuario:"no existe"
            })
        }
    })
})
// Oscar Rosete Deliverable ENDS

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