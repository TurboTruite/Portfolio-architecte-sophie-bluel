import { addWork } from "./works.js";


const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementsByClassName("modal")[0];
    target.style.display = 'flex';
    target.addEventListener('click', closeModal);
    target.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    target.querySelector('.fa-xmark').addEventListener('click', closeModal);
}

const closeModal = function (e) {
    e.preventDefault();
    const target = document.getElementsByClassName("modal")[0];
    target.style.display = 'none';
    target.removeEventListener('click', closeModal);
    backToModalOne(e);
}

const stopPropagation = function (e) {
    e.stopPropagation();
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

const goToModalTwo = function (e) {
    e.preventDefault();
    const modalOne = document.getElementsByClassName("modal-content1")[0];
    modalOne.style.display = 'none';
    const modalTwo = document.getElementsByClassName("modal-content2")[0];
    modalTwo.style.display = 'flex';
    const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
    modalWrapper.style.height = '670px';
    const backArrow = document.getElementsByClassName("fa-arrow-left")[0];
    backArrow.style.display = 'block';
    backArrow.addEventListener('click', backToModalOne)
}

const backToModalOne = function (e) {
    e.preventDefault();
    // Remettre la page 1 par défaut
    const modalTwo = document.getElementsByClassName("modal-content2")[0];
    modalTwo.style.display = 'none';
    const modalOne = document.getElementsByClassName("modal-content1")[0];
    modalOne.style.display = 'flex';
    const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
    modalWrapper.style.height = '731px';
    const backArrow = document.getElementsByClassName("fa-arrow-left")[0];
    backArrow.style.display = 'none';
    //réinitialiser le formulaire d'upload si on ferme la modale
    fileRequirements.innerHTML = "jpg, png : 4mo max";
    fileRequirements.style.color = "#000000";
    document.querySelector('.upload-interface').style.display = 'flex';
    document.querySelector('.thumbnail').style.display = 'none';
    document.querySelector("#title").value = ' ';
    document.querySelector("#category").selectedIndex = 0;
    document.querySelector(".validate-button-ok").style.display = "none";
    document.querySelector(".validate-button-notOk").style.display = "block";
    backArrow.removeEventListener('click', backToModalOne);

}


document.querySelectorAll('.add-picture-button').forEach(a => {
    a.addEventListener('click', goToModalTwo)
})


// Peupler les catégories du drop down du formulaire de soumission
let categories = ''
const populateCategories = async function() {

    // Récuperer les catégories via l'API
    const r = await fetch('http://localhost:5678/api/categories', {method: 'GET', headers: {
        'accept': 'application/json'
    }});
    if (!r.ok) {
        throw new Error("Problème d'acccès serveur");
    };

    categories = await r.json();

    // Générerer l'HTML des catégories

    const dropDown = document.querySelector('select');

    for (let i = 0; i < categories.length; i++) {
        let valueAttribute = '';

        // Ne garder que le premier mot de la catégorie pour la value de l'option du drop down
        // if (categories[i].name.includes("")) {
        //     valueAttribute = categories[i].name.split(/\s+/).slice(0, 1).join(" ");
        // } else {
            valueAttribute = categories[i].name;
        // }

        const option = document.createElement('option');
        option.setAttribute('value', valueAttribute/*.toLowerCase()*/);
        option.innerHTML = categories[i].name;
        dropDown.appendChild(option);
    }
}

populateCategories()


// Sélectionner ume image dans le formulaire de soumission et l'afficher

let input = document.querySelector('#file');
const fileRequirements = document.querySelector('#file-requirements');
let uploadBox = document.querySelector('.picture-upload-box');
let selectedImage = ''
input.addEventListener('change', () => {
    console.log('click détecté')
    updateImageDisplay()
});


function updateImageDisplay() {
    selectedImage = input.files;

    //  Message d'erreur si le fichier sélectionné ne correspond pas à ce qui est attendu

    if (!(selectedImage[0].type === "image/png") && !(selectedImage[0].type === "image/jpeg")) {
    fileRequirements.innerHTML = "Format invalide - jpg, png : 4mo max";
    fileRequirements.style.color = "red";
    } else 
    if (selectedImage[0].size > 4000000) {
        fileRequirements.innerHTML = "Taille trop importante - jpg, png : 4mo max";
        fileRequirements.style.color = "red";
    } else {
        document.querySelector('.upload-interface').style.display = 'none'
        const image = document.querySelector(".thumbnail")
        image.src = URL.createObjectURL(selectedImage[0])
        console.log(selectedImage[0])
        document.querySelector('.thumbnail').style.display = 'flex'
    }
};

// Ajout de travaux
const form = document.getElementById("form")
const submitter = document.querySelector(".validate-button-ok")
let formData = ''
let categoryId = ''
let title = ''



submitter.addEventListener("click", (e) => {
    e.preventDefault()
    formData = new FormData(form, submitter);
    const formDataObject = Object.fromEntries(formData)
    console.log(formDataObject)
    console.log(formDataObject.category)
    console.log(categories)
    title = formDataObject.title
    for (let i in categories) {
        if (categories[i].name === formDataObject.category) {
            categoryId = categories[i].id
        }
    }

    let token = JSON.parse(window.localStorage.getItem('token'))['token']
    console.log(title)
    console.log(categoryId)
    console.log(selectedImage[0])
    console.log(token)
    addWork(selectedImage[0], title, categoryId, token)
})


// function getData(form) {
//     var formData = new FormData(form);
//     console.log(formData)
  
//     for (var pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }
  
//     console.log(Object.fromEntries(formData));
//   }
  
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     getData(e.target);
//   });

//   getData(form)