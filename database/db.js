const Sequelize = require('sequelize');
const db = {}
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
    ,
    define: {
        freezeTableName: true
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Product = require("../models/Producto")(sequelize, Sequelize);
db.User = require("../models/Usuario")(sequelize, Sequelize);
db.Compania = require("../models/Compania")(sequelize, Sequelize);
db.Detalle_Alta = require("../models/Detalle_Alta")(sequelize, Sequelize);
db.Detalle_Baja = require("../models/Detalle_Baja")(sequelize, Sequelize);

// console.log("====db")
var company_user = sequelize.define('COMPANIA_USUARIO', {

}, {
  timestamps: false
})

db.Compania.belongsToMany(db.User, { as: 'Sellers', through: company_user, foreignKey: 'com_id', otherKey: 'usu_id'});
// db.user.belongsToMany(db.project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'});
 
module.exports = db;