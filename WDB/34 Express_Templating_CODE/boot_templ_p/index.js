const express = require("express")
const app = express()
const path = require("path")
const redditData = require("./data.json")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))    // Setting "views" directory


app.use(express.static(path.join(__dirname, "public"))) // Setting path to static files


app.get("/", (req, res) => {
    res.render("home.ejs", { title: "Cats" })  // .ejs is not required since we set "view engine" on line 5
})


app.get("/r/:subreddit", (req, res) => {
    // console.log(req.params) // req.params is an object with key named with what is in the path after : and value of string that follows /r/
    const { subreddit } = req.params
    // const { soccer, chickens, ...rest } = data   // destructuring practice
    const data = redditData[subreddit]
    if (data) {
        // curly braces {} here construct a new object
        // ... spread operator expands the object allowing access to values by calling key just "name" instead of "data.name"
        res.render("subreddit.ejs", {...data, title: subreddit.charAt(0).toUpperCase() + subreddit.slice(1)}) 
    } else {
        res.render("error.ejs", {message: `404 ${subreddit} Not Found`, title: "Error"})
    }
})


app.get("/cats", (req, res) => {
    const cats = [
        "Blue", "Rocket", "Monty", "Stephanie", "Winston"
    ]
    res.render("cats", { cats, title: "Cats" })
})


app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1
    // res.render("random", {num: num}) // no need to write it twice
    res.render("random", {num, title: "Random"})
})


app.listen(3000, () => {
    console.log("Listening on port 3000.")
})