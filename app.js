// ===== XP popup open/close =====
const xpOverlay = document.getElementById("xpOverlay");
const openExitPopup = document.getElementById("openExitPopup");
const xpCloseX = document.getElementById("xpCloseX");
const xpOk = document.getElementById("xpOk");

function openXp() {
  xpOverlay.classList.add("is-open");
  xpOverlay.setAttribute("aria-hidden", "false");
}

function closeXp() {
  xpOverlay.classList.remove("is-open");
  xpOverlay.setAttribute("aria-hidden", "true");
}

openExitPopup?.addEventListener("click", openXp);
xpCloseX?.addEventListener("click", closeXp);
xpOk?.addEventListener("click", closeXp);

// (선택) 배경 클릭으로 닫히는 건 싫으면 이 줄 삭제해
xpOverlay?.addEventListener("click", (e) => {
  if (e.target === xpOverlay) closeXp();
});

// ESC로 닫기 (원하면 유지)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && xpOverlay.classList.contains("is-open")) closeXp();
});

const openBtn = document.getElementById("openExitPopup");
const overlay = document.getElementById("xpOverlay");
const closeX = document.getElementById("xpCloseX");
const okBtn = document.getElementById("xpOk");

function openPopup(){
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
}

function closePopup(){
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
}

openBtn?.addEventListener("click", openPopup);
closeX?.addEventListener("click", closePopup);
okBtn?.addEventListener("click", closePopup);

// overlay 바깥 클릭은 닫히지 않게(원하면 지워도 됨)
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) {
    // 아무것도 안 함
  }
});
