const joi = require('joi')

const createMusicContract = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'Nome da música não pode estar vazio',
    'any.required': 'Nome da música é obrigatório',
  }),
  description: joi.string().optional().allow('').messages({
    'string.base': 'Descrição deve ser um texto',
  }),
  duration: joi.number().optional().messages({
    'number.base': 'Duração deve ser um número',
  }),
  audioUrl: joi.string().optional().allow('').uri().messages({
    'string.uri': 'Audio URL deve ser uma URL válida',
  }),
  coverImage: joi.string().optional().allow('').uri().messages({
    'string.uri': 'Cover Image deve ser uma URL válida',
  }),
  album: joi.string().optional().allow('').messages({
    'string.base': 'Album deve ser um ID válido',
  }),
  artists: joi.array().items(joi.string()).optional().messages({
    'array.base': 'Artists deve ser um array de strings',
  }),
  category: joi.string().optional().allow('').messages({
    'string.base': 'Category deve ser um ID válido',
  }),
  published: joi.boolean().optional().messages({
    'boolean.base': 'Published deve ser um booleano',
  }),
})

module.exports = { 
  createMusicContract
}
