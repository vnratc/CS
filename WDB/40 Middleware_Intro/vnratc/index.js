const express = require("express")
const app = express()
const morgan = require("morgan")


app.use(morgan("common"))


app.get("/", (req, res) => {
    res.send("Home Page")
})
app.get("/dogs", (req, res) => {
    res.send("Woof Woof!")
})


app.listen(3001, () => {
    console.log("Listening on port 3001")
})