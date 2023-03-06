document.addEventListener('click', async (event) => {
    let element = event.target;
    // Edit Post
    if (element.classList.contains('btn-edit')) {

        // Replace body with a textarea
        let body = document.querySelector(`#body-${element.id}`)
        body.innerHTML = ''
        let textarea = document.createElement('textarea')
        textarea.classList.add('form-control', 'mb-2')
        textarea.setAttribute('rows', '4')
        // Fill textarea with db data
        await fetch('/edit_post/' + element.id)
        .then(response => response.json())
        .then(post => textarea.value = post.body)
        body.append(textarea)

        // Hide "Edit" and add "Cancel" and "Save" buttons
        element.style.display = 'none'
        let cancel = document.createElement('button')
        cancel.classList.add('btn', 'btn-secondary', 'me-5')
        cancel.innerHTML = "Cancel"
        let save = document.createElement('button')
        save.classList.add('btn', 'btn-primary', 'me-5')
        save.innerHTML = "Save"
        let post_div = document.querySelector(`#btn-div-${element.id}`)
        post_div.prepend(cancel, save)
        // Remove created elements
        function reset() {textarea.remove(), cancel.remove(), save.remove(), element.style.display = 'inline-block'}
        // Cancel action
        cancel.onclick = async () => {
            await fetch('/edit_post/' + element.id)
            .then(response => response.json())
            .then(post => body.innerHTML = post.body.replaceAll('\n', '<br>'))
            reset()
        }

        // Save
        save.onclick = async () => {
            await fetch('/save_edit/' + element.id, {
                method: 'POST',
                body: JSON.stringify(textarea.value)
            })
            .then(response => response.json())
            .then(post => body.innerHTML = post.body.replaceAll('\n', '<br>'))
            reset()  
        }
    }
    // "Like" and "Unlike"
    else if (element.classList.contains('btn-like')) {    // Make sure adding other classes doesn't break this. Replace "ClassName"?
        let likes = document.querySelector(`#lico-${element.id.slice(5, 7)}`)
        await fetch('like/' + element.id.slice(5, 7), {
            method: 'POST',
            body: JSON.stringify(element.innerHTML.trim())
        })
        .then(response => response.json())
        .then(data => {
            likes.innerHTML = `Likes: ${data.likes}`
        })
        if (element.innerHTML === 'Like') {
            element.innerHTML = "Unlike"
        } else if (element.innerHTML === 'Unlike') {
            element.innerHTML = 'Like'
        }
    }
})


// Fix new line for post body
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.body').forEach(body => {
        body.innerHTML = body.innerHTML.replaceAll('\n', '<br>')
    }) 
})



