const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

const logoutButton = document.getElementById("logoutButton");
const logoutOverlay = document.getElementById("logoutOverlay");

function animateLogout() {
  logoutOverlay.classList.add("visible");
  document.body.classList.add("fade-out");
  logoutButton.disabled = true;
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }, 450);
}

logoutButton.addEventListener("click", animateLogout);
