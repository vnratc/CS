// try {
//     hello.toUpperCase();
// } catch {
//     console.log("error!")
// }


function yell(msg) {
    try {
        console.log(msg.toUpperCase().repeat(3))
    } 
    catch (e) {
        console.log(e)
        console.log("Need to pass a string")
    }
}


// try {
//     hello.toUpperCase();
// } catch {
//     console.log("ERROR!!!!")
// }
// hello.toUpperCase();

// console.log("AFTER!")

// function yell(msg) {
//     try {
//         console.log(msg.toUpperCase().repeat(3));
//     } catch (e) {
//         console.log("Please pass a string next time!")
//     }
// }