const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Database structure
const UserSchema = new Schema(
    {
        id: Number,
        email:String,
        name: String,
        password: String,
        bio: String,
        location: String,
        link: Number,
        dpUrl: String,
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