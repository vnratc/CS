// Navigation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#search').addEventListener('click', () => {
        search()
    })
    document.querySelector('#search-btn').addEventListener('click', () => {
        results()
    })
    document.querySelector('#rooms').addEventListener('click', () => {
        rooms()
    })
    document.querySelector('#profile').addEventListener('click', () => {
        profile()
    })
    // By default show 'search'
    search()

    document.querySelectorAll('input').forEach(input => {
        input.onchange = query_db
    })
})


function search() {
    // Show 'search
    document.querySelector('#search-div').style.display = 'block'
    document.querySelectorAll('#results-div, #rooms-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}

async function query_db() {
    // Remove previously created elements
    let elements = document.querySelectorAll('#results-div > *')
    for (let e of elements) {e.remove()}
    // Fetch search request
    let chin = document.querySelector('#checkin').value
    let chout = document.querySelector('#checkout').value
    let pers_num = document.querySelector('#pers_num').value
    await fetch(`search?chin=${chin}&chout=${chout}&pers_num=${pers_num}`)
    .then(response => response.json())
    .then(rooms => {
        try {
            for (room of rooms) {
                let room_div = document.createElement('div')
                room_div.classList.add('room-item','rounded', 'border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25')
                room_div.id = room.id
                room_div.innerHTML = `${room.title}, Beds: ${room.bed_num}<br>${room.description.replaceAll('\n', '<br>')}`
                document.querySelector('#results-div').append(room_div)
            }
        } catch (e) {
            console.log(e instanceof TypeError)
        }
    })
    return
}


async function results() {
    // // Remove previously created elements
    // let elements = document.querySelectorAll('#results-div > *')
    // for (let e of elements) {e.remove()}
    // Show results
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
    query_db()
    // // Fetch search request
    // let chin = document.querySelector('#checkin').value
    // let chout = document.querySelector('#checkout').value
    // let pers_num = document.querySelector('#pers_num').value
    // await fetch(`search?chin=${chin}&chout=${chout}&pers_num=${pers_num}`)
    // .then(response => response.json())
    // .then(rooms => {
    //     console.log(rooms)
    //     try {
    //         for (room of rooms) {
    //             let room_div = document.createElement('div')
    //             room_div.classList.add('room-item','rounded', 'border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25')
    //             room_div.id = room.id
    //             room_div.innerHTML = `${room.title}, Beds: ${room.bed_num}<br>${room.description.replaceAll('\n', '<br>')}`
    //             document.querySelector('#results-div').append(room_div)
    //         }
    //     } catch (e) {
    //         console.log(e instanceof TypeError)
    //     }
    // })
    
    document.querySelectorAll('.room-item').forEach(room => {
        room.addEventListener('click', () => {
            select_room(room.id)
        })
    })
}


function select_room(room_id) {

    console.log(room_id)
}


function rooms() {
    // Show all rooms
    document.querySelector('#rooms-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}


function profile() {
    // Show profile
    document.querySelector('#profile-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #rooms-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}