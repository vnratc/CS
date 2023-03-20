// const input = document.querySelector('input');
// const h1 = document.querySelector('h1');

// // input.addEventListener('change', function (e) {
// //     console.log("CASKDJASKJHD")
// // })

// input.addEventListener('input', function (e) {
//     h1.innerText = input.value;
// })


const input = document.querySelector('input')
const h1 = document.querySelector('h1')

input.addEventListener('change', function(e) {
    console.dir(e)
    
})
input.addEventListener('input', e => {
    console.dir(e)
    h1.innerText = input.value
})
