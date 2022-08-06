let header = this.document.querySelector(".header");
let searchForm = document.querySelector("#form-search");
let result = document.querySelector("#result");
let movieDetails = document.querySelector("#movie-details");
let resultList = document.querySelector("#result");
let popularMovieLists = document.querySelector("#popular-movie-lists");
let tv = document.querySelector("#tv-show-lists");

$(".owl-carousel").owlCarousel({
  loop: true,
  dots: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },

    1000: {
      items: 1,
    },
  },
});

window.addEventListener("scroll", function () {
  let windowPosition = this.window.scrollY > 0;
  header.classList.toggle("background", windowPosition);
});

const backToTop = () => {
  window.scrollTo({ top: 675, behavior: "smooth" });
};

const Api_Key = "fa5adc2b06b93605ca3f37e83ffdde0d";
const Base_Key = "https://api.themoviedb.org/3";
const Api_Url = "/discover/movie?sort_by=popularity.desc";

class Search {
  constructor(keyword) {
    this.keyword = keyword;
  }

  async getResult() {
    const response = await fetch(
      `${Base_Key}/search/movie?api_key=${Api_Key}&page=1&query=${this.keyword}`
    );
    this.data = await response.json();
  }
}

class Movie {
  constructor(id) {
    this.id = id;
  }

  async getMovie() {
    const response = await fetch(
      `${Base_Key}/movie/${this.id}?api_key=${Api_Key}`
    );
    this.data = await response.json();
    console.log(this.data);
  }
}

const state = {};

const searchController = async () => {
  let textKeyword = document.querySelector("#txt-keyword").value;
  if (textKeyword) {
    state.search = new Search(textKeyword);
    await state.search.getResult();
    displayResult(state.search.data);
  } else {
    alert("Please enter keyword");
  }
};

const displayResult = (data) => {
  data.results.forEach((movie) => {
    const html = `
    <li class="movie-inner">
      <div>
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
      </div>
      <div class="movie-inner-body">
        <h5 class="movie-vote-average">${movie.vote_average}</h5>
        <h2><a class="movie-title" href="#${movie.id}">${movie.title}</a></h2>
      </div>
    </li>
    `;
    result.insertAdjacentHTML("beforeend", html);
  });
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchController();
});

const movieController = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    state.movie = new Movie(id);
    await state.movie.getMovie();
  }
  displayMovie(state.movie.data);
  backToTop();
};

window.addEventListener("hashchange", movieController);

const displayMovie = (movie) => {
  let genres = "";
  movie.genres.forEach((genre) => {
    genres += `<span class="genres">${genre.name}</span>`;
  });

  const html = `
    <li class="display-movie-inner">
      <div><img class="display-movie-poster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"></div>
      <div class="display-movie-body">
        <h5 class="movie-vote-average display-movie">${movie.vote_average}</h5>
        <h2 class="display-movie"><a class="movie-title display-title" href="#${movie.id}">${movie.title}</a></h2>
        <p class="movie-overview display-movie display-overview">${movie.overview}</p>
        <p>${genres}</p>
      </div>
    </li>
    `;
  movieDetails.innerHTML = html;
};

const getPopularMovies = () => {
  fetch(`${Base_Key}${Api_Url}&api_key=${Api_Key}`)
    .then((response) => response.json())
    .then((data) => showPopularMovies(data.results));
};

const showPopularMovies = (data) => {
  data.forEach((movie) => {
    let html = `<li class="movie-inner">
    <div>
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
    </div>
    <div class="movie-inner-body">
      <h5 class="movie-vote-average">${movie.vote_average}</h5>
      <h2><a class="movie-title" href="#${movie.id}">${movie.title}</a></h2>
    </div>
  </li>`;
    popularMovieLists.insertAdjacentHTML("beforeend", html);
  });
};

getPopularMovies();
