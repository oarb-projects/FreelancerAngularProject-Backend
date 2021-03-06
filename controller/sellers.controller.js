const db = require('../database/db.js');
const Compania = db.Compania ;
const User = db.User;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

let oscar={     
    usu_nombre: "oscar2",
    usu_apellido:"rosete",
    usu_correo: "oscar.rosete@uabc.edu.mx",
    usu_password: bcrypt.hashSync("oscar", 10),
    usu_fecha_nacimiento: "07/07/1992",
    usu_telefono_personal: "6862645073",
    usu_telefono_oficina:"6865652780",
    usu_pagina_web: "oscarrosete.com",
    usu_id_rol: 1,
    usu_activo: 1
}
let erick={     
    usu_nombre: "erick2",
    usu_apellido:"rosete",
    usu_correo: "erick.rosete@uabc.edu.mx",
    usu_password: bcrypt.hashSync("erick", 10),
    usu_fecha_nacimiento: "09/09/1995",
    usu_telefono_personal: "6862645073",
    usu_telefono_oficina:"6865652780",
    usu_pagina_web: "erickrosete.com",
    usu_id_rol: 2,
    usu_activo: 1
}
let Liz={     
    usu_nombre: "liz2",
    usu_apellido:"Ortiz",
    usu_correo: "Liz.ortiz@uabc.edu.mx",
    usu_password: bcrypt.hashSync("liz", 10),
    usu_fecha_nacimiento: "09/09/1995",
    usu_telefono_personal: "6862645073",
    usu_telefono_oficina:"6865652780",
    usu_pagina_web: "lizortiz.com",
    usu_id_rol: 2,
    usu_activo: 1
}
let Axel={     
    usu_nombre: "Axel2",
    usu_apellido:"rosete",
    usu_correo: "axel.rosete@uabc.edu.mx",
    usu_password: bcrypt.hashSync("axel", 10),
    usu_fecha_nacimiento: "09/09/1995",
    usu_telefono_personal: "6862645073",
    usu_telefono_oficina:"6865652780",
    usu_pagina_web: "axelrosete.com",
    usu_id_rol: 2,
    usu_activo: 1
}
let Ashanti={     
    usu_nombre: "Ashanti2",
    usu_apellido:"Candelario",
    usu_correo: "Ashanti.Candelario@uabc.edu.mx",
    usu_password: bcrypt.hashSync("Ashanti", 10),
    usu_fecha_nacimiento: "09/09/1995",
    usu_telefono_personal: "6862645073",
    usu_telefono_oficina:"6865652780",
    usu_pagina_web: "ashanticandelario.com",
    usu_id_rol: 2,
    usu_activo: 1
}

let AstraZeneca={
    com_nombre: "AstraZeneca",
    com_activo: 2
}


// Init data: Projects & Users
exports.init = (req, res) => {
    let usersArray=[oscar,erick,Liz,Axel,Ashanti]
    User.bulkCreate(usersArray, {returning: true}).then((createdUsers)=>{
         //(if you try to immediately return the Model after bulkCreate, the ids may all show up as 'null')
         var correos = createdUsers.map((inst)=> {
            return inst.usu_correo;
        });
        console.log(correos)
        return User.findAll({
            where:{
                usu_correo:{
                    [Op.or]:correos
                }
            }   
        });
    }).then((createdUsers)=>{
        Compania.create(AstraZeneca).then((AstraZeneca)=>{
            AstraZeneca.setSellers(createdUsers);
            res.send("OK");  
        })
    })
    .catch(function(error){
        res.json(error);
    })
}