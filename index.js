let moviesData = [];

async function fetchMovies() {

await fetch("https://api.themoviedb.org/3/search/movie?api_key=fd9098560f0f9e5e902003af5fa5565c&query=star&language=fr-FR")
    .then((res) => res.json())
    .then((data) => (moviesData = data.results));

    console.log(moviesData);
    moviesDisplay();
    
}
fetchMovies();

function dateFormater(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

function moviesDisplay() {
    movieContainer.innerHTML = moviesData

    .map(
        (movie) => `
        <div class="card">
     
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="affiche de ${movie.title}"></img>
        <h1>${movie.title}</h1>
        <h3>${dateFormater(movie.release_date)}</h3>     
        <h4>Note ${movie.vote_average}</h4>
        <em> Synopsis </em>
        <p>${movie.overview}</p>
        </div>
        `
    )
    .join("");
}