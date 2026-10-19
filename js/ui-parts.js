/* Wortkosmos – Grafiken, Ton, Aussprache, Effekte */
(function () {
  "use strict";
  const WK = window.WK;

  const svg = (p, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;

  WK.icon = {
    star: svg('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" stroke="none"/>'),
    fire: svg('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5.5 1-8.5z" fill="currentColor" stroke="none"/>'),
    route: svg('<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>'),
    list: svg('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
    x: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    back: svg('<path d="M15 5l-7 7 7 7"/>'),
    chev: svg('<path d="M9 5l7 7-7 7"/>'),
    speaker: svg('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 'stroke-width="3"'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    trash: svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
    quiz: svg('<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/>'),
    cards: svg('<rect x="6" y="3" width="13" height="16" rx="2" transform="rotate(8 12 11)"/><rect x="4" y="5" width="13" height="16" rx="2"/>'),
    pencil: svg('<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>'),
    keys: svg('<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 15h10"/>'),
    puzzle: svg('<path d="M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3z"/>'),
    bolt: svg('<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor" stroke="none"/>'),
    target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>'),
    paste: svg('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>'),
    download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    upload: svg('<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>'),
    refresh: svg('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>'),
    sparkle: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor" stroke="none"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="currentColor" stroke="none"/>'),
    edit: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    play: svg('<path d="M7 4l13 8-13 8z" fill="currentColor"/>')
  };

  /* Maskottchen Kosmo – Farbe frei wählbar, mood: "happy" | "wow" | "calm" */
  WK.kosmo = function (color = "#8B6CFF", mood = "happy", cls = "kosmo") {
    const mouth = mood === "wow"
      ? '<ellipse cx="35" cy="35" rx="4" ry="4.5" fill="#3EE6C8"/>'
      : mood === "calm"
        ? '<path d="M31 35h8" stroke="#3EE6C8" stroke-width="2.4" stroke-linecap="round"/>'
        : '<path d="M29.5 33.5q5.5 5 11 0" stroke="#3EE6C8" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    return `<svg class="${cls}" viewBox="0 0 70 78" aria-hidden="true">
      <ellipse cx="35" cy="76" rx="16" ry="2.5" fill="rgba(0,0,0,.25)"/>
      <path d="M14 56c-6 2-8 8-6 11" stroke="#EDEBFF" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M56 56c6-1 9-6 8-11" stroke="#EDEBFF" stroke-width="7" stroke-linecap="round" fill="none"/>
      <ellipse cx="35" cy="59" rx="21" ry="16" fill="#EDEBFF"/>
      <rect x="26" y="53" width="18" height="11" rx="3.5" fill="${color}"/>
      <circle cx="31" cy="58.5" r="2.2" fill="#3EE6C8"/><circle cx="39" cy="58.5" r="2.2" fill="#FFC94D"/>
      <circle cx="35" cy="28" r="23" fill="#fff"/>
      <circle cx="35" cy="28" r="23" fill="none" stroke="${color}" stroke-width="3"/>
      <rect x="17" y="15.5" width="36" height="26" rx="13" fill="#1C1450"/>
      <g><ellipse cx="28" cy="27" rx="3.6" ry="3.6" fill="#3EE6C8"><animate attributeName="ry" values="3.6;3.6;.5;3.6" keyTimes="0;.92;.96;1" dur="4.5s" repeatCount="indefinite"/></ellipse>
      <ellipse cx="42" cy="27" rx="3.6" ry="3.6" fill="#3EE6C8"><animate attributeName="ry" values="3.6;3.6;.5;3.6" keyTimes="0;.92;.96;1" dur="4.5s" repeatCount="indefinite"/></ellipse></g>
      ${mouth}
      <rect x="23" y="18.5" width="9" height="3" rx="1.5" fill="rgba(255,255,255,.4)"/>
      <line x1="35" y1="5" x2="35" y2="-1" stroke="#fff" stroke-width="2.4"/>
      <circle cx="35" cy="-1" r="3.4" fill="#FF6FAE"><animate attributeName="fill" values="#FF6FAE;#FFC94D;#FF6FAE" dur="1.8s" repeatCount="indefinite"/></circle>
    </svg>`;
  };

  WK.rocketSvg = function () {
    return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="rkB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#BFF8EE"/><stop offset="1" stop-color="#3EE6C8"/></linearGradient>
      <linearGradient id="rkF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC94D"/><stop offset="1" stop-color="#FF6FAE"/></linearGradient></defs>
      <g transform="rotate(40 32 32)">
        <path d="M32 6c9 7 12 18 10 30H22C20 24 23 13 32 6z" fill="url(#rkB)"/>
        <circle cx="32" cy="22" r="5" fill="#14103A" stroke="#fff" stroke-width="2"/>
        <path d="M22 30l-7 10 8-2zM42 30l7 10-8-2z" fill="#8B6CFF"/>
        <path d="M26 37h12l-2 8c-2 3-6 3-8 0z" fill="url(#rkF)"><animate attributeName="opacity" values="1;.55;1" dur=".4s" repeatCount="indefinite"/></path>
      </g></svg>`;
  };

  WK.orb = function (list, size, extraCls = "") {
    const c = list.colors || ["#C9B8FF", "#6B47E8"];
    const style = `width:${size}px;height:${size}px;background:radial-gradient(circle at 38% 34%, ${c[0]}, ${c[1]} 72%, #120C35 130%)`;
    return `<span class="orb ${extraCls}" style="${style}">${list.ring ? '<span class="ringp"></span>' : ""}</span>`;
  };

  WK.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Melodien (im Browser erzeugt, keine Audiodateien nötig) ---------- */
  let actx = null, master = null, echo = null;
  function ctx() {
    if (!actx) {
      try {
        actx = new (window.AudioContext || window.webkitAudioContext)();
        master = actx.createGain(); master.gain.value = 0.55;
        // leichter Hall: kurzes Echo mit Rückkopplung
        echo = actx.createDelay(1); echo.delayTime.value = 0.16;
        const fb = actx.createGain(); fb.gain.value = 0.28;
        const wet = actx.createGain(); wet.gain.value = 0.32;
        const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
        echo.connect(fb).connect(lp).connect(echo);
        echo.connect(wet).connect(master);
        master.connect(actx.destination);
      } catch (e) { actx = null; }
    }
    if (actx && actx.state === "suspended") actx.resume();
    return actx;
  }
  // Glockenton: Grundton plus zarte Obertöne, weich ausklingend
  function bell(freq, start, dur = 0.9, vol = 0.22) {
    const a = ctx(); if (!a) return;
    const t = a.currentTime + start;
    [[1, 1], [2, 0.28], [3.01, 0.12], [4.2, 0.05]].forEach(([mul, amp]) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type = "sine"; o.frequency.value = freq * mul;
      const v = vol * amp, d = dur / (mul > 1 ? mul * 0.7 : 1);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(v, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(master); g.connect(echo);
      o.start(t); o.stop(t + d + 0.05);
    });
  }
  // weicher Flötenton für tiefere Begleitnoten
  function soft(freq, start, dur = 0.4, vol = 0.12) {
    const a = ctx(); if (!a) return;
    const t = a.currentTime + start;
    const o = a.createOscillator(), g = a.createGain();
    o.type = "triangle"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }
  const note = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI-Nummer zu Hertz
  // Dur-Pentatonik: klingt immer freundlich
  const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];

  WK.sound = {
    enabled: () => WK.state && WK.state.settings.sound,
    // richtig: kleines aufsteigendes Motiv, wird mit jeder Serie einen Schritt höher
    ok(combo = 1) {
      if (!this.enabled()) return;
      const base = 72 + PENTA[Math.min(4, Math.max(0, combo - 1))];
      bell(note(base), 0, 0.7, 0.2);
      bell(note(base + 4), 0.09, 0.7, 0.2);
      bell(note(base + 7), 0.18, 1.1, 0.22);
      soft(note(base - 12), 0, 0.5, 0.08);
      if (combo > 0 && combo % 5 === 0) [12, 16, 19, 24].forEach((s, i) => bell(note(base + s), 0.34 + i * 0.07, 0.6, 0.12));
    },
    // fast richtig: freundliches Zwei-Ton-Motiv
    close() {
      if (!this.enabled()) return;
      bell(note(76), 0, 0.6, 0.17); bell(note(79), 0.12, 0.8, 0.17);
    },
    // falsch: sanft und tief, nicht schimpfend
    bad() {
      if (!this.enabled()) return;
      soft(note(64), 0, 0.28, 0.1); soft(note(60), 0.16, 0.42, 0.1);
    },
    tap() { if (!this.enabled()) return; bell(note(88), 0, 0.18, 0.06); },
    // Runde geschafft: kurze Fanfare
    win() {
      if (!this.enabled()) return;
      const m = [[72, 0], [76, .12], [79, .24], [84, .36], [79, .52], [84, .64], [88, .78]];
      m.forEach(([n, t], i) => bell(note(n), t, i === m.length - 1 ? 1.6 : 0.7, 0.18));
      [[48, 0], [55, .36], [60, .78]].forEach(([n, t]) => soft(note(n), t, 0.6, 0.09));
    },
    // Planet oder Level freigeschaltet: funkelnder Lauf nach oben
    unlock() {
      if (!this.enabled()) return;
      PENTA.forEach((s, i) => bell(note(67 + s), i * 0.06, 0.8, 0.13));
      [84, 88, 91].forEach((n) => bell(note(n), 0.75, 1.8, 0.14));
      soft(note(48), 0.75, 1.2, 0.1); soft(note(55), 0.75, 1.2, 0.08);
    }
  };

  /* ---------- Effekte ---------- */
  const reduce = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  WK.burst = function (el, n = 26) {
    if (reduce() || !el) return;
    const r = el.getBoundingClientRect();
    const box = document.createElement("div");
    box.className = "burst";
    box.style.left = r.left + r.width / 2 + "px";
    box.style.top = r.top + r.height / 2 + "px";
    const cols = ["#3EE6C8", "#8B6CFF", "#FF6FAE", "#FFC94D", "#ffffff"];
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.style.background = cols[i % cols.length];
      if (i % 3 === 0) s.style.borderRadius = "50%";
      box.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
      s.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 40}px) rotate(${Math.random() * 600}deg)`, opacity: 0 }
      ], { duration: 800 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" });
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1500);
  };

  WK.flyStar = function (fromEl, toEl) {
    if (reduce() || !fromEl || !toEl) return;
    const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
    const s = document.createElement("div");
    s.className = "flystar";
    s.innerHTML = WK.icon.star;
    s.style.left = a.left + a.width / 2 - 13 + "px";
    s.style.top = a.top + a.height / 2 - 13 + "px";
    document.body.appendChild(s);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    s.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * .5}px, ${dy * .5 - 60}px) scale(1.5)`, opacity: 1, offset: .5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.6)`, opacity: .2 }
    ], { duration: 750, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    setTimeout(() => { s.remove(); toEl.classList.remove("pop"); void toEl.offsetWidth; toEl.classList.add("pop"); }, 760);
  };

  WK.toast = function (msg, ms = 2400) {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  };

  /* ---------- Sternenhimmel ---------- */
  WK.startSky = function () {
    const c = document.getElementById("sky");
    if (!c) return;
    const x = c.getContext("2d");
    let W, H, stars = [], shoot = null, dpr = 1, running = true;
    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr;
      const n = Math.min(260, Math.round((innerWidth * innerHeight) / 5200));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.3 + 0.3) * dpr, p: Math.random() * 6.28, s: 0.4 + Math.random() * 1.4,
        h: Math.random() < 0.14 ? (Math.random() < 0.5 ? "255,201,77" : "160,140,255") : "255,255,255"
      }));
    }
    size();
    addEventListener("resize", size);
    document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });
    const still = reduce();
    function draw(t) {
      if (!running) return;
      x.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = still ? 0.8 : 0.3 + 0.7 * Math.abs(Math.sin(s.p + t * 0.0006 * s.s));
        x.fillStyle = `rgba(${s.h},${a})`;
        x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill();
      }
      if (!still) {
        if (!shoot && Math.random() < 0.003) shoot = { x: Math.random() * W * 0.8, y: Math.random() * H * 0.4, l: 0 };
        if (shoot) {
          shoot.l += 15 * dpr;
          const g = x.createLinearGradient(shoot.x, shoot.y, shoot.x + shoot.l, shoot.y + shoot.l * 0.45);
          g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(191,248,238,.9)");
          x.strokeStyle = g; x.lineWidth = 2 * dpr;
          x.beginPath(); x.moveTo(shoot.x, shoot.y); x.lineTo(shoot.x + shoot.l, shoot.y + shoot.l * 0.45); x.stroke();
          if (shoot.l > 300 * dpr) shoot = null;
        }
        requestAnimationFrame(draw);
      }
    }
    requestAnimationFrame(draw);
  };
})();
