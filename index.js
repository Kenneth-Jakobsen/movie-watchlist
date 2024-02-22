const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search-bar")
const moviesDiv = document.getElementById("movies-container")
const addToWatchListBtn = document.getElementById("watchlist-btn")
const watchlist = document.getElementById("watchlist")
const findFilm = document.getElementById("find-film")
let movieData = []
const watchListData =[]

searchBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchBar.value}&apikey=a8efd6b`)
        const data = await response.json()
        
        if (data.Search) {
            await moviesArray(data.Search)
        } else {
            console.log("No movies found.")
        }
    } catch (error) {
        console.error('Error fetching movie data:', error)
    }
});

 async function moviesArray(array) {
    movieData = []
    moviesDiv.innerHTML = ""
    for (const movie of array) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=a8efd6b`)
            let data = await response.json()
            movieData.push(data)
            moviesDiv.innerHTML += `
            <div class="movie">
                <div class="poster-div">
                    <img src=${data.Poster} class="poster">
                </div>
                    <div class="movie-info">
                        <h2>${data.Title}</h2>
                        <i class="fa-solid fa-star star">${data.imdbRating}</i>
                        <h4>${data.Genre}</h4>
                        <p class=plot>${data.Plot}</p>
                        <button class="watchlist-btn" data-id=${data.imdbID}>Add to watchlist</button>
                    </div>
            </div>
            `
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
}

moviesDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("watchlist-btn")) {
        const movieId = e.target.dataset.id;
        const movieToAdd = movieData.find(movie => movie.imdbID === movieId)
        
        if(movieToAdd){
            if(watchListData.some(movie => movie.imdbID === movieId)){
                window.alert("Movie already on watchlist");
            }
            else {
                watchListData.push(movieToAdd)
            }
        }
        localStorage.setItem("movieData", JSON.stringify(watchListData))
    }   
});


watchlist.addEventListener("click", ()=>{
    window.location.href = "watchlist.html";
})

