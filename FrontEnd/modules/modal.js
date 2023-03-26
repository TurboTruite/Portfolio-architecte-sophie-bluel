import { addWork } from "./works.js";

const openModal = function (e) {
  e.preventDefault();
  const target = document.getElementsByClassName("modal")[0];
  target.style.display = "flex";
  target.addEventListener("click", closeModal);
  target
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  target.querySelector(".fa-xmark").addEventListener("click", closeModal);
};

const closeModal = function (e) {
  e.preventDefault();
  const target = document.getElementsByClassName("modal")[0];
  target.style.display = "none";
  target.removeEventListener("click", closeModal);
  backToModalOne(e);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const goToModalTwo = function (e) {
  e.preventDefault();
  const modalOne = document.getElementsByClassName("modal-content1")[0];
  modalOne.style.display = "none";
  const modalTwo = document.getElementsByClassName("modal-content2")[0];
  modalTwo.style.display = "flex";
  const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
  modalWrapper.style.height = "670px";
  const backArrow = document.getElementsByClassName("fa-arrow-left")[0];
  backArrow.style.display = "block";
  backArrow.addEventListener("click", backToModalOne);
};

const backToModalOne = function (e) {
  e.preventDefault();
  // Remettre la page 1 par défaut
  const modalTwo = document.getElementsByClassName("modal-content2")[0];
  modalTwo.style.display = "none";
  const modalOne = document.getElementsByClassName("modal-content1")[0];
  modalOne.style.display = "flex";
  const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
  modalWrapper.style.height = "731px";
  const backArrow = document.getElementsByClassName("fa-arrow-left")[0];
  backArrow.style.display = "none";
  //réinitialiser le formulaire d'upload si on ferme la modale
  fileRequirements.innerHTML = "jpg, png : 4mo max";
  fileRequirements.style.color = "#000000";
  document.querySelector(".upload-interface").style.display = "flex";
  document.querySelector(".thumbnail").style.display = "none";
  document.querySelector("#title").value = "";
  document.querySelector("#category").selectedIndex = 0;
  document.querySelector(".validate-button-ok").style.display = "none";
  document.querySelector(".validate-button-notOk").style.display = "block";
  titleLength = 0;
  selectedImage = "";
  document.querySelector(".validate-error-msg").style.display = "none";
  backArrow.removeEventListener("click", backToModalOne);
};

document.querySelectorAll(".add-picture-button").forEach((a) => {
  a.addEventListener("click", goToModalTwo);
});

// ------- apparition des flèches de déplacement au hover dans la gallerie -------
export function arrowsOnHover() {
  const modalGalleryImg = document.querySelectorAll(".image-overlay");
  for (let i = 0; i < modalGalleryImg.length; i++) {
    modalGalleryImg[i].addEventListener("mouseover", () => {
      document.getElementsByClassName("arrows")[i].style.display = "block";
    });
    modalGalleryImg[i].addEventListener("mouseout", () => {
      document.getElementsByClassName("arrows")[i].style.display = "none";
    });
  }
}

arrowsOnHover();

// ------- Peupler les catégories du drop down du formulaire de soumission -------
let categories = "";
const populateCategories = async function () {
  // Récuperer les catégories via l'API
  const r = await fetch("http://localhost:5678/api/categories", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  if (!r.ok) {
    throw new Error("Problème d'acccès serveur");
  }

  categories = await r.json();

  // Générerer l'HTML des catégories

  const dropDown = document.querySelector("select");

  for (let i = 0; i < categories.length; i++) {
    let valueAttribute = "";
    valueAttribute = categories[i].name;
    const option = document.createElement("option");
    option.setAttribute("value", valueAttribute);
    option.innerHTML = categories[i].name;
    dropDown.appendChild(option);
  }
};

populateCategories();

// ------- Sélectionner ume image dans le formulaire de soumission et l'afficher -------
let input = document.querySelector("#file");
const fileRequirements = document.querySelector("#file-requirements");
let uploadBox = document.querySelector(".picture-upload-box");
let selectedImage = "";
input.addEventListener("change", () => {
  updateImageDisplay();
});

function updateImageDisplay() {
  selectedImage = input.files;

  //  Message d'erreur si le fichier sélectionné ne correspond pas à ce qui est attendu

  if (
    !(selectedImage[0].type === "image/png") &&
    !(selectedImage[0].type === "image/jpeg")
  ) {
    fileRequirements.innerHTML = "Format invalide - jpg, png : 4mo max";
    fileRequirements.style.color = "red";
    selectedImage = "";
  } else if (selectedImage[0].size > 4000000) {
    fileRequirements.innerHTML = "Taille trop importante - jpg, png : 4mo max";
    fileRequirements.style.color = "red";
    selectedImage = "";
  } else {
    document.querySelector(".upload-interface").style.display = "none";
    const image = document.querySelector(".thumbnail");
    image.src = URL.createObjectURL(selectedImage[0]);
    document.querySelector(".thumbnail").style.display = "flex";
    submitterToggle();
  }
}

// ------- Ajout de travaux -------
const form = document.getElementById("form");
const submitter = document.querySelector(".validate-button-ok");
let formData = "";
let categoryId = "";
let title = "";

submitter.addEventListener("click", (e) => {
  e.preventDefault();
  formData = new FormData(form, submitter);
  const formDataObject = Object.fromEntries(formData);
  title = formDataObject.title;
  for (let i in categories) {
    if (categories[i].name === formDataObject.category) {
      categoryId = categories[i].id;
    }
  }
  let token = JSON.parse(window.localStorage.getItem("token"))["token"];
  addWork(selectedImage[0], title, categoryId, token);
  // Eventuellement si on veut un retour à l'accueil :
  //    closeModal(e)
  // Suggestion de mon mentor pour compenser le manque de feedback visuel à l'ajour d'un nouveau projet :
  backToModalOne(e);
});

// ------- Gestion du bouton "valider" de l'envoi de travaux -------
const fakeSubmitter = document.querySelector(".validate-button-notOk");
const titleField = document.querySelector("#title");
const categoryDropDown = document.querySelector("#category");
let titleLength = 0;

fakeSubmitter.addEventListener("click", (e) => {
  e.preventDefault();
  const errorMsg = document.querySelector(".validate-error-msg");
  let errorMsgTxt = '';
  if (
    (titleLength === 0) &&
    (category.value === "blank") &&
    (selectedImage === "")
  ) {
    errorMsgTxt = 'Veuillez ajouter une image, un titre et une catégorie'
  } else if (
    (titleLength === 0) &&
    (category.value === "blank")
  ) {
    errorMsgTxt = 'Veuillez ajouter un titre et sélectionner une catégorie'
  } else if (
    (category.value === "blank") &&
    (selectedImage === "")
  ) {
    errorMsgTxt = 'Veuillez ajouter une image et sélectionner une catégorie'
  } else if (
    (titleLength === 0) &&
    (selectedImage === "")
  ) {
    errorMsgTxt = 'Veuillez ajouter une image et un titre'
  } else if (
    (titleLength === 0)
  ) {
    errorMsgTxt = 'Veuillez entrer un titre'
  } else if (
    (category.value === "blank")
  ) {
    errorMsgTxt = 'Veuillez sélectionner une catégorie'
  } else if (
    (selectedImage === "")
  ) {
    errorMsgTxt = 'Veuillez sélectionner une image'
  }
  errorMsg.innerHTML = errorMsgTxt;
  errorMsg.style.display = "block";
});

titleField.addEventListener("input", () => {
  titleLength = titleField.value.length;
  submitterToggle();
});

categoryDropDown.addEventListener("change", () => {
  submitterToggle();
});

function submitterToggle() {
  if (
    !(titleLength === 0) &&
    !(category.value === "blank") &&
    !(selectedImage === "")
  ) {
    document.querySelector(".validate-error-msg").style.display = "none";
    fakeSubmitter.style.display = "none";
    submitter.style.display = "block";
  } else {
    fakeSubmitter.style.display = "block";
    submitter.style.display = "none";
  }
}
