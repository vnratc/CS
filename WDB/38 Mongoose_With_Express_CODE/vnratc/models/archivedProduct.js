const mongoose = require("mongoose")

const archivedSchema = new mongoose.Schema({
    archiveProduct: {
        type: Array
    }
})
const ArchivedProduct = mongoose.model("ArchivedProduct", archivedSchema)
module.exports = ArchivedProduct