const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())


//CREATE AND GET COOKIE
// app.get('/' ,(req, res )=>{
//     res.cookie("name", "najeeb")
//     res.send('send')
// })
// app.get('/read', (req, res)  =>{
//     console.log(req.cookies.token)
// })
// BCRYPT 
// app.get('/', (req, res ) =>{
//     bcrypt.genSalt(10, (err, salt) =>{
//         bcrypt.hash("najeebkhan", salt, (err, hash) =>{
//             console.log(salt)
//             console.log(hash)
//         })
//     })
// })
// app.get('/read' , (req, res) =>{
//     bcrypt.compare("najeebkhan", '$2b$10$mDLi61vXuEG/5I.XBHpKWeP/d/MwDIkgep6xChr3huejRnXFLyQhG', (err, result) =>{
//         console.log(result)
//     })
// })

// JWT 
// app.get('/', (req, res) =>{
//     const token = jwt.sign({email: 'najeebkhan@gmail.com'}, "secret")
//     res.cookie('token', token)
//     res.send('done')
// })
// app.get('/read', (req, res) =>{
//    const data =  jwt.verify(req.cookies.token, "secret")
//    console.log(data)
// })

app.listen(3000)