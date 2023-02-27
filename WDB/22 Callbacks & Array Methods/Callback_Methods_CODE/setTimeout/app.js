// console.log("HELLO!!!...")
// setTimeout(() => {
//     console.log("...are you still there?")
// }, 3000)

// console.log("GOODBYE!!")


// const id = setInterval(() => {
//     console.log(Math.random())
// }, 2000);

// // clearInterval(id);

// setTimeout(() => {
//     console.log('HELLO!!!')
// }, 2000)

// setInterval returns id for that particular interval. New setInterval call will have different id.
const id = setInterval(() => {
    console.log(Math.floor(Math.random() * 100))
}, 1000)

// To stop interval call
clearInterval(id)