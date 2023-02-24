const myMath0 = {
    PI: 3.14159,
    square: function(num) {
        return num * num
    },
    cube: function(num) {
        return num ** 3
    }
}

// - SHORTHAND FOR DOING THE SAME REMOVE :function
const myMath1 = {
    PI: 3.14159,
    square(num) {
        return num * num
    },
    cube(num) {
        return num ** 3
    }
}

const square = {
    area: function(side) {
        return side * side
    },
    perimeter(side) {
        return side * 4
    }
}

const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow(){
        console.log("THIS IS: ", this)
        console.log(`MEOW! I am ${this.name}, colored ${this.color}, my breed is ${this.breed}!`)
    }
}

const meow2 = cat.meow

function scream() {
    console.log("AAHHHHHH!")
}


const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount++
        return "EGG"
    }
}

// const myMath = {
//     PI: 3.14159,
//     square(num) {
//         return num * num;
//     },
//     cube(num) {
//         return num ** 3;
//     }
// }

// const cat = {
//     name: 'Blue Steele',
//     color: 'grey',
//     breed: 'scottish fold',
//     meow() {
//         console.log("THIS IS:", this)
//         console.log(`${this.name} says MEOWWWW`);
//     }
// }

// const meow2 = cat.meow;