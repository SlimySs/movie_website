const API_KEY = 'f8ab6099cdb2ec9dca042b2a2153082a';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const movieList = document.getElementById('movie-list');
const loader = document.getElementById('loader');

async function fetchMovies() {
  loader.style.display = 'block';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    loader.style.display = 'none';
  }
}

function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
      </div>
    `;
    movieList.appendChild(movieCard);
  });
}

fetchMovies();
document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");
  
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hovered");
      });
      card.addEventListener("mouseleave", () => {
        card.classList.remove("hovered");
      });
    });
  
    const movieContainers = document.querySelectorAll(".movie-card");
    window.addEventListener("scroll", () => {
      movieContainers.forEach(card => {
        if (isElementInViewport(card)) {
          card.classList.add("visible");
        }
      });
    });
  });
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }
