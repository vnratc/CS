const joking = require("give-me-a-joke")
const colors = require("colors")
// const cowsay = require("cowsay")
// To get a random Chuck Norris joke
joking.getRandomDadJoke(function(joke) {
    console.log(joke.red);
});

