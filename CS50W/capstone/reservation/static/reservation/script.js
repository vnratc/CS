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
})


function search() {
    // Show 'search
    document.querySelectorAll('#search-div, #results-div').forEach(div => {
        div.style.display = 'block'
    })
    document.querySelectorAll('#rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


async function results() {
    // Remove previously created elements
    let elements = document.querySelectorAll('#results-div > *')
    for (let e of elements) {e.remove()}
    // Show results
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
    // Fetch search request
    // document.querySelector('#search-form').addEventListener('submit', e => {
    //     e.preventDefault
    //     let chin = document.querySelector('#checkin').value
    //     let chout = document.querySelector('#checkout').value
    //     let pers_num = document.querySelector('#pers_num').value
    //     let room = document.querySelector('#room').value
    // })
    // let data = new FormData(document.getElementById('search-form'))


    // console.log(data.entries())

    let chin = document.querySelector('#checkin').value
    let chout = document.querySelector('#checkout').value
    let pers_num = document.querySelector('#pers_num').value
    // let room = document.querySelector('#room').value
    await fetch(`search?chin=${chin}&chout=${chout}&pers_num=${pers_num}`)

    // await fetch('search', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         checkin: document.querySelector('#checkin').value,
    //         checkout: document.querySelector('#checkout').value,
    //         pers_num: document.querySelector('#pers_num').value,
    //         room: document.querySelector('#room').value
    //     })
    // })
    .then(response => response.json())
    .then(rooms => {
        console.log(rooms)
        for (room of rooms) {
            let room_div = document.createElement('div')
            room_div.classList.add('rounded', 'border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25')
            room_div.id = room.id
            room_div.innerHTML = `${room.title}, Beds: ${room.bed_num}<br>${room.description.replaceAll('\n', '<br>')}`
            document.querySelector('#results-div').append(room_div)
        }
    })
    // add onclick select, create 'reserve' button
}


function rooms() {
    // Show all rooms
    document.querySelector('#rooms-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


function profile() {
    // Show profile
    document.querySelector('#profile-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #rooms-div').forEach(div => {
        div.style.display = 'none'
    })
}