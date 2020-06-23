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