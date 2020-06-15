module.exports = (sequelize,Sequelize) => {
    const Detalle_Alta=sequelize.define('detalle_alta',
    {
        det_alt_id: {
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
        tableName: 'DETALLE_ALTA'
    })
    return Detalle_Alta;
}