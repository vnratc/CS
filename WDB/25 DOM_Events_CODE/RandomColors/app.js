// const button = document.querySelector('button');
// const h1 = document.querySelector('h1');

// button.addEventListener('click', function () {
//     const newColor = makeRandColor();
//     document.body.style.backgroundColor = newColor;
//     h1.innerText = newColor;
// })

// const makeRandColor = () => {
//     const r = Math.floor(Math.random() * 255);
//     const g = Math.floor(Math.random() * 255);
//     const b = Math.floor(Math.random() * 255);
//     return `rgb(${r}, ${g}, ${b})`;
// }

function ranNum() {
    return Math.floor(Math.random() * 255)
}

document.querySelector('#color').addEventListener('click', () => {
    let r = ranNum()
    let g = ranNum()
    let b = ranNum()
    if (r < 100 && g < 100 && b < 100) {
        document.querySelector('h1').style.color = 'white'
    } else document.querySelector('h1').style.color = 'black'
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    document.querySelector('h1').innerText = `rgb(${r}, ${g}, ${b})`
})

    // setInterval(() => {
    //     let r = ranNum()
    //     let g = ranNum()
    //     let b = ranNum()
    //     document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    // }, 1000)