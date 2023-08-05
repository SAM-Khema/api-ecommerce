"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CartSchema = new mongoose.Schema({
  
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
        quantity: String,
        price:String, 
        total:String
}, {
  timestamps: true,
});

CartSchema.index({ name: 'text' });
var Carts = mongoose.model('Carts', CartSchema);
module.exports = Carts;