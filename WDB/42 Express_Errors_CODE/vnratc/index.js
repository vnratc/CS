const express = require("express")
const app = express()
const morgan = require("morgan")


const AppError = require("./AppError")


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
    throw new AppError("Password Required", 401)
    // res.send("You need a Password!")
    // throw new AppError("Password required", 401)
}


app.get("/admin", (req, res) => {
    // After throwing this error it will be handled by the Error-handling function below app.use((err, req, res, next)...
    throw new AppError("You are not an Admin", 403)
})


app.get("/", (req, res) => {
    console.log(`Request date: ${req.requestTime}`)
    res.send(`Request date: ${req.requestTime}<br>Request URL: ${req.url}`)
})


app.get("/error", (req, res) => {
    chicken.fly()
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


// Error-handling middleware. MUST add at the bottom of the code
// app.use((err, req, res, next) => {
//     console.log("**************************************************************")
//     console.log("****************************ERROR*****************************")
//     console.log("**************************************************************")
//     console.log(err)
//     // If we pass smth into "next", express calls the next error-handling middleware
//     next(err)
// })


// Every thrown error will be handled by this function
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err
    res.status(status).send(message)
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})