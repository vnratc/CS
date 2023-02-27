const person = {
    firstName: 'Viggo',
    lastName: 'Mortensen',
    fullName: function () {
        return `${this.firstName} ${this.lastName}`
    },
    shoutName: function () {
        console.log(this)
        setTimeout(() => {
            console.log(this)
        //     // console.log(this.fullName())
        }, 1000)
    }
}



// const person = {
//     firstName: 'Viggo',
//     lastName: 'Mortensen',
//     fullName: function () {
//         return `${this.firstName} ${this.lastName}`
//     },
//     shoutName: function () {
//         setTimeout(() => {
//             //keyword 'this' in arrow functions refers to the value of 'this' when the function is created
//             console.log(this);
//             console.log(this.fullName())
//         }, 3000)
//     }
// }