

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
document.addEventListener("click", function(event) {
    if (event.target.closest(".hp-gallery-card")) {
       console.log("Image clicked, but not closing overlay.");
    }
});
var images = [
    ["pics/Assets_WIP_Pic1.png", "Assets WIP Pic 1"],
    ["pics/LowPolyCastleSetImg.png", "Low-Poly Castle Set"],
    ["pics/SnowyAutumnPropsFull.png", "Low-Poly snowy-Autumn themed asset pack currently available on the Unity Asset Store"],
    ["pics/ModualarwallsProps.png", "Walls From modular low poly asset pack in development"],
    ["pics/NewTreesStaged.png", "Mid-poly trees work-in-progress for medieval asset pack"],
    ["pics/Props_W-alt.png", "Props for medieval asset pack. With alternate flat material"],
    ["pics/TD_Wip_New.png", "Alpha image of Castle Defense game in development"],
    ["pics/TD_WIPPic.png", "Early work-in-progress image of Castle Defense game"]
];

window.addEventListener('load', loadImages);
//window.onload = loadImages;
function loadImages() {
    console.log("Loading images for HomePage...");

    var container = document.getElementById("HomePagetextContainer");
    container.innerHTML = ""; // Clear existing content

    for (var i = 0; i < images.length; i++) {
        var fig = document.createElement("figure");
        fig.className = "hp-gallery-card";

        var img = document.createElement("img");
        img.src = images[i][0];
        img.alt = images[i][1];
        img.className = "PageImg";
        img.loading = "lazy";
        fig.appendChild(img);

        var figcap = document.createElement("figcaption");
        figcap.className = "HPpictxt";
        figcap.textContent = images[i][1];
        fig.appendChild(figcap);
        
        fig.addEventListener('click', function(){ enlargeImage(this); })
        container.appendChild(fig);
    }
}