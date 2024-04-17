const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express();

app.listen(3000, () => {
    console.log('Server started at port: 3000')
})