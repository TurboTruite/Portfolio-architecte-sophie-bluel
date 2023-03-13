const token = window.localStorage.getItem("token");

if (token === null) {
    console.log('Logged out !');
    document.getElementById("login-menu-item").style.display = "block";
    document.getElementById("logout-menu-item").style.display = "none";
    document.getElementsByClassName("mode-edition-header")[0].style.display = "none";
    document.getElementById("picture-modification").style.display = "none";
    document.getElementById("works-modification").style.display = "none";
} else {
    console.log('logged in !');
    document.getElementById("login-menu-item").style.display = "none";
    document.getElementById("logout-menu-item").style.display = "block";
    document.getElementsByClassName("mode-edition-header")[0].style.display = "flex";
    document.getElementById("picture-modification").style.display = "flex";
    document.getElementById("works-modification").style.display = "flex";
}

const logoutButton = document.getElementById("logout-menu-item");
logoutButton.addEventListener('click', () => {
    window.localStorage.clear();
})
