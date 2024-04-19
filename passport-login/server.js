if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const initializePassport = require("./passport-config")

const USERS = []
const app = express()
const PORT = 3000

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET_kEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

initializePassport(passport, 
    email => {
        return USERS.find(user => user.email === email)
    },
    id => {
        return USERS.find(user => user.id === id)
    }
)

app.get('/', checkAuthenticated,(req, res) => {
// console.log(req.user)
res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
})
app.post('/signup', checkNotAuthenticated, async (req, res) => {
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

app.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    console.log("auth",req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

app.listen(PORT, () => {
    console.log(`Server staerted at port: ${PORT}`)
})