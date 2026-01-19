const openBtn = document.getElementById("openExitPopup");
const overlay = document.getElementById("xpOverlay");
const okBtn = document.getElementById("xpOk");
const closeX = document.getElementById("xpCloseX");

function openPopup(){
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
}

function closePopup(){
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
}

openBtn?.addEventListener("click", openPopup);
okBtn?.addEventListener("click", closePopup);
closeX?.addEventListener("click", closePopup);

// 바깥 클릭하면 닫히게 (원하면 지워도 됨)
overlay?.addEventListener("click", (e) => {
  if(e.target === overlay) closePopup();
});
