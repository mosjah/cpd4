
let slideIndex = 1;

// Function to create the flashbox HTML structure dynamically
function createFlashbox() {
    const flashbox = document.createElement("div");
    flashbox.id = "flashbox";
    flashbox.classList.add("flashbox");

    // Close button
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("tabindex", "0");
    closeBtn.setAttribute("aria-label", "Close slideshow");
    closeBtn.onclick = closeFlashbox;

    // Flashbox image
    const flashboxImg = document.createElement("img");
    flashboxImg.id = "flashbox-img";
    flashboxImg.classList.add("flashbox-content");
    flashboxImg.setAttribute("alt", "");

    // Previous and next controls
    const prev = document.createElement("a");
    prev.classList.add("prev");
    prev.innerHTML = "&#10094;";
    prev.setAttribute("tabindex", "0");
    prev.setAttribute("aria-label", "Previous slide");
    prev.onclick = () => plusSlides(-1);

    const next = document.createElement("a");
    next.classList.add("next");
    next.innerHTML = "&#10095;";
    next.setAttribute("tabindex", "0");
    next.setAttribute("aria-label", "Next slide");
    next.onclick = () => plusSlides(1);

    // Dot navigation
    const dotContainer = document.createElement("div");
    dotContainer.classList.add("dot-container");

    // Append elements to the flashbox and then to the body
    flashbox.appendChild(closeBtn);
    flashbox.appendChild(prev);
    flashbox.appendChild(flashboxImg);
    flashbox.appendChild(next);
    flashbox.appendChild(dotContainer);
    document.body.appendChild(flashbox);
}

// Function to open the flashbox and initialize the slideshow
function openFlashbox(index) {
    slideIndex = index;
    const flashbox = document.getElementById("flashbox");
    flashbox.style.display = "block";
    flashbox.setAttribute("aria-hidden", "false");
    showSlides(slideIndex);
}

// Function to close the flashbox
function closeFlashbox() {
    document.getElementById("flashbox").style.display = "none";
    flashbox.setAttribute("aria-hidden", "true");
}

// Function to control next/previous slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to show the current slide
function showSlides(n) {
    let i;
    const galleryImages = document.querySelectorAll("#gallery img");
    const flashboxImg = document.getElementById("flashbox-img");
    const dots = document.querySelectorAll(".dot");

    if (n > galleryImages.length) slideIndex = 1;
    if (n < 1) slideIndex = galleryImages.length;

    // Hide all dots and reset active state
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex - 1].classList.add("active");

    // Set the flashbox image source and update the active dot
    flashboxImg.src = galleryImages[slideIndex - 1].src;
    flashboxImg.alt = galleryImages[slideIndex - 1].alt;
}

// Initialize the flashbox and attach event listeners to gallery images
document.addEventListener("DOMContentLoaded", () => {
    // Create the flashbox structure
    createFlashbox();

    // Get all images within the gallery and add click event listeners
    const galleryImages = document.querySelectorAll("#gallery img");
    galleryImages.forEach((img, index) => {
        img.onclick = () => openFlashbox(index + 1);
        img.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") openFlashbox(index + 1);
        };
    });
    document.addEventListener("keydown", (e) => {
        const flashbox = document.getElementById("flashbox");
        if (flashbox.style.display === "block") {
            switch (e.key) {
                case "Escape":
                    closeFlashbox();
                    break;
                case "ArrowLeft":
                    plusSlides(-1);
                    break;
                case "ArrowRight":
                    plusSlides(1);
                    break;
                default:
                    break;
            }
        }
    });
    
    const dotContainer = document.querySelector(".dot-container");

// Check if reduced motion is preferred
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReducedMotion) {
    // Only enable flashbox, dots, and slideshow if reduced motion is not preferred
        galleryImages.forEach((img, index) => {
            img.onclick = () => openFlashbox(index + 1);

        // Create dot for each image
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.onclick = () => openFlashbox(index + 1);
            dotContainer.appendChild(dot);
        });

    // Initialize slideshow functionality here if applicable
    // For example: startSlideshow();
    } else {
    // Hide the dot container entirely if reduced motion is preferred
        dotContainer.style.display = "none";
    }
});
let topButton = document.getElementById("topBtn");

// Check if reduced motion is preferred
const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

if (!!isReduced) {
    // DON'T use an animation here!
    document.getElementById("topBtn").style.display = "none";
} else {
    // DO use an animation here!
    const topButton = document.getElementById("topBtn");

    // Show the button when the user scrolls down 20px from the top
    window.onscroll = function() {
        topButton.style.display = (document.documentElement.scrollTop > 20) ? "block" : "none";
    };

    // Smooth scroll to top when button is clicked
    topButton.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

const defaultImagePath = '../images/profiles/default_image.jpg';

    // Loop through each image on the page
    document.querySelectorAll('img').forEach(img => {
        // Check if the image has loaded successfully
        img.addEventListener('error', function() {
            // If the image fails to load, set the source to the default image
            if (this.src !== defaultImagePath) {
                this.src = defaultImagePath;
            }
        });
    });


