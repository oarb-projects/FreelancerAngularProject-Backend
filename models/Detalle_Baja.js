module.exports = (sequelize,Sequelize) => {
        const Detalle_Baja=sequelize.define('detalle_baja',
        {
            det_baja_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },        
            com_id: {
                type: Sequelize.INTEGER
            },
            usu_id: {
                type: Sequelize.INTEGER
            },   
        },
        {
            timestamps:true,
            createdAt: 'fecha',
            updatedAt: false,
            tableName: 'DETALLE_BAJA'
        })
        return Detalle_Baja;
    }