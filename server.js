const express = require('express'); //se llama al modulo de express y se guarda en la constante 'express'
const app = express(); //se crea una instancia de express
const mongoose = require('mongoose'); //se llama la libreria de mongoose 

mongoose.connect('mongodb+srv://mari900:1234cinco@cluster0.3qd78wx.mongodb.net/', { useNewUrlParser: true }); //conexion a la base de datos
const db = mongoose.connection //se guarfa la conexion de la base de datos en una constante 
db.on('error', (error) => console.error(error)); //si hay algun error se muestra por la consola
db.once('open', () => console.log('Connected to Database')); //si se conecta con exito se muestra un mensaje por consola

app.use(express.json()); //se configura Express para analizar las solicitudes entrantes con datos JSON

const usersRouter = require('./routes/users');//permite acceder a la lógica y las rutas definidas en el archivo "users.js"
app.use('/users', usersRouter);//hace que todas las rutas definidas en usersRouter estén disponibles bajo la ruta '/users' 

app.listen(3000, () => console.log('Server Started'))//se le dice el puerto en el que estara y que muestre en consola un mensaje

