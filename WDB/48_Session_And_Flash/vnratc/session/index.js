const express = require("express")
const app = express()
const session = require("express-session")

const sessionOptions = {
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false
}
app.use(session(sessionOptions))


app.get("/viewcount", (req, res) => {
    // We create a new property "count" for "req.session" obj
    if (req.session.count) {
        req.session.count += 1
    } else {
        req.session.count = 1
    }
    res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES`)
})


app.get("/register", (req, res) => {
    const { username = "anonymous" } = req.query
    req.session.username = username
    res.redirect("/greet")
})


app.get("/greet", (req, res) => {
    const { username } = req.session
    res.send(`Hello ${username}. ${req.session.count}`)
})


app.listen(3000, () => {
    console.log("SERVING 3000")
})