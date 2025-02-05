

function enlargeImage(element) {
    var imgSrc = element.querySelector("img").src;  // Get clicked image source
    var overlay = document.getElementById("imageOverlay");
    var overlayImg = document.getElementById("overlayImg");

    overlayImg.src = imgSrc;  // Set overlay image source
    overlay.classList.add("active");  // Show overlay
}

function closeImage() {
    var overlay = document.getElementById("imageOverlay");
    overlay.classList.remove("active");  // Hide overlay
}

// Close when pressing ESC key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeImage();
    }
});