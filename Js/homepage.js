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
let movieGrids = document.querySelectorAll('.movie-grid')
let bannerSlider = document.querySelector('.carousel-inner')


//Banner
getMovies(generateUrl('movie', 'primary_release_date', 'desc', 1, '&vote_count.gte=1000'), bannerSlider, 5)

// For you
console.log(generateUrl('movie', 'primary_release_date', 'desc', 1, '&vote_count.gte=400'))
getMovies(generateUrl('movie', 'primary_release_date', 'desc', 1, '&vote_count.gte=400'), movieGrids[0], 8)

// Most Popular
getMovies(generateUrl('movie', 'vote_count', 'desc', 1), movieGrids[1], 8)

// Latest
getMovies(generateUrl('movie', 'primary_release_date', 'desc', 1), movieGrids[2], 8)

// Top Rated
getMovies(generateUrl('movie', 'vote_average', 'desc', 1, '&vote_count.gte=10'), movieGrids[3], 8)
// TV Series
getMovies(generateUrl('tv', 'vote_count', 'desc', 1), movieGrids[4], 8)

// Function to fetch movies and call display function by passing data
function getMovies(url, parentDiv, noOfData = 20) {
    fetch(url).then(res => res.json()).then(data => {
        displayMovies(data.results.slice(0, noOfData), parentDiv)
    })
}

// Function to display movies in page based on data and parent div
function displayMovies(data, parentDiv) {
    console.log(data)
    parentDiv.innerHTML = ""
    data.forEach(movie => {
        let movieDiv = document.createElement('div')
        if (parentDiv === bannerSlider) {
            const { title, id, vote_average, vote_count, genre_ids, backdrop_path } = movie;
            movieDiv.className = "carousel-item"
            if (document.querySelector('.active') == null) movieDiv.className = "carousel-item active"
            movieDiv.innerHTML = `
                <img src="${imageURL(backdrop_path, true)}" class="d-block " alt="${title}">
                <div class="banner-details">
                    <div class="banner-title">${title}</div>
                    <div class="banner-genres">${getGenreNames(genre_ids).join(" | ")}</div>
                    <div class="banner-rating">
                        <span class="banner-stars">
                        ${starsGenerate(vote_average / 2)}
                        </span>
                        <span class="banner-vote-count">(${vote_count} Votes)</span>
                    </div>
                    <a class="banner-view-more" href="reviewpage.html?name=${title}&type=movie&id=${id}">View More</a>
                </div>
            `
        }
        else {
            const { adult, title, name, id, vote_average, poster_path } = movie;
            movieDiv.className = "movie"
            movieDiv.innerHTML = `
                <img src="${imageURL(poster_path)}" alt="${title}">
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
        }

        parentDiv.appendChild(movieDiv)
        
    });
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


function loadmore(type){
    window.location.assign("explorepage.html?discover="+type)
}


// Change banner every 6 seconds
setInterval(()=>{
    document.querySelector("#next-btn").click()
}, 6000);
