// Navigation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#search, #page-title').forEach(el => {
        el.addEventListener('click', () => {
            search()
        })
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
    console.log('test')
    // Show 'search
    document.querySelector('#search-div').style.display = 'block'
    document.querySelectorAll('#results-div, #rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


function results() {
    console.log('test')
    // Show results
    document.querySelector('#results-div').style.display = 'block'
    document.querySelectorAll('#search-div, #rooms-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


function rooms() {
    console.log('test')
    // Show all rooms
    document.querySelector('#rooms-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #profile-div').forEach(div => {
        div.style.display = 'none'
    })
}


function profile() {
    console.log('test')
    // Show profile
    document.querySelector('#profile-div').style.display = 'block'
    document.querySelectorAll('#search-div, #results-div, #rooms-div').forEach(div => {
        div.style.display = 'none'
    })
}