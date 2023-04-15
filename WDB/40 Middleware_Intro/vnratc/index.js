const express = require("express")
const app = express()
const morgan = require("morgan")


app.use(morgan("dev"))
app.use((req, res, next) => {
    // Overriding request method just for demo
    // req.method = "GET"
    console.log(`This line printed by "console.log": ${req.method}, ${req.path}. Next line is printed by "morgan":`)
    req.requestTime = Date.now()
    next()
})


app.use("/dogs", (req, res, next) => {
    console.log("I love dogs!")
    next()
})


const verifyPassword = (req, res, next) => {
    const { password } = req.query
    if (password === "chickennugget") {
        next()
    }
    res.send("You need a Password!")
}


// app.use((req, res, next) => {
//     console.log("This is my first Middleware")
//     return next()
//     console.log("First middleware after next() in 1st middleware")
// })
// app.use((req, res, next) => {
//     console.log("This is my SECOND Middleware")
//     return next()
// })
// app.use((req, res, next) => {
//     console.log("This is my 3rd Middleware")
//     return next()
// })


app.get("/", (req, res) => {
    console.log(`Request date: ${req.requestTime}`)
    res.send(`Request date: ${req.requestTime}`)
})


app.get("/dogs", (req, res) => {
    console.log(`Request date: ${req.requestTime}`)
    res.send("Woof Woof!")
})


// Passing 2 callback functions for a certain path
app.get("/secret", verifyPassword, (req, res) => {
    res.send("My secret is: sometimes i wear headphones in public so I don't have to talk to anyone)")
})


// If no paths matched, response 404
app.use((req, res) => {
    res.status(404).send("404 Not found!")
})


app.listen(3001, () => {
    console.log("Listening on port 3001")
})