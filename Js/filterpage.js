let moreFiltersBtn = document.querySelector('.more-filters')
let extraFilters = document.querySelector('.extra-filters')

moreFiltersBtn.addEventListener('click', () => {
    if (extraFilters.style.height != "140px") {
        extraFilters.style.height = "140px"
        moreFiltersBtn.innerHTML = 'Less Filters <i class="fa-sharp fa-solid fa-chevron-up">'
    }
    else {
        extraFilters.style.height = "0px"
        moreFiltersBtn.innerHTML = 'More Filters <i class="fa-sharp fa-solid fa-chevron-down">'
    }
})

// Genres
const Genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]


// Tmdb API
const API_KEY = 'a82bcd736e2b3376bdae9e4e63dd7852'
const BASE_URL = 'https://api.themoviedb.org/3'


// Calculate Filters by query string
const pageURL = window.location.href
const searchParams = new URL(pageURL).searchParams
const queryObject = Object.fromEntries(searchParams)
let genereQuery = queryObject['genres']
let minRating = queryObject['minrating']
let maxRating = queryObject['maxrating'] 
let minYear = queryObject['minyear']
let maxYear = queryObject['maxyear']
let minVote = queryObject['minvote']
let maxVote = queryObject['maxvote']
let type = queryObject['type']
let page = queryObject['page']


if(genereQuery == undefined) genereQuery = ""
if(minRating == undefined) minRating = 1.0
if(maxRating == undefined) maxRating = 5.0
if(minYear == undefined) minYear = 1950
if(maxYear == undefined) maxYear = 2024
if(minVote == undefined) minVote = 1
if(maxVote == undefined) maxVote = 999999
if(type == undefined) type = 'movie'
if(page == undefined) page = 1
let totalPages = 999

let selectedGenres = genereQuery.split(',')
let extraInput = document.querySelectorAll('.EF-input')

extraInput[0].value = minRating
extraInput[1].value = maxRating
extraInput[2].value = minYear
extraInput[3].value = maxYear
extraInput[4].value = minVote
extraInput[5].value = maxVote

// Calling Functions to fill divs
let movieGrid = document.querySelector('.movie-grid')

favorites = JSON.parse(localStorage.getItem("favorites"));
if(favorites == null) favorites = []



getMovies(BASE_URL + '/discover/'+type+'?page='+page+'&primary_release_date.gte='+minYear+'&primary_release_date.lte='+maxYear+'&sort_by=popularity.desc&vote_average.gte='+minRating*2+'&vote_average.lte='+maxRating*2+'&vote_count.gte='+minVote+'&vote_count.lte='+maxVote+'&with_genres='+selectedGenres.join(',')+'&api_key='+API_KEY, movieGrid)

// Function to fetch movies and call display function by passing data
function getMovies(url, parentDiv) {
    fetch(url).then(res => res.json()).then(data => {
        totalPages = data.total_pages
        pageEnableDisable(page, data.total_pages)
        displayMovies(data.results, parentDiv)
    })
}

// Function to display movies in page based on data and parent div
function displayMovies(data, parentDiv) {
    data.forEach(movie=>{
    let movieDiv = document.createElement('div')
    const {title, name, id, vote_average, poster_path } = movie;
    movieDiv.className = "movie"
    movieDiv.innerHTML = `
        <img src="${imageURL(poster_path)}" alt="${title}">
        <div class="black-blur"></div>
        <div class="movie-info">
            <div class="title">${chooseNameorTitle(name, title)}</div>
            <div class="rating">
                <span class="stars">
                    ${starsGenerate(vote_average / 2)}
                </span>
            </div>
        </div>
        <a class="view-more" href="reviewpage.html?name=${chooseNameorTitle(name, title)}&type=${chooseMovieorTv(name)}&id=${id}">View more</a>
    `
    parentDiv.appendChild(movieDiv)
})

}

