const form = document.querySelector('#score-form')
const p1Span = document.querySelector('#p1-score')
const p2Span = document.querySelector('#p2-score')
const max = document.querySelector('#max')
const pButtons = document.querySelectorAll('#one, #two')

let p1 = 0
let p2 = 0

form.addEventListener('submit', e => {
    e.preventDefault()
})

form.addEventListener('click', e => {
    switch (e.target.name) {
        case 'one': 
            p1 += 1
            if (p1 === parseInt(max.value)) {
                p1Span.style.color = 'green'
                p2Span.style.color = 'red'
                pButtons.forEach(b => b.disabled = true)
            }
            break
        case 'two': 
            p2 += 1
            if (p2 === parseInt(max.value)) {
                p2Span.style.color = 'green'
                p1Span.style.color = 'red'
                pButtons.forEach(b => b.disabled = true)
            }
            break
        case 'reset':
            reset()
            break
        }
        inner()
})

max.addEventListener('change', reset)

function reset() {
    p1 = 0
    p2 = 0
    p1Span.style.color = 'black'
    p2Span.style.color = 'black'
    pButtons.forEach(b => b.disabled = false)
    inner()
}

function inner(){
    p1Span.innerText = p1
    p2Span.innerText = p2
}














































// const p1 = {
//     score: 0,
//     button: document.querySelector('#p1Button'),
//     display: document.querySelector('#p1Display')
// }
// const p2 = {
//     score: 0,
//     button: document.querySelector('#p2Button'),
//     display: document.querySelector('#p2Display')
// }

// const resetButton = document.querySelector('#reset');
// const winningScoreSelect = document.querySelector('#playto');
// let winningScore = 3;
// let isGameOver = false;

// function updateScores(player, opponent) {
//     if (!isGameOver) {
//         player.score += 1;
//         if (player.score === winningScore) {
//             isGameOver = true;
//             player.display.classList.add('has-text-success');
//             opponent.display.classList.add('has-text-danger');
//             player.button.disabled = true;
//             opponent.button.disabled = true;
//         }
//         player.display.textContent = player.score;
//     }
// }


// p1.button.addEventListener('click', function () {
//     updateScores(p1, p2)
// })
// p2.button.addEventListener('click', function () {
//     updateScores(p2, p1)
// })


// winningScoreSelect.addEventListener('change', function () {
//     winningScore = parseInt(this.value);
//     reset();
// })

// resetButton.addEventListener('click', reset)

// function reset() {
//     isGameOver = false;
//     for (let p of [p1, p2]) {
//         p.score = 0;
//         p.display.textContent = 0;
//         p.display.classList.remove('has-text-success', 'has-text-danger');
//         p.button.disabled = false;
//     }
// }




