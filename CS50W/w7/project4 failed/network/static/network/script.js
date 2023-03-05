// Start with first post
let counter = 1;

// Load posts 10 at a time
const quantity = 10;

// When DOM loads, render the lates 10 posts
document.addEventListener('DOMContentLoaded', load);

// If Next Page button is clicked
document.querySelector('#next-page').onclick = load

// Load 10 posts
function load() {
    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    
    .then(data => {
        data.forEach(add_post);
    })
}

// Add a new post to DOM
function add_post(contents) {
    
    const post = document.createElement('div')
    post.classList.add('border', 'border-secondary', 'p-2', 'my-3', 'border-opacity-25', 'rounded')
    post.innerHTML = `${contents.username}<br>${contents.body.replaceAll('\n', '<br>')}<br>${contents.timestamp}<br>Likes: ${contents.likes}`;
    document.querySelector('#posts-json').append(post)
}

// document.addEventListener('DOMContentLoaded'), function () {

// fetch("")
//     .then(response => response.json())
//     .then(data => console.log(data))

// }