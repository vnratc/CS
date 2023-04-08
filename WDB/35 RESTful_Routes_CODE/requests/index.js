const express = require("express")
const app = express()
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")


app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())   // for parsing application/json
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


let comments = [
    {
        id: uuidv4(),
        username: "Todd",
        comment: "lol that is so funny"
    },
    {
        id: uuidv4(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        id: uuidv4(),
        username: "Sk8erBoi",
        comment: "Plz delete your account, Todd"
    },
    {
        id: uuidv4(),
        username: "onlysayswoof",
        comment: "woof woof woof"
    }
]


app.get("/tacos", (req, res) => {
    res.send("/tacos GET response")
})


app.get("/comments", (req, res) => {
    res.render("comments/index.ejs", { comments })
})


app.get("/comments/new", (req, res) => {
    res.render("comments/new.ejs")
})


app.post("/comments", (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuidv4() })
    res.redirect("/comments")
})


app.get("/comments/:id", (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render("comments/show.ejs", { comment })
})


app.patch("/comments/:id", (req, res) => {
    let { id } = req.params
    let newCommentText = req.body.comment
    let foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect("/comments")
})


app.delete("/comments/:id", (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect("/comments")
})


app.get("/comments/:id/edit", (req, res) => {
    let { id } = req.params
    let comment = comments.find(c => c.id === id)
    res.render("comments/edit", { comment })
})


app.post("/tacos", (req, res) => {
    console.log(req.body)
    const { meat, qty } = req.body
    res.send(`/tacos POST response<br>Meat is ${meat}, Quantity is ${qty}`)
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})

