const express = require('express')
const path = require('path')
const app = express()
const User = require('./models/user')

const PORT = 3000;
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) =>{
    res.render('index')
})
app.get('/read', async(req, res) =>{
   const users = await User.find()
    res.render('read', {users})
})

app.post('/create', async(req, res) =>{

        const {name, email, image} = req.body;
        const createUser = await User.create({
           name,
           email,
           image
        })
        res.send(createUser)
   
    
})
app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost${PORT}`)
})