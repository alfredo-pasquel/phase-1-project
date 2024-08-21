## Microphone Selector ##

Welcome to Microphone Selector, a single-page application designed to assist musicians and audio engineers in selecting the best microphone and its placement for recording various instruments. This app provides a visual and audio reference for each instrument, allowing users to make informed decisions when recording.

## Features ##

Instrument Selection: Browse through a wide range of instruments, each paired with the ideal microphone type and placement.

Audio Samples: Listen to example recordings for each instrument, helping you understand the mic’s characteristics in real-world use.

Interactive UI: Enjoy dynamic interactions such as zooming in on images, clicking to select instruments, and form submissions for adding new instruments.

## Interactive Features ##

Image Zoom: Triggered by mouseover, mousemove, and mouseout events to provide a closer look at the instrument images.

Handle Click: Uses the click event to respond when selecting instruments or interacting with other elements.

Submit Listener: Submits new instrument data through a form submission triggered by the submit event.

## Adding New Instruments ##

You can contribute to the app by adding new instruments to the database. Use the Add New Instrument form, where you will be required to provide:

An image URL of the instrument

An audio sample URL for the instrument

These submissions will be instantly reflected on the page after being successfully added.

## Data & Assets ##

The information regarding microphone placement and audio samples is based on my personal experience and professional background.

Instrument images were sourced from royalty-free image websites and comply with legal use standards.

## Prerequisites ##

This app relies on a JSON Server for data storage and retrieval. To get started, ensure that your development environment is set up with:

JSON Server: Make sure it is installed globally or in your project. If not, you can install it via npm:

npm install -g json-server

Run JSON Server: Start the server on port 3000 and make sure it's watching the db.json file provided in the project:

json-server --watch db.json --port 3000

## Setup ##

To run the Microphone Selector app locally:

Clone the repository to your local machine.

Install any necessary dependencies via npm install (if applicable).

Start your JSON Server on port 3000 as mentioned above.

Open the index.html file in your preferred browser.

## Technology Stack ##

Frontend: HTML, CSS, JavaScript

Backend: JSON Server (serving as a local REST API for data storage)

Libraries: None (pure JavaScript for event handling)

## Future Improvements ##

Search Feature: Implement a search bar to allow users to quickly find instruments by name.

Filter by Microphone Type: Enable filtering instruments based on the microphone type or placement strategy.

User Authentication: Allow users to save their favorite instruments and microphone setups.

## Thank you for checking out Microphone Selector! I hope you find it helpful in your recording endeavors. ##