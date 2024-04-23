const express = require("express")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const sendEmailLink = require("./email")
const { urlencoded } = require("body-parser")

const app = express()
const PORT = 5000
app.use(urlencoded({ extended:true }))

const USER = [
    {
        id: 1,
        username: 'K. Harsh',
        email: 'naiduh551@gmail.com'
    }
]

app.post('/login', async (req, res) => {
    // console.log(req.body)
    const user = USER.find(u => u.email === req.body.email)
    if(user != null){
        try {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '10min'
            })
            
            await sendEmailLink({email: user.email, token})
            console.log('data: ',await sendEmailLink({email: user.email, token}))
        } catch (error) {
            console.log('error: ',error)
            return res.send(`Error logging in. Please try again! ${error.message}`)
        }
    }
    res.send("Check your email to finish siginning in.")
})

app.get('/verify', (req, res) => {
    const token = req.query.token
    if(token == null) return res.sendStatus(401)

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = USER.find(u => u.id === decodedToken.userId)
        res.send(`Auth as ${user.username}`)
    } catch (error) {
        res.sendStatus(401)
    }
})

app.listen(PORT, () => console.log(`server: ${PORT}`))