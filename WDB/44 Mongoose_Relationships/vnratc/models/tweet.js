const mongoose = require('mongoose');
const { Schema } = mongoose

main().then(console.log("*** MONGO CONNECTED ***")).catch(err => console.log("Error", err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/releationshipDemo');
}


const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    // Storing on a "child" a reference to another model (for huge amounts of data)
    user: { type: Schema.Types.ObjectId, ref: "User" } // OBJECT, no array
})

const User = mongoose.model("User", userSchema)
const Tweet = mongoose.model("Tweet", tweetSchema)


// const makeTweets = async () => {
//     // const user = new User({ uesrname: "chickenfan99", age: 61 })
//     const user = await  User.findOne({ username: "chickenfan99" })
//     const tweet2 = new Tweet({ text: "bock boc bcok", likes: 99 })
//     tweet2.user = user
//     // user.save()
//     tweet2.save()
// }
// makeTweets()


const findTweet = async () => {
    const t = await Tweet.find({}).populate("user")
    console.log(t)
}
findTweet()