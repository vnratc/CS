const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")


const AppError = require("./AppError")
const Product = require("./models/product")
const archivedProduct = require("./models/archivedProduct")

// Importing Mongoose
const mongoose = require("mongoose")
main()
    .then(() => console.log("MONGO Connection open."))
    .catch(err => console.log("MONGO Connection Error", err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
}


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"))


const categories = ["fruit", "vegetable", "dairy", "fungi"]


// Replacing "try catch" with wrapAsync function to avoid writing "try catch" in every route
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}


// "NEXT" MUST BE ADDED TO "req, res"
// EVERYTHING INSIDE ASYNC FUNCTIONS MUST BE WRAPPED WITH "TRY CATCH"
// OR REPLACED WITH "wrapAsync"



// index
app.get("/products", wrapAsync(async (req, res, next) => {
        const { category } = req.query
        if (category) {
            let products = await Product.find({ category })
            res.render("products/index.ejs", { products, category })
        } else {
            let products = await Product.find({})
            res.render("products/index.ejs", { products, category: "All" })
        }
}))


// new
app.get("/products/new", (req, res) => {
    // throw new AppError("Not allowed!", 401)
    res.render("products/new", { categories })
})


app.post("/products", wrapAsync(async (req, res, next) => {
        const { name, price, category } = req.body
        const newProduct = new Product({ name, price, category })
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)

}))


// show
app.get("/products/:id", wrapAsync(async (req, res, next) => {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {        
            throw new AppError("Product Not Found!", 404)
        }
        res.render("products/show", { product })
}))


// edit
app.get("/products/:id/edit", wrapAsync( async (req, res, next) => {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {        
            throw new AppError("Product Not Found!", 404)
        }
        res.render("products/edit", { product, categories })
}))


app.put("/products/:id", wrapAsync( async (req, res, next) => {
    let { id } = req.params
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    // let foundProduct = await Product.findById(id)
    // let { name, price, category } = req.body
    // foundProduct.name = name
    // foundProduct.price = price
    // foundProduct.category = category
    // foundProduct.save()
    res.redirect(`/products/${updatedProduct._id}`)
}))


// delete
app.delete("/products/:id", wrapAsync( async (req, res, next) => {
        let { id } = req.params
        await Product.findByIdAndDelete(id)
        res.redirect("/products")
}))


// 2 Error-handling middleware
const handleValidationErr = err => {
    console.dir(err)
    return new AppError(`Validation Failed...${err.message}`, 400)
}


app.use((err, req, res, next) => {
    console.log(err.name)
    if(err.name === "ValidationError") err = handleValidationErr(err)
    next(err)
})


app.use((err, req, res, next) => {
    const { status = 500, message = "Smth went wrong!" } = err
    res.status(status).send(message)
})


// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000")
})


