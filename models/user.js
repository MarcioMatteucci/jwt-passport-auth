const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear Schema
const userSchema = new Schema({
   username: String,
   password: String,
   email: String
});

// Crear el modelo basado en el Schema
const User = mongoose.model('user', userSchema);

// Exportar el modelo
module.exports = User;