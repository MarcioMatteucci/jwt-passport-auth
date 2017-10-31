const User = require('../models/user');

module.exports = {
   signUp: async (req, res, next) => {
      const { username, password, email } = req.value.body;

      // Validar que el email y el username no existan
      const sameEmailUser = await User.findOne({ email: email });
      if (sameEmailUser) {
         return res.status(403).json({ success: false, msg: 'El Email ya esta en uso' });
      }

      const sameUsernameUser = await User.findOne({ username: username });
      if (sameUsernameUser) {
         return res.status(403).json({ success: false, msg: 'El Nombre de Usuario ya esta en uso' });
      }

      const newUser = new User({
         username: username,
         password: password,
         email: email
      });

      await newUser.save();

      res.status(201).json({ success: true, msg: 'Usuario creado' });
   },

   signIn: async (req, res, next) => {
      // Login
      console.log('UsersController.signIn() called!');
   },

   secret: async (req, res, next) => {
      console.log('UsersController.secret() called!');
   }
}