const PlaylistController = require('../controllers/PlaylistController');
const verifyToken = require('../middlewares/verify-token')
const router = require('express').Router();
const { 
  createPlaylistContract,
  addMusicToPlaylistContract
} = require('../contracts/PlaylistContracts')

const validate = require('../middlewares/validator')

/** Criar nova playlist */
router.post('/createPlaylist', verifyToken, validate(createPlaylistContract), PlaylistController.createPlaylist)

/** Adicionar música à playlist */
router.post('/addMusicToPlaylist', verifyToken, validate(addMusicToPlaylistContract), PlaylistController.addMusicToPlaylist)

/** Listar playlists (usuário e públicas) */
router.get('/getPlaylists', verifyToken, PlaylistController.getPlaylists)

/** Obter músicas de uma playlist */
router.get('/:playlistId/musics', verifyToken, PlaylistController.getMusicsFromPlaylist)

module.exports = router;