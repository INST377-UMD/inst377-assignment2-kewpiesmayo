

function randomQuote(){
    fetch('https://zenquotes.io/api/random')
    .then(result => result.json())
    .then(info => {
        document.getElementById('quote').innerHTML = `"${info[0].q}"<br>—<br>${info[0].a}`
    })
}
document.addEventListener("DOMContentLoaded", function () {
    randomQuote();
});



/*
Stock Related Functions
*/

