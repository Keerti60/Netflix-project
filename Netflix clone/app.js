// ==================== TMDB API Configuration ====================
const API_KEY = '84bbc1c699930f2c9f220c722da946b3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Genre IDs
const GENRES = {
    action: 28,
    comedy: 35,
    horror: 27,
    romance: 10749,
    documentary: 99
};

// ==================== API Functions ====================
async function fetchFromAPI(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`);
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

async function getTrendingMovies() {
    return await fetchFromAPI('/trending/movie/week');
}

async function getMoviesByGenre(genreId) {
    return await fetchFromAPI(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`);
}

async function getMovieDetails(movieId) {
    return await fetchFromAPI(`/movie/${movieId}`);
}

async function getMovieVideos(movieId) {
    return await fetchFromAPI(`/movie/${movieId}/videos`);
}

// ==================== UI Rendering Functions ====================
function createMovieCard(movie, index = null, isTop10 = false) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;
    
    const posterPath = movie.backdrop_path || movie.poster_path;
    const imageUrl = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : 'https://via.placeholder.com/250x140?text=No+Image';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${movie.title}" loading="lazy">
        ${isTop10 ? `<div class="top10-number">${index + 1}</div>` : ''}
        <div class="movie-card-info">
            <h3 class="movie-card-title">${movie.title}</h3>
            <p class="movie-card-rating">${Math.round(movie.vote_average * 10)}% Match</p>
        </div>
    `;
    
    card.addEventListener('click', () => openMovieModal(movie.id));
    
    return card;
}

function renderMovies(movies, containerId, isTop10 = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const moviesToShow = isTop10 ? movies.slice(0, 10) : movies.slice(0, 20);
    
    moviesToShow.forEach((movie, index) => {
        const card = createMovieCard(movie, index, isTop10);
        container.appendChild(card);
    });
}

// ==================== Hero Banner ====================
async function setupHeroBanner() {
    const data = await getTrendingMovies();
    if (!data || !data.results || data.results.length === 0) return;
    
    const movie = data.results[0];
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('heroTitle');
    const heroDescription = document.getElementById('heroDescription');
    
    const backdropUrl = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : '';
    hero.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${backdropUrl})`;
    
    heroTitle.textContent = movie.title;
    heroDescription.textContent = movie.overview;
    
    // Play button functionality
    document.getElementById('heroPlay').addEventListener('click', () => openMovieModal(movie.id));
    document.getElementById('heroInfo').addEventListener('click', () => openMovieModal(movie.id));
}

// ==================== Movie Modal ====================
async function openMovieModal(movieId) {
    const modal = document.getElementById('movieModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalRating = document.getElementById('modalRating');
    const modalYear = document.getElementById('modalYear');
    const modalRuntime = document.getElementById('modalRuntime');
    const modalOverview = document.getElementById('modalOverview');
    const modalVideo = document.getElementById('modalVideo');
    
    // Show modal
    modal.classList.add('active');
    
    // Fetch movie details
    const movie = await getMovieDetails(movieId);
    if (!movie) return;
    
    modalTitle.textContent = movie.title;
    modalRating.textContent = `${Math.round(movie.vote_average * 10)}% Match`;
    modalYear.textContent = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    modalRuntime.textContent = movie.runtime ? `${movie.runtime} min` : '';
    modalOverview.textContent = movie.overview;
    
    // Fetch and display trailer
    const videos = await getMovieVideos(movieId);
    if (videos && videos.results && videos.results.length > 0) {
        const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos.results[0];
        if (trailer) {
            modalVideo.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1" 
                    allowfullscreen
                    allow="autoplay"
                ></iframe>
            `;
        }
    } else {
        const backdropUrl = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : '';
        modalVideo.innerHTML = `<img src="${backdropUrl}" alt="${movie.title}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
}

function closeMovieModal() {
    const modal = document.getElementById('movieModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.classList.remove('active');
    modalVideo.innerHTML = '';
}

// ==================== Horizontal Scroll Navigation ====================
function setupScrollNavigation() {
    const navButtons = document.querySelectorAll('.row-nav');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            const row = document.getElementById(`${section}Row`);
            if (!row) return;
            
            const scrollAmount = row.clientWidth * 0.8;
            const direction = button.classList.contains('row-nav-left') ? -1 : 1;
            
            row.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });
}

// ==================== Header Scroll Effect ====================
function setupHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== Load All Content ====================
async function loadAllContent() {
    try {
        // Setup hero banner
        await setupHeroBanner();
        
        // Load Top 10 Trending
        const trending = await getTrendingMovies();
        if (trending && trending.results) {
            renderMovies(trending.results, 'top10Row', true);
        }
        
        // Load Action Movies
        const action = await getMoviesByGenre(GENRES.action);
        if (action && action.results) {
            renderMovies(action.results, 'actionRow');
        }
        
        // Load Comedy Movies
        const comedy = await getMoviesByGenre(GENRES.comedy);
        if (comedy && comedy.results) {
            renderMovies(comedy.results, 'comedyRow');
        }
        
        // Load Horror Movies
        const horror = await getMoviesByGenre(GENRES.horror);
        if (horror && horror.results) {
            renderMovies(horror.results, 'horrorRow');
        }
        
        // Load Romance Movies
        const romance = await getMoviesByGenre(GENRES.romance);
        if (romance && romance.results) {
            renderMovies(romance.results, 'romanceRow');
        }
        
        // Load Documentaries
        const documentary = await getMoviesByGenre(GENRES.documentary);
        if (documentary && documentary.results) {
            renderMovies(documentary.results, 'documentaryRow');
        }
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load all content
    loadAllContent();
    
    // Setup scroll navigation
    setupScrollNavigation();
    
    // Setup header scroll effect
    setupHeaderScroll();
    
    // Modal close handlers
    document.getElementById('modalClose').addEventListener('click', closeMovieModal);
    document.getElementById('modalOverlay').addEventListener('click', closeMovieModal);
    
    // Search button (placeholder)
    document.getElementById('searchBtn').addEventListener('click', () => {
        alert('Search functionality - Try voice command: "Search [movie name]"');
    });
});

// ==================== Utility Functions ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export functions for voice.js
window.netflixApp = {
    scrollToSection,
    openMovieModal,
    closeMovieModal,
    loadAllContent
};
