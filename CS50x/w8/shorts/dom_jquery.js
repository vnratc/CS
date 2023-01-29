// Individual Functions for Background Color
function turnPurple() {
    document.getElementById('colorDiv').style.backgroundColor = 'purple';
}

function turnGreen() {
    document.getElementById('colorDiv').style.backgroundColor = 'green';
}

// One Single Function for Background Color
function changeColor(color) {
    document.getElementById('colorDiv').style.backgroundColor = color;
}

// Event Handler for Background Color
function changeColorEvent(event) {
    var variable = event.srcElement;
    document.getElementById('colorDiv').style.backgroundColor = variable.innerHTML.toLowerCase();
}

// Using jQuery
$(document).ready(function() {
    $('.jQButton').click(function() {
        $('#colorDiv').css('background-color', this.innerHTML.toLowerCase());
    });
});