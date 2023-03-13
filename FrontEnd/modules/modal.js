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