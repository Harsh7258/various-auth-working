require("dotenv").config()

const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()
const PORT = 5000

app.use(express.json())

const POSTS = [
    {
        id: 1,
        username: 'Harsh',
        title: 'Post 1: Real Madrid'
    },
    {
        id: 2,
        username: 'Sancho',
        title: 'Post 2: Borussia Dortmund'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.status(200).json(POSTS.filter(post => post.username === req.user.user ))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { user: username }

    const accessToken = jwt.sign(user, process.env.SERCET_ACCESS_KEY)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer token
    if(authHeader == null) return res.status(401)

    jwt.verify(token, process.env.SERCET_ACCESS_KEY, (err, user) => {
        if(err) return res.status(403)
        req.user = user
    console.log(user)
    next()
    })

}

app.listen(PORT, () => console.log(`Server: ${PORT}`))