const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Database structure
const ClothingSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        price: mongoose.Types.Decimal128,
        photoUrl: String,
        typeId: Number,
        userId: Number
    },
    {
        timestamps: true
    }
)

//Exporting Schema to modify with Node
module.exports = mongoose.model('ClothingItem', ClothingSchema)