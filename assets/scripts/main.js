// banner carousel with  autoslide

let slideIndex = 1;
showSlides(slideIndex);

// Auto slide every 3 seconds
let autoSlideInterval = setInterval(() => {
  plusSlides(1);
}, 3000); // Change slides every 3000 milliseconds (3 seconds)

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide(); // Reset auto-slide when user interacts
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide(); // Reset auto-slide when user interacts
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval); // Clear existing interval
  autoSlideInterval = setInterval(() => {
    plusSlides(1);
  }, 3000); // Restart the interval
}



// for banner carousel slider 
// without autoslide - commenting for reference
/*
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
*/

//commenting out the section as the header/nav height is positioning it far below the menu

// for submenu dynamic positioning
/* 

window.onload = function() {
    const header = document.querySelector('header'); // or try with the nav element
    const submenu = document.querySelector('.dropdown .submenu');
    
    // Get the height of the header dynamically
    const headerHeight = header.offsetHeight;
    
    // Adjust the top of the submenu to be just below the header
    submenu.style.top = `${headerHeight}px`;
};

*/