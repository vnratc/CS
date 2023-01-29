function cs50Info(name) {
    // create a new AJAX object
    var ajax = new XMLHttpRequest();
    // If nothing is chosed
    // when page is loaded, have a callback function pre-fill our div
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            $('#infodiv').html(ajax.responseText);
        }
    };
    if(name == 'blank') {
        ajax.open('GET', name + '.html', true)
        ajax.send
        // return;
    }
    else {  // open the requested file and transmit data
        ajax.open('GET', name + '.html', true);
        ajax.send();
    };
}