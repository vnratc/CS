const express = require("express")
const app = express()
const path = require("path")

const Product = require("./models/product")

// Importing Mongoose
const mongoose = require("mongoose")
main()
    .then(() => console.log("MONGO Connection open."))
    .catch(err => console.log("MONGO Connection Error", err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
}


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


app.get("/dog", (request, response) => {
    response.send("Woof!")
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})


