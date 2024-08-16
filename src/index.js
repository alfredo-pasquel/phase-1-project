// Global variables

const instrumentName = document.querySelector(".name");
const instrumentMicrophone = document.querySelector(".microphone");
const instrumentPlacement = document.querySelector("#placement-display");
const imageDetail = document.querySelector(".detail-image");

// Random instrument when page loads

fetch("http://localhost:3000/instruments")
.then(response => response.json())
.then(data => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomInstrument = data[randomIndex];
  imageDetail.src = randomInstrument.image;
  instrumentName.textContent = "Source: " + randomInstrument.name;
  instrumentMicrophone.textContent = "Mic: " + randomInstrument.microphone;
  instrumentPlacement.textContent = randomInstrument.placement;
})
.catch(error => console.error("Error fetching random instrument:", error));

// handleClick Function

const handleClick = () => {
  const instrumentMenu = document.querySelector("#instrument-menu");
  
  instrumentMenu.addEventListener("click", (event) => {

    if (event.target.tagName === "IMG") {
      const id = event.target.id;
      fetch(`http://localhost:3000/instruments/${id}`)
        .then(response => response.json())
        .then(selectedInstrument => {
          imageDetail.src = selectedInstrument.image;
          instrumentName.textContent = selectedInstrument.name;
          instrumentMicrophone.textContent = selectedInstrument.microphone;
          instrumentPlacement.textContent = selectedInstrument.placement;
        })
        .catch(error => console.error("Error fetching instrument details:", error));
    }
  });
};

// addSubmitListener Function

const addSubmitListener = () => {
    document.querySelector("#new-instrument").addEventListener("submit", event => {
      event.preventDefault();
  
      const name = event.target.name.value;
      const microphone = event.target.microphone.value;
      const image = event.target.image.value;
      const placement = event.target["new-placement"].value;
  
      const newInstrument = {
        name,
        microphone,
        image,
        placement,
      };
  
      fetch("http://localhost:3000/instruments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newInstrument)
      })
        .then(response => response.json())
        .then(data => {
  
          appendInstrumentToMenu(data);
  
          event.target.reset();
        })
        .catch(error => console.error("Error adding new instrument:", error));
    });
  };

// appendInstrumentToMenu Function

const appendInstrumentToMenu = (instrument) => {
    const menu = document.querySelector("#instrument-menu");
    const newImg = document.createElement("img");
    newImg.src = instrument.image;
    newImg.id = instrument.id;
    menu.append(newImg);
  };

// displayInstrument Function

const displayInstruments = () => {
    fetch("http://localhost:3000/instruments")
      .then(response => response.json())
      .then(data => data.forEach(instrument => {
        appendInstrumentToMenu(instrument);
      }))
      .catch(error => console.error("Error fetching instrument data:", error));
  };
  
  // Calls main functions on page load
  
  const main = () => {
      document.addEventListener("DOMContentLoaded", () => {
        displayInstruments();
        handleClick();
        addSubmitListener();
      });
    };
  
  main();
  
