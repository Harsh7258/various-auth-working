const express = require("express")
const bcrypt = require("bcrypt")

const USERS = []
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
app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        USERS.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
        console.log(USERS)
    } catch (error) {
        res.redirect('/signup')
    }
})

app.listen(PORT, () => {
    console.log(`Server staerted at port: ${PORT}`)
})