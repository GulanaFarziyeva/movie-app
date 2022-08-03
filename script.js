let searchForm = document.querySelector("#form-search");
let result = document.querySelector("#result");
let movieDetails = document.querySelector('#movie-details');
let resultList = document.querySelector('#result');

const Api_Key = "fa5adc2b06b93605ca3f37e83ffdde0d";
const Base_Key = "https://api.themoviedb.org/3";

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
        <h5 class="movie-vote-average">IMDb: ${movie.vote_average}</h5>
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

const movieController = async () =>{
    const id = window.location.hash.replace('#', '');
    if(id){
        state.movie = new Movie(id);
       await state.movie.getMovie();
    }
    displayMovie(state.movie.data)

}

window.addEventListener('hashchange', movieController);

const displayMovie = (movie) =>{
    const html = `
    <li class="display-movie-inner">
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
      <div>
        <h5 class="movie-vote-average">IMDb: ${movie.vote_average}</h5>
        <h2><a class="movie-title" href="#${movie.id}">${movie.title}</a></h2>
        <p class="movie-overview">${movie.overview}</p>
      </div>
    </li>
    `;
    movieDetails.innerHTML = html;
}



