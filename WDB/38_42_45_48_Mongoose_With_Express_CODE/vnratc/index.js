const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
const ejsMate = require("ejs-mate")

const sessionOptions = {
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false
}


const AppError = require("./AppError")
const Product = require("./models/product")
const Farm = require("./models/farm")
const archivedProduct = require("./models/archivedProduct")

// Importing Mongoose
const mongoose = require("mongoose")
const { wrap } = require("module")
main()
    .then(() => console.log("MONGO Connection open."))
    .catch(err => console.log("MONGO Connection Error", err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStandTake2')
}


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.engine("ejs", ejsMate)

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"))

app.use(session(sessionOptions))
// After calling flash() every "req" will have a "flash" method. See Create Farm route.
app.use(flash())
// Makes "messages" be available on every route
app.use((req, res, next) => {
    // Newly created property "messages" dictates the name to use in templates. And it's an ARRAY
    res.locals.messages = req.flash("success")
    next()
})


// "NEXT" MUST BE ADDED TO "req, res"
// EVERYTHING INSIDE ASYNC FUNCTIONS MUST BE WRAPPED WITH "TRY CATCH"
// OR REPLACED WITH "wrapAsync"
// Replacing "try catch" with wrapAsync function to avoid writing "try catch" in every route
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}


// FARM ROUTES 


// Index
app.get("/farms", wrapAsync(async (req, res, next) => {
    const farms = await Farm.find({})
    // Passing "messages" while rendering
    // res.render("farms", { farms, messages: req.flash("success") })
    // Here no need to pass messages thanks to "res.locals.messages = req.flash("success")"
    res.render("farms", { farms })
    // It looks like both options work. If I just type "farms" express just asumes that it should grab the index file in "farms" folder?
    // res.render("farms/index", { farms })
}))


// New Farm
app.get("/farms/new", (req, res) => {
    res.render("farms/new")
})
// Create Farm
app.post("/farms", wrapAsync(async (req, res, next) => {
    const { name, city, email } = req.body
    const farm = new Farm({ name, city, email })
    await farm.save()
    // We call "flash" right before redirecting. See "farms/index.js" view
    req.flash("success", "New farm is created")
    res.redirect(`/farms`)
}))
// New Product
app.get("/farms/:id/products/new", wrapAsync(async (req, res, next) => {
    const farm = await Farm.findById(req.params.id)
    res.render("products/new", { categories, farm })
}))
// Create Product
app.post("/farms/:id/products", wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, price, category } = req.body
    const product = new Product({ name, price, category, farm: id })
    await product.save()
    const farm = await Farm.findById(id)
    farm.products.push(product)
    await farm.save()
    res.redirect(`/farms/${id}`)
}))


// Show Farm
app.get("/farms/:id", wrapAsync(async (req, res, next) => {
    const farm = await Farm.findById(req.params.id).populate("products")
    res.render("farms/show", { farm })
}))


// Delete Farm
app.delete("/farms/:id", wrapAsync(async (req, res, next) => {
    const farm = await Farm.findByIdAndDelete(req.params.id)
    req.flash("success", "Farm is deleted")
    // LOOK IN FARM SCHEMA TO SEE HOW ALL RELATED PRODUCTS ARE DELETED
    res.redirect("/farms")
}))


// PRODUCT ROUTES


const categories = ["fruit", "vegetable", "dairy", "fungi"]


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
    const product = await Product.findById(id).populate("farm")
    if (!product) {
        throw new AppError("Product Not Found!", 404)
    }
    res.render("products/show", { product })
}))


// edit
app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError("Product Not Found!", 404)
    }
    res.render("products/edit", { product, categories })
}))


app.put("/products/:id", wrapAsync(async (req, res, next) => {
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
app.delete("/products/:id", wrapAsync(async (req, res, next) => {
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
    if (err.name === "ValidationError") err = handleValidationErr(err)
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


