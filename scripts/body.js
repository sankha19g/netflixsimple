const bannerMovies = [
    {
        title: "Stranger Things",
        imdb: "8.7 IMDB",
        agerating: "16+",
        duration: "4 Seasons",
        description: "\"Stranger Things\" is a thrilling sci-fi series set in the 1980s, following a group of kids in a small town who encounter supernatural forces and government conspiracies when their friend mysteriously disappears, leading them on a quest to find him and uncover a parallel dimension called the Upside Down.",
        image: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        link: "https://www.imdb.com/title/tt4574334/",
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU?autoplay=1"
    },
    {
        title: "Money Heist",
        imdb: "8.2 IMDB",
        agerating: "18+",
        duration: "5 Parts",
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain. As the heist unfolds, it becomes a game of survival against the police and their own conflicting interests.",
        image: "https://wallpapers.com/images/featured/money-heist-segtwbhffwy01w82.jpg",
        link: "https://www.imdb.com/title/tt6468322/",
        trailer: "https://www.youtube.com/embed/_InqQJRqGW4?autoplay=1"
    },
    {
        title: "Squid Game",
        imdb: "8.0 IMDB",
        agerating: "18+",
        duration: "1 Season",
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A deadly survival game that forces the contestants to face their darkest sides.",
        image: "https://images.wallpapersden.com/image/download/official-squid-game_bWVlZmWUmZqaraWkpJRnZmtmrWZnZmo.jpg",
        link: "https://www.imdb.com/title/tt10919420/",
        trailer: "https://www.youtube.com/embed/oqxAJKy0ii4?autoplay=1"
    },
    {
        title: "The Witcher",
        imdb: "8.1 IMDB",
        agerating: "18+",
        duration: "3 Seasons",
        description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. But when destiny hurtles him toward a powerful sorceress and a young princess with a dangerous secret.",
        image: "https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        link: "https://www.imdb.com/title/tt5180504/",
        trailer: "https://www.youtube.com/embed/ndl1W4ltcmg?autoplay=1"
    },
    {
        title: "Breaking Bad",
        imdb: "9.5 IMDB",
        agerating: "18+",
        duration: "5 Seasons",
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future. What starts as a quick cash grab descends into a dark world of drugs and cartel violence.",
        image: "https://wallpapers.com/images/hd/breaking-bad-walter-and-jesse-80bjfb94bgadfr0p.jpg",
        link: "https://www.imdb.com/title/tt0903747/",
        trailer: "https://www.youtube.com/embed/HhesaQXLuRY?autoplay=1"
    }
];

let currentMovieIndex = 0;
let bannerInterval;

function updateBanner(isManual = false) {
    const banner = document.querySelector('.banner');
    const title = document.querySelector('.banner__title');
    const imdb = document.querySelector('.banner__imdb');
    const age = document.querySelector('.banner__age');
    const duration = document.querySelector('.banner__duration');
    const description = document.querySelector('.banner__description');

    if (!banner || !title) return;

    const movie = bannerMovies[currentMovieIndex];
    const contents = document.querySelector('.banner__contents');

    // Fade out the background
    banner.style.backgroundImage = `url('${movie.image}')`;

    const updateText = () => {
        title.innerText = movie.title;
        if (imdb) imdb.innerHTML = `<i class="fa-solid fa-star"></i> ${movie.imdb}`;
        if (age) age.innerText = movie.agerating;
        if (duration) duration.innerText = movie.duration;
        if (description) description.innerText = movie.description;
    };

    if (isManual && contents) {
        // Immediate text swap for manual navigation to avoid lag
        updateText();
    } else {
        // Adding a fade effect on text 
        if (contents) {
            contents.style.transition = 'opacity 0.4s ease-in-out';
            contents.style.opacity = 0;
        }

        setTimeout(() => {
            updateText();
            if (contents) {
                contents.style.opacity = 1;
            }
        }, 400);
    }
}

function nextMovie() {
    currentMovieIndex = (currentMovieIndex + 1) % bannerMovies.length;
    clearInterval(bannerInterval);
    updateBanner(true);
    bannerInterval = setInterval(() => {
        currentMovieIndex = (currentMovieIndex + 1) % bannerMovies.length;
        updateBanner();
    }, 6000);
}

function prevMovie() {
    currentMovieIndex = (currentMovieIndex - 1 + bannerMovies.length) % bannerMovies.length;
    clearInterval(bannerInterval);
    updateBanner(true);
    bannerInterval = setInterval(() => {
        currentMovieIndex = (currentMovieIndex + 1) % bannerMovies.length;
        updateBanner();
    }, 6000);
}

// Remove resetInterval function

document.addEventListener("DOMContentLoaded", () => {
    // Override the base64 initially so it doesn't flicker between two different stranger things photos
    updateBanner();

    bannerInterval = setInterval(() => {
        currentMovieIndex = (currentMovieIndex + 1) % bannerMovies.length;
        updateBanner();
    }, 6000);
});

// make it accessible to index.html buttons 
window.nextMovie = nextMovie;
window.prevMovie = prevMovie;

// Trailer Modal Functions
function playTrailer() {
    const modal = document.getElementById("trailerModal");
    const iframe = document.getElementById("trailerIframe");
    if (modal && iframe) {
        iframe.src = bannerMovies[currentMovieIndex].trailer;
        modal.style.display = "flex";
    }
}

function closeTrailer() {
    const modal = document.getElementById("trailerModal");
    const iframe = document.getElementById("trailerIframe");
    if (modal && iframe) {
        modal.style.display = "none";
        iframe.src = ""; // Stop playing the video when closed
    }
}

// Close modal or dropdowns when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById("trailerModal");
    if (event.target === modal) {
        closeTrailer();
    }

    const dropdown = document.getElementById("loginDropdown");
    const loginBtn = document.querySelector(".loginbutton");
    if (dropdown && dropdown.classList.contains("show")) {
        if (!dropdown.contains(event.target) && event.target !== loginBtn) {
            dropdown.classList.remove("show");
        }
    }
});

function toggleLoginDropdown(event) {
    if (event) {
        event.stopPropagation();
    }
    const dropdown = document.getElementById("loginDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
}

// Expose trailer and login functions to global window object
window.playTrailer = playTrailer;
window.closeTrailer = closeTrailer;
window.toggleLoginDropdown = toggleLoginDropdown;
