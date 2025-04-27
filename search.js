const API_KEY = 'f8ab6099cdb2ec9dca042b2a2153082a';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');
const loader = document.getElementById('loader');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length < 2) return;

  loader.style.display = 'block';

  try {
    const res = await fetch(SEARCH_API + encodeURIComponent(query));
    const data = await res.json();
    displaySearchResults(data.results);
  } catch (err) {
    console.error('Search error:', err);
  } finally {
    loader.style.display = 'none';
  }
});

function displaySearchResults(movies) {
  resultsContainer.innerHTML = '';

  if (movies.length === 0) {
    resultsContainer.innerHTML = '<p style="grid-column: 1 / -1;">No results found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <button onclick="addToWatchlist(${JSON.stringify(movie)})">➕ Watchlist</button>
      </div>
    `;
    movieCard.addEventListener('click', () => showMovieDetails(movie.id)); // Click listener for details
    resultsContainer.appendChild(movieCard);
  });
}

function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Check if movie is already in the watchlist
  const exists = watchlist.find(m => m.id === movie.id);

  if (!exists) {
    watchlist.push(movie); // Add the movie to the list
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Save to localStorage
    alert(`${movie.title} added to your watchlist!`);
    loadWatchlist(); // Refresh the watchlist UI
  } else {
    alert('This movie is already in your watchlist.');
  }
}

async function showMovieDetails(movieId) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    const movieDetails = await res.json();

    // Show movie details in an alert or you could open a modal
    alert(`Title: ${movieDetails.title}\nOverview: ${movieDetails.overview}\nRelease Date: ${movieDetails.release_date}`);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}
