const findFilm = document.getElementById("find-film")
const moviesDiv = document.getElementById("movies-container")
let localData = JSON.parse(localStorage.getItem("movieData"))

function renderWatchlist() {
    if (localData && localData.length > 0) {
        moviesDiv.innerHTML = ""
        localData.forEach(movie => {
            moviesDiv.innerHTML += 
            `<div class="movie">
                <div class="poster-div">
                    <img src=${movie.Poster} class="poster">
                </div>
                <div class="movie-info">
                    <h2>${movie.Title}</h2>
                    <i class="fa-solid fa-star star">${movie.imdbRating}</i>
                    <h4>${movie.Genre}</h4>
                    <p class=plot>${movie.Plot}</p>
                    <button class="watchlist-btn" data-id=${movie.imdbID}>Remove from watchlist</button>
                </div>
            </div>`;
        });
    } else {
        moviesDiv.innerHTML = "<p>Your watchlist is empty</p>";
    }
}

renderWatchlist()

moviesDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("watchlist-btn")) {
        const movieID = e.target.dataset.id;
        localData = localData.filter(movie => movie.imdbID != movieID)
        localStorage.setItem("movieData", JSON.stringify(localData))
        renderWatchlist(); 
    }
});
     
findFilm.addEventListener("click", ()=>{
        window.location.href = "index.html";
    })
    
