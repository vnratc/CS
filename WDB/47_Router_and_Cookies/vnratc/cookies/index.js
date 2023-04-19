const express = require("express")
const app = express()

const cookieParser = require("cookie-parser")
app.use(cookieParser("thisismysecret"))


app.get("/greet", (req, res) => {
    const { color = "No-name" } = req.cookies
    res.send(`HEY THERE!!! ${color}`)
})


app.get("/setname", (req, res) => {
    res.cookie("name", "henry etta")
    res.cookie("animal", "shrimp")
    res.send("OK, SENT YOU A COOKIE")
})


app.get("/getsignedcookie", (req, res) => {
    res.cookie("fruit", "grape", { signed: true })
    res.send("received signed cookie")
})


app.get("/verifyfruit", (req, res) => {
    res.send(req.signedCookies)
})


app.listen(3000, () => {
    console.log("serving 3000")
})