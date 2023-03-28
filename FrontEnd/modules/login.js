const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: emailField.value,
      password: passwordField.value,
    }),
  });

  const r = await response.json();
  console.log(r)

  if (r.message === "user not found" || r.error) {
    const errorMsg = document.getElementsByClassName("login-error-msg")[0];
    errorMsg.style.display = "block";
  } else {
    window.localStorage.setItem("token", JSON.stringify(r));
    window.location.assign("./index.html");
  }
});
