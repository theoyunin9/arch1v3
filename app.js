const overlay = document.getElementById("xpOverlay");
const xpMsg = document.getElementById("xpMsg");

const btnMin = document.getElementById("btnMin");     // 노랑
const btnMax = document.getElementById("btnMax");     // 초록
const btnClose = document.getElementById("btnClose"); // 빨강

const xpOk = document.getElementById("xpOk");
const xpCancel = document.getElementById("xpCancel");
const xpX = document.getElementById("xpX");

// 현재 모드: "yellow" | "green" | "red"
let currentMode = "yellow";

function openXP(mode, message){
  currentMode = mode;
  xpMsg.textContent = message;

  // 빨강만 cancel 먹통
  overlay.classList.toggle("is-red", mode === "red");

  // cancel 버튼에 클래스 붙여서 CSS로 먹통 처리
  xpCancel.classList.add("xp-btn-cancel");

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeXP(){
  overlay.classList.remove("is-open");
  overlay.classList.remove("is-red");
  overlay.setAttribute("aria-hidden", "true");
}

/* 버튼별 메시지 */
btnMin.addEventListener("click", () => {
  openXP("yellow", "まだ loading 中…");
});

btnMax.addEventListener("click", () => {
  openXP("green", "welcome back♡");
});

btnClose.addEventListener("click", () => {
  openXP("red", "this is not the exit!");
});

/* OK: 항상 닫힘 */
xpOk.addEventListener("click", closeXP);

/* Cancel: 빨강일 때는 CSS로 클릭 자체가 막힘 */
xpCancel.addEventListener("click", () => {
  closeXP();
});

/* X: 항상 닫힘 */
xpX.addEventListener("click", closeXP);

/* 바깥 클릭: 노랑/초록은 닫힘, 빨강은 닫히지 않게(원하면) */
overlay.addEventListener("click", (e) => {
  if(e.target !== overlay) return;

  if(currentMode === "red") return; // 빨강은 바깥클릭 닫기 막음
  closeXP();
});

/* ESC: 노랑/초록만 닫힘, 빨강은 막음 */
document.addEventListener("keydown", (e) => {
  if(e.key !== "Escape") return;
  if(currentMode === "red") return;
  closeXP();
});
