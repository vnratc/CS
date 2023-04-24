const express = require("express")
const app = express()
const User = require("./models/user")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const session = require("express-session")


main()
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log("Mongo Connection Error", err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/auth')
}


app.set("view engine", "ejs")
app.set("views", "views")


app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "notagoodsecret",
    resave: false,
    saveUninitialized: false
}))


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login")
    }
    next()
}


app.get("/", (req, res) => {
    res.send("THIS IS THE HOMEPAGE")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", async (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, password })
    // Hashing was moved to model middleware .pre("save")
    await user.save()
    req.session.user_id = user._id
    res.redirect("/")
})


app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    // Validation was moved to model method
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id
        res.redirect("/secret")
    } else {res.redirect("/login")}
})


app.post("/logout", (req, res) => {
    req.session.user_id = null
    // req.session.destroy() // another way to reset session
    res.redirect("/login")
})


app.get("/topsecret", requireLogin, (req, res) => {
    res.send("TOP SECRET!")
})

app.get("/secret", requireLogin, (req, res) => {
    res.render("secret")
})


app.listen(3000, () => console.log("Server online"))