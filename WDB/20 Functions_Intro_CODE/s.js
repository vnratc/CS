// function roll()  {
//     return Math.floor(Math.random() * 6) + 1;
// }
// let number = prompt('number')
// console.log(roll(number))


// let roll1 = Math.floor(Math.random() * 6) + 1
// let roll2 = Math.floor(Math.random() * 6) + 1
// console.log(roll1, roll2)

// function isSnakeEyes(i, j) {
//     if (i === 1 && j === 1) {
//         console.log('Snake Eyes')
//     }
//     else {
//         console.log('Not Snake Eyes')
//     }
// }

// isSnakeEyes(roll1, roll2)

// function repeat(str, numTimes) {
//     let result = '';
//     for (let i = 0; i < numTimes; i++) {
//         result += str;
//         console.log(result)
//     }
// }

// function multiply(x, y) {
//     return x * y
// }


// function multiply(x, y) {
//     x = prompt("enter 1st number")
//     y = prompt("enter 2nd number")
//     return (x * y)
// }

// function isShortsWeather(temperature) {
//     if (temperature >= 75) {return true}
//     return false
// }


// let list = [3,6,8,7,9,3,7,8]

// function lastElement (array) {
//     if (array.length === 0) {return null}
//     return array[array.length - 1]
// }

// function capitalize(str) {
//     let firstLetter = str.slice(0, 1)
//     let remainder = str.slice(1)
//     return firstLetter.toUpperCase() + remainder
// }


// function sumArray(arr) {
//     let sum = 0;
//     for (let num of arr) {
//         sum += num
//     }
//     return sum
// }

// function returnDay(number) {
//     let week = {
//         1: 'Monday',
//         2: 'Tuesday',
//         3: 'Wednesday', 
//         4: 'Thursday',
//         5: 'Friday',
//         6: 'Saturday',
//         7: 'Sunday'
//     }
//     if (number < 1 || number > 7) {
//         return null
//     }
//     return week[number]
// }