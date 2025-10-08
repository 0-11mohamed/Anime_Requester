
const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=jojo';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '75b6251b0fmsh68cc306febf1b84p1a443fjsnff7449ddea1a',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

function editURL(){

}

const container = document.getElementById("cardZone");
const template = document.getElementById("cardTemplate");

async function fetchAnime() {
  try {

    const response = await fetch(url, options);
    const jsonData = await response.json();

    jsonData.data.forEach(anime => {

        const clone = template.content.cloneNode(true);
        clone.querySelector("#cardTitle").textContent = anime.title;
        clone.querySelector("#cardSynopsis").textContent = anime.synopsis;
        clone.querySelector("#cardEpisodes").textContent = anime.episodes;
        clone.querySelector("#cardImg").src = anime.image;
        if(anime.hasRanking == true){
            clone.querySelector("#cardClass").textContent = anime.ranking;
        } else {
            clone.querySelector("#cardClass").textContent = "No ranking";
        }

        clone.querySelector("#cardGenre").textContent = anime.genres;
        
        container.appendChild(clone);

    });

  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }
}

fetchAnime();