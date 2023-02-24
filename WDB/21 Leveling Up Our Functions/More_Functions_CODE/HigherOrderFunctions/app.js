// let greet = function() {console.log("HI!")}
// greet()


// function callTwice(func) {
//     func();
//     func();
// }

// function callTenTimes(f) {
//     for (let i = 0; i < 10; i++) {
//         f()
//     }
// }

// function rollDie() {
//     const roll = Math.floor(Math.random() * 6) + 1
//     console.log(roll)
// }

// callTenTimes(rollDie)
// callTwice(rollDie)

// - RETURNING A FUNCTION - 

// function makeMysteryFunc() {
//     const rand = Math.random();
//     if (rand > 0.5) {
//         return function() {
//             console.log("CONGRATS, I AM A GOOD FUNCTION!")
//             console.log("YOU WON A MILLION DOLLARS")
//         }

//     } else {
//         return function() {
//             alert("YOU HAVE BEEN INFECTED BY COVID19")
//             alert("STOP CLOSING VINDOW")
//         }
//     }
// }

// - ARROW FUNCTION EXPRESSION -
// 1
// function (a) {
//     return a + 100;
// }
// // 2
// (a) => {
//     return a + 100
// }
// // 3
// (a) => a + 100
// // 4
// a => a + 100
// // function (a) {return a + 100}
// // a => a + 100

// FACTORY FUNCTION
//  

// makeBetweenFunc(50, 100) =>

// function isBetween(num) {
//     return num >= 50 && num <=100
// }
// function isBetween2(num) {
//     return num >= 1 && num <=10
// }


































// // ======================
// // FUNCTIONS AS ARGUMENTS
// // ======================

// function callTwice(func) {
//     func();
//     func();
// }

// function callTenTimes(f) {
//     for (let i = 0; i < 10; i++) {
//         f()
//     }
// }

// function rollDie() {
//     const roll = Math.floor(Math.random() * 6) + 1
//     console.log(roll)
// }

// callTwice(rollDie)

// // ====================
// // RETURNING FUNCTIONS
// // ====================

// function makeMysteryFunc() {
//     const rand = Math.random();
//     if (rand > 0.5) {
//         return function () {
//             console.log("CONGRATS, I AM A GOOD FUNCTION!")
//             console.log("YOU WIN A MILLION DOLLARS!!")
//         }
//     } else {
//         return function () {
//             alert("YOU HAVE BEEN INFECTED BY A COMPUTER VIRUS!")
//             alert("STOP TRYING TO CLOSE THIS WINDOW!")
//             alert("STOP TRYING TO CLOSE THIS WINDOW!")
//             alert("STOP TRYING TO CLOSE THIS WINDOW!")
//             alert("STOP TRYING TO CLOSE THIS WINDOW!")
//             alert("STOP TRYING TO CLOSE THIS WINDOW!")
//         }
//     }
// }


// function makeBetweenFunc(min, max) {
//     return function (num) {
//         return num >= min && num <= max;
//     }
// }



