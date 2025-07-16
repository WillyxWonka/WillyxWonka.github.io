
function Showtips()
{
    let x = document.getElementById("tips-container")
    let z = document.getElementById("tips-btn")
        
    const isPressed = z.getAttribute("aria-pressed") === "true";
    z.setAttribute("aria-pressed",(!isPressed).toString())

    x.classList.toggle("hidden");
    z.blur();

}

document.addEventListener("keydown", function(event) {
if (event.key === "Escape") {
    Showtips();
}
});



