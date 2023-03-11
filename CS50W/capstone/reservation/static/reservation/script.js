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
    for (r of room_del) (r.remove())
}

async function query_db() {
    remove_results()
    // Fetch search request
    let chin = document.querySelector('#checkin').value
    let chout = document.querySelector('#checkout').value
    let pers_num = document.querySelector('#pers_num').value
    await fetch(`search?chin=${chin}&chout=${chout}&pers_num=${pers_num}`)
    .then(response => response.json())
    .then(rooms => {
        try {
            for (room of rooms) {
                let room_div = create_room_div(room.id, room.title, room.bed_num, room.description)
                document.querySelector('#results-div').append(room_div)
            }
        } catch (e) {
            console.log(e instanceof TypeError)
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
    remove_results()
    // Show 'search
    document.querySelector('#search-div').style.display = 'block'
    document.querySelectorAll('#results-div, #rooms-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}

async function results() {
    remove_room()
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#rooms-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
    query_db()  
}

async function select_room(room_id) {
    remove_results()
    document.querySelectorAll('#results-div, #room-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
    document.querySelector('#room-div').style.display = 'block'
    await fetch('rooms/' + parseInt(room_id))
    .then(response => response.json())
    .then(room => {
        let room_div = create_room_div(room.id, room.title, room.bed_num, room.description)
        document.querySelector('#room-div').append(room_div)
        console.log(room)
    })
}

function rooms() {
    remove_room()
    remove_results()
    // Show all rooms
    document.querySelector('#rooms-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #profile-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}

function profile() {
    remove_room()
    remove_results()
    // Show profile
    document.querySelector('#profile-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #rooms-div, #room-div').forEach(div => {
        div.style.display = 'none'
    })
}