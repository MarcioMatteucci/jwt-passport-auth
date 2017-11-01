const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Crear Schema
const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   surname: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
   }
}, { timestamps: true });

// Crear el modelo basado en el Schema
const User = mongoose.model('user', userSchema);

// Exportar el modelo
module.exports = User;