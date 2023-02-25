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

// const firstDiv = "<div><p>Первый заголовок</p>p>Первый заголовок</p></div>";
// if (firstDiv.includes('<p>')) {
//     let n = firstDiv.indexOf('<p>');
//     let counter = firstDiv.indexOf('<p>', n+1);
//     counter <= 0 ? console.log(false) : console.log(true);
// } else {
//     console.log(false)
// }

let road = "15 km"
// const findIndex = road.indexOf('km');
// console.log(findIndex)
// let roadMiles = road.slice(0, findIndex).trim();
// console.log(roadMiles)
// roadMiles = parseFloat(roadMiles * 0.62).toFixed(1);
// console.log(roadMiles);

// let length = +road.split(" ")[0];
// console.log((length * 0.62).toFixed(1))

// let words = "Солнечная панель";
// words.includes(" ") ? console.log("В строке больше одного слова") : console.log("В строке одно слово");

// let sum = 45
// sum === 5 * 9 ? console.log("true") : console.log("false")

let phone = "+712:34567*8,90";
const re = /\+:*,/g
let reg = /(\+\d+)?[^,:*\s]?(\d+)/g;
let res = phone.match(reg);
console.log(res.join(''));

let str = "asdf8907sdfg987addsjhgk;e4jt34oitdogjsdokffsf97sad809"

