function loadDogCarousel() {
    fetch("https://dog.ceo/api/breeds/image/random/10")
      .then(response => response.json())
      .then(data => {
        const carousel = document.getElementById("carousel");
        data.message.forEach(imgURL => {
            carousel.innerHTML += `<img src="${imgURL}" alt="dog image" style="width: 100%; height: 400px; object-fit: stretch;">`;
        });
  
        // Now start the slider
        simpleslider.getSlider({
          container: carousel,
          transitionDuration: 1,
          delay: 3
        });
      })      
  }
  
loadDogCarousel();

let loadedBreeds = [];

function LoadDogButtons(){
    fetch("https://dogapi.dog/api/v2/breeds")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const breeds = data.data; // API wraps results inside .data
        const buttonContainer = document.getElementById("breedButtons");
        loadedBreeds = data.data;
        breeds.forEach(breed => {
          const button = document.createElement("button");
          button.innerText = breed.attributes.name;
          button.setAttribute("class", "button-50");
          button.addEventListener("click", () => showBreedInfo(breed));
          buttonContainer.appendChild(button);
        });
      });
  };
  
function showBreedInfo(breed) {
    document.getElementById("breedName").innerText = breed.attributes.name;
    document.getElementById("description").innerText = breed.attributes.description;
    document.getElementById("minLife").innerText = breed.attributes.life.min;
    document.getElementById("maxLife").innerText = breed.attributes.life.max;
  
    document.getElementById("breedInfo").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    LoadDogButtons();
});

function voiceLoadBreed(breedvoice) {
    const match = loadedBreeds.find(breed =>
      breed.attributes.name.toLowerCase().includes(breedvoice.toLowerCase())
    );
    showBreedInfo(match);
}
  if (annyang) {
    const stockcommands = {
      'Load Dog Breed *breedvoice': voiceLoadBreed
    };
  
    annyang.addCommands(stockcommands);
  }
  
  