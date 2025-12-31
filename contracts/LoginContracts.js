const joi = require('joi')

const authenticationContract = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'Email deve ser válido',
    'any.required': 'Email é obrigatório',
  }),
  password: joi.string().min(3).required().messages({
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'any.required': 'Senha é obrigatória',
  }),
})

module.exports = { authenticationContract }