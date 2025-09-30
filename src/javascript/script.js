/*let bg = document.body.style;
bg.backgroundImage = "url('assets/background_2.png')";
bg.backgroundRepeat = "no-repeat";
bg.backgroundSize = "cover";*/

const container = document.getElementById("cardZone");
const template = document.getElementById("cardTemplate");

fetch('./test.json')
  .then(response => response.json())
  .then(data => {
    for (const anime of data.data.slice(0, 10)) {
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

      //clone.querySelector("#cardGenre").textContent = anime.genres;
      
      container.appendChild(clone);

    }
  })
  .catch(error => {
    console.error("Erreur lors du fetch :", error);
  });