const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const messages = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      return res.status(422).json({ message: 'Validação falhou', errors: messages })
    }

    req.body = value
    next()
  }
}

module.exports = validate