const args = process.argv.slice(2)
for (let i = 0; i < args.length; i++) {
    console.log(`Hello ${args[i]}`)
}

for (let arg of args) {
    console.log(`Hi ${arg}`)
}

