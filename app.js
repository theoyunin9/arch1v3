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
      el.appendChild(makeCharSpan(ch));
      setTimeout(tick, delayFor(ch));
    };
    tick();
  }

  // ✅ 실행: FRONT → SEP → BACK
  typeTo(frontEl, FRONT, () => {
    typeTo(sepEl, SEP, () => {
      typeTo(backEl, BACK);
    });
  });

  // ===== page transition (single, clean) =====
  (function () {
    const html = document.documentElement;

    // 들어올 때 (iOS 포함: pageshow도 같이 처리)
    const enterDone = () => {
      requestAnimationFrame(() => {
        html.classList.remove("page-enter");
      });
    };

    // html에 class="page-enter"를 이미 달아두면 더 안정적이긴 한데,
    // 지금 구조 유지하면서도 보이게 하려고 여기서도 한번 걸어줌
    html.classList.add("page-enter");
    window.addEventListener("pageshow", enterDone);
    document.addEventListener("DOMContentLoaded", enterDone);

    // data-nav 붙은 링크만 전환 적용
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-nav]");
      if (!a) return;

      // 새탭 / 수정키 / 중클릭은 기본 동작 유지
      if (a.target === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();

      html.classList.add("page-leave");
      setTimeout(() => {
        location.href = href;
      }, 600); // ✅ CSS transition이랑 맞춰서 (opacity .42s)
    });
  })();

})();

// ===== fix: iOS/Safari back button blank (bfcache) =====
(() => {
  const html = document.documentElement;

  const resetTransition = () => {
    html.classList.remove("page-leave", "page-enter");
  };

  // 뒤로가기/앞으로가기(bfcache 복원 포함) 때 무조건 복구
  window.addEventListener("pageshow", resetTransition);

  // 탭 전환/복귀에서도 혹시 남아있으면 복구
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) resetTransition();
  });
})();
