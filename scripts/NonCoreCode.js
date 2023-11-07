

let y = true;

function Showtips()
{
    let x = document.getElementById("tips")
    let z = document.getElementById("btn3")
    if(y)
    {
        y = !y
        x.style.display = "none";
    }
    else{
        y = !y
        x.style.display = "block";
    }
    z.blur();
}



