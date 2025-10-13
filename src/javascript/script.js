
let url = 'url'; 

document.addEventListener('DOMContentLoaded', () => {
  const filter = document.getElementById('filter');
  const query = document.getElementById('query');
  const delButton = document.getElementById('delButton');
  const searchButton = document.getElementById('searchButton');

  delButton.addEventListener('click', () => {
      query.value = ""; 
  });

  searchButton.addEventListener('click', (event) => {
    const filterValue = filter.value;
    const queryText = query.value;


    console.log("Filtre :", filterValue);
    console.log("Texte :", queryText);

    fetchAnime(filterValue, queryText);
  });
});


const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '75b6251b0fmsh68cc306febf1b84p1a443fjsnff7449ddea1a',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

function editURL(filterValue, queryText) {
  switch(filterValue) {
      case 'title':
          url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + queryText.trim() + '&sortBy=ranking&sortOrder=asc';
          break;
      case 'id':
          url = 'https://anime-db.p.rapidapi.com/anime/by-id/' + parseInt(queryText, 10);
          break;
      case 'rank':
          url = 'https://anime-db.p.rapidapi.com/anime/by-ranking/' + queryText;
          break;
      default:
          url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10';
  }
}

async function fetchAnime(filterValue, queryText) {
  try {

    const container = document.getElementById("cardZone");
    const template = document.getElementById("cardTemplate");

    Array.from(container.children).forEach(child => {
        if (child.tagName.toLowerCase() !== 'template') {
          child.remove();
        }
      });

    editURL(filterValue, queryText);

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

//-----

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})