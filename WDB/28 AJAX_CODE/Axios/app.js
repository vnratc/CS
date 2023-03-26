// // axios
// //   .get("https://swapi.dev/api/people/1/")
// //   .then((res) => {
// //     console.log("RESPONSE: ", res);
// //   })
// //   .catch((e) => {
// //     console.log("ERROR! ", e);
// //   });

// const getStarWarsPerson = async (id) => {
//   try {
//     const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
//     console.log(res.data);
//   } catch (e) {
//     console.log("ERROR", e);
//   }
// };

// getStarWarsPerson(5);
// getStarWarsPerson(10);




// axios.get("https://swapi.dev/api/people/4")
//     .then(res => console.log(res))
//     .catch(e => console.log(e))

const getSWPeople = async (id) => {
    try {
        const res = await axios.get("https://swapi.dev/api/people/" + id)
        console.log(res.data)
    } catch(e) {
        console.log(e)
    }
    
}

// getSWPeople(4)


const getDadJoke = async () => {
    try {
        const config = {headers: {Accept: "application/json"}}
        const res = await axios.get("https://icanhazdadjoke.com/", config)
        return res.data.joke
    } catch (e) {
        console.log(e)
        return "No jokes available"
    }
}


const appendNewJoke = async () => {
    const ul = document.querySelector("ul")
    if (ul.childElementCount > 2) {
        document.querySelectorAll("ul > *").forEach(e => e.remove())
    }
    let li = document.createElement("li")
    li.innerText = await getDadJoke()
    ul.append(li)
}


const button = document.querySelector("button")
button.addEventListener("click", appendNewJoke)