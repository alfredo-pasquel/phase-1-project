// Global variables

const instrumentName = document.querySelector(".name");
const instrumentMicrophone = document.querySelector(".microphone");
const instrumentPlacement = document.querySelector("#placement-display");
const imageDetail = document.querySelector(".detail-image");
const audioPlayer = document.querySelector("#audio-player");
const imageDetailContainer = document.querySelector(".detail-image-container");

// Random instrument when page loads

fetch("http://localhost:3000/instruments")
  .then(response => response.json())
  .then(data => {
    const randomInstrument = data[Math.floor(Math.random() * data.length)];
    imageDetail.src = randomInstrument.image;
    instrumentName.textContent = "Source: " + randomInstrument.name;
    instrumentMicrophone.textContent = "Mic: " + randomInstrument.microphone;
    instrumentPlacement.textContent = randomInstrument.placement;
    audioPlayer.src = randomInstrument.audio;
  })
  .catch(error => console.error("Error fetching random instrument:", error));

// Zoom functionality on imageDetail

imageDetail.addEventListener("mouseover", () => {
  imageDetail.style.transform = "scale(1.5)";
});

imageDetail.addEventListener("mousemove", (event) => {
  const rect = imageDetailContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  imageDetail.style.transformOrigin = `${xPercent}% ${yPercent}%`;
});

imageDetail.addEventListener("mouseout", () => {
  imageDetail.style.transform = "scale(1)";
  imageDetail.style.transformOrigin = "center";
});

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
          instrumentName.textContent = "Source: " + selectedInstrument.name;
          instrumentMicrophone.textContent = "Mic: " + selectedInstrument.microphone;
          instrumentPlacement.textContent = selectedInstrument.placement;
          audioPlayer.src = selectedInstrument.audio;
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
      const audio = event.target.audio.value;
  
      const newInstrument = {
        name,
        microphone,
        image,
        placement,
        audio,
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

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("menu-image-container");

  const newImg = document.createElement("img");
  newImg.src = instrument.image;
  newImg.id = instrument.id;
  newImg.classList.add("menu-image");

  newImg.addEventListener("mouseover", () => {
    newImg.style.transform = "scale(1.5)";
  });

  newImg.addEventListener("mousemove", (event) => {
    const rect = imageContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    newImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
  });

  newImg.addEventListener("mouseout", () => {
    newImg.style.transform = "scale(1)";
    newImg.style.transformOrigin = "center";
  });

  imageContainer.appendChild(newImg);
  menu.appendChild(imageContainer);

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
  
