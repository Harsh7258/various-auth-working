const express = require("express")
require("dotenv").config()
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const connectDB = require("./config/DB")
const authRoutes = require("./routes/authRoute")

const app = express()
const PORT = 5000
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Passport config
require('./config/passport')(passport)

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`server started at: ${PORT}`)
})