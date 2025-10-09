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
  editURL(filterValue, queryText);
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
}