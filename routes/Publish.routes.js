const express = require('express');
const publish = express.Router();
const publishController=require("../controller/publish.controller")
const cors = require('cors');
publish.use(cors());

// Oscar Rosete Deliverable 2 BEGINS
//Get All Properties
publish.get('/properties/:company_id',publishController.getPropertiesPublished) 

publish.get('/sellers/:company_id', publishController.getSellers) 

publish.post('/properties', publishController.publish) 

//     res.send("ok")
//     // const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

//     // Usuario.findOne({
//     //     where: {
//     //         usu_id: decoded.usu_id
//     //     }
//     // }).then(usuario => {
//     //     if(usuario) {
//     //         res.json(usuario);
//     //     } else {
//     //         res.send('Usuario no existe');
//     //     }
//     // }).catch(err => {
//     //     res.send('error: ' + err);
//     // });
// });


module.exports = publish