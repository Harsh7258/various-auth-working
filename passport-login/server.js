const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 3000

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Harsh' })
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('login', (req, res) => {

})

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.post('/signup', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server staerted at port: ${PORT}`)
})