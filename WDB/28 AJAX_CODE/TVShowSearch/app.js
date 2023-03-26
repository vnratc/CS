// const form = document.querySelector('#searchForm');
// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const searchTerm = form.elements.query.value;
//     const config = { params: { q: searchTerm } }
//     const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
//     makeImages(res.data)
//     form.elements.query.value = '';
// })

// const makeImages = (shows) => {
//     for (let result of shows) {
//         if (result.show.image) {
//             const img = document.createElement('IMG');
//             img.src = result.show.image.medium;
//             document.body.append(img)
//         }
//     }
// }





const query = document.querySelector("#query")


const getShows = async () => {
    try {
        const config = { params: { q: query.value } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config)
        // console.log(res.data)
        return res.data
    } catch (e) {
        console.log(e, "no results")
        return "No results"
    }
}


const showImages = async () => {
    document.querySelectorAll("#imagesDiv *").forEach(e => e.remove())
    const imagesDiv = document.querySelector("#imagesDiv")
    let shows = await getShows()
    for (show of shows) {
        if (!show.show.image) { continue }
        let newImage = document.createElement("img")
        newImage.src = show.show.image.medium
        imagesDiv.append(newImage)
    }
    query.value = ""
}


const searchForm = document.querySelector("#searchForm")
searchForm.addEventListener("submit", e => {
    e.preventDefault()
    showImages()
})

// const searchBtn = document.querySelector("#searchButton")
// searchBtn.addEventListener("click", showImages)