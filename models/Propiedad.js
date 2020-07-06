module.exports = (sequelize,Sequelize) => {
    const Propiedad=sequelize.define('propiedad',{
        prop_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        id_tipo_propiedad: {
            type: Sequelize.INTEGER
        },
        id_tipo_negocio: {
            type: Sequelize.INTEGER
        },
        tag: {
            type: Sequelize.STRING
        },
        ubicacion: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        cantidad_recamaras: {
            type: Sequelize.INTEGER
        },
        cantidad_banos: {
            type: Sequelize.INTEGER
        },
        cantidad_pisos: {
            type: Sequelize.INTEGER
        },
        cuarto_lavado: {
            type: Sequelize.INTEGER
        },
        amueblado: {
            type: Sequelize.INTEGER
        },
        cantidad_autos: {
            type: Sequelize.INTEGER
        },
        dimensiones: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        aire: {
            type: Sequelize.INTEGER
        },
        referencias: {
            type: Sequelize.STRING
        },
        jardín: {
            type: Sequelize.INTEGER
        },
        nueva: {
            type: Sequelize.INTEGER
        },
        atributos: {
            type: Sequelize.STRING
        },
        prop_activo: {
            type: Sequelize.INTEGER
        }     
    },
    {
        timestamps: false,
        tableName: 'PROPIEDADES'
    })
    return Propiedad;
}
