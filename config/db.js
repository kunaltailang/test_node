const mongoose = require('mongoose')

const Connection = mongoose.connect("mongodb+srv://kunal:kunal@cluster0.gsecbwl.mongodb.net/my-first-nodejs-project")


module.exports={
    Connection
}
