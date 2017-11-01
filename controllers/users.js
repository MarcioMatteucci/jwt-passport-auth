const JWT = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config/index');

signToken = (user) => {
   // Crea token
   return token = JWT.sign({
      iss: 'MarcioMatteucci',
      sub: user._id,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1), // 1 dia hasta que expire el token
   }, JWT_SECRET);
}

module.exports = {
   signUp: async (req, res, next) => {
      // Datos del body
      const { name, surname, username, password } = req.value.body;
      const email = req.value.body.email.toLowerCase();

      // Validar que el email y el username no existan
      const sameEmailUser = await User.findOne({ email: email });
      if (sameEmailUser) {
         return res.status(403).json({ success: false, msg: 'El Email ya esta en uso' });
      }

      const sameUsernameUser = await User.findOne({ username: username });
      if (sameUsernameUser) {
         return res.status(403).json({ success: false, msg: 'El Nombre de Usuario ya esta en uso' });
      }

      // Creo nuevo usuario con los datos del body
      const newUser = new User({
         name: name,
         surname: surname,
         username: username,
         password: password,
         email: email
      });

      // Persistencia del usuario
      await newUser.save();

      // Generar el token
      const token = signToken(newUser);

      // Success response con el token
      res.status(201).json({ success: true, msg: 'Usuario creado', token: token });
   },

   signIn: async (req, res, next) => {
      // Generar el token
      const token = signToken(req.user);
      res.status(200).json({ success: true, msg: 'Nos logeamos!', token: token });
   },

   secret: async (req, res, next) => {
      res.status(200).json({ success: true, msg: 'Llegamos a un ruta con auth!' });
   }
}