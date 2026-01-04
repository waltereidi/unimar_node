const Music = require('../models/Music')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class SearchController {

	// Buscar músicas por nome (query param: ?name=texto)
	static async searchMusicByName(req, res) {
		const name = (req.query && req.query.name) || (req.body && req.body.name)

		try {
			if (!name || name.trim() === '') {
				return res.status(422).json({ message: 'O nome da música é obrigatório!' })
			}

			const regex = new RegExp(name, 'i')
			const musics = await Music.find({ name: { $regex: regex }, published: true })
				.populate('album')
				.sort({ createdAt: -1 })
				.limit(50)

			return res.status(200).json({ musics })
		} catch (err) {
			console.error('Erro ao buscar músicas por nome:', err)
			return res.status(500).json({ message: 'Erro no servidor' })
		}
	}

}