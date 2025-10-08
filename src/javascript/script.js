const fs = require("fs");

const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=vinland';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '75b6251b0fmsh68cc306febf1b84p1a443fjsnff7449ddea1a',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

function editURL(){

}

async function fetchAnime() {
  try {
    //editURL();
    const response = await fetch(url, options);
    const result = await response.json();

    let jsonData = JSON.parse

  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }
}

fetchAnime();