const r = await fetch("http://localhost:5678/api/works");
if (!r.ok) {
  throw new Error("Problème d'acccès serveur");
}
const works = await r.json();

// Générer la galerie de travaux
function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = works[i].imageUrl;
    const figCaption = document.createElement("figcaption");
    figCaption.innerHTML = works[i].title;
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figCaption);
  }
}

generateWorks(works);

// Filtrer projets : afficher tout
const allButton = document.querySelector("#tous");

allButton.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
});

// Filtrer projets : objets uniquement
const objectsButton = document.querySelector("#objets");

objectsButton.addEventListener("click", function () {
  const filteredWorks = works.filter((works) => {
    return works.category.name === "Objets";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredWorks);
});

// Filtrer projets : appartements uniquement
const aptButton = document.querySelector("#appartements");

aptButton.addEventListener("click", function () {
  const filteredWorks = works.filter((works) => {
    return works.category.name === "Appartements";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredWorks);
});

// Filtrer projets : hôtels uniquement
const hotelButton = document.querySelector("#hotels");

hotelButton.addEventListener("click", function () {
  const filteredWorks = works.filter((works) => {
    return works.category.name === "Hotels & restaurants";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(filteredWorks);
});
