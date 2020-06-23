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
