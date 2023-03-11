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

    document.querySelectorAll('input, select').forEach(input => {
        input.onchange = () => {
            query_db()            
        } 
    })
})

// Helper functions

function create_room_div(room_id, room_title, room_bed_num, room_description) {
    let room_div = document.createElement('div')
    room_div.classList.add('room-item','rounded', 'border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25')
    room_div.id = room_id
    room_div.innerHTML = `${room_title}, Beds: ${room_bed_num}<br>${room_description.replaceAll('\n', '<br>')}`
    return room_div
}

function remove_results() {
    let elements = document.querySelectorAll('#results-div > *')
    for (let e of elements) {e.remove()}
    return
}

function remove_room() {
    room_del = document.querySelectorAll('#room-div > *')
    for (r of room_del) {r.remove()}
}

function remove_reservations() {
    res_del = document.querySelectorAll('#profile-div > *')
    for (r of res_del) {r.remove()}
}

async function query_db() {
    remove_results()
    remove_room()
    let title = document.createElement('h2')
    title.innerHTML = 'Available Rooms:'
    document.querySelector('#results-div').prepend(title)
    // Fetch search request
    let chin = document.querySelector('#checkin').value
    let chout = document.querySelector('#checkout').value
    let pers_num = document.querySelector('#pers_num').value
    let req_room = document.querySelector('#req_room').value
    await fetch(`search?chin=${chin}&chout=${chout}&pers_num=${pers_num}&req_room=${req_room}`)
    .then(response => response.json())
    .then(rooms => {
        try {
            for (room of rooms) {
                let room_div = create_room_div(room.id, room.title, room.bed_num, room.description)
                document.querySelector('#results-div').append(room_div)
            }
        } catch (e) {
            console.log(rooms)
        }
    })
    document.querySelectorAll('.room-item').forEach(room => {
        room.addEventListener('click', () => {
            select_room(room.id)
        })
    })
    return
}

// Primary functions

function search() {
    // Show 'search
    document.querySelector('#search-div').style.display = 'block'
    document.querySelectorAll('#results-div, #rooms-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
    remove_results()
    remove_room()
    remove_reservations()
}

async function results() {
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#rooms-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
    query_db()
}

async function select_room(room_id) {
    document.querySelectorAll('#results-div, #room-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
    document.querySelector('#room-div').style.display = 'block'
    remove_results()
    await fetch('room/' + parseInt(room_id))
    .then(response => response.json())
    .then(room => {
        let room_div = create_room_div(room.id, room.title, room.bed_num, room.description)
        document.querySelector('#room-div').append(room_div)
        let reserve_btn = document.createElement('button')
        reserve_btn.id = 'reserve-' + room.id
        reserve_btn.innerHTML = 'Reserve'
        document.querySelector('#room-div').append(reserve_btn)
        reserve_btn.addEventListener('click', () => {
            reserve(room)
        })
        
    })
}

async function reserve(room) {
    fetch(`room/${room.id}/reserve` , {
        method: 'POST',
        body: JSON.stringify({
            chin: document.querySelector('#checkin').value,
            chout: document.querySelector('#checkout').value,
            pers_num: parseInt(document.querySelector('#pers_num').value),
            req_room: parseInt(room.id)
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    profile()
}




function rooms() {
    // Show all rooms
    document.querySelector('#rooms-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
        remove_room()
        remove_results()
        remove_reservations()
    })
}

async function profile() {
    // Show profile
    document.querySelector('#profile-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #rooms-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
    remove_reservations()
    remove_room()
    remove_results()
    await fetch('profile')
    .then(response => response.json())
    .then(reservations => {
        let title = document.createElement('h2')
        title.innerHTML = 'My Reservations:'
        document.querySelector('#profile-div').prepend(title)
        for (res of reservations) {
            let res_div = document.createElement('div')
            res_div.classList.add('room-item','rounded', 'border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25')
            res_div.id = res.id
            res_div.innerHTML = `${res.room_title}, Beds: ${res.room_bed_num}<br>${res.checkin} - ${res.checkout}<br>${res.room_description.replaceAll('\n', '<br>')}`
            document.querySelector('#profile-div').append(res_div)
        }
    })
}