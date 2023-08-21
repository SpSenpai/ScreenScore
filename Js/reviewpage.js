// Tmdb API
const API_KEY = 'a82bcd736e2b3376bdae9e4e63dd7852'
const BASE_URL = 'https://api.themoviedb.org/3'

let favorites = JSON.parse(localStorage.getItem("favorites"));
if(favorites == null) favorites = []
// Calculate ID and type of movie/series by query string
const pageURL = window.location.href
const searchParams = new URL(pageURL).searchParams
const queryObject = Object.fromEntries(searchParams)
let type = queryObject['type']
let id = queryObject['id']

if(type == undefined) type = "movie"
if(id == undefined) id = 872585


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




getMovie(BASE_URL + "/" + type + "/" + id + "?language=en-US&api_key=" + API_KEY)
function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        fillDetails(data)
    })
}

function fillDetails(data) {
    const { title, id, vote_average, vote_count, genres, backdrop_path, poster_path, runtime, revenue, budget, release_date, overview } = data;

    let infoSection = document.querySelector(".info-section")
    infoSection.innerHTML =
        `
        <div class="banner">
            <img src="${imageURL(backdrop_path, true)}" alt="">
        </div>
        <div class="poster">
            <img src="${imageURL(poster_path, false)}" alt="" srcset="">
            ${checkFavorite(id)}
        </div>
        <div class="details">
            <div class="title">${title}</div>
            <div class="genres">${generateGenreBtns(genres)}
                
            </div>
            <div class="info-list">Realese : ${release_date}</div>
            <div class="info-list">Runtime : ${runtime}m</div>
            <div class="info-list">Budget : \$${Numberformat(budget)}</div>
            <div class="info-list">Revenue : \$${Numberformat(revenue)}</div>
            <div class="rating">
                <div class="stars">
                    ${starsGenerate(vote_average / 2)}
                </div>
                <div class="rating-number">${(vote_average / 2).toFixed(2)}/5 <span>(${Numberformat(vote_count)} Votes)</span></div>
            </div>
            <div class="desc"> Description : ${overview}
            </div>
            <button onclick="traillerBoxOpen()" class="watch-trailer">Watch trailer <i class="fa-solid fa-play"></i></button>
        </div>
    ` + infoSection.innerHTML
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


// functiuon to generate btn from genres
function generateGenreBtns(genres = []) {
    console.log(genres)
    let html = ''
    for (let i = 0; i < genres.length; i++) {
        html = html + "<button class=\"genre-btn\" onclick='loadgenrefilter("+genres[i].id+")'>" + genres[i]["name"] + "</button>"
    }
    return html;
}


// Function to generate stars html based on rating
function starsGenerate(rating = 0.0) {
    let html = ""
    for (let i = 1; i <= 5; i++) {
        if (rating > 0.8) {
            html = html + "<i class=\"fa-sharp fa-solid fa-star\"></i>"
        }
        else if (rating > 0.2) {
            html = html + "<i class=\"fa-sharp fa-solid fa-star-half-stroke\"></i>"
        }
        else {
            html = html + "<i class=\"fa-sharp fa-regular fa-star\"></i>"

        }
        rating--;
    }
    return html;
}

// Load genre filter page
function loadgenrefilter(id){
    window.location.href = "filterpage.html?genres="+id
}


// Traillers box open close
function traillerBoxOpen() {
    document.querySelector('.trailer-overlay').style.top = "0";
}
function traillerBoxClose() {
    document.querySelector('.trailer-overlay').style.top = "-100vh";
}


// Function to format numbers
function Numberformat(number) {
    if (number === 0) return 'unknown'
    else {
        return Intl.NumberFormat('en-US').format(number)
    }
}



// Reviews Section JS

// Posting review
let givenRating = 0
let givenReview = ''

// Star Click
let yourStars = document.querySelectorAll('.your-review-star')

yourStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i <= 5; i++) {
            if (i <= index) {
                yourStars[i].querySelector('i').classList.remove('fa-regular')
                yourStars[i].querySelector('i').classList.add('fa-solid')
            }
            else {
                yourStars[i].querySelector('i').classList.add('fa-regular')
                yourStars[i].querySelector('i').classList.remove('fa-solid')
            }
            document.querySelector('.your-review-text').innerHTML = generateReview(index + 1);
        }

    })
})

