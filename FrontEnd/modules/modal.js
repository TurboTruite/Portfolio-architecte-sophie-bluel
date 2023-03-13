const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementsByClassName("modal")[0];
    target.style.display = 'flex';
    target.addEventListener('click', closeModal);
    target.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    target.querySelector('.fa-xmark').addEventListener('click', closeModal);
}

const closeModal = function (e) {
    const target = document.getElementsByClassName("modal")[0];
    target.style.display = 'none';
    target.removeEventListener('click', closeModal);
}

const stopPropagation = function (e) {
    e.stopPropagation();
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})





