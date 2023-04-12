const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")


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

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"))


const categories = ["fruit", "vegetable", "dairy", "fungi"]


app.get("/products", async (request, response) => {
    const products = await Product.find({})
    response.render("products/index.ejs", { products })
})


app.get("/products/new", (request, response) => {
    response.render("products/new", {categories})
})


app.post("/products", async (request, response) => {
    const { name, price, category } = request.body
    const newProduct = new Product({ name, price, category })
    await newProduct.save()
        .then(p => {
            console.log(p)
            response.redirect(`/products/${newProduct._id}`) // _id is created by mongo automatically
        })
        .catch(e => {
            console.log(e)
            response.render("products/error.ejs", {e})
        })
})


app.get("/products/:id", async (request, response) => {
    const { id } = request.params
    const product = await Product.findById(id)
    response.render("products/show.ejs", { product })
})


app.get("/products/:id/edit", async (request, response) => {
    const { id } = request.params
    const product = await Product.findById(id)
    response.render("products/edit", { product, categories })
})


app.put("/products/:id", async (request, response) => {
    let { id } = request.params
    console.log(request.body)
    const updatedProduct = await Product.findByIdAndUpdate(id, request.body, {runValidators: true, new: true})
    // let foundProduct = await Product.findById(id)
    // let { name, price, category } = request.body
    // foundProduct.name = name
    // foundProduct.price = price
    // foundProduct.category = category
    // foundProduct.save()
    response.redirect(`/products/${updatedProduct._id}`)
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})


