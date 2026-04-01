const slides = document.querySelectorAll(".resto-card");
let slideIndex = 0;
let intervalID = null;
const cardsPerSlide = 3;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        showSlide(slideIndex);
        intervalID = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - cardsPerSlide;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });

    for (let i = 0; i < cardsPerSlide; i++) {
        let current = (slideIndex + i) % slides.length;
        slides[current].classList.add("displaySlide");
    }
}

function prevSlide() {
    slideIndex -= cardsPerSlide;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex += cardsPerSlide;
    showSlide(slideIndex);
}

/* https://www.youtube.com/watch?v=749ta0nvj8s */