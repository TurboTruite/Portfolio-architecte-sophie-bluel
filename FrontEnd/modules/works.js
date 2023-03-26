import { arrowsOnHover } from "./modal.js";

async function fetchWorks() {
  const r = await fetch("http://localhost:5678/api/works");
  const works = await r.json();
  generateWorks(works);
  generateModalGallery(works);
  arrowsOnHover();
  workDelete(works);
  filterWorks(works);
}

fetchWorks();

// ------- Générer la galerie de travaux -------
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

// -------  Générer la galerie dans la modale -------

function generateModalGallery(works) {
  for (let i = 0; i < works.length; i++) {
    const gallery = document.querySelector(".modal-gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = works[i].imageUrl;
    img.setAttribute("class", "overlay-img");
    const editLink = document.createElement("a");
    editLink.innerHTML = "éditer";
    const imgOverlay = document.createElement("div");
    imgOverlay.setAttribute("class", "image-overlay");
    const trashOverlayButton = document.createElement("button");
    trashOverlayButton.setAttribute("class", "trashcan-overlay-button");
    const trashcan = document.createElement("i");
    trashcan.setAttribute("class", "fa-solid fa-trash-can");
    const arrowsOverlayButton = document.createElement("button");
    arrowsOverlayButton.setAttribute("class", "overlay-button arrows");
    arrowsOverlayButton.setAttribute("display", "block");
    const arrows = document.createElement("i");
    arrows.setAttribute("class", "fa-solid fa-up-down-left-right");
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

function workDelete(works) {
  const deleteButton = document.querySelectorAll(".trashcan-overlay-button");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", async (e) => {
      e.preventDefault();
      const id = works[i]["id"];
      await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem("token"))["token"]
          }`,
        },
      });
      document.querySelector(".gallery").innerHTML = "";
      document.querySelector(".modal-gallery").innerHTML = "";
      fetchWorks();
    });
  }
}

workDelete();

// ------- Ajout de travaux  -------

export async function addWork(image, title, categoryId, token) {
  const form = new FormData();
  form.append("image", image);
  form.append("title", title);
  form.append("category", categoryId);

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
      // 'Content-Type': 'multipart/form-data'
    },
    body: form,
  });
  document.querySelector(".gallery").innerHTML = "";
  document.querySelector(".modal-gallery").innerHTML = "";
  fetchWorks();
}

// -------  Filtrer projets -------

function filterWorks(works) {
  // afficher tout
  const allButton = document.querySelector("#tous");
  allButton.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
  });

  // objets uniquement
  const objectsButton = document.querySelector("#objets");
  objectsButton.addEventListener("click", function () {
    const filteredWorks = works.filter((works) => {
      return works.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
  });

  // appartements uniquement
  const aptButton = document.querySelector("#appartements");
  aptButton.addEventListener("click", function () {
    const filteredWorks = works.filter((works) => {
      return works.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
  });

  // hôtels uniquement
  const hotelButton = document.querySelector("#hotels");
  hotelButton.addEventListener("click", function () {
    const filteredWorks = works.filter((works) => {
      return works.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
  });
}
