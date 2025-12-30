const mongoose = require('../db/conn')
const { Schema } = mongoose


const Album = mongoose.model(
    'Album',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: false,
            index: true,
        },
        description: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        tracks: [{ type: Schema.Types.ObjectId, ref: 'Music' }],
        releaseDate: {
            type: Date,
        },
        published: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true })
)

module.exports = Album;