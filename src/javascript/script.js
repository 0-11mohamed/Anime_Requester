

const ulElement = document.getElementById("anime-list");

fetch('./test.json')
  .then(response => response.json())
  .then(data => {
    for (const anime of data.data) {
      const liElement = document.createElement("li");
      liElement.innerText = anime.title;
      ulElement.appendChild(liElement);
    }
  })
  .catch(error => {
    console.error("Erreur lors du fetch :", error);
  });