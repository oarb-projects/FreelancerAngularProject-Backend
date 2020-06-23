const db = require('../database/db.js');
const Property = db.Propiedad;
const Compania = db.Compania ;
const Detalle_Alta_Propiedad=db.Detalle_Alta_Propiedad;
const Detalle_Baja_Propiedad=db.Detalle_Baja_Propiedad;

let AstraZeneca={
    com_nombre: "AstraZeneca",
    com_activo: 2
}

let house={
    id_tipo_propiedad: 1,
    id_tipo_negocio: 2,
    tag: "etiqueta",
    ubicacion: "la primer ubicacion",
    direccion: "rio culiacan 27 cuahtemoc",
    descripcion: "la descripcion es la siguiente",
    cantidad_recamaras:2,
    cantidad_banos: 1,
    cantidad_pisos:2,
    cuarto_lavado: 1,
    amueblado: 1,
    cantidad_autos: 2,
    Dimensiones: "130 m2 construidos",
    Precio:300.20,
    aire: 0,
    referencias: "enfrente del parque cricri",
    Jardín: 0,
    Nueva: 1,
    Atributos: "atributo especial",
    prop_activo:1
}
    
exports.initProperties = (req, res) => {
    Property.create(house).then((createdProperty)=>{
        console.log("=====property")
        console.log(createdProperty)
        Compania.create(AstraZeneca).then((AstraZeneca)=>{
            AstraZeneca.addProperties([createdProperty]).then(associatedProperty => {
                console.log(associatedProperty[0])
                // console.log(associatedProperty[0].dataValues)
                let detail={
                    com_id:associatedProperty[0].com_id,
                    prop_id:associatedProperty[0].prop_id
                }
                console.log(detail)
                Detalle_Alta_Propiedad.create(detail).then((createdDetail)=>{
                    res.json({
                        detail:createdDetail,
                        associatedProperty
                    })
                })
            })
        })
    })
}

exports.addPropertyToCompany=(req,res)=>{
    Compania.findOne({
        where: {
            com_id:req.params.company_id
        }
    }).then( company => {
        console.log("==found the company")
        console.log(company.com_nombre)
        let property=req.body
        console.log("==adding the company")
        console.log(property.descripcion)
        Property.create(property).then((createdProperty)=>{
            company.addProperties([createdProperty]).then(associatedProperty => {
                console.log(associatedProperty[0])
                let detail={
                    com_id:associatedProperty[0].com_id,
                    prop_id:associatedProperty[0].prop_id
                }
                console.log(detail)
                Detalle_Alta_Propiedad.create(detail).then((createdDetail)=>{
                    res.status(200).json({
                        detail:createdDetail,
                        associatedProperty
                    })
                })
            })
        }).catch((err)=>{
            res.status(403).json({
                err:err
            })
        })
    })
}

exports.getPropertyById=(req,res)=>{
    Property.findOne({
        where: {
            prop_id:req.params.propiedad_id
        }
    }).then( property => {
        if (property) {
            res.json(property);
        }      
        else{
            res.json({
                propiedad:"no existe"
            })
        }
    }).catch((err)=>{
        res.json({
            error:err
        })
    })
}

exports.getAllProperties=(req,res)=>{
    Compania.findOne({
        where: {
            com_id:req.params.company_id
        },
        include: [{
            model: Property,
            as: 'Properties',
            where:{
                prop_activo:1
            }
        }]
    }).then( company => {
        console.log("==found the company")
        console.log(company.com_nombre)
        res.status(200).json(company.Properties)
    })
}

exports.editProperty=(req,res)=>{
    Property.findOne({
        where: {
            prop_id:req.params.propiedad_id
        }
    }).then( property => {
        if (property) {
            console.log("===found the property")
            console.log( property.descripcion)
            let receivedProperty=req.body
            property.update(receivedProperty).then((modifiedProperty)=>{
                res.json(modifiedProperty)
            })
        }
        else{
            res.json({
                propiedad:"no existe"
            })
        }
    })
}

exports.deleteProperty=(req,res)=>{
    Property.findOne({
        where: {
            prop_id:req.params.propiedad_id
        }
    }).then( property => {
        if (property) {
            console.log("===found the property")
            console.log( property.descripcion)
            console.log( property.prop_activo)
            if(property.prop_activo){
                property.update({
                    prop_activo:0
                }).then((modifiedProperty)=>{
                    let detail={
                        com_id: Number(req.body.companyId),
                        prop_id:req.body.propId
                    }
                    console.log(detail)
                    Detalle_Baja_Propiedad.create(detail).then((createdDetail)=>{ 
                        res.json({
                            detail:createdDetail,
                            modifiedProperty
                        })
                    })
                })
            }
            else{
                res.json({
                    propiedad:"ya dada de baja"
                })
            }

        }
        else{
            res.json({
                propiedad:"no existe"
            })
        }
    }).catch((err)=>{
        res.json({
            error:err
        })
    })
}


// ARC

// route /propiedades/:company_id
// get all after running http://localhost:4000/seedProperty
// http://localhost:4000/usuarios/propiedades/1

// POST http://localhost:4000/usuarios/propiedad/1
if(false){
    let obj={
        "id_tipo_propiedad": 1,
        "id_tipo_negocio": 2,
        "tag": "etiqueta",
        "ubicacion": "la nueva ubicacion",
        "direccion": "rio culiacan 27 cuahtemoc",
        "descripcion": "la nueva descripcion es la siguiente",
        "cantidad_recamaras": 2,
        "cantidad_banos": 1,
        "cantidad_pisos": 2,
        "cuarto_lavado": 1,
        "amueblado": 1,
        "cantidad_autos": 2,
        "dimensiones": "130 m2 construidos",
        "precio": 300.2,
        "aire": 0,
        "referencias": "enfrente del parque cricri",
        "jardín": 0,
        "nueva": 1,
        "atributos": "atributo especial",
        "prop_activo": 1
      }
}

// route http://localhost:4000/usuarios/propiedad/:propiedad_id
// PUT http://localhost:4000/usuarios/propiedad/1
if(false){
    let obj={
        "id_tipo_propiedad": 100,
        "id_tipo_negocio": 101,
        "tag": "etiqueta",
        "ubicacion": "la ubicacion cambiada",
        "direccion": "rio culiacan 27 cuahtemoc",
        "descripcion": "la nueva descripcion es la siguiente",
        "cantidad_recamaras": 102,
        "cantidad_banos": 103,
        "cantidad_pisos": 104,
        "cuarto_lavado": 105,
        "amueblado": 106,
        "cantidad_autos": 107,
        "dimensiones": "130 m2 construidos",
        "precio": 108.1,
        "aire": 109,
        "referencias": "enfrente del parque cricri",
        "jardín": 110,
        "nueva": 111,
        "atributos": "atributo especial",
        "prop_activo": 112
      }
}
// PUT http://localhost:4000/usuarios/propiedad/100
// la propiedad no existe


// route http://localhost:4000/usuarios/propiedad/:propiedad_id
// DELETE http://localhost:4000/usuarios/propiedad/1
if(false){
    let obj={
        "companyId":1,
        "propId":1
      }
}

// route http://localhost:4000/usuarios/propiedad/:propiedad_id
// GET http://localhost:4000/usuarios/propiedad/1
