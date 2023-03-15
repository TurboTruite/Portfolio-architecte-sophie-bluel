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
    const modalTwo = document.getElementsByClassName("modal-content2")[0];
    modalTwo.style.display = 'none';
    const modalOne = document.getElementsByClassName("modal-content1")[0];
    modalOne.style.display = 'flex';
    const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
    modalWrapper.style.height = '731px';
    const backArrow = document.getElementsByClassName("fa-arrow-left")[0];
    backArrow.style.display = 'none';
    backArrow.removeEventListener('click', backToModalOne);
}


document.querySelectorAll('.add-picture-button').forEach(a => {
    a.addEventListener('click', goToModalTwo)
})


const populateCategories = async function() {

    // Récuperer les catégories via l'API
    const r = await fetch('http://localhost:5678/api/categories', {method: 'GET', headers: {
        'accept': 'application/json'
    }});
    if (!r.ok) {
        throw new Error("Problème d'acccès serveur");

    };

    const categories = await r.json();

    // Générerer l'HTML des catégories

    const dropDown = document.querySelector('select');

    for (let i = 0; i < categories.length; i++) {
        let valueAttribute = '';

        // Ne garder que le premier mot de la catégorie pour la value de l'option du drop down
        if (categories[i].name.includes("")) {
            valueAttribute = categories[i].name.split(/\s+/).slice(0, 1).join(" ");
        } else {
            valueAttribute = categories[i].name;
        }

        const option = document.createElement('option');
        option.setAttribute('value', valueAttribute.toLowerCase());
        option.innerHTML = categories[i].name;
        dropDown.appendChild(option);
    }







}

populateCategories()




