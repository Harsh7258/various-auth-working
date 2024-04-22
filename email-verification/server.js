const express = require("express")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const app = express()
const PORT = 5000

const USER = [
    {
        id: 1,
        username: 'K. Harsh',
        email: 'harshnaidu2u@gmail.com'
    }
]

app.post('/login', async (req, res) => {
    const user = USER.find(u => u.email === req.body.email)
    if(user != null){
        try {
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY, {
                expiresIn: '10min'
            })
            await sendEmailLink({ email: user.email, token })
        } catch (error) {
            return res.send(`Error logging in. Please try again! ${error.message}`)
        }
    }
    res.send("Check ypur email to finish siginning in.")
})

app.listen(PORT, () => console.log(`server: ${PORT}`))