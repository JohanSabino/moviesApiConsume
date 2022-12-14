let page = 1;
const btnBefore = document.getElementById("btnBefore");
const btnAfter = document.getElementById("btnAfter");
const extMovies = document.getElementById("appMovies");

btnBefore.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadMovies();
  }
});

btnAfter.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    loadMovies();
  }
});

const loadMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=8e45e8e71015c62c3beb036346e9ebd9&language=es-MX&page=${page}`
    );
    if (response.status === 200) {
      const data = await response.json();
      let movies = "";
      data.results.forEach((movie) => {
        movies += `
            <div class ="movie">
              <div> <img class = "poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
            </div>
              <div class="pmovie">
                <p>${movie.overview}</p> 
              </div>
                <div class ="title">
                  <h3>${movie.title}
                  </h3>
                </div>
            </div>`;
      });

      document.getElementById("appMovies").innerHTML = movies;
    } else if (response.status === 401) {
      console.log("Key doesn't work, try again");
    } else if (response.status === 404) {
      console.log("Movie didn't found, try again");
    }
  } catch (error) {
    console.log(error);
  }
};
loadMovies();
//
// siempre que uso Async away usar TRY y CATCH()
//200 ok, 401 error en API y 404 no halló movie.
