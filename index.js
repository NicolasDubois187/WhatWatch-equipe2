let moviesData = [];
let genderData = [];

async function fetchMovies() {
	await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=fd9098560f0f9e5e902003af5fa5565c&query=${searchInput.value}&language=fr-FR`
	)
		.then((res) => res.json())
		.then((data) => (moviesData = data.results));

	console.log(moviesData);
	fetchGender();
}

async function fetchGender() {
	await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
	)
		.then((res) => res.json())
		.then((data) => (genderData = data));

	console.log(genderData);
	moviesDisplay();
}

function dateFormater(date) {
	return new Date(date).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function moviesDisplay(param) {
	// let genders = new Map();

	// for (o = 0; o < moviesData.length; o++) {
	// 	for (i = 0; i < moviesData[o].genre_ids.length; i++) {
	// 		for (m = 0; m < 19; m++) {
	// 			if (moviesData[o].genre_ids[i] == genderData.genres[m].id) {
	// 				genders.set(o, genderData.genres[m].name);
	// 				genders.set(o, [
	// 					genderData.genres[m].name,
	// 					...genders.get(o),
	// 				]);
	// 				console.log(genders);
	// 			}
	// 		}
	// 	}
	// }

	movieContainer.innerHTML = moviesData
		.sort((a, b) => {
			if (param === 0) {
				return a.vote_average - b.vote_average;
			} else if (param === 1) {
				return b.vote_average - a.vote_average;
			}
		})
		.map(
			(movie) => `
        <div class="card">
        <img src=${
			movie.poster_path
				? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
				: "./assets/img/poster.jpg"
		} alt="affiche de ${movie.title}" width="200px"></img>
        <h2>${movie.title}</h2>
        <h3>${dateFormater(movie.release_date)}</h3>
        <h4>Note : ${movie.vote_average} ${
				movie.vote_average > 6.5 ? "🔥" : "💧"
			}</h4>
        <p></p>
        <p>Description : ${movie.overview}</p>
        </div>
        `
		)
		.join("");
}

bestToWorst.addEventListener("click", (e) => {
	moviesDisplay(1);
});

worstToBest.addEventListener("click", (e) => {
	moviesDisplay(0);
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	fetchMovies();
});
