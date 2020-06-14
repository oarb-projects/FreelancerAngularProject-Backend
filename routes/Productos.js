const express = require('express');
const productos = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Producto = require("../models/Producto");
productos.use(cors());

//process.env.SECRET_KEY = 'secret';

//Crear producto
productos.post('/productos', (req, res) => {
    const today = new Date();
    const productoData = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen,
        fecha: today
    }

    Producto.findOne({        
        where: {
            nombre: req.body.nombre
        }
    }).then(producto => {
        if (!producto) {
            Producto
                .create(productoData)
                .then(producto => {
                    res.json({ response: producto });
                }).catch(err => {
                    res.send('error: ' + err);
                });
        } else {
            res.json({ error: 'Ya existe un producto con ese nombre' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    });
});

//Lista productos
productos.get('/productos', (req, res) => {
    Producto.findAll({ attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'fecha'] })
    .then(producto => {
      res.json(producto);
    })
    .catch(err => {
      console.log(err)
    });
});

module.exports = productos