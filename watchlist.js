const watchlistContainer = document.getElementById('watchlist');
const loader = document.getElementById('loader');

function loadWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = '<p style="grid-column: 1 / -1;">No movies in your watchlist yet!</p>';
    return;
  }

  watchlistContainer.innerHTML = '';
  watchlist.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <!-- Add event.stopPropagation() to prevent triggering movie details -->
        <button onclick="event.stopPropagation(); removeFromWatchlist(${movie.id})">❌ Remove</button>
      </div>
    `;
    movieCard.addEventListener('click', () => showMovieDetails(movie.id)); // Add click listener for movie details
    watchlistContainer.appendChild(movieCard);
  });  
}

function removeFromWatchlist(movieId) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist = watchlist.filter(movie => movie.id !== movieId);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  loadWatchlist(); // Reload the watchlist after removal
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

window.onload = loadWatchlist;
