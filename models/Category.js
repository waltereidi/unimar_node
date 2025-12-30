const mongoose = require('../db/conn')
const { Schema } = mongoose

const Category = mongoose.model(
    'Category',
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
        active: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true })
)
module.exports = Category