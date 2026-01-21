(() => {
  const frontEl = document.getElementById("titleFront");
  const sepEl   = document.getElementById("titleSep");
  const backEl  = document.getElementById("titleBack");

  if (!frontEl || !sepEl || !backEl) return;

  // ✅ 문구(누나가 확정한 거)
  const FRONT = "ARCH1V3D";
  const SEP   = " — ";
  const BACK  = "but not resolved";

  // ✅ 타이핑 속도 더 느리게 (공포+자연 사이)
  const base = 190;              // ⬅️ (기존 125) 평균 속도 더 느리게
  const jitter = 140;            // ⬅️ (기존 90) 흔들림도 조금 크게
  const pausePunct = 360;        // ⬅️ (기존 260) 대쉬/구두점 멈칫 더 길게

  // ✅ 빨강: "아예 안 뜨는 회차"도 나오게
  const runHasRed = Math.random() < 0.55; // 45% 확률로 이번 회차는 빨강 0개
  const redChance = 0.045;               // 빨강 허용 회차에서도 글자 단위 확률 낮게(4.5%)

  // ✅ 중복 실행 방지(혹시나 파일이 또 로드/실행되는 상황 대비)
  if (window.__titleTypingStarted) return;
  window.__titleTypingStarted = true;

  // ✅ 초기화(혹시 남아있는 글자 제거)
  frontEl.textContent = "";
  sepEl.textContent = "";
  backEl.textContent = "";

  function isSkippable(ch){
    return ch === " " || ch === "\n" || ch === "\t";
  }

  function makeCharSpan(ch){
    const s = document.createElement("span");
    const isRed = runHasRed && !isSkippable(ch) && Math.random() < redChance;
    s.className = "char" + (isRed ? " red" : "");
    s.textContent = ch;
    return s;
  }

  function delayFor(ch){
    let d = base + Math.random() * jitter;
    if (ch === "—" || ch === "," || ch === "." ) d += pausePunct;
    return d;
  }

  function typeTo(el, text, done){
    let i = 0;
    const tick = () => {
      if (i >= text.length) return done?.();
      const ch = text[i++];
// ===== page transition nav =====
document.documentElement.classList.add('page-enter');
window.addEventListener('DOMContentLoaded', () => {
  // 다음 프레임에 enter 제거(페이드인)
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('page-enter');
  });

  // 메뉴 링크들: # 아닌 것만 전환 적용
  document.querySelectorAll('a.menu-item').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = a.href;

      document.documentElement.classList.add('page-leave');
      setTimeout(() => {
        window.location.href = url;
      }, 220);
    });
  });
});
