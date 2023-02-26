function load_mailbox(mailbox) {

    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#view-email').style.display = 'none';
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    // Mailbox

    fetch('/emails/' + mailbox)
    .then(response => response.json())
    .then(emails => {
        for (email of emails) {
            let div = document.createElement('div');
            div.classList.add('email-item')
            if (email.read === true) {
                div.classList.add('read')
            } else {
                div.classList.add('unread')
            }
            // Store email.id in a dataset of this div
            div.dataset.id = email.id;
            div.innerHTML = `From: ${email.sender}. Subject: ${email.subject}. Date & Time: ${email.timestamp}.`
            document.querySelector('#emails-view').append(div)
            
            // Archive and Unarchive
            
        //     let button = document.createElement('button')
        //     if (mailbox === 'inbox') {
        //         button.classList.add('btn', 'btn-primary')
        //         button.dataset.id = email.id
        //         button.innerHTML =  `Archive`
        //         document.querySelector('#emails-view').append(button)
        //         button.onclick = () => {
        //             fetch('/emails/' + button.dataset.id, {
        //                 method: 'PUT',
        //                 body: JSON.stringify({
        //                     archived: true
        //                 })
        //             })
        //             load_mailbox('inbox')
        //         }
        //     }
        //     else if (mailbox === 'archive') {
        //         button.classList.add('btn', 'btn-success')
        //         button.dataset.id = email.id
        //         button.innerHTML =  `Unarchive`
        //         document.querySelector('#emails-view').append(button)
        //         button.onclick = () => {
        //             fetch('/emails/' + button.dataset.id, {
        //                 method: 'PUT',
        //                 body: JSON.stringify({
        //                     archived: false
        //                 })
        //             })
        //             load_mailbox('inbox')
        //         }
        //     }
        // }

        // View Email

        document.querySelectorAll('.email-item').forEach(email_item => {
            email_item.onclick = function() {
                document.querySelector('#emails-view').style.display = 'none';
                document.querySelector('#view-email').style.display = 'block';
                fetch('emails/' + email_item.dataset.id)
                .then(response => response.json())
                .then(email => {
                    // Create 5 divs
                    for (let i = 0; i < 5; i++) {
                        let new_div = document.createElement('div')
                        new_div.setAttribute('id', 'div-' + i)
                        new_div.classList.add('email-content')
                        document.querySelector('#view-email').append(new_div)
                    }
                    // Populate divs with data
                    document.querySelector('#div-0').innerHTML = `From: ${email.sender}`
                    document.querySelector('#div-1').innerHTML = `Recipients: ${email.recipients}`
                    document.querySelector('#div-2').innerHTML = `Subject: ${email.subject}`
                    document.querySelector('#div-3').innerHTML = `Date & Time: ${email.timestamp}`
                    document.querySelector('#div-4').innerHTML = `${email.body}`
                })
                fetch('emails/' + email_item.dataset.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        read: true
                    })
                })

            // Archive and Unarchive

               let button = document.createElement('button')
                if (mailbox === 'inbox') {
                    button.classList.add('btn', 'btn-primary')
                    button.dataset.id = email.id
                    button.innerHTML =  `Archive`
                    document.querySelector('#view-email').append(button)
                    button.onclick = () => {
                        fetch('/emails/' + button.dataset.id, {
                            method: 'PUT',
                            body: JSON.stringify({
                                archived: true
                            })
                        })
                        load_mailbox('inbox')
                    }
                }
                else if (mailbox === 'archive') {
                    button.classList.add('btn', 'btn-success')
                    button.dataset.id = email.id
                    button.innerHTML =  `Unarchive`
                    document.querySelector('#emails-view').append(button)
                    button.onclick = () => {
                        fetch('/emails/' + button.dataset.id, {
                            method: 'PUT',
                            body: JSON.stringify({
                                archived: false
                            })
                        })
                        load_mailbox('inbox')
                }
            }
        })
    })

}