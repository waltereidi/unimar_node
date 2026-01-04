const Playlist = require('../models/Playlist')
const Music = require('../models/Music')
const Album = require('../models/Album')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PlaylistController {

    // Criar uma nova playlist
    static async createPlaylist(req, res) {
        const { name, description, image, type, isPublic } = req.body
        const userId = (req.user && req.user._id) || (req.session && req.session.userid)

        try {
            if (!name) {
                return res.status(422).json({ message: 'O nome da playlist é obrigatório!' })
            }

            // Verificar se playlist com mesmo nome já existe para esse usuário
            const playlistExists = await Playlist.findOne({ name, user: userId })
            if (playlistExists) {
                return res.status(422).json({ message: 'Você já possui uma playlist com esse nome!' })
            }

            const slug = name.toLowerCase().replace(/\s+/g, '-')

            const novaPlaylist = new Playlist({
                name,
                slug,
                description: description || '',
                image: image || '',
                user: userId,
                type: type || 0,
                isPublic: isPublic || false,
                tracks: []
            })

            await novaPlaylist.save()
            return res.status(201).json({ 
                message: 'Playlist criada com sucesso!',
                playlist: novaPlaylist 
            })
        } catch (err) {
            console.error('Erro ao criar playlist:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }

    // Adicionar música à playlist
    static async addMusicToPlaylist(req, res) {
        const { playlistId, musicId } = req.body
        const userId = (req.user && req.user._id) || (req.session && req.session.userid)

        try {
            if (!ObjectId.isValid(playlistId) || !ObjectId.isValid(musicId)) {
                return res.status(422).json({ message: 'IDs inválidos!' })
            }

            // Verificar se playlist existe e pertence ao usuário
            const playlist = await Playlist.findById(playlistId)
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist não encontrada!' })
            }


            // Verificar se música existe
            const music = await Music.findById(musicId)
            if (!music) {
                return res.status(404).json({ message: 'Música não encontrada!' })
            }

            // Verificar se música já está na playlist
            if (playlist.tracks.includes(musicId)) {
                return res.status(422).json({ message: 'Essa música já está na playlist!' })
            }

            playlist.tracks.push(musicId)
            await playlist.save()

            const playlistAtualizada = await Playlist.findById(playlistId).populate('tracks')

            return res.status(200).json({ 
                message: 'Música adicionada com sucesso!',
                playlist: playlistAtualizada 
            })
        } catch (err) {
            console.error('Erro ao adicionar música à playlist:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }

    // Listar playlists (do usuário e públicas)
    static async getPlaylists(req, res) {
        const userId = (req.user && req.user._id) || (req.session && req.session.userid)

        try {
            const playlists = await Playlist.find({
                $or: [
                    { user: userId },
                    { isPublic: true }
                ]
            }).populate('tracks').sort({ createdAt: -1 })

            return res.status(200).json({ playlists })
        } catch (err) {
            console.error('Erro ao listar playlists:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }

    // Obter músicas de uma playlist
    static async getMusicsFromPlaylist(req, res) {
        const { playlistId } = req.params
        const userId = (req.user && req.user._id) || (req.session && req.session.userid)

        try {
            if (!ObjectId.isValid(playlistId)) {
                return res.status(422).json({ message: 'ID da playlist inválido!' })
            }

            const playlist = await Playlist.findById(playlistId).populate('tracks')
            if (!playlist) {
                return res.status(404).json({ message: 'Playlist não encontrada!' })
            }

            // Permissão: pública ou dono
            if (!playlist.isPublic && playlist.user.toString() !== userId) {
                return res.status(403).json({ message: 'Você não tem permissão para ver as músicas desta playlist!' })
            }

            return res.status(200).json({ tracks: playlist.tracks })
        } catch (err) {
            console.error('Erro ao obter músicas da playlist:', err)
            return res.status(500).json({ message: 'Erro no servidor' })
        }
    }

}