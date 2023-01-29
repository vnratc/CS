function myfunc(name) {
    // create a new AJAX object
    var myvar = new XMLHttpRequest();
    // If nothing is chosed
    // when page is loaded, have a callback function pre-fill our div
    myvar.onreadystatechange = function() {
        // if (myvar.readyState == 4 && myvar.status == 200) {
        $('#infodiv').html(myvar.responseText);
        // }
    };
    if(name == '') {
        myvar.open('GET', 'blank.html', true)
        myvar.send
        // return;
    }
    else {  // open the requested file and transmit data
        myvar.open('GET', name + '.html', true);
        myvar.send();
    };
}