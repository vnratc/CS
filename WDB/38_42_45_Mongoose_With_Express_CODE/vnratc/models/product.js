const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name can not be blank"]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ["fruit", "vegetable", "dairy", "fungi"]
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: "Farm"
    }
})
const Product = mongoose.model("Product", productSchema)
module.exports = Product
