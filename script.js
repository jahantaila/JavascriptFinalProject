const searchForm = document.querySelector(".search-form")
const searchBox = document.querySelector(".search-box")
const noMovieResultText = document.querySelector(".no-movie-results")
const movieResults = document.querySelector(".movie-results")
const loadingTrack = document.querySelector(".current-loading")
let originalMovieData = null // you can have this on top of you script.js file

let movieData = null;


if (window.location.href.includes("findmovie.html")) {

    if (localStorage.getItem("searchTitle")) {
        

        searchBox.value = localStorage.getItem("searchTitle")
        getMovies(localStorage.getItem("searchTitle"))
        
        localStorage.removeItem("searchTitle")

    }

    console.log("ON FIND MOVIE PAGE");
    
    

    const minText = document.querySelector("#min-slider")
    const maxText = document.querySelector("#max-slider")


    let max = 0
    let min = 0

    window.addEventListener('range-changed', (e) => {

        max = e.detail.maxRangeValue
        min = e.detail.minRangeValue
        

        minText.textContent = `${min}`
        maxText.textContent = `${max}`

        filter(min, max)
})

}

async function getMovies (title) {

    loadingTrack.style.display = "block"
    

    const promise = await fetch(`https://www.omdbapi.com/?s=${title}&type=movie&apikey=90634f3b`)
    const data = await promise.json()
    

    console.log(data);

    if (!data.Error) {
        movieData = data.Search.slice(0,6)
        originalMovieData = [...movieData];
        // movieData = JSON.stringify(data.Search)
        

        console.log(`THE MOVIE DATA IS THE FOLLOWING TO BE SENT: ${movieData}`);


        renderMovies(movieData)
    }

    else {
        renderMovies('none')
    }

    return data; 
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const searchText = searchBox.value; 
    
    
    
    
    localStorage.setItem('searchTitle', String(searchText))


    if (!window.location.href.includes("findmovie.html")) {
        console.log("REDIRECTING");
        window.location.href = "findmovie.html"

        
    }

    else {
        getMovies(String(searchText))
    }
    

})




function renderMovies (data) {

    console.log("CALLED RENDER MOVIES");

    if (data !== "none") {


        movieResults.innerHTML =  data.map ( (movie) => {
            return `<div class = "movie">
    
            <figure class = "movie-poster">
                <img src="${movie.Poster}" alt="">
    
            </figure>
        
            <div class = "movie-text-div">
                <h1 class = "movie-name">${movie.Title}</h1>
                <p class = "movie-date">${movie.Year}</p>
                <p class = "movie-description"><b>imdbID</b> = ${movie.imdbID}</p>
            </div>
        </div>`

    }).join("")
    }

    else {
       movieResults.innerHTML =  `<h1 class = "no-movie-results">No movie results...</h1>
       `
    }

    loadingTrack.style.display = "none"
    

}

let origionalMovieData = movieData; 

function filter(min, max) {
    if (!!originalMovieData) {
      movieData = originalMovieData.filter((movie) => {
        return movie.Year >= min && movie.Year <= max;
      });
  
      console.log("filtered movie data!!!!");
      console.log(movieData);
  
      renderMovies(movieData);
    }
  }