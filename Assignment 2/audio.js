/*
Audio Related Functions
*/
//Changes pages based on what page is said
function changePage(page){
    if(page === "home"){
        window.location.href = 'Home.html';
    }
    else if(page === "dogs"){
        window.location.href = "Dogs.html";
    }
    else if(page === "stocks"){
        window.location.href = "Stocks.html";
    }
}

function changePageColor(color){
    document.body.style.backgroundColor = color;
}

//starts/resumes audio listening
function annyangStart(){
    annyang.resume()
}
//stop/pauses audio listening
function annyangStop(){
    annyang.abort()
}

if (annyang) {
  // Let's define a command.
  const commands = {
    'navigate to *page': changePage,
    'change the color to *color': changePageColor,
    'hello': () => { alert('Hello world!'); }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}