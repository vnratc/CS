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
    document.querySelector('#search-div').style.display = 'block'
    document.querySelectorAll('#results-div, #rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


function results() {
    // Show results
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
    // Fetch search request
    fetch('search', {
        method: 'POST',
        body: JSON.stringify({
            checkin: document.querySelector('#checkin').value,
            checkout: document.querySelector('#checkout').value,
            pers_num: document.querySelector('#pers_num').value,
            room: document.querySelector('#room').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
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