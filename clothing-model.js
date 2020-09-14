const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Database structure
const ClothingSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        shippingInfo: String,
        price: mongoose.Types.Decimal128,
        photoUrl: String,
        typeId: Number,
        userId: Number
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

ClothingSchema.virtual('type', {
    ref: 'Type', //Model to use
    localField: 'typeId',
    foreignField: 'id',
    justOne: true,
})

ClothingSchema.virtual('user', {
    ref: 'User', //Model to use
    localField: 'userId',
    foreignField: 'id',
    justOne: true,
})

//Exporting Schema to modify with Node
module.exports = mongoose.model('ClothingItem', ClothingSchema)