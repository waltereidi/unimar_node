const joi = require('joi')

const createPlaylistContract = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'Nome da playlist não pode estar vazio',
    'any.required': 'Nome da playlist é obrigatório',
  }),
  description: joi.string().optional().allow('').messages({
    'string.base': 'Descrição deve ser um texto',
  }),
  image: joi.string().optional().allow('').uri().messages({
    'string.uri': 'Image deve ser uma URL válida',
  }),
  type: joi.number().optional().messages({
    'number.base': 'Type deve ser um número',
  }),
  isPublic: joi.boolean().optional().messages({
    'boolean.base': 'isPublic deve ser um booleano',
  }),
})

const addMusicToPlaylistContract = joi.object({
  playlistId: joi.string().required().messages({
    'string.empty': 'ID da playlist não pode estar vazio',
    'any.required': 'ID da playlist é obrigatório',
  }),
  musicId: joi.string().required().messages({
    'string.empty': 'ID da música não pode estar vazio',
    'any.required': 'ID da música é obrigatório',
  }),
})

module.exports = { 
  createPlaylistContract,
  addMusicToPlaylistContract
}
