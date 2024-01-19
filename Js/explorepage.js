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


// Tmdb API
const API_KEY = 'a82bcd736e2b3376bdae9e4e63dd7852'
const BASE_URL = 'https://api.themoviedb.org/3'

// Put Most popular movies at first
let movieGrid = document.querySelector('.movie-list')
let totalPages = 99

// Query Params
const pageURL = window.location.href
const searchParams = new URL(pageURL).searchParams
const queryObject = Object.fromEntries(searchParams)
const search = queryObject['search']
const discover = queryObject['discover']
let page = queryObject['page']

if(page == undefined) page = 1

let listType = document.querySelector(".list-type")
if(search != undefined){
    getMovies(searchURL('movie', search, page), movieGrid)
    listType.innerHTML = "Search results for \"" + search +"\""
}
// Most Popular
else if(discover == 'most_popular'){
    getMovies(generateUrl('movie', 'vote_count', 'desc', page), movieGrid)
    listType.innerHTML = "MOST POPULAR"
}

// Latest
else if(discover == 'latest'){
    getMovies(generateUrl('movie', 'primary_release_date', 'desc', page), movieGrid)
    listType.innerHTML = "LATEST"
}

// Top Rated
else if(discover == 'top_rated'){
    getMovies(generateUrl('movie', 'vote_average', 'desc', page, '&vote_count.gte=10'), movieGrid)
    listType.innerHTML = "TOP RATED"
}

// TV Series
else if (discover == 'tv_series'){
    getMovies(generateUrl('tv', 'vote_count', 'desc', page), movieGrid)
    listType.innerHTML = "TV SERIES"
}

// For you
else{
    getMovies(generateUrl('movie', 'primary_release_date', 'desc', page, '&vote_count.gte=400'), movieGrid)
    listType.innerHTML = "FOR YOU"
}


// Function to fetch movies and call display function by passing data
function getMovies(url, parentDiv, noOfData = 20) {
    window.scrollTo(0, 0)

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.total_pages)
        totalPages = data.total_pages
        pageEnableDisable(page, data.total_pages)
        if(data.results.length == 0)  listType.innerHTML = "No results found for \"" + search +"\""
        displayMovies(data.results.slice(0, noOfData), parentDiv)
    })
}

// Function to display movies in page based on data and parent div
function displayMovies(data, parentDiv) {
    console.log(data)
    parentDiv.innerHTML = ""
    data.forEach(movie => {
        let movieDiv = document.createElement('div')
            const { title, name, id,overview, vote_average,genre_ids,vote_count,release_date, poster_path } = movie;
            movieDiv.className = "movie"
            movieDiv.innerHTML = `
            <div class="image">
            <img src="${imageURL(poster_path, false)}" alt="" srcset="">
            <a href="reviewpage.html?name=${chooseNameorTitle(name, title)}&type=${chooseMovieorTv(name)}&id=${id}" class="black-box">view-more</a>
            </div>
            <div class="details">
                <div class="title">${chooseNameorTitle(name, title)}  <span>${releseYear(release_date)}</span></div>
                <div class="genre">${getGenreNames(genre_ids).join(' | ')}</div>
                <div class="reting">
                    ${starsGenerate(vote_average/2)}
                    <span>${vote_count} Votes</span>
                    <div class="desc">${overview}</div>
                    <a href="reviewpage.html?name=${chooseNameorTitle(name, title)}&type=${chooseMovieorTv(name)}&id=${id}" class="view-more">View More</a>
                </div>
            </div>
            `

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
function releseYear(date){
    if(date != undefined) return '('+date.slice(0,4)+')'
    else return ""
}
// Function to generate URL that give us data to get fetched
function generateUrl(mainType = 'movie', sortBy = 'popularity', order = 'desc', page = 1, extraQuery = "") {
    let URL = BASE_URL + "/discover/" + mainType + "?sort_by=" + sortBy + "." + order + "&page=" + page + extraQuery + "&vote_average.gte=1.0&api_key=" + API_KEY
    return URL
}
function searchURL(mainType = 'movie', query="", page=1) {
    let URL = BASE_URL + "/search/" + mainType + "?query="+query+"&page="+page+"&api_key=" + API_KEY
    return URL
}



// Function to generate Image src url by path
function imageURL(path, isbanner = false) {
    if (path == null)
        // Return A random image if API doesn't provide
        return "../Images/Homepage/Noimage.png"
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