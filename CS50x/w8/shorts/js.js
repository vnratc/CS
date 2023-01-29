var wkArray = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturdat',
    'sunday'
]

var nums = [1, 2, 3, 4, 5]
nums = nums.map(function(any_variable_name0) {
    return any_variable_name0 * 2;
});
console.log(nums)

// for (day in wkArray) {
//     console.log(wkArray[day] + ' is day number ' + (parseInt(day) + 1) + ' of the week!');
// }
    
// Add an element at the end
wkArray.push("eigth's_day");
// Remove first element
wkArray.shift()

function alertName(event) { // event is generated automatically by the page and contains information about what just happened.
    var any_variable_name1 = event.srcElement;
    alert('You clicked on ' + any_variable_name1.innerHTML);
}

// wkArray[wkArray.length] = "nine'th_day"

// for (var day of wkArray) {
//     console.log(day);
// }

// console.log(wkArray.length)
// console.log(wkArray.size)

