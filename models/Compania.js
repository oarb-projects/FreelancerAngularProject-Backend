module.exports = (sequelize,Sequelize) => {
    const Compania=sequelize.define('compania',
    {
        com_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        com_nombre: {
            type: Sequelize.STRING
        },
        com_activo:{
            type: Sequelize.INTEGER,
        }       
    },
    {
        timestamps:false,
        tableName: 'COMPANIA'
    })
    return Compania;
}