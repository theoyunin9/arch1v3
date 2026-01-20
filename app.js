(() => {
  const frontEl = document.getElementById("titleFront");
  const sepEl   = document.getElementById("titleSep");
  const backEl  = document.getElementById("titleBack");

  if (!frontEl || !sepEl || !backEl) return;

  // ✅ 문구(누나가 확정한 거)
  const FRONT = "ARCH1V3D";
  const SEP   = " — ";
  const BACK  = "but not resolved";

  // ✅ 공포 조성용 “느린데 자연스러운” 속도
  const base = 125;              // 평균 속도
  const jitter = 90;             // 랜덤 흔들림
  const pausePunct = 260;        // 구두점/대쉬 뒤 살짝 멈칫
  const redChance = 0.14;        // “가끔 한 글자씩” (14%)

  function isSkippable(ch){
    return ch === " " || ch === "\n" || ch === "\t";
  }

  function makeCharSpan(ch){
    const s = document.createElement("span");
    s.className = "char" + (!isSkippable(ch) && Math.random() < redChance ? " red" : "");
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
      el.appendChild(makeCharSpan(ch));
      setTimeout(tick, delayFor(ch));
    };
    tick();
  }

  // 순서: FRONT → SEP → BACK (앞/뒤 크기 다르게)
  typeTo(frontEl, FRONT, () => {
    typeTo(sepEl, SEP, () => {
      typeTo(backEl, BACK);
    });
  });
})();

// ===== 메인 타이틀 타이핑 =====
document.addEventListener("DOMContentLoaded", () => {
  const frontEl = document.getElementById("titleFront");
  const sepEl   = document.getElementById("titleSep");
  const backEl  = document.getElementById("titleBack");

  const frontText = "ARCHIV3D";
  const sepText   = " — ";
  const backText  = "but not resolved";

  // 초기화
  frontEl.textContent = "";
  sepEl.textContent = "";
  backEl.textContent = "";

  const baseColor = "rgba(116,146,219,0.95)";
  const rareColor = "rgba(152,42,40,0.95)";

  function pickColor(){
    // 12% 확률로 빨간 글자
    return (Math.random() < 0.12) ? rareColor : baseColor;
  }

  function typeOneByOne(el, text, done){
    let i = 0;

    const tick = () => {
      if (i >= text.length) { done?.(); return; }

      const ch = text[i];
      const span = document.createElement("span");
      span.textContent = ch;
      span.style.color = pickColor();

      // 빨간 글자일 때도 유리광 유지
      if (span.style.color.includes("152")) {
        span.style.textShadow = "0 0 6px rgba(152,42,40,0.45)";
      }

      el.appendChild(span);
      i++;

      // 속도: 자연스러운 타자 + 공포 연출 사이
      const base = 80;                 // 기본 속도
      const jitter = Math.random() * 90; // 랜덤 흔들림
      const pause = (ch === " " || ch === "—") ? 220 : 0; // 공백/대시 멈칫

      setTimeout(tick, base + jitter + pause);
    };

    tick();
  }

  typeOneByOne(frontEl, frontText, () => {
    typeOneByOne(sepEl, sepText, () => {
      typeOneByOne(backEl, backText);
    });
  });
});
