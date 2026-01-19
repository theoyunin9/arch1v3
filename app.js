// JS
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const cancelBtn = document.querySelector(".cancel");
const okBtn = document.querySelector(".ok");
const xBtn = document.querySelector(".modal-x");

const messages = {
  red:   { text: "this is not the exit!", color: "#ff5a5a", cancelWorks: false },
  yellow:{ text: "まだ loading 中…",      color: "#ffd65a", cancelWorks: true  },
  green: { text: "welcome back♡",        color: "#5dff9b", cancelWorks: true  },
};

function openModal(type){
  const m = messages[type];

  overlay.hidden = false;

  modalTitle.textContent = "ALERT";
  modalTitle.style.color = "#0f0f12";

  // 문구 색
  modalBody.textContent = m.text;
  modalBody.style.color = m.color;

  // 빨강만 cancel 먹통
  cancelBtn.disabled = !m.cancelWorks;

  // 포커스(아이패드에서도 버튼 클릭 잘 되게)
  okBtn.focus();
}

function closeModal(){
  overlay.hidden = true;
}

// 상단 버튼 3개
document.querySelectorAll(".dot").forEach(btn=>{
  btn.addEventListener("click", ()=> openModal(btn.dataset.modal));
});

// 닫기
okBtn.addEventListener("click", closeModal);
xBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", ()=> {
  if (!cancelBtn.disabled) closeModal();
});

// 바깥 클릭하면 닫기(원하면 이거 지워도 됨)
overlay.addEventListener("click", (e)=>{
  if (e.target === overlay) closeModal();
});

// ESC 닫기(키보드 있을 때)
window.addEventListener("keydown", (e)=>{
  if (!overlay.hidden && e.key === "Escape") closeModal();
});
