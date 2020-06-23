module.exports = (sequelize,Sequelize) => {
        const Detalle_Alta_Propiedad=sequelize.define('detalle_baja_propiedad',
        {
            det_baja_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },        
            com_id: {
                type: Sequelize.INTEGER
            },
            prop_id: {
                type: Sequelize.INTEGER
            },   
        },
        {
            timestamps:true,
            createdAt: 'fecha',
            updatedAt: false,
            tableName: 'Detalle_Baja_Propiedad'
        })
        return Detalle_Alta_Propiedad;
    }