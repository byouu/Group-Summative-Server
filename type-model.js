var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's data structure 
var TypeSchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TypeSchema.virtual('clothingItems', {
  ref: 'ClothingItem', // The model to use
  localField: 'id', 
  foreignField: 'typeId', 
  justOne: false,
})


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Type', TypeSchema);