// movie.js

// Function to search for movies
function searchMovies() {
    const input = document.getElementById('search').value.toLowerCase();
    const movieContainers = document.querySelectorAll('.pictures');
    let result = false;

    movieContainers.forEach((container) => {
        const movieName = container.querySelector('.text a').textContent.toLowerCase();
        if (movieName.includes(input)) {
            container.style.display = 'block';
            result = true;
        } else {
            container.style.display = 'none';
        }
    });

    const messageElement = document.getElementById('searchMessage');
    const refreshButton = document.getElementById('refreshButton');

    if (!result) {
        messageElement.style.display = 'block';
        messageElement.textContent = 'Sorry, Movie not found. Here are some related movies:';
        refreshButton.style.display = 'block';
        // Call a function to show related movies based on the search query
        showRelatedMovies(input);
    } else {
        messageElement.style.display = 'none';
        messageElement.textContent = '';
        refreshButton.style.display = 'none';
    }
}

// Function to extract movie data from HTML elements
function extractMovieData() {
    const movieElements = document.querySelectorAll('.pictures');
    const movies = [];

    movieElements.forEach((element) => {
        const name = element.querySelector('.text a').textContent;
        const link = element.querySelector('.text a').href;
        const image = element.querySelector('.img').src;
        movies.push({ name, link, image });
    });

    return movies;
}

// Function to show related movies based on search query
function showRelatedMovies(searchQuery) {
    const movies = extractMovieData();

    // Count the number of matching letters in each movie name
    const moviesWithMatchCount = movies.map((movie) => {
        const matchCount = movie.name.toLowerCase().split(' ').reduce((count, word) => {
            return count + word.includes(searchQuery);
        }, 0);
        return { ...movie, matchCount };
    });

    // Sort movies based on the match count in descending order
    const sortedMovies = moviesWithMatchCount.sort((a, b) => b.matchCount - a.matchCount);

    // Get the container where related movies will be displayed
    const relatedMoviesContainer = document.getElementById('relatedMovies');

    // Clear previous related movie list
    relatedMoviesContainer.innerHTML = '';

    // Create elements for the related movies and append them to the container
    sortedMovies.forEach((movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'pictures';

        const img = document.createElement('img');
        img.className = 'img';
        img.src = movie.image;
        img.alt = movie.name;

        const textDiv = document.createElement('aside');
        textDiv.className = 'text';
        const link = document.createElement('a');
        link.href = movie.link;
        link.textContent = movie.name;
        textDiv.appendChild(link);

        movieDiv.appendChild(img);
        movieDiv.appendChild(textDiv);
        relatedMoviesContainer.appendChild(movieDiv);
    });
}

// Rest of your code...






// Function to clear search and reload the page
function clearsearch() {
    location.reload();
}

// Function to refresh the page
function refreshPage() {
    location.reload();
}

// function call
if (window.innerWidth < 500){
    handleImageScaling();
}

// sacling image in mobile

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.bottom <= window.innerHeight);
}

// Function to scale the images
function handleImageScaling() {
    const pictures = document.querySelectorAll('.pictures');
    const windowHeight = window.innerHeight;
    let imageScaled = false;

    pictures.forEach((picture) => {
        const img = picture.querySelector('.img');
        const text = picture.querySelector('.text');
        const imgRect = img.getBoundingClientRect();
        const imgCenterY = imgRect.top ;

        if (!imageScaled && imgCenterY > 0 && imgCenterY < windowHeight) {
            img.style.transform = 'scale(1.14)';
            text.style.transform='scale(1.14)';
            imageScaled = true;
        } else {
            img.style.transform = 'scale(1.0)';
            text.style.transform='scale(1.0)';
        }
    });
}


// function call on every scrolling
if (window.innerWidth < 500){
    window.addEventListener('scroll', handleImageScaling);
}

