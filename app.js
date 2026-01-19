const overlay = document.getElementById("xpOverlay");
const openBtn = document.getElementById("openExitPopup");
const closeX = document.getElementById("xpCloseX");
const okBtn = document.getElementById("xpOk");

openBtn.addEventListener("click", () => {
  overlay.classList.add("is-open");
});

closeX.addEventListener("click", () => {
  overlay.classList.remove("is-open");
});

okBtn.addEventListener("click", () => {
  overlay.classList.remove("is-open");
});
