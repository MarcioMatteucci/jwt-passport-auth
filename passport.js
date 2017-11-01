const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = require('./config/index');
const User = require('./models/user');

// Json Web Token Strategy
passport.use(new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: JWT_SECRET
}, async (payload, done) => {
   try {
      // Encontrar el usuario especificado en el token
      const user = await User.findById(payload.sub);
      // Manejo si el usuario no existe
      if (!user) {
         return done(null, false);
      }
      // Si todo va bien retornar el usuario
      done(null, user);
   } catch (err) {
      done(err, false);
   }
}));

// Local Strategy
passport.use(new LocalStrategy({
   usernameField: 'username'
}, async (username, password, done) => {
   // Encontrar el usuario por username
   const user = await User.findOne({ username });
   // Manejo si no encuentra el usuario
   if (!user) {
      return done(null, false);
   }
   // Validar que la password sea correcta

   // Manejo si la password no es correcta
   // Si todo va bien retonar el usuario
}));