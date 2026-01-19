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