function generateReview(rating, reviewType = 'short') {
    let review = ''
    let longReview = ''
    switch (rating) {
        case 1:
            review = 'Pretty bad, Not recommended to watch.'
            longReview = 'A disappointing 1 out of 5. This falters with a disjointed storyline, underdeveloped characters, and lackluster visuals. It fails to deliver on its potential, leaving little to appreciate. Approach with caution or opt for a different choice.'
            break
        case 2:
            review = 'Few good things but not much enjoyable.'
            longReview = 'A modest 2 out of 5. This struggles to maintain engagement with a somewhat fragmented plot and characters. While it has its moments, it falls short of leaving a significant impact. Consider it if you\'re looking for a less demanding watch.'
            break
        case 3:
            review = 'Average, you can give a try.'
            longReview = 'A balanced 3 out of 5! This offers an interesting plot, some engaging characters, and decent visuals. While it may have its flaws, it\'s still worth a watch for its moments of entertainment and curious twists. A satisfactory choice for a casual viewing'
            break
        case 4:
            longReview = 'A solid 4 out of 5! This show delivers an engaging storyline, intriguing characters, and impressive visuals. While not perfect, it\'s a must-watch for its unique approach and entertainment value. A strong choice that leaves a lasting impression'
            review = 'Good one, few complains but definitely worth watching.'
            break
        case 5:
            review = 'Absolutely amazing, no complains, enjoyed a lot.'
            longReview = 'A true masterpiece! This is a rollercoaster of emotions, boasting exceptional storytelling, brilliant character development, and breathtaking cinematography. It defies conventions, leaving you on the edge of your seat. A must-watch that lingers in your thoughts long after the credits roll.'
            break
        default:
    }
    if(reviewType === 'short') return review
    else return longReview
}


let randomNames = ['Emelia Clark', 'Tom Hank', 'Alphanso Davies', 'Monkey D. Luffy', 'Moon Night', 'Nobody', 'Mittins', 'Batman', 'Homelander', 'Marie Avgeropoulos']
function createReview(id, rating, upvote, downvote, days, dateType) {
    return {
        name: randomNames[randomNum(0, 9)],
        image: '../Images/Review-Images/img-' + id + '.jpg',
        rating: rating,
        text: generateReview(rating, 'long'),
        upvote: upvote,
        downvote: downvote,
        days: days,
        avgvote: (upvote - downvote),
        upvoted: false,
        downvoted: false,
    }
}

let reviews = []

let noOfReviews = randomNum(20, 30)
for (let i = 0; i < noOfReviews; i++) {
    let review = createReview(i%10+1, randomNum(1, 5), randomNum(50, 200), randomNum(10, 100), randomNum(2, 30))
    reviews.push(review)
}

console.log(reviews)

displayReviews()
function displayReviews(){
    let reviewGrid = document.querySelector('.review-grid')
    reviewGrid.innerHTML = ''
    reviews.forEach(review =>{
        let reviewBox = document.createElement('div')
        reviewBox.className = 'review'
        updateReview(reviewBox, review)
        reviewGrid.appendChild(reviewBox)
})
}

