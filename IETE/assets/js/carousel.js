const carouselContainer = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.item');
const itemWidth = items[0].offsetWidth;
let currentIndex = 0;

function rotateCarousel() {
  currentIndex = (currentIndex+1) % items.length;
  const translateX = -currentIndex * itemWidth;
  carouselContainer.style.transform = `translateX(${translateX}px)`;
  carouselContainer.style.transition = 'transform 0.5s ease'; // Add a smooth transition
  carouselContainer.style.transform = `translateX(${translateX}px)`;
}

function startCarouselOnLaptop() {
  if (screen.width >= 768) { // Adjust the breakpoint as needed
    setInterval(rotateCarousel, 3000);
  }
}

// Call the function to start the carousel on laptops
startCarouselOnLaptop();
