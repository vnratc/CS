// // NOT AT ALL IMPORTANT TO REMEMBER ANY OF THIS CODE!

// const req = new XMLHttpRequest();

// req.onload = function () {
//   console.log("IT LOADED!!");
//   const data = JSON.parse(this.responseText);
//   console.log(data.name, data.height);
// };

// req.onerror = function () {
//   console.log("ERROR!!!!");
//   console.log(this);
// };

// req.open("GET", "https://swapi.dev/api/people/1/");
// req.send();


const req = new XMLHttpRequest()

req.onload = function() {
    console.log("IT LOADED!!!\n", this.responseText)
    let parsedData = JSON.parse(this.responseText)
    console.log(parsedData)
}

req.onerror = function() {
    console.log("ERROR!!! ", this)
}

// req.open("GET", "https://swapi.dev/api/planets/1/")
req.open("GET", "https://swapi.dev/api/people/1/")
req.send()



