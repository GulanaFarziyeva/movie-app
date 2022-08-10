const header = document.querySelector(".header");
const searchForm = document.querySelector("#form-search");
const result = document.querySelector("#result");
const movieDetails = document.querySelector("#movie-details");
const resultList = document.querySelector("#result");
const popularMovieLists = document.querySelector("#popular-movie-lists");
const tv = document.querySelector("#tv-show-lists");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-bar");
const navbarSearchIcon = document.querySelector(".mobile-search-icon");
const tvShowInner = document.querySelector("#tv-show-lists");
const heroSection = document.querySelector('.hero-section');
const popularMoviesLink = document.querySelector('#popular-movies');
const tvShowSection = document.querySelector('#tv-show-section');
const tvShow = document.querySelector('#tv-show');
const links = document.querySelectorAll('.nav-link');
const kidsMovies = document.querySelector('#kids-movies-lists');
const kidsMoviesLink = document.querySelector('#kids-movies-link');
const searchCloseBtn = document.querySelector('.search-close');


const state = {};

const API_KEY = "fa5adc2b06b93605ca3f37e83ffdde0d";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = "/discover/movie?sort_by=popularity.desc";

class Search {
  constructor(keyword) {
    this.keyword = keyword;
  }

  async getResult() {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&page=1&query=${this.keyword}`
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
      `${BASE_URL}/movie/${this.id}?api_key=${API_KEY}`
    );
    this.data = await response.json();
    console.log(this.data);
  }
}

const backToTop = () => {
  window.scrollTo({ top: heroSection.scrollHeight - 40 , behavior: "smooth" });
};


$(".home-movie-slider").owlCarousel({
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
  result.innerHTML = '';
  data.results.forEach((movie) => {
    const html = `
    <li class="movie-inner">
    <a  href="#${movie.id}" class = "movie-link">
    <h5 class="movie-vote-average"><i class="fa-solid fa-star"></i>${movie.vote_average}</h5>
      <div class="movie-poster-inner">
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" 
      onerror="this.src='https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg';">
      </div>
    <div class="movie-inner-body">
      <div class="movie-title-inner"><a href="#${movie.id}" class="movie-title">${movie.title}</a></div>
    </div>
    </a>
  </li>
    `;
    result.insertAdjacentHTML("beforeend", html);
    result.scrollIntoView({block:'start', behavior: 'smooth'})
  });
};

const movieController = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    state.movie = new Movie(id);
    await state.movie.getMovie();
  }
  displayMovie(state.movie.data);
};

const displayMovie = (movie) => {
  let genres = "";
  movie.genres.forEach((genre) => {
    genres += `<span class="genres">${genre.name}</span>`;
  });

  const html = `
  <li class="display-movie-inner">
    <div class="display-poster-inner">
      <img class="display-movie-poster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" 
       onerror="this.src='https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg';">
    </div>
    <div class="display-movie-body">
       <div class="movie-vote-average display-movie-vote"><i class="fa-solid fa-star"></i>${Math.round(
        movie.vote_average )}
       </div>
       <div class="display-movie">
         <a class="movie-title display-title" href="#${movie.id}">${movie.title}</a>
       </div>
       <p class="movie-overview display-movie display-overview">${movie.overview}</p>
       <div class="movie-genres">${genres}<div>
    </div>
  </li>
    `;
  backToTop()
  movieDetails.innerHTML = html;
};


const getPopularMovies = () => {
  fetch(`${BASE_URL}${API_URL}&api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) =>  showPopularMovies(data.results));
};

const showPopularMovies = (data) => {
  data.forEach((movie) => {
    let html = `
    <li class="movie-inner">
    <a  href="#${movie.id}" class = "movie-link">
    <h5 class="movie-vote-average"><i class="fa-solid fa-star"></i>${movie.vote_average}</h5>
      <div class="movie-poster-inner">
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" 
      onerror="this.src='https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg';">
      </div>
    <div class="movie-inner-body">
      <div class="movie-title-inner"><a href="#${movie.id}" class="movie-title">${movie.title}</a></div>
    </div>
    </a>
  </li>`;
    popularMovieLists.insertAdjacentHTML("beforeend", html);
  });
};

getPopularMovies();

const getTvShow = () => {
  fetch(`${BASE_URL}${API_URL}/tv/top_rated?&api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => showTvShow(data.results))
};

const showTvShow = (data) => {

  data.forEach((movie) => {
    let html = `<li class="slider-inner">
    <a  href="#${movie.id}" class = "movie-link">
    <div><h5 class="movie-vote-average slider-vote"><i class="fa-solid fa-star"></i>${movie.vote_average}</h5></div>
    <img class="slider-img" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" 
    onerror="this.src='https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg';">
    <div class="tv-title-inner"><a class="tv-title" href="#${movie.id}">${movie.title}</a></div>
    </a>
  </li>
`;
    tvShowInner.insertAdjacentHTML("beforeend", html);
  });
};


const getKidsMovies = () => {
  fetch(`${BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => showKidsMovies(data.results));
};

const showKidsMovies = (data) => {

  data.forEach((movie) => {
    let html = `
    <li class="slider-inner">
    <a  href="#${movie.id}" class = "movie-link">
    <div><h5 class="movie-vote-average slider-vote"><i class="fa-solid fa-star"></i>${movie.vote_average}</h5></div>
    <img class="slider-img" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" 
    onerror="this.src='https://nbcpalmsprings.com/wp-content/uploads/sites/8/2021/12/BEST-MOVIES-OF-2021.jpeg';">
    <div class="tv-title-inner"><a class="tv-title" href="#${movie.id}">${movie.title}</a></div>
    </a>
  </li>`;

    kidsMovies.insertAdjacentHTML("beforeend", html);
  });
};



hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navLinks.classList.toggle("active");
});


navbarSearchIcon.addEventListener("click", () => {
  if (searchForm.style.left == "-100%") {
    searchForm.style.left = "0";
  } else {
    searchForm.style.left = "-100%";
  }
});

links.forEach (link =>{
  link.addEventListener('click', () =>{
    [...links].map(link => link.classList.remove('link-active'));
    link.classList.add('link-active');
    let href = link.getAttribute('href').replace('#', '');
    document.getElementById('href').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  })
})

searchCloseBtn.addEventListener('click', () =>{
  searchForm.classList.add('form-remove');
})


window.addEventListener("scroll", function () {
  let windowPosition = this.window.scrollY > 0;
  header.classList.toggle("background", windowPosition);
});

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchController();
});

window.addEventListener("hashchange", movieController);

tvShow.addEventListener('click', getTvShow);

kidsMoviesLink.addEventListener('click', getKidsMovies);





