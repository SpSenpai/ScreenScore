// Tmdb API
const API_KEY = 'a82bcd736e2b3376bdae9e4e63dd7852'
const BASE_URL = 'https://api.themoviedb.org/3'

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
        "id": 10770,
        "name": "TV Movie"
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

// Calling Functions to fill divs
let movieGrid = document.querySelector('.movie-grid')

favorites = JSON.parse(localStorage.getItem("favorites"));
if(favorites == null) favorites = []



// For you

if(favorites.length === 0){
    movieGrid.innerHTML= "<div class=\"no-favs\"> No favorites movies/tv-series to show. Please add some first! <a href=\"homepage.html\">Go to homepage</a></div>"
}
else{
    favorites.forEach(e =>{
        getMovies(BASE_URL + "/"+e.slice(0, e.indexOf('-'))+"/" + e.slice(e.indexOf('-')+1, e.length) + "?language=en-US&api_key=" + API_KEY, movieGrid)
    })
}

// Function to fetch movies and call display function by passing data
function getMovies(url, parentDiv) {
    fetch(url).then(res => res.json()).then(data => {
        displayMovies(data, parentDiv)
    })
}

// Function to display movies in page based on data and parent div
function displayMovies(data, parentDiv) {
    let movieDiv = document.createElement('div')
    const {title, name, id, vote_average, poster_path } = data;
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
