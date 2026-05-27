const moviesData = [
	{ id: 1, title: 'Diuna: Część Druga', category: 'Sci-Fi', img: 'https://picsum.photos/id/119/300/450' },
	{ id: 2, title: 'Matrix', category: 'Sci-Fi', img: 'https://picsum.photos/id/149/300/450' },
	{ id: 3, title: 'John Wick 4', category: 'Akcja', img: 'https://picsum.photos/id/155/300/450' },
	{ id: 4, title: 'Kac Vegas', category: 'Komedia', img: 'https://picsum.photos/id/175/300/450' },
	{ id: 5, title: 'Terminator 2', category: 'Akcja', img: 'https://picsum.photos/id/180/300/450' },
	{ id: 6, title: 'Gliniarz z Beverly Hills', category: 'Komedia', img: 'https://picsum.photos/id/200/300/450' },
]

let moviesGrid
let filterButtons
let favCount
let hamburger
let navMenu

let favoriteIds = []

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	moviesGrid = document.querySelector('#movies-grid')
	filterButtons = document.querySelectorAll('.filters__btn')
	favCount = document.querySelector('.header__favorites-count')
	hamburger = document.querySelector('.header__hamburger')
	navMenu = document.querySelector('.header__nav')
}

const prepareDOMEvents = () => {
	filterButtons.forEach(btn => {
		btn.addEventListener('click', handleFilterClick)
	})

	moviesGrid.addEventListener('click', handleMovieAction)

	hamburger.addEventListener('click', () => {
		navMenu.classList.toggle('header__nav--open')
	})
	loadFavoritesFromStorage()
	renderMovies(moviesData)
}

const loadFavoritesFromStorage = () => {
	const savedFavs = localStorage.getItem('netflix_favorites')
	if (savedFavs) {
		favoriteIds = JSON.parse(savedFavs)
	}
	updateFavoritesUI()
}

const saveFavoritesToStorage = () => {
	localStorage.setItem('netflix_favorites', JSON.stringify(favoriteIds))
	updateFavoritesUI()
}

const updateFavoritesUI = () => {
	favCount.textContent = favoriteIds.length
}

const handleFilterClick = e => {
	const clickedBtn = e.target
	const category = clickedBtn.dataset.category

	filterButtons.forEach(btn => btn.classList.remove('filters__btn--active'))
	clickedBtn.classList.add('filters__btn--active')

	if (category === 'Wszystkie') {
		renderMovies(moviesData)
	} else {
		const filteredMovies = moviesData.filter(movie => movie.category === category)
		renderMovies(filteredMovies)
	}
}

const handleMovieAction = e => {
	if (e.target.classList.contains('movie-card__btn')) {
		const movieId = parseInt(e.target.dataset.id)

		if (favoriteIds.includes(movieId)) {
			favoriteIds = favoriteIds.filter(id => id !== movieId)
		} else {
			favoriteIds.push(movieId)
		}

		saveFavoritesToStorage()

		const activeCategoryBtn = document.querySelector('.filters__btn--active')
		const currentCategory = activeCategoryBtn.dataset.category

		if (currentCategory === 'Wszystkie') {
			renderMovies(moviesData)
		} else {
			renderMovies(moviesData.filter(m => m.category === currentCategory))
		}
	}
}

const renderMovies = moviesArray => {
	moviesGrid.innerHTML = ''

	const moviesHTML = moviesArray
		.map(movie => {
			const isFavorite = favoriteIds.includes(movie.id)
			const btnClass = isFavorite ? 'movie-card__btn movie-card__btn--remove' : 'movie-card__btn'
			const btnText = isFavorite ? 'Usuń z ulubionych ❌' : 'Dodaj do ulubionych ❤️'

			return `
           <article class="movie-card">
               <figure class="movie-card__figure">
                   <img src="${movie.img}" alt="Plakat filmu ${movie.title}" class="movie-card__img" loading="lazy">
               </figure>
               <div class="movie-card__content">
                   <div>
                       <h3 class="movie-card__title">${movie.title}</h3>
                       <p class="movie-card__category">${movie.category}</p>
                   </div>
                   <button class="${btnClass}" data-id="${movie.id}">${btnText}</button>
               </div>
           </article>
       `
		})
		.join('')

	moviesGrid.innerHTML = moviesHTML
}

document.addEventListener('DOMContentLoaded', main)