function updateReview(reviewBox,review){
    reviewBox.innerHTML = `
    <div class="profile">
        <div class="profile-img"><img src="${review.image}" alt=""></div>
        <div>
        <div class="name">${review.name} <span>${review.days} days ago</span></div>
        <div class="review-stars">
            ${starsGenerate(review.rating)}
        </div>
        </div>
        <div class="report-btn"><i class="fa-solid fa-ellipsis-vertical"></i></div>
        <div class="report-popup">Report review</div>

    </div>

    <div class="text">${review.text}</div>
    <div class="up-down-votes">
        <div class="up-vote"><i class="fa-${solidOrRegular(review.upvoted)} fa-up fa-sharp"></i><span>${review.upvote}</span></div>
        <div class="down-vote"><i class="fa-${solidOrRegular(review.downvoted)} fa-down fa-sharp"></i><span>${review.downvote}</span></div>
    </div>
    `
    reviewBox.getElementsByClassName('up-vote')[0].addEventListener('click', ()=>{
        if(!review.upvoted){
            review.upvote++
            review.upvoted = true
            if(review.downvoted){
                review.downvote--
                review.downvoted = false
            }
        }
        else{
            review.upvote--
            review.upvoted = false
        }
        updateReview(reviewBox, review)
    })
    reviewBox.getElementsByClassName('down-vote')[0].addEventListener('click', ()=>{
        if(!review.downvoted){
            review.downvote++
            review.downvoted = true
            if(review.upvoted){
                review.upvote--
                review.upvoted = false
            }
        }
        else{
            review.downvote--
            review.downvoted = false
        }
        updateReview(reviewBox, review)
    })
    let reportPopup = reviewBox.getElementsByClassName('report-popup')[0]
    reviewBox.getElementsByClassName('report-btn')[0].addEventListener('click', ()=>{
        if (reportPopup.style.width === '0px') {
            reportPopup.style.width = '160px'
        }else{
            reportPopup.style.width = '0px'
        }
    })
    reportPopup.addEventListener('click', ()=>{
        reportPopup.style.width = '0px'
        alert("Thanks for reporting, we'll look at it")
    })

    function solidOrRegular(bool){
        if(bool) return 'solid'
        else return 'regular'
    }
}


// Sorting Stuff
let sortingBtn = document.querySelector('.sorting-btn')
let sortingFloatBox = document.querySelector('.sort-float-box')
let sortOptions = document.querySelectorAll('.sort-option')
sortingBtn.addEventListener('click', ()=>{
    if(sortingFloatBox.style.height == '0px'){
        sortingFloatBox.style.height = '200px'
    }
    else{
        sortingFloatBox.style.height = '0px'
    }
})


sortOptions.forEach(sortOption =>{
    sortOption.addEventListener('click', ()=>{
        sortingFloatBox.style.height = '0px'
        sortingFloatBox.querySelector('.sort-active').classList.remove('sort-active')
        sortOption.classList.add('sort-active')
        sortReview(sortOption.innerHTML)
        displayReviews()
    })
})

function sortReview(method = 'Most relevent'){
    if(method === 'Most relevent') reviews = sortByKey(reviews, 'avgvote')
    if(method === 'Most upvoted') reviews = sortByKey(reviews, 'upvote')
    if(method === 'Newest first') reviews = sortByKey(reviews, 'days', -1)
    if(method === 'Best reviews') reviews = sortByKey(reviews, 'rating')
    if(method === 'Worst reviews') reviews = sortByKey(reviews, 'rating', -1)
}


function sortByKey(array, key, order = 1) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? order : ((x > y) ? -order : 0));
    });
}




// Function to generate random integer
function randomNum(start, end) {
    return (Math.floor(Math.random() * (end - start + 1)) + start)
}



// 
function checkFavorite(id){
    let buttonHtml = " "
    if(favorites.includes(type +"-"+ id)){
        buttonHtml = `<button class="add-to-fav fav-added" title="add to favorites" onclick="addTofavorite(${id})"><i class="fa-sharp fa-solid fa-bookmark"><i class="fa-sharp fa-solid fa-check"></i></i></button>`
    }else{
        buttonHtml = `<button class="add-to-fav" onclick="addTofavorite(${id})"><i class="fa-sharp fa-solid fa-bookmark"><i class="fa-sharp fa-solid fa-plus"></i></i></button>`
    }
    return buttonHtml
}

function addTofavorite(id){
    favorites = JSON.parse(localStorage.getItem("favorites"));
    if(favorites == null) favorites = []

    if(favorites.includes(type +"-"+ id)){
        favorites.splice(favorites.indexOf(type +"-"+ id), 1)
        document.querySelector('.add-to-fav').innerHTML = "<i class=\"fa-sharp fa-solid fa-bookmark\"><i class=\"fa-sharp fa-solid fa-plus\"></i></i>"
        document.querySelector('.add-to-fav').classList.remove('fav-added')

    }else{
        favorites.push(type +"-"+ id)
        document.querySelector('.add-to-fav').innerHTML = "<i class=\"fa-sharp fa-solid fa-bookmark\"><i class=\"fa-sharp fa-solid fa-check\"></i></i>"
        document.querySelector('.add-to-fav').classList.add('fav-added')
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))
}
