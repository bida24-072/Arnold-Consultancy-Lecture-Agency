// script.js
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;
    const slideCount = slideItems.length;
    
    // Initialize slideshow
    function initSlideshow() {
        // Set initial active dot
        updateDots();
        
        // Start automatic slideshow
        startSlideshow();
        
        // Event listeners for navigation
        prevBtn.addEventListener('click', () => {
            pauseSlideshow();
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            pauseSlideshow();
            goToSlide(currentIndex + 1);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                pauseSlideshow();
                goToSlide(index);
            });
        });
        
        // Pause on hover
        const slideshow = document.querySelector('.slideshow');
        slideshow.addEventListener('mouseenter', pauseSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index >= slideCount) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slideCount - 1;
        } else {
            currentIndex = index;
        }
        
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    
    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Pause automatic slideshow
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Initialize the slideshow
    initSlideshow();
});
