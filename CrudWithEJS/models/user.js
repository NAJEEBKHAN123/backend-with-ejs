const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/crud_with_ejs', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String,
})

module.exports =  mongoose.model('user', userSchema)