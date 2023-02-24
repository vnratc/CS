let list = ['shopping', 'laundry', 'swimming', 'gym', 'wash dishes']
let commands = ['new', 'list', 'delete', 'quit']
while (true) {
    // Prompt for a command
    let command = prompt('Enter command').toLowerCase();    
    // Check if user wants to quit
    let item = '';
    if (command.toLowerCase() === 'quit') {
        console.log('YOU QUIT THE PROGRAM')
        break
    }
    // Alert if unsupported command
    else if (!commands.includes(command)) {
        alert('invalid command')
    }
    else if (command === 'list') {
        console.log('----------')
        for (i of list) {
            console.log(i)
        }
        console.log('----------')
    }
    else if (command === 'new') {
        item = prompt('Enter item')
        list.push(item)
        console.log(`'${item}' added to the list.`)
    }
    else if (command === 'delete') {
        item = prompt('Enter item')
        if (list.includes(item)) {
            list.splice(list.indexOf(item), 1)
            console.log(`'${item}' was deleted from the list`)
        }
        else {
            alert('Invalid item')
        }
    }
}
