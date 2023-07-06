const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    descrption:String,
    price:Number,
    userID:String
})

const Product = mongoose.model('product',productSchema);

module.exports={
    Product
}

