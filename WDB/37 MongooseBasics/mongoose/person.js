const mongoose = require("mongoose")


main()
    .then(() => console.log("Connection is open"))
    .catch((err) => console.log(err))


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
}


const personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual("fullName").get(function () {
    return `${this.first} ${this.last}`
})
personSchema.pre("save", async function () {
    this.first = "Yo"
    this.last = "Mama"
    console.log("About to save")
})
personSchema.post("save", async function () {
    console.log("Just saved")
})
const Person = mongoose.model("Person", personSchema)