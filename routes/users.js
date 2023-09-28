const express = require('express'); //se requiere express
const router = express.Router(); //se crea un objeto de router en Express
const User = require('../models/user');//se requiere el modelo de usuario definido en 'user.js'

// Obteniendo todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); //se busca y obtiene todos los usuarios
    res.json(users);//envía la lista de usuarios como respuesta en formato JSON
  } catch (err) {
    res.status(500).json({ message: err.message });//envía una respuesta de error si es necesario
  }
});

// Obteniendo un usuario por medio de id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);  // Envía el usuario encontrado por ID como respuesta en formato JSON.
});

// Creando un nuevo usuario
router.post('/', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password
  });//crea un nuevo usuario con los datos proporcionados 
  try {
    const newUser = await user.save();//guarda el nuevo usuario en la base de datos
    res.status(201).json(newUser);//envía el nuevo usuario como respuesta con un código 201 de creacion correcta
  } catch (err) {
    res.status(400).json({ message: err.message });//maneja errores de validación y envia mensaje de error
  }
});

// Actualizando un usuario existente
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.userName != null) {
    res.user.userName = req.body.userName;//actualiza el nombre de usuario si se proporciona 
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;//actualiza la contraseña de usuario si se proporciona
  }
  try {
    const updatedUser = await res.user.save();//guarda la actualización del usuario en la base de datos
    res.json(updatedUser);//envía el usuario actualizado como respuesta en formato JSON
  } catch (err) {
    res.status(400).json({ message: err.message });//maneja errores de validación y envia mensaje de error
  }
});

// Eliminando un usuario
router.delete('/:id', getUser, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);//busca y elimina un usuario por su id.
    res.json({ message: 'Usuario eliminado' });//envía un mensaje de éxito como respuesta en formato JSON.
  } catch (err) {
    res.status(500).json({ message: err.message });//maneja errores de validación y envia mensaje de error
  }
});

//se crea una función para obtener un usuario por su id.
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);//busca un usuario por su id.
    if (user == null) {
      return res.status(404).json({ message: 'No se encontro el usuario' });//envía un mensaje en caso que no se encuentre el usuario
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });//maneja errores de validación y envia mensaje de error
  }

  res.user = user;
  next();
}

module.exports = router;
