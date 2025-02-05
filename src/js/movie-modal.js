import getMovieById from './get-movie-by-id.js';
import { watchedMovies, queuedMovies } from './local-storage';  

const modal = document.querySelector('.modal');
const title = document.querySelector('.js-movie-title');
const poster = document.querySelector('.js-movie-poster');
const vote = document.querySelector('.js-movie-vote');
const votes = document.querySelector('.js-movie-votes');
const popularity = document.querySelector('.js-movie-popularity');
const originalTitle = document.querySelector('.js-movie-original-title');
const genre = document.querySelector('.js-movie-genre');
const overview = document.querySelector('.js-movie-excerpt');

const closeButton = document.querySelector('.modal__btn--close');
const trailerBtn = document.querySelector('.trailerBtn');
const watchedBtn = document.querySelector('.watchedBtn');
const queueBtn = document.querySelector('.queueBtn');

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', handleBackdropClick);

const movieList = document.querySelector('.js-movies-wrapper') || document.querySelector('.lib-container');

movieList.addEventListener('click', event => {
  const movieCard = event.target.closest('.carditem');
  if (!movieCard) return;

  const movieId = movieCard.getAttribute('data-id');

  getMovieById(movieId)
    .then(data => {
      poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      title.textContent = data.title;
      vote.textContent = `${data.vote_average}`;
      votes.textContent = `${data.vote_count}`;
      popularity.textContent = `${data.popularity.toFixed(1)}`;
      originalTitle.textContent = data.original_title;
      genre.textContent = data.genres.map(genre => genre.name).join(', ');
      overview.textContent = data.overview;
    })
    .catch(error => {
      console.error(error);
    });

  trailerBtn.setAttribute('data-trailer-url', movieId);
  watchedBtn.setAttribute('data-movie-id', movieId);
  queueBtn.setAttribute('data-movie-id', movieId);

  modal.classList.add('modal--visible');
  document.documentElement.style.overflowY = 'hidden';
  window.addEventListener('keydown', handleEsc);

  checkMovieInWatched(movieId)
  checkMovieInQueue(movieId)
});

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}
window.addEventListener('keydown', handleEsc);

function closeModal() {
  poster.src = '';
  title.textContent = '';
  vote.textContent = '';
  votes.textContent = '';
  popularity.textContent = '';
  originalTitle.textContent = '';
  genre.textContent = '';
  overview.textContent = '';
  window.removeEventListener('keydown', handleEsc);
  modal.classList.remove('modal--visible');
  document.documentElement.style.overflowY = 'auto';
}

function handleEsc(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function checkMovieInWatched(id) {
  const isMovieWatched = watchedMovies.some(el => el.id === Number(id))
  
  if (isMovieWatched) {
    watchedBtn.textContent = 'Remove from watched';
  } else {
    watchedBtn.textContent = 'Add to watch';
  }
}

function checkMovieInQueue(id) {
  const isMovieQueue = queuedMovies.some(el => el.id === Number(id))
  
  if (isMovieQueue) {
    queueBtn.textContent = 'Remove from queue';
  } else {
    queueBtn.textContent = 'Add to queue';
  }
}