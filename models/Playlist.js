const mongoose = require('../db/conn')
const { Schema } = mongoose


const Playlist = mongoose.model(
    'Playlist',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            index: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: Number,
            default: 0,
        },
        tracks: [{ type: Schema.Types.ObjectId, ref: 'Music' }],
        isPublic: {
            type: Boolean,
            default: false,
        },
        followers: {
            type: Number,
            default: 0,
        },
    }, { timestamps: true })
)

module.exports = Playlist;