// Function to choose name or title cause API have name for movie but titles for series
function chooseNameorTitle(name, title){
    if(name != undefined) return name;
    else return title
}
function chooseMovieorTv(name){
    if(name != undefined) return "tv";
    else return "movie"
}

// Function to generate URL that give us data to get fetched
function generateUrl(mainType = 'movie', sortBy = 'popularity', order = 'desc', page = 1, extraQuery = "") {
    let URL = BASE_URL + "/discover/" + mainType + "?sort_by=" + sortBy + "." + order + "&page=" + page + extraQuery + "&vote_average.gte=1.0&api_key=" + API_KEY
    return URL
}


// Function to generate Image src url by path
function imageURL(path, isbanner = false) {
    if (path == null)
        return "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
    else
        if (isbanner)
            return "https://image.tmdb.org/t/p/original" + path;
        else
            return "https://image.tmdb.org/t/p/w500" + path;
}


// Function to generate stars html based on rating
function starsGenerate(rating = 0.0) {
    let html = ""
    for (let i = 1; i <= 5; i++) {
        if (rating > 0.7) {
            html = html + "<i class=\"fa-sharp fa-solid fa-star\"></i>"
        }
        else if (rating > 0.3) {
            html = html + "<i class=\"fa-sharp fa-solid fa-star-half-stroke\"></i>"
        }
        else {
            html = html + "<i class=\"fa-sharp fa-regular fa-star\"></i>"

        }
        rating--;
    }
    return html;
}
       

// Functn to give genres from Genre
function getGenreNames(ids = []){
    let names = [];
    Genres.forEach(g =>{
        if(ids.includes(g.id)) names.push(g.name)
    })
    return names;
}





let genreGrid = document.querySelector('.genres')
Genres.forEach(g => {
    let genreBox = document.createElement('div')
    genreBox.id = g.id
    genreBox.className = 'genre-box'
    genreBox.innerHTML = g.name
    genreGrid.appendChild(genreBox)
    if (selectedGenres.includes(genreBox.id)) {
        genreBox.classList.add('genre-selected')
    }
    genreBox.addEventListener('click', () => {
        if (selectedGenres.includes(genreBox.id)) {
            genreBox.classList.remove('genre-selected')
            selectedGenres.splice(selectedGenres.indexOf(genreBox.id), 1)
        }
        else {
            genreBox.classList.add('genre-selected')
            selectedGenres.push(genreBox.id)
        }
    })
})



// Apply filter
document.querySelector('.apply-filters').addEventListener('click', ()=>{
    addOrUpdateURLParam('genres', selectedGenres.join(','))
    addOrUpdateURLParam('minrating', extraInput[0].value)
    addOrUpdateURLParam('maxrating', extraInput[1].value)
    addOrUpdateURLParam('minyear', extraInput[2].value)
    addOrUpdateURLParam('maxyear', extraInput[3].value)
    addOrUpdateURLParam('minvote', extraInput[4].value)
    addOrUpdateURLParam('maxvote', extraInput[5].value)
    addOrUpdateURLParam('page', 1)
    location.reload()
})





// Pagintation
let prevpageBtn = document.querySelector('.prev-page')
let nextpageBtn = document.querySelector('.next-page')
let pageNo = document.querySelector('.page-no')
pageNo.innerHTML = page

function pageEnableDisable(p, tp){
    if(p != 1){
        prevpageBtn.disabled = false
    }else{
        prevpageBtn.disabled = true
    }
    if(parseInt(p) < tp){
        nextpageBtn.disabled = false
    }else{
        nextpageBtn.disabled = true
    }
}


prevpageBtn.addEventListener('click',()=>{
    addOrUpdateURLParam('page', page-1)
    location.reload()
})
nextpageBtn.addEventListener('click',()=>{
    addOrUpdateURLParam('page', parseInt(page)+1)
    location.reload()
})



function addOrUpdateURLParam (key, value) {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
    history.pushState(null, "", newRelativePathQuery)
}
