let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let autoPlayInterval;

function moveSlide(step) {
    showSlide(currentSlide + step);
    resetAutoPlay();
}

function setSlide(index) {
    showSlide(index);
    resetAutoPlay();
}

// Ensure overlay is back when moving away or video paused
function showSlide(index) {
    const prevSlide = slides[currentSlide];
    const prevVideo = prevSlide.querySelector('video');
    if (prevVideo) {
        prevVideo.pause();
        showOverlay(); // Reset overlay when leaving slide
    }

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo && !currentVideo.paused) {
            // Don't auto-slide if video is playing
            return;
        }
        moveSlide(1);
    }, 8000); // 8 seconds for home page as there is a video
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Handle video events to pause/resume autoplay
slides.forEach(slide => {
    const video = slide.querySelector('video');
    if (video) {
        video.addEventListener('play', () => {
            clearInterval(autoPlayInterval);
        });
        video.addEventListener('pause', () => {
            resetAutoPlay();
            showOverlay();
        });
        video.addEventListener('ended', () => {
            showOverlay();
            moveSlide(1);
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startAutoPlay();
});

function playCarouselVideo() {
    const video = document.getElementById('presentationVideo');
    const overlay = document.getElementById('videoOverlay');
    if (video) {
        video.play();
        if (overlay) overlay.classList.add('hidden');
    }
}

function showOverlay() {
    const overlay = document.getElementById('videoOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}
