const mongoose = require('../db/conn')
const { Schema } = mongoose

const Music = mongoose.model(
    'Music',
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
        duration: {
            type: Number,
        },
        audioUrl: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        album: {
            type: Schema.Types.ObjectId,
            ref: 'Album',
        },
        artists: [String],
        category: {
            type: String,
        },
        plays: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        published: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true })
)
module.exports = Music