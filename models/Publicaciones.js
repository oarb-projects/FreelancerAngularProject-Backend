module.exports = (sequelize,Sequelize) => {
    const Publicacion=sequelize.define('propiedad',
    {
        id_publicacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        usu_id: {
            type: Sequelize.INTEGER
        },
        prop_id: {
            type: Sequelize.INTEGER
        },
        identificador:{
            type: Sequelize.STRING
        },  
        pub_activo: {
            type: Sequelize.INTEGER
        }      
    },
        {
            timestamps:true,
            createdAt: 'fecha',
            updatedAt: false,
            tableName: 'PUBLICACIONES'
        }
    )
    return Publicacion;
}