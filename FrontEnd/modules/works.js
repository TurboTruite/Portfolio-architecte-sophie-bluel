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
