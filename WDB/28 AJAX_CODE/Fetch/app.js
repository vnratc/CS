// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("RESOLVED!", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("ERROR!", e);
//   });

// // fetch("https://swapi.dev/api/people/1/")
// //   .then((res) => {
// //     console.log("RESOLVED!", res);
// //     return res.json();
// //   })
// //   .then((data) => {
// //     console.log(data);
// //     return fetch("https://swapi.dev/api/people/2/");
// //   })
// //   .then((res) => {
// //     console.log("SECOND REQUEST RESOLVED!!!");
// //     return res.json();
// //   })
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((e) => {
// //     console.log("ERROR!", e);
// //   });

// const loadStarWarsPeople = async () => {
//   try {
//     const res = await fetch("https://swapi.dev/api/people/1/");
//     const data = await res.json();
//     console.log(data);
//     const res2 = await fetch("https://swapi.dev/api/people/2/");
//     const data2 = await res2.json();
//     console.log(data2);
//   } catch (e) {
//     console.log("ERROR!!!", e);
//   }
// };

// loadStarWarsPeople();



// fetch("https://swapi.dev/api/people/1")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         return data
//     })
//     .catch(e => {
//         console.log("ERROR", e)
//     })

// fetch("https://swapi.dev/api/people/1")
//     .then(res => {
//         return res.json()   // return here is needed to avoid nesting
//     })
//     .then(data => {
//         console.log(data)
//         return fetch("https://swapi.dev/api/people/2")  // return here is needed to avoid nesting
//     })
//     .then(res => {
//         return res.json()   // return here is needed to avoid nesting
//     })
//     .then(data => console.log(data))
//     .catch(e => {
//         console.log("ERROR", e)
//     })

const loadStarWarsPeople = async (id) => {
    try {
        const res = await fetch("https://swapi.dev/api/people/" + id)
        const data = await res.json()
        console.log(data)
        // const res2 = await fetch("https://swapi.dev/api/people/2" + id)
        // const data2 = await res2.json()
        // console.log(data2)
    } catch (e) {
        console.log("ERROR",e)
    }
}

loadStarWarsPeople(prompt())