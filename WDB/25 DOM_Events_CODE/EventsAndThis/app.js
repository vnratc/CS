// const makeRandColor = () => {
//     const r = Math.floor(Math.random() * 255);
//     const g = Math.floor(Math.random() * 255);
//     const b = Math.floor(Math.random() * 255);
//     return `rgb(${r}, ${g}, ${b})`;
// }

// const buttons = document.querySelectorAll('button');

// for (let button of buttons) {
//     button.addEventListener('click', colorize)
// }

// const h1s = document.querySelectorAll('h1');
// for (let h1 of h1s) {
//     h1.addEventListener('click', colorize)
// }

// function colorize() {
//     this.style.backgroundColor = makeRandColor();
//     this.style.color = makeRandColor();
// }


function ranNum() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
}

// document.querySelector('#color').addEventListener('click', () => {
//     if (r < 100 && g < 100 && b < 100) {
//         document.querySelector('h1').style.color = 'white'
//     } else document.querySelector('h1').style.color = 'black'
//     document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
//     document.querySelector('h1').innerText = `rgb(${r}, ${g}, ${b})`
// })

const buttons = document.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', colorize)
})

// for (let button of buttons) {
//     button.addEventListener('click', colorize)
// }

const h1s = document.querySelectorAll('h1')

for (let h1 of h1s) {
    h1.addEventListener('click', colorize)
}

function colorize() {
    this.style.backgroundColor = ranNum()
    this.style.color = ranNum()
}