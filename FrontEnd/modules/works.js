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


// Générer la galerie dans la modale

function generateModalGallery(works) {
  for (let i = 0; i < works.length; i++) {
    const gallery = document.querySelector(".modal-gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = works[i].imageUrl;
    img.setAttribute("class", "overlay-img")
    const editLink = document.createElement("a");
    editLink.innerHTML = "éditer";
    const imgOverlay = document.createElement("div");
    imgOverlay.setAttribute('class', 'image-overlay');
    const trashOverlayButton = document.createElement("button");
    trashOverlayButton.setAttribute('class', 'overlay-button');
    const trashcan = document.createElement("i");
    trashcan.setAttribute('class', 'fa-solid fa-trash-can');
    const arrowsOverlayButton = document.createElement("button");
    arrowsOverlayButton.setAttribute('class', 'overlay-button');
    arrowsOverlayButton.setAttribute('display', 'block');
    const arrows = document.createElement("i");
    arrows.setAttribute('class', 'fa-solid fa-up-down-left-right');
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(imgOverlay);
    imgOverlay.appendChild(trashOverlayButton);
    trashOverlayButton.appendChild(trashcan);
    imgOverlay.appendChild(arrowsOverlayButton);
    arrowsOverlayButton.appendChild(arrows);
    figure.appendChild(editLink);
  }
}

generateModalGallery(works);

// Modale : apparition des flèches de déplacement au hover

function arrowsOnHover () {
  const modalGalleryImg = document.querySelectorAll(".image-overlay");
  for (let i = 0; i < modalGalleryImg.length; i++) {
    modalGalleryImg[i].addEventListener("mouseover", () => {
      console.log('youpi');
    });
  }

}


arrowsOnHover()




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
