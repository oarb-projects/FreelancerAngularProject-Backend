const db = require('../database/db.js');
const Property = db.Propiedad;
const PublishedProperties = db.Publicaciones;
const Compania = db.Compania ;
const Usuario = db.User;

exports.getPropertiesPublished =  (req, res) => {
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
        }],
        // raw:true
    }).then(async (company) => {
        console.log("==found the company")
        console.log(company.com_nombre)

        console.log("======propiedades en la compania")
        let convertedCompany=company.toJSON()
        let properties=convertedCompany.Properties
        console.log(properties)

        console.log("======propiedades publicadas en general")
        let publishedCompanies=await PublishedProperties.findAll({where:{ pub_activo:1},raw:true})
        console.log(publishedCompanies)

        
        console.log("======propiedades publicadas en la compania")
        properties.forEach((property,index,arr) => {
            console.log(property.prop_id)
            let presente=publishedCompanies.some(r=> r.prop_id===property.prop_id)
            console.log(`la propiedad ${property.prop_id} esta incluida ${presente}`)
            if(presente){
                arr[index].status="Publicada"
            }
            else{
                arr[index].status="Sin Publicar"
            }
        });
        console.log(properties)
        res.status(200).json(properties)
    }).catch((err)=>{
        res.status(403).json({
            err:err
        })
    })
}

exports.getSellers=(req,res)=>{
    console.log("===start")
    let encoded=req.params.company_id
    console.log(encoded)
    let decodedObject=JSON.parse(decodeURI(encoded))
    // console.log(req.body)
    console.log(decodedObject)
    // res.send("ok")
    Compania.findOne({
        where: {
            com_id:decodedObject.companyId
        },    
        include: [{
          model: Usuario,
          as: 'Sellers',
          where:{
              usu_activo:1,
          }
        }]
      }).then( async(company) => {
        console.log("======publicaciones de la propiedad en cuestion")
        let publications=await PublishedProperties.findAll({where:{prop_id:decodedObject.propId, pub_activo:1},raw:true})
        console.log(publications)

        console.log("======usuarios en la compania")
        let convertedCompany=company.toJSON()
        let sellers=convertedCompany.Sellers
        console.log(sellers)

        console.log("======usuarios con publicaciones en la compania de esa propiedad")
        sellers.forEach((seller,index,arr) => {
            console.log(seller.usu_id)
            let presente=publications.some(r=> r.usu_id===seller.usu_id)
            console.log(`el usuario ${seller.usu_id} esta incluida ${presente}`)
            if(presente){
                arr[index].status="Publicada"
            }
            else{
                arr[index].status="Sin Publicar"
            }
            arr[index].photo="https://i.pravatar.cc/300"
        });
        res.json(sellers)
    })
}


exports.publish=async (req,res)=>{
    console.log("publishing")
    let sellers=req.body.sellers
    // console.log(sellers)
    let tipo_negocio=['','venta','renta'];
    console.log("======publicaciones de la propiedad en cuestion")
    let publications=await PublishedProperties.findAll({where:{prop_id:req.body.propId},raw:true})
    // console.log(publications)

    sellers.forEach(async seller => {
        let usu_id=Number(seller.code)
        // console.log(seller)
        let presente=publications.some(r=> r.usu_id===usu_id)
        let location=publications.findIndex(r=> r.usu_id===usu_id)
        let activo;
        if(location>-1){
            activo=publications[location].pub_activo
        }else{
            activo=0;
        }
        console.log(`el usuario ${usu_id} esta seleccionado ${seller.checked} cuenta con publicaciones en la propiedad ${presente} activo ${activo}`)
        if(seller.checked){
            if(!presente){
                let actualPropertyInfo=await Property.findOne({where: {prop_id:req.body.propId}})
                let identificador=actualPropertyInfo.ubicacion +" - "+tipo_negocio[actualPropertyInfo.id_tipo_negocio]
                console.log(identificador)
                // Villas del Palmar - Venta
                console.log(`el usuario ${usu_id} se publico`)
                let publicacion={
                    usu_id,
                    prop_id:req.body.propId,
                    identificador,
                    pub_activo:1
                }
                console.log(publicacion)
                await PublishedProperties.create(publicacion)
                // PublishedProperties.create(publicacion).then((publishedProperty)=>res.json(publishedProperty))
            }
            else{
                console.log(`el estado de la publicacion del usuario para la propiedad es ${activo}`)
                console.log(`reactivando publicacion`)
                let idToModify=publications[location].id_publicacion
                let publicationToUpdate=await PublishedProperties.findOne({where:{id_publicacion:idToModify}})
                // console.log(publicationToUpdate)
                await publicationToUpdate.update({
                    pub_activo:1})
                // }).then(modifiedPublication=>res.json(modifiedPublication))
            }
        }
        else{
            if(presente && activo){
                console.log(`el usuario ${usu_id} se desactivo`)
                let location=publications.findIndex(r=> r.usu_id===usu_id)
                let idToModify=publications[location].id_publicacion
                let publicationToUpdate=await PublishedProperties.findOne({where:{id_publicacion:idToModify}})
                // console.log(publicationToUpdate)
                await publicationToUpdate.update({
                    pub_activo:0
                })
            }
        }
    }); 
    // res.send("ok")
    res.json({succes:"it seems"})
}