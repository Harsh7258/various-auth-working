const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json())
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }))
app.use(cookieParser())

const USERS = new Map()
USERS.set("User 1",{ id: 1, username: "User 1", role: "Admin" })
USERS.set("User 2",{ id: 2, username: "User 2", role: "User" })

const SESSIONS = new Map()

app.post('/login', (req, res) => {
    console.log(req.body)

    const user = USERS.get(req.body.username)
    if(user === null){
        res.sendStatus(401)
        return
    }

    const sessionId = crypto.randomUUID()
    SESSIONS.set(sessionId, user)
    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).send(`Authed as ${req.body.username}`)
})



app.listen(3000, () => {
    console.log('Server started at port: 3000')
})