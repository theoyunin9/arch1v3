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
