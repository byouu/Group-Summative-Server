const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Database structure
const UserSchema = new Schema(
    {
        id: Number,
        name: String,
        bio: String,
        location: String,
        link: Number,
        dpUrl: String,
        email: String,
        username: String,
        password: String,

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('clothingItems', {
  ref: 'Clothing', // The model to use
  localField: 'id', 
  foreignField: 'userId', 
  justOne: false,
})

//Exporting Schema to modify with Node
module.exports = mongoose.model('User', UserSchema)