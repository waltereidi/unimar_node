const Music = require('../models/Music')

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ApiAdminController {

    // Criar uma nova música
    static async createMusic(req, res) {
        const { name, description, duration, audioUrl, coverImage, album, artists, category, published } = req.body

        try {
            if (!name) {
                return res.status(422).json({ message: 'O nome da música é obrigatório!' })
            }

            // Criar slug da música
            const slug = name.toLowerCase().replace(/\s+/g, '-')

            // Verificar se música com mesmo slug já existe
            const musicExists = await Music.findOne({ slug })
            if (musicExists) {
                return res.status(422).json({ message: 'Uma música com esse nome já existe!' })
            }

            const novaMusica = new Music({
                name,
                slug,
                description: description || '',
                duration: duration || 0,
                audioUrl: audioUrl || '',
                coverImage: coverImage || '',
                album: album || null,
                artists: artists || [],
                category: category || null,
                published: published !== undefined ? published : true,
                plays: 0,
                likes: 0
            })

            await novaMusica.save()
            return res.status(201).json({ 
                message: 'Música criada com sucesso!',
                music: novaMusica 
            })
        } catch (err) {
            console.error('Erro ao criar música:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }

    // Listar todas as músicas com paginação
    static async getMusics(req, res) {
        const { page = 1, limit = 10, published, search } = req.query

        try {
            const pageNum = Math.max(1, parseInt(page) || 1)
            const limitNum = Math.max(1, parseInt(limit) || 10)
            const skip = (pageNum - 1) * limitNum

            // Construir filtro
            let filter = {}
            
            if (published !== undefined) {
                filter.published = published === 'true'
            }

            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { artists: { $regex: search, $options: 'i' } }
                ]
            }

            // Contar total de documentos
            const total = await Music.countDocuments(filter)

            // Buscar músicas com paginação
            const musics = await Music.find(filter)
                .populate('album')
                .populate('category')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum)

            const totalPages = Math.ceil(total / limitNum)

            return res.status(200).json({
                musics,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    limit: limitNum,
                    total
                }
            })
        } catch (err) {
            console.error('Erro ao listar músicas:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }
}