import fetchMoviesByName from './get-movie-by-name'
import Notiflix from 'notiflix';
import { genres } from './genres-array'

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
    opacity: 1,
  timeout: 3000,
  // ...
});

const searchMoviesFormEl = document.querySelector('#search-form')
const movieWrapperEl = document.querySelector('.js-movies-wrapper') 
const searchInputEl = document.querySelector('search__form');

const handleSearchMoviesForm = async event => {
    event.preventDefault()



    try {
          movieWrapperEl.innerHTML = '';

    const movieName = event.currentTarget.searchQuery.value.trim();
  console.log(movieName)
    if (movieName === '') {
    return;
    }
        const {results} = await fetchMoviesByName(movieName)
        createMarkUp(results)
    } catch (err) {
        Notiflix.Notify.info(`No movies found with name "${movieName}" Enter the correct movie name.`
            )
    }

}

export default function createMarkUp(results) {
    const markUp = results.map(
        (movie) => {
            const date = new Date(`${movie.release_date}`);
            const year = date.getFullYear()

            const genresArray = movie.genre_ids.map((id) => { 
                const genre = genres.find(genre => genre.id === id)

                  return genre ? genre.name : '';  
            })
            // console.log(genresArray)
let genresNames = ''
            if (genresArray.length > 2 ) {
                genresNames = arrayLengthCheck(genresArray).join(', ') + ", other"
            } else {
                genresNames = genresArray.join(', ')
            }

        return `<div class="thumb">
    <ul class="carditem" data-id='${movie.id}'>
        <li class="cardimg-wrap">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="poster of the movie ${movie.original_title}"
                class="cardimg"
            />
        </li>
        <li class="cardtext-wrap">
            <h2 class="cardname">${movie.original_title}</h2>
            <div class="cardinfo">
                <p class="cardgenres">${genresNames}</span></p>
                <p class="cardyear">${year}</p>
            </div>
        </li>
    </ul>
</div>
`
   })
        .join('');

    movieWrapperEl.insertAdjacentHTML('beforeend', markUp);

    return markUp
}

export function arrayLengthCheck(array) {
    return array.slice(0,2) 
    };

searchMoviesFormEl.addEventListener('submit', handleSearchMoviesForm)
