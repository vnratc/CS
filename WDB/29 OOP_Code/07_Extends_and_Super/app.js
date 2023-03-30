// class Pet {
// 	constructor(name, age) {
// 		console.log('IN PET CONSTRUCTOR!');
// 		this.name = name;
// 		this.age = age;
// 	}
// 	eat() {
// 		return `${this.name} is eating!`;
// 	}
// }

// class Cat extends Pet {
// 	constructor(name, age, livesLeft = 9) {
// 		console.log('IN CAT CONSTRUCTOR!');
// 		super(name, age);
// 		this.livesLeft = livesLeft;
// 	}
// 	meow() {
// 		return 'MEOWWWW!!';
// 	}
// }

// class Dog extends Pet {
// 	bark() {
// 		return 'WOOOF!!';
// 	}
// 	eat() {
// 		return `${this.name} scarfs his food!`;
// 	}
// }





class Pet {
	constructor(name, age) {
		console.log("In Pet constructor")
		this.name = name
		this.age = age
	}
	eat() {
		return `${this.name} is eating!`
	}
}


class Cat extends Pet {
	constructor(name, age, livesLeft = 9) {
		console.log("In Cat constructor")
		super(name, age)
		this.livesLeft = livesLeft
	}
	meow() {
		return "MEOOWWW"
	}
}


class Dog extends Pet {
	bark() {
		return "WOOOFF"
	}
}


// const monty = new Cat("Monty", 9)
// const wyatt = new Dog("Wyatt", 13)



