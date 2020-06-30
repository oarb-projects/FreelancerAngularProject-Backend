const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//inicializaciones
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({ extended: false })
);

//variables globales

//sync tables
const db = require('./database/db.js');  
db.sequelize.sync() .then(() => {
    console.info("Tables created or successfully checked");
}).catch((err)=>{
    console.log("===err")
    console.log(err)
});

//rutas
app.use(require('./routes'));

const Usuarios = require('./routes/Usuarios');
app.use('/usuarios', Usuarios);

const Productos = require('./routes/Productos');
app.use('/productos', Productos);

const Publish = require('./routes/Publish.routes');
app.use('/publish', Publish);

//publicos

//inciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server inicializado en el puerto:', app.get('port'));
});