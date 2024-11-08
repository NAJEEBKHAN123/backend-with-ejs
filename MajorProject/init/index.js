const mongoose = require('mongoose')
const initData = require('../init/data')
const listing = require('../Models/listing')

mongoose.connect('mongodb://localhost:27017/majorlist')
.then(() =>{console.log('connect to mongoDB')})
.catch((err) =>{console.log('error in connection of mongodb', err)})

const initDB = async () =>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data)
    console.log('data was init')
}
initDB();