let r = await fetch("http://localhost:5678/api/works");
if (!r.ok) {
  throw new Error("Problème d'acccès serveur");
}
let works = await r.json();

// async function fetchWorks() {
//   const r = await fetch("http://localhost:5678/api/works");
//   if (!r.ok) {
//     throw new Error("Problème d'acccès serveur");
//   }
//   return await r.json();
// } 
// const works = fetchWorks()


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
    trashOverlayButton.setAttribute('class', 'trashcan-overlay-button');
    const trashcan = document.createElement("i");
    trashcan.setAttribute('class', 'fa-solid fa-trash-can');
    const arrowsOverlayButton = document.createElement("button");
    arrowsOverlayButton.setAttribute('class', 'overlay-button arrows')
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
      document.getElementsByClassName('arrows')[i].style.display = "block";
    });
    modalGalleryImg[i].addEventListener("mouseout", () => {
      document.getElementsByClassName('arrows')[i].style.display = "none";
    });
  }

}


arrowsOnHover();


function workDelete () {
  const deleteButton = document.querySelectorAll(".trashcan-overlay-button");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      const id = works[i]["id"];
      fetch(`http://localhost:5678/api/works/${id}`, {method: "DELETE", headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${JSON.parse(window.localStorage.getItem('token'))['token']}`,
      }}).then(res => console.log(res))
    });
  }
}

workDelete()

export function addWork(image, title, category, id) {
  this.image = image
  this.title = title
  this.category = category
  this.id = id;

  const form = new FormData();
  form.append('image', /*File(['<data goes here>'], 'abajour-tahina.png;type=image/png'*/ image);
  form.append('title', title);
  form.append('category', category);


  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + id,
      'Content-Type': 'multipart/form-data'
    },
    body: form
  });

}

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
