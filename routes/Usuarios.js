const express = require('express');
const usuarios = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// acquiring sequelize models
// const Usuario = require("../models/Usuario");
const db = require('../database/db.js');
const Usuario = db.User;
const Compania=db.Compania;
const Detalle_Alta=db.Detalle_Alta;
const Detalle_Baja=db.Detalle_Baja;
const Property = db.Propiedad;
const properties=require("../controller/properties.controller")

//Oscar Rosete Deliverable 3 BEGINS
const {htmlContent2} =require("../helpers/Email/clienteInmuebles")
const {sendEmail} =require("../helpers/Email/sendEmail")

usuarios.use(cors());

process.env.SECRET_KEY = 'secret';

//Oscar Rosete Deliverable 3 BEGINS
const smtpClient = {
    host: process.env.SMTPHOST,
    port: 465,
    auth: {
      user: process.env.SMTPUSER,
      pass:  process.env.SMTPPASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
};    
sendMail=(newUser,req,res,created)=>{
    console.log("==========sending email")
    const vendedorEmail="oscaralonso11@hotmail.com"
    let base_url=newUser.webpage;
    const confirmUrL=base_url+"/usuarios/verificar_correo"
    console.log(smtpClient)

    console.log("====enviado a ")
    console.log(newUser.email)
    const clienteEmail=newUser.email

    // for trials
    // const clienteEmail="oscar.rosete@cetys.mx"
    //=============correo al vendedor
    console.log(req.body)
    const emailContent={
        name:newUser.names+" "+newUser.lastNames,
        email:newUser.email,
        query:confirmUrL+"?correo="+clienteEmail
        // +"&id="+clienteEmail
    }
    //======correo al cliente
    const content2=htmlContent2(emailContent);
    let emailInfo2={
        to:clienteEmail,
        subject:"Registro Inmuebles 82",
        htmlContent:content2,
         attachments: [{
            filename: 'logo.png',
            path:"./public/images/logo.png",
            cid: 'logo', //same cid value as in the html img src
         }],   
        smtpClient,
    }
    const isSend2 = sendEmail(emailInfo2);


    if( !isSend2){
        console.log("it was not sent")
        // res.status(400).send({ error: "server error" });
    }else{
        let json;
        if(created)
            json={created:true,status:"success",confirmed:false}
        else{
            json={created:false,status:"success",confirmed:false}
        }
        console.log("it was sent")
        // res.status(200).json(json) 
    }
}
usuarios.get('/verificar_correo', (req, res) => {
    let frontendUrl='http://localhost:4200/'
    console.log(req.query);
    Usuario.findOne({        
        where: {
            usu_correo: req.query.correo
        },
    }).then(usuario => {
        if (usuario) {
            let userToModify={
                ...usuario.toJSON(),
                usu_correo_valido:1
            }
            usuario.update(userToModify).then((modifiedUser)=>{
                console.log(modifiedUser)
                res.redirect(frontendUrl+'login');
            })
        } else {
            res.json({ error: 'Usuario no existe' });
        }
    })
})
usuarios.get('/resend/:email', (req, res) => {
    console.log(req.params.email)
    Usuario.findOne({        
        where: {
            usu_correo: req.params.email
        },
    }).then(usuario => {
        if (usuario) {
            // console.log(usuario)
            let newUser={
                userName:usuario.usu_nombre,
                names:usuario.usu_nombre,
                lastNames:usuario.usu_apellido,
                role:"superAdmin",
                email:usuario.usu_correo,
                password:usuario.usu_password,
                confirmedEmail:"false",
                webpage:"http://localhost:4000"
            }
            sendMail(newUser,req,res,true);
            console.log(newUser)
            res.status(200).json({
                status:"Email sent"
            })
        } else {
            res.json({ error: 'Usuario no existe' });
        }
    })
})
//Oscar Rosete Deliverable 3 ENDS

// Oscar Rosete Deliverable BEGINS
//Get All Sellers
usuarios.get('/vendedores/:company_id', (req, res) => {
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
            Compania.findAll({
                where: {
                    com_id:req.params.company_id
                }
            }).then( company => {
                Usuario.create(usuarioData).then(usuario => {
                    company[0].addSellers([usuario]).then(associatedTasks => {
                        let detail={
                            com_id:associatedTasks[0].com_id,
                            usu_id:associatedTasks[0].usu_id
                        }
                        Detalle_Alta.create(detail).then((createdDetail)=>{
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
    Usuario.findOne({
        where:{
            usu_id:req.params.user_id
        }
    }).then((user)=>{
        user.update({
            usu_activo:0
        }).then((user)=>{
            let detail={
                com_id: Number(req.body.company),
                usu_id:req.body.userId
            }
            Detalle_Baja.create(detail).then((createdDetail)=>{ 
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
            res.json(usuario);
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

// Oscar Rosete Deliverable 2 BEGINS
//Get All Properties
usuarios.get('/propiedades/:company_id',properties.getAllProperties) 
//Generate Property
usuarios.post('/propiedades/:company_id',properties.addPropertyToCompany)
//Get Property Info
usuarios.get('/propiedad/:propiedad_id', properties.getPropertyById)
//Edit Property
usuarios.put('/propiedad/:propiedad_id',properties.editProperty)
//Delete Property
usuarios.delete('/propiedad/:propiedad_id',properties.deleteProperty)
// Oscar Rosete Deliverable 2 ENDS

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
        usu_activo: 1,
        usu_correo_valido: 0
        //nombreCompania: registerFormValue.nombreCompania,        
    }

    let newUser={
        userName:usuarioData.usu_nombre,
        names:usuarioData.usu_nombre,
        lastNames:usuarioData.usu_apellido,
        role:"superAdmin",
        email:usuarioData.usu_correo,
        password:usuarioData.usu_password,
        confirmedEmail:"false",
        webpage:"http://localhost:4000"
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
                    // res.send("ok")
                    sendMail(newUser,req,res,true);
                    console.log(usuarioData)
                
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
        if(usuario){
            if(bcrypt.compareSync(req.body.password, usuario.usu_password)) {
                let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                if(usuario.usu_correo_valido){
                    console.log("datos correctos")
                    console.log(token)
                    res.json({ token: token });
                }
                else{
                    console.log(usuario.usu_correo_valido)
                    res.status(403).send({code:1,error:"Correo no validado"});
                }
            } else {
                res.status(403).send({code:2,error:"datos incorrectos"});
            }
        }
        else{
            res.status(403).send({code:3,error:"Usuario no existente"});
        }
    }).catch(err => {        
        res.send({error:err});
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