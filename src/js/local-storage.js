import getMovieById from './get-movie-by-id';

const WATCHED_MOVIES = 'watchedMovies';
const QUEUE_MOVIES = 'queuedMovies';

export let watchedMovies =
  JSON.parse(localStorage.getItem(WATCHED_MOVIES)) || [];
export let queuedMovies = 
  JSON.parse(localStorage.getItem(QUEUE_MOVIES)) || [];
// import { watchedMovies, queuedMovies } from './local-storage';

const addToWatchedBtn = document.querySelector('.watchedBtn');
const addToQueueBtn = document.querySelector('.queueBtn');

addToWatchedBtn.addEventListener('click', handleWatchBtnClick);
addToQueueBtn.addEventListener('click', handleQueueBtnClick);

async function handleWatchBtnClick(e) {
  const movieId = e.target.getAttribute('data-movie-id');
  const movieObj = await getMovieById(movieId);

  const isMovieInWatched = watchedMovies.some(
    movie => movie.id === movieObj.id
  );

  if (isMovieInWatched) {
    watchedMovies = watchedMovies.filter(movie => movie.id !== movieObj.id);
    addToWatchedBtn.textContent = 'Add to watch';
    return localStorage.setItem(WATCHED_MOVIES, JSON.stringify(watchedMovies));
  }

  watchedMovies.push(movieObj);
  addToWatchedBtn.textContent = 'Remove from watched';
  return localStorage.setItem(WATCHED_MOVIES, JSON.stringify(watchedMovies));
}

async function handleQueueBtnClick(e) {
  const movieId = e.target.getAttribute('data-movie-id');
  const movieObj = await getMovieById(movieId);

  const isMovieInQueue = queuedMovies.some(movie => movie.id === movieObj.id);
  if (isMovieInQueue) {
    queuedMovies = queuedMovies.filter(movie => movie.id !== movieObj.id);
    addToQueueBtn.textContent = 'Add to queue';
    return localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
  }

  queuedMovies.push(movieObj);
  addToQueueBtn.textContent = 'Remove from queue';
  return localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
}
