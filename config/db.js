const mongoose = require('mongoose')

const Connection = mongoose.connect("mongodb+srv://mintunagar:mintu1234@cluster0.cdf2bjt.mongodb.net/singhtek?retryWrites=true&w=majority")


module.exports={
    Connection
}
