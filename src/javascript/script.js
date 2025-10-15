
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

let apiKey = sessionStorage.getItem("apiKey");
    if (!apiKey) {
      apiKey = prompt("Veuillez entrer votre clé API :");
      if (apiKey && apiKey.trim() !== "") {
        sessionStorageStorage.setItem("apiKey", apiKey.trim());
      } else {
        alert("Aucune clé API saisie. Rechargez la page pour réessayer.");
      }
    }
    console.log("Clé API chargée :", apiKey);

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': apiKey,
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

function renderCard(anime, template, container) {
  const clone = template.content.cloneNode(true);
  clone.querySelector("#cardTitle").textContent = anime.title;
  clone.querySelector("#cardSynopsis").textContent = anime.synopsis;
  clone.querySelector("#cardEpisodes").textContent = anime.episodes;
  clone.querySelector("#cardImg").src = anime.image;
  
  if (anime.hasRanking === true) {
      clone.querySelector("#cardClass").textContent = anime.ranking;
  } else {
      clone.querySelector("#cardClass").textContent = "No ranking";
  }

  clone.querySelector("#cardGenre").textContent = anime.genres;

  container.appendChild(clone);
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
    
    if (jsonData.data && Array.isArray(jsonData.data) && jsonData.data.length > 0) {
      jsonData.data.forEach(anime => {
        renderCard(anime, template, container);
      });
    } else if (jsonData && typeof jsonData === 'object' && jsonData.title) {
      
      renderCard(jsonData, template, container);
    } else {
      const message = document.createElement("p");
      message.textContent = "Aucun anime trouvé pour cette recherche.";
      container.appendChild(message);
    }
    

  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }
}

//-----

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})