let currentSlide = 0;
const slidesContainer = document.getElementById('slides-container');
const mainHeading = document.getElementById('main-heading');
const totalSlides = 2; 
let autoplayInterval;

const headings = [
    "Your wellness is our core concern",
    "Feel the vibe with a healthy gut..."
];

function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateHeading();
}

function updateHeading() {
    mainHeading.style.opacity = '0';
    setTimeout(() => {
        mainHeading.textContent = headings[currentSlide];
        mainHeading.style.opacity = '1';
    }, 250);
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlidePosition();
    resetAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Initialize autoplay
startAutoplay();

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

slidesContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slidesContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        moveSlide(1); // Swipe left
    } else if (touchEndX - touchStartX > 50) {
        moveSlide(-1); // Swipe right
    }
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
document.getElementById('current-year').textContent = new Date().getFullYear();


