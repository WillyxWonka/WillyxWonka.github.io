
let y = true;

function Showtips()
{
    let x = document.getElementById("tips")
    if(y)
    {
        y = !y
        x.style.display = "none";
    }
    else{
        y = !y
        x.style.display = "block";
    }
}
