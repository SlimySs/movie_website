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
  
