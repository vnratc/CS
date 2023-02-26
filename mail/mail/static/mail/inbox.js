document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

    // By default, load the inbox
    load_mailbox('inbox');
    
    // Send Mail

    // By default "Send" button is disabled
    document.querySelector('#send').disabled = true;
    // Enable "Send" button if body inpyt is filled
    document.querySelector('#compose-body').onkeyup = () => {
        if (document.querySelector('#compose-body').value.length > 0) {
            document.querySelector('#send').disabled = false;
        } else {
            document.querySelector('#send').disabled = true;
        }
    }
    // On form submit
    document.querySelector('#compose-form').onsubmit = function() {    
        fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({  // This "body" object is used in "compose" view to extract forms' values.
                recipients: document.querySelector('#compose-recipients').value,
                subject: document.querySelector('#compose-subject').value,
                body: document.querySelector('#compose-body').value

            })
        })
        document.querySelector('#send').disabled = true
    }
});

function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#view-email').style.display = 'none';

    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

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
        }

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
                        new_div.setAttribute('id', 'div' + i)
                        new_div.classList.add('email-content')
                        document.querySelector('#view-email').append(new_div)
                    }
                    // Populate divs with data
                    document.querySelector('#div0').innerHTML = `From: ${email.sender}`
                    document.querySelector('#div1').innerHTML = `Recipients: ${email.recipients}`
                    document.querySelector('#div2').innerHTML = `Subject: ${email.subject}`
                    document.querySelector('#div3').innerHTML = `Date & Time: ${email.timestamp}`
                    document.querySelector('#div4').innerHTML = `${email.body}`
                })
                fetch('emails/' + email_item.dataset.id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        read: true
                    })
                })
            }
        })
    })

}
