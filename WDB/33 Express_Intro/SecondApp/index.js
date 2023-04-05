const express = require("express")
const app = express()
// console.dir(app)

// app.use((req, res) => {
//     console.log("Request received.")
//     // console.dir(req)
//     // res.send("Here is the response")
//     // res.send({color: "red"})
//     // res.send("<h1>This is my webpage")
// })


// /cats => "meow"
// /dogs => "woof"
// "/"


app.get("/", (req, res) => {
    res.send("Welcome to the homepage. This is great!")
})


app.get("/search", (req, res) => {
    console.log(req.query)
    const {q, secondKey} = req.query
    if (!q) {
        res.send("Nothing found if nothing searched!")
    }
    res.send(`<h1>Search results for: ${q} and ${secondKey}.</h1>`)
})


app.get("/r/:subreddit", (req, res) => {
    console.log(req.params)
    const { subreddit } = req.params
    res.send(`<h1>Browsing the "${subreddit}" subreddit<h1>`)
})


app.get("/r/:subreddit/:postID", (req, res) => {
    console.log(req.params)
    const { subreddit, postID } = req.params
    res.send(`<h1>Viewing Post ID "${subreddit}/${postID}" subreddit<h1>`)
})


app.post("/cats", (req, res) => {
    res.send("POST request to /cats")
})


app.get("/cats", (req, res) => {
    console.log("Cats request")
    res.send("Meow!")
})


app.get("/dogs", (req, res) => {
    console.log("Dogs request")
    res.send("Woof")
})


app.get("*", (req, res) => {
    res.send("I do not know this path")
})
    
    
app.listen(3000, () => {
    console.log("Listening on port 3000.")
})