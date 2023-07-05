const mongoose = require('mongoose')

const Connection = mongoose.connect("mongodb+srv://kunal:kunal@cluster0.gsecbwl.mongodb.net/test")


module.exports={
    Connection
}