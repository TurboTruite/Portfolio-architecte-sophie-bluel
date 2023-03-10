const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
      email: emailField.value,
      password: passwordField.value,
    }),
  })

  // .then((response) => response.json())
  // .then((data) => console.log(data))
  // .catch((err) => {
  //   console.log(err);
  //  });

  const r = await response.json()

  if (r.message === "user not found") {
    const errorMsg = document.getElementsByClassName("login-error-msg")[0];
    errorMsg.style.display = 'block';
  }


})
