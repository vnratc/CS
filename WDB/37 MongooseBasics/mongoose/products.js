const mongoose = require("mongoose")


main()
    .then(() => console.log("Connection is open"))
    .catch((err) => console.log(err))


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
}


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,    // string "599" will be turned into a Number, but "five nine" won't
        required: true,
        min: [0, "Price must be positive"] // custom error msg, 1st element is a constrain, 2nd is the msg
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        // array of Strings
        type: [String],
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ["S", "M", "L"]
    }
})

// INSTANCE METHODS

// productSchema.methods.greet = function() {
//     console.log("Hello! Hi! Howdy!")
//     console.log(`- from ${this.name}`)
// }


productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale
    return this.save()
}


productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat)
    return this.save()
}


// MODEL (CLASS) METHODS, aka static methods

productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}


const Product = mongoose.model("Product", productSchema)


const findProduct = async function() {
    const foundProduct = await Product.findOne({name: "Mountain Bike"})
    // foundProduct.greet()
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory("Outdoors")
    console.log(foundProduct)
}


Product.fireSale()
    .then(resp => console.log(resp))


// findProduct()


// items not in schema will be ignored, like color: "red"

// const bike = new Product({name: "Jersey", price: 28.59, categories: ["Cycling"], size: "L"})
// bike.save()
//     .then(data => {
//         console.log("Saved")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Error")
//         console.log(err)
//     })


// To validate updates we need to include option { runValidators: true}

// Product.findOneAndUpdate({ name: "Tire Pump" }, { price: -150 }, {new: true, runValidators: true})
//     .then(data => {
//         console.log("Saved")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("Error")
//         console.log(err)
//     })