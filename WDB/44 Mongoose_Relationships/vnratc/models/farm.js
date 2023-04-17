const mongoose = require('mongoose');
const { Schema } = mongoose

main().then(console.log("*** MONGO CONNECTED ***")).catch(err => console.log("Error", err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/releationshipDemo');
}


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"]
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    // Storing on a "parent" a reference to a "child" as an array of objects (suitable for medium amounts of data)
    products: [ { type: Schema.Types.ObjectId, ref: "Product" } ] // ARRAY OF OBJ
})


const Product = mongoose.model("Product", productSchema)
const Farm = mongoose.model("Farm", farmSchema)

// Product.insertMany([
//     {name: "Goddes Melon", price: 4.99, season: "Summer"},
//     {name: "Sugar Baby Watermelin", price: 4.99, season: "Summer"},
//     {name: "Asparagus", price: 3.99, season: "Spring"}
// ])


// const makeFarm = async () => {
//     const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" })
//     const melon = await Product.findOne({ name: "Goddes Melon" })
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm)
// }
// makeFarm()


const addProduct = async () => {
    const farm = await Farm.findOne({ name: "Full Belly Farms" })
    const watermalon = await Product.findOne({ name: "Sugar Baby Watermelin" })
    farm.products.push(watermalon)
    await farm.save()
    console.log(farm)
}
// addProduct()


Farm.findOne({ name: "Full Belly Farms" })
    .populate("products")
    .then(farm => console.log(farm))