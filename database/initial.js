var mysql      = require('mysql');
const dbConfig = require("../config/db.config.js");

const dbName = process.env.DB_SCHEMAS ||dbConfig.DB;
let newConfig={
    host: process.env.DB_HOST ||dbConfig.HOST,
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER ||dbConfig.USER,
    password: process.env.DB_PASSWORD ||dbConfig.PASSWORD
}
let dbQuery=`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`

var connection = mysql.createConnection(newConfig);
connection.connect();
connection.query(dbQuery, function (error, results, fields) {
    if (error) console.log(error);
    else{
        console.info("Database create or successfully checked");
    }
});
connection.end();

const db = require('../database/db.js');
db.Product = require("../models/Producto")
db.User = require("../models/Usuario")

db.sequelize.sync() .then(() => {
  console.info("Tables created or successfully checked");
}).catch((err)=>{
  console.log("===err")
  console.log(err)
});

