const overlay = document.getElementById("xpOverlay");
const openBtn  = document.getElementById("openExitPopup");
const closeX   = document.getElementById("xpCloseX");
const okBtn    = document.getElementById("xpOk");

function openPopup(){
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
}

function closePopup(){
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", openPopup);
closeX.addEventListener("click", closePopup);
okBtn.addEventListener("click", closePopup);

/* 바깥 클릭해도 안 닫히게(원하면 닫히게 바꿔줄게) */
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    // do nothing
  }
});

/* ESC로 닫기 */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("is-open")) closePopup();
});
