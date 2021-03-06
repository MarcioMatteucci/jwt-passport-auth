const Joi = require('joi');

module.exports = {
   validateBody: (schema) => {
      return (req, res, next) => {
         const result = Joi.validate(req.body, schema);
         if (result.error) {
            return res.status(400).json(result.error);
         }

         if (!req.value) { req.value = {}; }
         req.value['body'] = result.value;
         next();
      }
   },

   schema: {
      signUpSchema: Joi.object().keys({
         name: Joi.string().alphanum().min(3).max(30).required(),
         surname: Joi.string().alphanum().min(3).max(30).required(),
         username: Joi.string().alphanum().min(3).max(30).required(),
         password: Joi.string().alphanum().min(4).max(30).required(),
         email: Joi.string().email().required(),
      }),
      signInSchema: Joi.object().keys({
         username: Joi.string().alphanum().min(3).max(30).required(),
         password: Joi.string().alphanum().min(4).max(30).required()
      })
   }
}