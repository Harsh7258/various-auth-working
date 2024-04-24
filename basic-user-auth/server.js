const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 5000

app.use(express.json())
const USERS = []

app.get('/users', (req, res) => {
    res.json({ success: 'working!!', USERS })
})

app.post('/users', async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt() // generates salts to creat every password unique
        const hashedPassword = await bcrypt.hash(password, salt) // hash the password

        const user = { name: req.body.name, password: hashedPassword }

        USERS.push(user)
        res.status(201).send()
    } catch (error) {
        res.status(500).json({
            message: "invalid password or user"
        })
    }
})

app.post('/users/login', async (req, res) => {
    const user = USERS.find(user => user.name === req.body.name )
    // console.log(user)
    if(user == null) {
        return res.status(400).send("cannot find user")
    }

    try {
        const password = req.body.password // user input password
        const userHashedPassword = user.password

        const comparePass = await bcrypt.compare(password, userHashedPassword)
        if(comparePass){
            res.status(200).send("Successfully Login: basic authentication working!!")
        } else {
            res.status(404).send("Not allowed")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something wrong in comparing..")
    }
})

app.listen(PORT, () => console.log(`server: ${PORT}`))