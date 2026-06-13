btn = document.querySelector("#myButton");

function showAlert() {
  alert("hello new one!");
}

btn.addEventListener("click", showAlert);

btn.removeEventListener("click", showAlert);
