// let input = prompt('Say something')
// while (true) {
//     input = prompt(input);
//     if (input === 'stop') { 
//         break;
//     }
// }
// console.log('stopped')

let maximum = parseInt(prompt('Enter the maximum number'));
while (!maximum) {
    maximum = parseInt(prompt('Enter a valid number'));
}
const answer = Math.floor(Math.random() * maximum) + 1;
let attempts = 1;

while (true) {
    let guess = prompt('Guess number')
    if (parseInt(guess) === answer) {
        console.log(`CORRECT! It took you ${attempts} attempts`)
        break
    }
    else if (parseInt(guess) < answer) {
        console.log('TOO LOW')
        attempts++
    }
    else if (parseInt(guess) > answer) {
        console.log('TOO HIGH')
        attempts++
    }
    else if (guess === 'q') break;
}
