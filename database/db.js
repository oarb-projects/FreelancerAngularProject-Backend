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

// properties table generation
db.Propiedad = require("../models/Propiedad")(sequelize, Sequelize);
db.Detalle_Alta_Propiedad= require("../models/Detalle_Alta_Propiedad")(sequelize, Sequelize);
db.Detalle_Baja_Propiedad= require("../models/Detalle_Baja_Propiedad")(sequelize, Sequelize);


var company_user = sequelize.define('COMPANIA_USUARIO', {

}, {
  timestamps: false
})

var company_properties = sequelize.define('COMPANIA_PROPIEDADES', {

}, {
  timestamps: false
})

db.Compania.belongsToMany(db.User, { as: 'Sellers', through: company_user, foreignKey: 'com_id', otherKey: 'usu_id'});
db.Compania.belongsToMany(db.Propiedad, { as: 'Properties', through: company_properties, foreignKey: 'com_id', otherKey: 'prop_id'});

module.exports = db;