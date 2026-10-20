/* Wortkosmos – Bildschirme und Spielablauf */
(function () {
  "use strict";
  const WK = window.WK, D = window.WK_DATA, DE = window.WK_DE, MA = window.WK_MATH, I = WK.icon, esc = WK.esc;
  const EXTRAS = { de: DE, ma: MA };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  let storage;
  try { storage = window.localStorage; storage.setItem("wk.t", "1"); storage.removeItem("wk.t"); }
  catch (e) { storage = { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = v; }, removeItem(k) { delete this._m[k]; } }; }

  const loaded = WK.load(D, storage);
  let S = loaded.state;
  WK.state = S;

  let saveWarned = false;
  function save() {
    if (!WK.save(S, storage) && !saveWarned) {
      saveWarned = true;
      WK.toast("Speichern klappt in diesem Browser gerade nicht. Privater Modus?", 4000);
    }
  }

  const app = $("#app"), nav = $("#nav");
  let view = { name: !S.profile ? "welcome" : !S.profile.grade ? "grade" : "home" };
  let session = null;
  let scrolledHome = false;

  /* ---------- Hilfen ---------- */
  const listById = (id) => S.lists.find((l) => l.id === id);
  const avatarColor = (key) => (D.avatars.find((a) => a.key === key) || D.avatars[0]).color;
  const lvl = () => WK.levelInfo(S.xp, D.ranks);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const today = () => WK.todayStr();
  const grade = () => (S.profile && S.profile.grade) || "ms1";
  const gradeInfo = (k) => D.grades.find((g) => g.key === k) || D.grades[2];
  const gradeLabel = (k) => { const g = gradeInfo(k); return `${g.label} ${g.school}`; };
  const young = () => grade().startsWith("vs");
  const subjectInfo = (k) => D.subjects.find((x) => x.key === k) || D.subjects[0];
  const nodes = (subject) => WK.path(S, D, subject, grade(), EXTRAS);
  function todayStars() { return S.today && S.today.date === today() ? S.today.stars : 0; }
  function addStars(n) {
    if (!n) return;
    S.stars += n; S.xp += n * 10;
    if (!S.today || S.today.date !== today()) S.today = { date: today(), stars: 0 };
    S.today.stars += n;
  }

  // Knoten (Planet) über seine ID finden, auch eigene Listen
  function findNode(id) {
    for (const sub of ["en", "de", "ma"]) { const n = nodes(sub).find((x) => x.id === id); if (n) return n; }
    if (id && id.startsWith("d-")) { const t = DE.topics.find((x) => "d-" + x.key === id); if (t) return { kind: "bank", subject: "de", id, key: t.key, name: t.name, short: t.short, colors: t.colors, ring: t.ring, topic: t, items: DE.items(t) }; }
    if (id && id.startsWith("m-")) { const t = MA.topics.find((x) => "m-" + x.key === id); if (t) return { kind: "gen", subject: "ma", id, key: t.key, name: t.name, short: t.short, colors: t.colors, ring: t.ring, topic: t }; }
    const l = listById(id);
    return l ? { kind: "vocab", subject: "en", id: l.id, key: l.planet, name: l.name, short: l.short || l.name, colors: l.colors, ring: l.ring, list: l, custom: !l.planet } : null;
  }

  function go(name, params = {}) {
    closeOverlay();
    view = Object.assign({ name }, params);
    render();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function render() {
    const showNav = ["home", "lists", "me", "list", "import"].includes(view.name);
    app.classList.toggle("no-nav", !showNav);
    nav.hidden = !showNav;
    const fn = VIEWS[view.name] || VIEWS.home;
    app.innerHTML = `<div class="screen">${fn()}</div>`;
    renderNav();
    (AFTER[view.name] || (() => {}))();
  }

  function renderNav() {
    const tab = { home: "home", lists: "lists", list: "lists", import: "lists", me: "me" }[view.name];
    nav.innerHTML = `<div class="nav-inner">
      <button data-act="nav" data-to="home" class="${tab === "home" ? "on" : ""}" aria-label="Reise">${I.route}<span>Reise</span></button>
      <button data-act="nav" data-to="lists" class="${tab === "lists" ? "on" : ""}" aria-label="Vokabeln">${I.list}<span>Vokabeln</span></button>
      <button data-act="nav" data-to="me" class="${tab === "me" ? "on" : ""}" aria-label="Ich">${I.user}<span>Ich</span></button>
    </div>`;
  }

  function avatarHtml(cls = "avatar") {
    return `<span class="${cls}">${WK.kosmo(avatarColor(S.profile && S.profile.avatar), "happy", "")}</span>`;
  }

  /* ---------- Overlays ---------- */
  function openOverlay(html, center = false) {
    closeOverlay();
    const o = document.createElement("div");
    o.className = "overlay" + (center ? " center" : "");
    o.id = "overlay";
    o.innerHTML = html;
    o.addEventListener("click", (e) => { if (e.target === o) closeOverlay(); });
    document.body.appendChild(o);
    const f = o.querySelector("[autofocus]") || o.querySelector("button");
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);
    return o;
  }
  function closeOverlay() { const o = $("#overlay"); if (o) o.remove(); }

  function confirmBox({ title, text, yes, no = "Abbrechen", danger = false, onYes }) {
    const o = openOverlay(`<div class="dialog stack" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <h3>${esc(title)}</h3><p class="muted">${esc(text)}</p>
      <div class="row"><button class="btn grow" data-x="no">${esc(no)}</button><button class="btn grow ${danger ? "danger" : "primary"}" data-x="yes">${esc(yes)}</button></div>
    </div>`, true);
    o.querySelector('[data-x="no"]').onclick = closeOverlay;
    o.querySelector('[data-x="yes"]').onclick = () => { closeOverlay(); onYes(); };
  }

  function gradeButtons(selected) {
    return `<div class="grade-grid" id="grade-grid">${D.grades.map((g) => `
      <button type="button" class="grade-btn" data-grade="${g.key}" aria-pressed="${g.key === selected}">
        <b>${g.label}</b><small>${g.school}</small></button>`).join("")}</div>`;
  }
  function bindGradeButtons(root, onPick) {
    $$("#grade-grid .grade-btn", root).forEach((b) => b.onclick = () => {
      $$("#grade-grid .grade-btn", root).forEach((x) => x.setAttribute("aria-pressed", x === b));
      WK.sound.tap(); onPick(b.dataset.grade);
    });
  }

  /* ================= Bildschirme ================= */
  const VIEWS = {}, AFTER = {};

  /* ---------- Willkommen ---------- */
  let draftAvatar = D.avatars[0].key, draftGrade = null;
  VIEWS.welcome = () => `
    <section class="welcome">
      <div class="logo">${WK.rocketSvg()}<span class="logo-word">Wortkosmos</span></div>
      <div class="hero-planet">${WK.orb({ colors: ["#FFB3D3", "#8B6CFF"], ring: true }, 130)}${WK.kosmo("#3EE6C8", "wow")}</div>
      <div class="stack" style="gap:6px">
        <h2>Willkommen an Bord!</h2>
        <p class="muted">Ich bin Kosmo. Zusammen fliegen wir von Planet zu Planet und üben Englisch, Deutsch und Mathe.</p>
      </div>
      <div class="card stack" style="width:100%;text-align:left">
        <div class="field">
          <label for="w-name">Wie heißt du?</label>
          <input id="w-name" class="input" maxlength="20" autocomplete="off" placeholder="Dein Vorname" />
        </div>
        <div class="field">
          <label>In welche Klasse gehst du?</label>
          ${gradeButtons(draftGrade)}
        </div>
        <div class="field">
          <label>Wähle deinen Astronauten</label>
          <div class="avatars" id="w-avatars">
            ${D.avatars.map((a) => `<button type="button" data-av="${a.key}" aria-pressed="${a.key === draftAvatar}" aria-label="${a.name}">${WK.kosmo(a.color, "happy", "")}</button>`).join("")}
          </div>
        </div>
        <p id="w-err" class="small" style="color:var(--rose)" aria-live="polite"></p>
        <button class="btn primary block" data-act="welcome-go">Abenteuer starten</button>
      </div>
      <p class="small muted">Alles bleibt auf diesem Gerät gespeichert. Kein Konto nötig.</p>
    </section>`;
  AFTER.welcome = () => {
    $$("#w-avatars button").forEach((b) => b.onclick = () => {
      draftAvatar = b.dataset.av; WK.sound.tap();
      $$("#w-avatars button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    });
    bindGradeButtons(document, (g) => { draftGrade = g; $("#w-err").textContent = ""; });
    $("#w-name").addEventListener("input", () => { $("#w-err").textContent = ""; });
  };

  /* ---------- Klasse wählen (für bestehende Profile nach dem Update) ---------- */
  VIEWS.grade = () => `
    <section class="welcome">
      ${WK.kosmo(avatarColor(S.profile.avatar), "wow")}
      <div class="stack" style="gap:6px"><h2>Neu im Wortkosmos: Deutsch und Mathe!</h2>
        <p class="muted">In welche Klasse gehst du, ${esc(S.profile.name)}? Dann suche ich die passenden Planeten aus.</p></div>
      <div class="card stack" style="width:100%">${gradeButtons(null)}</div>
    </section>`;
  AFTER.grade = () => bindGradeButtons(document, (g) => {
    S.profile.grade = g; save(); WK.sound.win(); go("home"); WK.toast(`${gradeLabel(g)} – los geht's!`);
  });

  /* ---------- Reise ---------- */
  function homeMessage(subject, cur) {
    const name = esc(S.profile.name);
    const info = WK.nodeInfo(S, cur);
    const list = nodes(subject);
    const msgs = [];
    const st = WK.liveStreak(S);
    if (!S.missions) return `Hi ${name}! Ich bin Kosmo. Unser erstes Ziel: <b>${esc(cur.short)}</b>. Los geht's!`;
    if (todayStars() > 0) msgs.push(`Stark, ${name}! Heute schon ${todayStars()} Sterne gesammelt.`);
    else if (st > 0) msgs.push(`Deine Serie: ${st} ${st === 1 ? "Tag" : "Tage"}. Eine kurze Mission hält sie am Leben!`);
    else msgs.push(`Schön, dass du da bist, ${name}! Fünf Minuten reichen schon.`);
    const next = list[list.indexOf(cur) + 1];
    if (next && info.mastery < WK.UNLOCK_AT) {
      if (cur.kind === "gen") msgs.push(`Noch ein paar richtige Aufgaben auf <b>${esc(cur.short)}</b>, dann öffnet sich <b>${esc(next.short)}</b>.`);
      else { const need = Math.ceil(info.total * WK.UNLOCK_AT) - info.learned; if (need > 0) msgs.push(`Noch ${need} ${cur.kind === "vocab" ? (need === 1 ? "Wort" : "Wörter") : (need === 1 ? "Aufgabe" : "Aufgaben")} sicher können, dann öffnet sich <b>${esc(next.short)}</b>.`); }
    }
    return pick(msgs);
  }

  const XS = [50, 74, 60, 27, 40, 72, 56, 26, 46, 70];
  const STEP = 150;
  VIEWS.home = () => {
    const L = lvl(), sub = S.subject, ps = nodes(sub);
    if (!ps.length) return `<p>Für diese Klasse gibt es hier noch keine Planeten.</p>`;
    const cur = WK.currentNode(S, ps);
    const unlockedCount = ps.filter((p) => WK.nodeUnlocked(S, ps, p)).length;
    const H = ps.length * STEP + 40;
    const pts = ps.map((p, i) => ({ x: XS[i % XS.length], y: 80 + i * STEP }));
    const curIdx = ps.indexOf(cur);
    const pathD = (from, to) => {
      let d = `M${pts[from].x} ${pts[from].y}`;
      for (let i = from + 1; i <= to; i++) d += ` C${pts[i - 1].x} ${pts[i - 1].y + STEP / 2}, ${pts[i].x} ${pts[i].y - STEP / 2}, ${pts[i].x} ${pts[i].y}`;
      return d;
    };
    const planetsHtml = ps.map((p, i) => {
      const unl = WK.nodeUnlocked(S, ps, p), m = WK.nodeMastery(S, p);
      const size = [86, 96, 80, 92][i % 4];
      const circ = Math.PI * 2 * 48;
      return `<button class="planet ${unl ? "" : "locked"} ${p === cur ? "current" : ""}" style="left:${pts[i].x}%;top:${pts[i].y}px" data-act="planet" data-id="${p.id}" aria-label="${esc(p.name)}${unl ? ", " + Math.round(m * 100) + " Prozent geschafft" : ", gesperrt"}">
        <span class="orb-wrap" style="animation-delay:${-i * 0.8}s">
          ${WK.orb(p, size)}
          ${unl ? `<svg class="prog-ring" viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="48"/><circle class="fg" cx="50" cy="50" r="48" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - m)}"/></svg>` : ""}
          ${m >= 0.8 ? `<span class="badge">${I.star}</span>` : ""}
        </span>
        <span class="label">${unl ? "" : I.lock}${esc(p.short)}</span>
      </button>`;
    }).join("");
    const customs = sub === "en" ? S.lists.filter((l) => !l.planet) : [];
    return `
      <div class="hud">
        <button class="who" data-act="nav" data-to="me" aria-label="Profil öffnen">${avatarHtml()}<span style="min-width:0"><b>${esc(S.profile.name)}</b><small>Level ${L.level} · ${L.rank}</small></span></button>
        <span class="chip fire" title="Tage in Folge">${I.fire}${WK.liveStreak(S)}</span>
        <span class="chip gold" title="Sterne">${I.star}${S.stars}</span>
      </div>
      <div class="xpbar" aria-label="Erfahrung ${L.into} von ${L.need}"><i style="width:${Math.round(L.pct * 100)}%"></i></div>
      <div class="subjects" role="tablist" aria-label="Fach wählen">
        ${D.subjects.map((x) => `<button role="tab" aria-selected="${x.key === sub}" class="subj subj-${x.key}" data-act="subject" data-sub="${x.key}">
          <span class="subj-tag">${esc(x.tag)}</span><span>${esc(x.name)}</span></button>`).join("")}
      </div>
      <div class="journey-title"><h2>${esc(subjectInfo(sub).name)}-Galaxie</h2><span class="small muted">${unlockedCount} von ${ps.length} Planeten</span></div>
      <div class="path" id="path" style="height:${H}px">
        <svg class="route" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true">
          <path d="${pathD(0, ps.length - 1)}" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3" stroke-dasharray="2 11" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
          ${curIdx > 0 ? `<path d="${pathD(0, curIdx)}" fill="none" stroke="${subjectInfo(sub).color}" stroke-width="4" stroke-dasharray="2 11" stroke-linecap="round" vector-effect="non-scaling-stroke"/>` : ""}
        </svg>
        ${planetsHtml}
        <div class="rocket" style="left:calc(${pts[curIdx].x}% ${pts[curIdx].x > 50 ? "-" : "+"} 78px);top:${pts[curIdx].y - 30}px">${WK.rocketSvg()}</div>
      </div>
      ${customs.length ? `<div class="journey-title"><h3>Deine eigenen Listen</h3><button class="btn ghost sm" data-act="nav" data-to="lists">Alle</button></div>
      <div class="moons">${customs.map((l) => `<button class="moon" data-act="planet" data-id="${l.id}">${WK.orb(l, 46)}<b>${esc(l.name)}</b><small>${l.words.length} Wörter</small></button>`).join("")}</div>` : ""}
      <div class="kosmo-bar">
        <button class="ghost" data-act="kosmo" style="border:0;background:none;padding:0" aria-label="Kosmo antippen">${WK.kosmo(avatarColor(S.profile.avatar))}</button>
        <div class="bubble" id="bubble"><span id="bubble-text">${homeMessage(sub, cur)}</span>
          <button class="btn fun block" data-act="start" data-id="${cur.id}" data-mode="mix">${I.play} Mission auf ${esc(cur.short)}</button>
        </div>
      </div>`;
  };
  AFTER.home = () => {
    if (scrolledHome) return;
    scrolledHome = true;
    const c = $(".planet.current"), ps = nodes(S.subject);
    if (c && ps.indexOf(WK.currentNode(S, ps)) > 1) setTimeout(() => c.scrollIntoView({ block: "center", behavior: "smooth" }), 250);
  };

  /* ---------- Planet-Blatt ---------- */
  const MODES = [
    { k: "quiz", t: "Quiz", d: "Richtige Bedeutung antippen", i: I.quiz, c: "#3EE6C8" },
    { k: "flash", t: "Karteikarten", d: "Aufdecken und selbst prüfen", i: I.cards, c: "#8B6CFF" },
    { k: "de", t: "Deutsch schreiben", d: "Englisch sehen, Deutsch tippen", i: I.pencil, c: "#FFC94D" },
    { k: "en", t: "Englisch schreiben", d: "Deutsch sehen, Englisch tippen", i: I.keys, c: "#FF6FAE" },
    { k: "scramble", t: "Buchstabensalat", d: "Das Wort aus Buchstaben bauen", i: I.puzzle, c: "#5AB8FF" }
  ];
  const MODE_STARS = { quiz: 1, flash: 1, de: 2, en: 3, scramble: 2 };

  function openPlanet(id) {
    const n = findNode(id); if (!n) return;
    const list = n.custom ? null : nodes(n.subject);
    const idx = list ? list.findIndex((x) => x.id === n.id) : -1;
    const unl = idx < 0 ? true : WK.nodeUnlocked(S, list, list[idx]);
    const info = WK.nodeInfo(S, n);
    const prev = idx > 0 ? list[idx - 1] : null;
    let body, stats;
    if (n.kind === "gen") {
      const sk = WK.getSkill(S, n.key);
      stats = [[sk.ok, "gelöst"], [sk.seen ? Math.round((sk.ok / sk.seen) * 100) + " %" : "–", "richtig"], [Math.round(info.mastery * 100) + " %", "erobert"]];
    } else {
      stats = [[info.total, n.kind === "vocab" ? "Wörter" : "Aufgaben"], [info.learned, "gelernt"], [Math.round(info.mastery * 100) + " %", "erobert"]];
    }
    const missionBtn = (desc) => `<button class="mode wide" data-act="start" data-id="${n.id}" data-mode="mix" style="border-color:rgba(255,111,174,.55);background:linear-gradient(100deg,rgba(255,111,174,.2),rgba(139,108,255,.2))">
          <span class="mi" style="background:linear-gradient(135deg,#FF6FAE,#8B6CFF)">${I.bolt}</span>
          <span class="grow"><b>Mission starten</b><br><small>${desc}</small></span>${I.chev}</button>`;
    if (!unl && prev) {
      const pi = WK.nodeInfo(S, prev);
      const need = prev.kind === "gen" ? null : Math.ceil(pi.total * WK.UNLOCK_AT) - pi.learned;
      body = `<div class="lockbox">${I.lock}<div><b>Noch gesperrt</b><p class="small muted">${need ? `Lerne noch ${need} ${prev.kind === "vocab" ? (need === 1 ? "Wort" : "Wörter") : (need === 1 ? "Aufgabe" : "Aufgaben")} auf ${esc(prev.name)}` : `Erobere zuerst die Hälfte von ${esc(prev.name)}`}, dann kannst du hier landen.</p></div></div>
        <button class="btn block" data-act="start" data-id="${prev.id}" data-mode="mix">${I.play} Zu ${esc(prev.short)} fliegen</button>`;
    } else if (n.kind === "vocab") {
      const usable = n.list.words.filter((w) => w.en && w.de).length;
      body = !usable ? `<div class="empty"><p>Diese Liste hat noch keine Wörter.</p></div>
        <button class="btn primary block" data-act="open-list" data-id="${n.id}">${I.plus} Wörter hinzufügen</button>`
        : `${missionBtn("Gemischte Runde, passt sich deinem Können an")}
        <div class="modes">
          ${MODES.map((m) => `<button class="mode" data-act="start" data-id="${n.id}" data-mode="${m.k}">
            <span class="mi" style="background:${m.c}26;color:${m.c}">${m.i}</span><b>${m.t}</b><small>${m.d}</small><span class="pts">bis ${MODE_STARS[m.k]} ★ pro Wort</span></button>`).join("")}
          ${info.hard ? `<button class="mode" data-act="start" data-id="${n.id}" data-mode="hard" style="border-color:rgba(255,111,174,.5)">
            <span class="mi" style="background:#FF6FAE26;color:#FF6FAE">${I.target}</span><b>Knifflige Wörter</b><small>${info.hard} Wörter extra üben</small><span class="pts">Wiederholung</span></button>` : ""}
        </div>`;
    } else {
      body = `${missionBtn(n.kind === "gen" ? "10 neue Aufgaben, jedes Mal andere" : "10 Aufgaben, schwierige kommen öfter")}
        ${n.kind === "bank" && info.hard ? `<button class="mode wide" data-act="start" data-id="${n.id}" data-mode="hard" style="border-color:rgba(255,111,174,.5)">
          <span class="mi" style="background:#FF6FAE26;color:#FF6FAE">${I.target}</span><span class="grow"><b>Knifflige Aufgaben</b><br><small>${info.hard} Aufgaben extra üben</small></span>${I.chev}</button>` : ""}
        ${n.kind === "bank" && n.topic.rule ? `<div class="rule-card"><span class="eyebrow">Merke</span><p>${esc(n.topic.rule)}</p></div>` : ""}`;
    }
    openOverlay(`<div class="sheet stack" role="dialog" aria-modal="true" aria-label="${esc(n.name)}">
      <div class="grip"></div>
      <div class="planet-head">${WK.orb(n, 74)}
        <div class="grow"><p class="eyebrow">${idx < 0 ? (n.custom ? "Eigene Liste" : esc(subjectInfo(n.subject).name)) : `${esc(subjectInfo(n.subject).name)} · Planet ${idx + 1} von ${list.length}`}</p><h2>${esc(n.name)}</h2>
          <div class="xpbar" style="margin-top:10px"><i style="width:${Math.round(info.mastery * 100)}%"></i></div></div>
        <button class="icon-btn" data-x="close" aria-label="Schließen">${I.x}</button>
      </div>
      <div class="statline">${stats.map(([v, l]) => `<div class="stat"><b>${v}</b><small>${l}</small></div>`).join("")}</div>
      ${body}
      ${n.kind === "vocab" ? `<button class="btn ghost block sm" data-act="open-list" data-id="${n.id}">${I.list} Wörter ansehen und bearbeiten</button>` : ""}
    </div>`);
    $("#overlay [data-x=close]").onclick = closeOverlay;
  }

  /* ================= Spielablauf ================= */
  function hardBankItems() {
    const out = [];
    DE.topics.forEach((t) => DE.items(t).forEach((it) => {
      const st = WK.getStat(S, "d-" + t.key, it.id);
      if (WK.isHard(st)) out.push({ type: "bank", nodeId: "d-" + t.key, topic: t, item: it, mode: it.mode, bad: st.bad });
    }));
    return out;
  }

  function startSession(id, mode) {
    WK.sound.tap();
    let items = [], node = null;
    if (id === "__hard") {
      const v = WK.allHardWords(S).slice(0, 10).map((h) => ({ type: "vocab", nodeId: h.list.id, listId: h.list.id, word: h.word, bad: h.stat.bad }));
      const b = hardBankItems();
      items = WK.shuffle(v.concat(b).sort((x, y) => y.bad - x.bad).slice(0, 10));
      items.forEach((it) => { if (it.type === "vocab") it.mode = WK.modeForWord(S, it.listId, it.word, young()); });
    } else {
      node = findNode(id); if (!node) return;
      if (node.kind === "vocab") {
        const words = WK.pickWords(S, node.list, 10, mode === "hard");
        items = words.map((w) => ({ type: "vocab", nodeId: node.id, listId: node.id, word: w, mode: mode === "mix" || mode === "hard" ? WK.modeForWord(S, node.id, w, young()) : mode }));
      } else if (node.kind === "bank") {
        items = WK.pickItems(S, node.id, node.items, 10, mode === "hard").map((it) => ({ type: "bank", nodeId: node.id, topic: node.topic, item: it, mode: it.mode }));
      } else {
        const seen = new Set();
        for (let tries = 0; items.length < 10 && tries < 200; tries++) {
          const t = node.topic.gen(), sig = (t.big || "") + (t.story || "");
          if (seen.has(sig)) continue;
          seen.add(sig);
          items.push({ type: "gen", nodeId: node.id, topicKey: node.key, task: t, mode: t.kind });
        }
      }
    }
    if (!items.length) { WK.toast("Hier gibt es gerade nichts zum Üben."); return; }
    const subject = node ? node.subject : "en";
    const list = nodes(subject);
    session = {
      id, mode, items, i: 0, subject,
      correct: 0, wrong: 0, stars: 0, combo: 0, bestCombo: 0,
      startLevel: lvl().level,
      unlockedBefore: list.filter((p) => WK.nodeUnlocked(S, list, p)).map((p) => p.id),
      conqueredBefore: list.filter((p) => WK.nodeMastery(S, p) >= 0.8).map((p) => p.id),
      state: null
    };
    go("play");
  }

  const PRAISE = ["Super!", "Stark!", "Volltreffer!", "Genau richtig!", "Klasse!", "Weltraumreif!", "Spitze!"];
  const CHEER = ["Kein Problem, das klappt beim nächsten Mal.", "Fehler gehören zum Lernen dazu.", "Merk es dir, gleich kommt es nochmal.", "Fast! Weiter geht's."];

  VIEWS.play = () => {
    const s = session; if (!s) return VIEWS.home();
    const it = s.items[s.i];
    const pct = Math.round((s.i / s.items.length) * 100);
    s.state = { answered: false, hint: 0, tries: 0, built: [] };
    return `
      <div class="play-top">
        <button class="icon-btn" data-act="quit" aria-label="Mission beenden">${I.x}</button>
        <div class="pbar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
        ${s.combo >= 3 ? `<span class="chip combo-chip">${I.bolt}${s.combo}</span>` : ""}
        <span class="chip gold" id="sess-stars">${I.star}<span>${s.stars}</span></span>
      </div>
      <div id="task">${taskHtml(it)}</div>`;
  };
  AFTER.play = () => { const it = session && session.items[session.i]; if (it) bindTask(it); };

  function lettersHint(word) {
    return `<div class="letters-hint" aria-hidden="true">${[...word].map((c) => `<i class="${c === " " ? "sp" : ""}"></i>`).join("")}</div>`;
  }

  // Anzeige eines Deutsch-Satzes mit Markierung oder Lücke
  function showHtml(show) {
    const p = esc(show.pre || ""), m = esc(show.mid || ""), q = esc(show.post || "");
    switch (show.style) {
      case "plain": return `<div class="big-word">${p}</div>`;
      case "sentence": return `<div class="sentence">${p}</div>`;
      case "mark": return `<div class="sentence">${p}<mark>${m}</mark>${q}</div>`;
      case "gap": return `<div class="sentence">${p}<span class="gap" aria-label="Lücke"></span>${q}</div>`;
      case "gapword": return `<div class="sentence">${p}<span class="gap short" aria-label="Lücke"></span>${q}</div>`;
    }
    return "";
  }

  // "3/4" als gestapelten Bruch anzeigen
  const fracHtml = (txt) => esc(txt).replace(/(\d+)\/(\d+)/g, '<span class="fr"><span>$1</span><span>$2</span></span>');

  function choiceButtons(opts) {
    const long = opts.some((o) => o.length > 16);
    return `<div class="answers ${long ? "long" : ""} ${opts.length === 3 ? "three" : ""}">${opts.map((o, i) => `<button class="answer" data-ans="${i}">${esc(o)}</button>`).join("")}</div>`;
  }

  const UMLAUTS = `<div class="umlauts">${["ä", "ö", "ü", "ß"].map((u) => `<button type="button" data-uml="${u}">${u}</button>`).join("")}</div>`;
  const CHECK_TOOLS = (hint) => `<div class="tools">${hint ? `<button class="btn ghost sm" data-act="hint">${I.sparkle} Tipp</button>` : ""}<button class="btn ghost sm" data-act="skip">Weiß ich nicht</button><button class="btn primary grow" data-act="check">Prüfen</button></div>`;

  function taskHtml(it) {
    if (it.type === "bank") {
      const x = it.item;
      if (x.mode === "choice") {
        // Feste Reihenfolge (der/die/das, Nomen/Verb/…) hilft beim Lernen.
        // Bei mehr als vier Möglichkeiten: richtige Antwort plus drei andere.
        let opts = x.options.slice();
        if (opts.length > 4) {
          const keep = new Set([x.answer].concat(WK.shuffle(opts.filter((o) => o !== x.answer)).slice(0, 3)));
          opts = opts.filter((o) => keep.has(o));
        }
        if (it.topic.type === "spell" || it.topic.type === "case") opts = WK.shuffle(opts);
        it._opts = opts;
        return `<div class="task">
          <div class="card prompt"><p class="hint-label">${esc(x.prompt)}</p>${showHtml(x.show)}</div>
          ${choiceButtons(it._opts)}
        </div>`;
      }
      return `<div class="task">
        <div class="card prompt"><p class="hint-label">${esc(x.prompt)}</p>${showHtml(x.show)}</div>
        <input id="type" class="type-field" lang="de" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Deine Antwort …" aria-label="Antwort" />
        ${UMLAUTS}${CHECK_TOOLS(false)}
      </div>`;
    }
    if (it.type === "gen") {
      const t = it.task;
      const head = `<div class="card prompt"><p class="hint-label">${esc(t.prompt)}</p>
        ${t.story ? `<p class="story">${esc(t.story)}</p>` : ""}${t.big ? `<div class="big-word math">${fracHtml(t.big)}</div>` : ""}</div>`;
      if (t.kind === "choice") return `<div class="task">${head}${choiceButtons(t.options.length <= 2 ? t.options : WK.shuffle(t.options))}</div>`;
      let field;
      if (t.kind === "frac") field = `<div class="frac-input" role="group" aria-label="Bruch eingeben">
          <input id="fn" class="type-field" inputmode="numeric" autocomplete="off" aria-label="Zähler" />
          <span class="frac-line" aria-hidden="true"></span>
          <input id="fd" class="type-field" inputmode="numeric" autocomplete="off" aria-label="Nenner" /></div>`;
      else if (t.kind === "time") field = `<div class="time-input" role="group" aria-label="Uhrzeit eingeben">
          <input id="th" class="type-field" inputmode="numeric" maxlength="2" autocomplete="off" aria-label="Stunden" /><b>:</b>
          <input id="tm" class="type-field" inputmode="numeric" maxlength="2" autocomplete="off" aria-label="Minuten" /><span class="unit">Uhr</span></div>`;
      else field = `<div class="num-input">${t.prefix ? `<span class="unit">${esc(t.prefix)}</span>` : ""}
          <input id="type" class="type-field" inputmode="decimal" autocomplete="off" aria-label="Ergebnis" placeholder="?" />
          ${t.unit ? `<span class="unit">${esc(t.unit)}</span>` : ""}</div>`;
      return `<div class="task">${head}${field}${CHECK_TOOLS(false)}</div>`;
    }
    const w = it.word;
    switch (it.mode) {
      case "quiz": {
        const list = listById(it.listId);
        const opts = WK.shuffle([w.de].concat(WK.distractors(S, list, w, 3)));
        it._opts = opts;
        return `<div class="task">
          <div class="card prompt"><p class="hint-label">Was heißt das auf Deutsch?</p><div class="big-word" lang="en">${esc(w.en)}</div></div>
          ${choiceButtons(opts)}
        </div>`;
      }
      case "de":
        return `<div class="task">
          <div class="card prompt"><p class="hint-label">Schreib das deutsche Wort</p><div class="big-word" lang="en">${esc(w.en)}</div></div>
          <input id="type" class="type-field" lang="de" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Auf Deutsch …" aria-label="Deutsche Übersetzung" />
          ${UMLAUTS}${CHECK_TOOLS(false)}
        </div>`;
      case "en":
        return `<div class="task">
          <div class="card prompt"><p class="hint-label">Wie heißt das auf Englisch?</p><div class="big-word">${esc(w.de)}</div>${lettersHint(w.en)}</div>
          <input id="type" class="type-field" lang="en" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="In English …" aria-label="Englisches Wort" />
          ${CHECK_TOOLS(true)}
          <p class="small muted" id="hint-out" style="text-align:center" aria-live="polite"></p>
        </div>`;
      case "scramble": {
        const letters = [...w.en].filter((c) => c !== " ");
        let sh = WK.shuffle(letters.map((c, i) => ({ c, i })));
        if (letters.length > 1 && sh.every((x, j) => x.i === j)) sh = sh.reverse();
        it._tiles = sh;
        return `<div class="task">
          <div class="card prompt"><p class="hint-label">Bau das englische Wort für</p><div class="big-word">${esc(w.de)}</div></div>
          <div class="slots" id="slots">${[...w.en].map((c) => c === " " ? '<span class="slot space"></span>' : '<button class="slot" type="button" aria-label="leeres Feld"></button>').join("")}</div>
          <div class="tiles" id="tiles">${sh.map((t, j) => `<button class="tile" type="button" data-tile="${j}">${esc(t.c)}</button>`).join("")}</div>
          <div class="tools"><button class="btn ghost sm" data-act="scr-clear">${I.refresh} Neu sortieren</button><button class="btn ghost sm" data-act="skip">Weiß ich nicht</button></div>
        </div>`;
      }
      case "flash":
        return `<div class="task">
          <div class="flip" id="flip" role="button" tabindex="0" aria-label="Karte umdrehen">
            <div class="flip-inner">
              <div class="face front"><p class="hint-label muted">Englisch</p><div class="big-word" lang="en">${esc(w.en)}</div><span class="tap">Antippen zum Umdrehen</span></div>
              <div class="face back"><p class="hint-label muted">Deutsch</p><div class="big-word">${esc(w.de)}</div></div>
            </div>
          </div>
          <div class="tools" id="flash-tools"><button class="btn primary grow" data-act="flip">Umdrehen</button></div>
        </div>`;
    }
    return "";
  }

  function bindTask(it) {
    const s = session;
    // Auswahl-Antworten
    const btns = $$("#task .answer");
    if (btns.length) {
      const correct = it.type === "vocab" ? it.word.de : it.type === "bank" ? it.item.answer : it.task.answer;
      const opts = it.type === "gen" ? btns.map((b) => b.textContent) : it._opts;
      btns.forEach((b) => b.onclick = () => {
        if (s.state.answered) return;
        const chosen = opts[+b.dataset.ans];
        const ok = it.type === "vocab" ? WK.normalize(chosen) === WK.normalize(correct) : chosen === correct;
        b.classList.add(ok ? "right" : "wrong");
        if (!ok) btns.forEach((x) => {
          const v = opts[+x.dataset.ans];
          if (it.type === "vocab" ? WK.normalize(v) === WK.normalize(correct) : v === correct) x.classList.add("right");
          else if (x !== b) x.classList.add("faded");
        });
        finish(ok ? "ok" : "wrong", b);
      });
    }
    const inp = $("#type");
    if (inp) {
      setTimeout(() => inp.focus({ preventScroll: true }), 120);
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); checkTyped(); } });
      inp.addEventListener("input", () => inp.classList.remove("wrong"));
    }
    $$("[data-uml]").forEach((b) => b.onclick = () => {
      const f = $("#type"); if (!f) return;
      const p = f.selectionStart ?? f.value.length;
      f.value = f.value.slice(0, p) + b.dataset.uml + f.value.slice(f.selectionEnd ?? p);
      f.focus(); f.setSelectionRange(p + 1, p + 1);
    });
    // Bruch und Uhrzeit: zwei Felder
    [["fn", "fd"], ["th", "tm"]].forEach(([a, b]) => {
      const A = $("#" + a), B = $("#" + b); if (!A) return;
      setTimeout(() => A.focus({ preventScroll: true }), 120);
      A.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); if (B.value) checkTyped(); else B.focus(); } });
      B.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); checkTyped(); } });
      if (a === "th") A.addEventListener("input", () => { if (A.value.length >= 2) B.focus(); });
      [A, B].forEach((x) => x.addEventListener("input", () => x.classList.remove("wrong")));
    });
    if (it.mode === "scramble" && it.type === "vocab") bindScramble(it);
    if (it.mode === "flash") {
      const f = $("#flip");
      f.onclick = flipCard;
      f.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); } };
    }
  }

  function checkTyped() {
    const s = session, it = s.items[s.i];
    if (s.state.answered) return;
    if (it.type === "gen" && (it.task.kind === "frac" || it.task.kind === "time")) {
      const [A, B] = it.task.kind === "frac" ? [$("#fn"), $("#fd")] : [$("#th"), $("#tm")];
      const empty = [A, B].filter((x) => !x.value.trim());
      if (empty.length) { empty.forEach((x) => x.classList.add("wrong")); empty[0].focus(); return; }
      const r = MA.check(it.task, [A.value, B.value]);
      [A, B].forEach((x) => { x.readOnly = true; x.classList.add(r === "wrong" ? "wrong" : "right"); });
      return finish(r, A.parentElement);
    }
    const inp = $("#type");
    if (!inp.value.trim()) { inp.classList.add("wrong"); inp.placeholder = "Erst etwas eintippen"; return; }
    let r;
    if (it.type === "gen") {
      if (Number.isNaN(MA.parseNum(inp.value))) { inp.classList.add("wrong"); WK.toast("Bitte nur eine Zahl eintippen.", 1800); return; }
      r = MA.check(it.task, inp.value);
    } else if (it.type === "bank") {
      const rs = it.item.answers.map((a) => WK.check(inp.value, a, "de").result);
      r = rs.includes("ok") ? "ok" : rs.includes("close") ? "close" : "wrong";
    } else {
      const lang = it.mode === "en" ? "en" : "de";
      r = WK.check(inp.value, lang === "en" ? it.word.en : it.word.de, lang).result;
    }
    inp.classList.add(r === "wrong" ? "wrong" : "right");
    inp.readOnly = true;
    finish(r, inp);
  }

  function bindScramble(it) {
    const s = session;
    const slots = $$("#slots .slot:not(.space)"), tiles = $$("#tiles .tile");
    s.state.built = new Array(slots.length).fill(null);
    const paint = () => {
      slots.forEach((sl, k) => {
        const j = s.state.built[k];
        sl.textContent = j == null ? "" : it._tiles[j].c;
        sl.classList.toggle("filled", j != null);
        sl.setAttribute("aria-label", j == null ? "leeres Feld" : "Buchstabe " + it._tiles[j].c + ", antippen zum Entfernen");
      });
      tiles.forEach((t, j) => t.classList.toggle("used", s.state.built.includes(j)));
    };
    tiles.forEach((t) => t.onclick = () => {
      if (s.state.answered) return;
      const j = +t.dataset.tile, k = s.state.built.indexOf(null);
      if (k < 0 || s.state.built.includes(j)) return;
      s.state.built[k] = j; WK.sound.tap(); paint();
      if (!s.state.built.includes(null)) {
        const guess = s.state.built.map((x) => it._tiles[x].c).join("").toLowerCase();
        const target = it.word.en.replace(/ /g, "").toLowerCase();
        if (guess === target) { $("#slots").classList.add("right"); finish(s.state.tries ? "close" : "ok", $("#slots")); }
        else {
          s.state.tries++;
          $("#slots").classList.remove("wrong"); void $("#slots").offsetWidth; $("#slots").classList.add("wrong");
          WK.sound.bad();
          if (s.state.tries >= 2) { setTimeout(() => finish("wrong", $("#slots")), 450); }
          else { WK.toast("Fast! Noch ein Versuch.", 1500); setTimeout(() => { s.state.built.fill(null); paint(); }, 650); }
        }
      }
    });
    slots.forEach((sl, k) => sl.onclick = () => { if (s.state.answered || s.state.built[k] == null) return; s.state.built[k] = null; paint(); });
    s.state.paint = paint;
  }

  function flipCard() {
    const s = session, f = $("#flip");
    if (!f || f.classList.contains("open")) return;
    f.classList.add("open"); WK.sound.tap();
    $("#flash-tools").innerHTML = `<button class="btn grow" data-act="flash-again">${I.refresh} Nochmal üben</button><button class="btn primary grow" data-act="flash-ok">${I.check} Gewusst!</button>`;
    s.state.flipped = true;
  }

  /* Ergebnis einer Aufgabe verbuchen und Rückmeldung zeigen */
  function finish(result, el) {
    const s = session, it = s.items[s.i];
    if (s.state.answered) return;
    s.state.answered = true;
    const good = result !== "wrong";
    if (it.type === "gen") WK.recordSkill(S, it.topicKey, good);
    else WK.record(S, it.type === "vocab" ? it.listId : it.nodeId, it.type === "vocab" ? it.word.id : it.item.id, good);
    let gained = WK.starsFor(it.mode, result, s.state.hint > 0);
    if (it.retry) gained = Math.min(gained, 1);
    if (good) {
      s.correct++; s.combo++; s.bestCombo = Math.max(s.bestCombo, s.combo);
      if (s.combo > 0 && s.combo % 5 === 0) gained += 2;
    } else {
      s.wrong++; s.combo = 0;
      if (!it.retry && it.mode !== "flash") s.items.push(Object.assign({}, it, { retry: true }));
    }
    s.stars += gained; addStars(gained);
    save();

    if (result === "ok") { WK.sound.ok(s.combo); WK.burst(el); }
    else if (result === "close") WK.sound.close();
    else WK.sound.bad();
    if (gained) WK.flyStar(el, $("#sess-stars"));
    setTimeout(() => { const n = $("#sess-stars span"); if (n) n.textContent = s.stars; }, gained ? 700 : 0);

    let title, sol = "", extra = "";
    if (result === "ok") title = pick(PRAISE);
    else if (result === "close") title = "Fast richtig!";
    else title = "Nicht ganz";

    if (it.type === "vocab") {
      const w = it.word;
      if (result === "close") sol = it.mode === "en" || it.mode === "scramble" ? `Achte auf die Schreibweise: <b lang="en">${esc(w.en)}</b>` : `Genau geschrieben: <b>${esc(w.de)}</b>`;
      if (result === "wrong") {
        sol = `<span class="muted">Richtig ist:</span> <b ${it.mode === "de" || it.mode === "quiz" ? "" : 'lang="en"'}>${esc(it.mode === "de" || it.mode === "quiz" ? w.de : w.en)}</b><br><span class="small muted">${pick(CHEER)}</span>`;
        if (it.mode === "en") extra = `<input id="copy" class="type-field" style="font-size:20px;min-height:52px" lang="en" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Schreib es einmal ab" aria-label="Wort zur Übung abschreiben" />`;
      }
    } else if (it.type === "bank") {
      const x = it.item;
      if (result === "close") sol = `Achte auf die Schreibweise: <b>${esc(x.answer)}</b>`;
      if (result === "wrong") {
        sol = `<span class="muted">Richtig ist:</span> <b>${esc(x.answer)}</b>`;
        if (x.solution && x.solution !== x.answer && x.show.style !== "plain") sol += `<br><span class="small">${esc(x.solution)}</span>`;
        if (it.topic.rule) sol += `<br><span class="small muted">${esc(it.topic.rule)}</span>`;
      }
    } else {
      const t = it.task;
      if (result === "close") sol = `Der Wert stimmt, aber kürze noch fertig: <b>${fracHtml(MA.solutionText(t))}</b>`;
      if (result === "wrong") sol = `<span class="muted">Richtig ist:</span> <b>${fracHtml(MA.solutionText(t))}</b><br><span class="small muted">${esc(t.explain)}</span>`;
    }

    const fb = document.createElement("div");
    fb.className = "feedback" + (good ? "" : " bad");
    fb.id = "feedback";
    fb.setAttribute("role", "status");
    fb.innerHTML = `<div class="feedback-inner">
      <div class="row between"><h3>${good ? I.check : I.refresh}${title}</h3>${gained ? `<span class="plus">+${gained} ★</span>` : ""}</div>
      ${sol ? `<p class="sol">${sol}</p>` : ""}${extra}
      <button class="btn ${good ? "primary" : "fun"} block" id="next">${extra ? "Abschreiben und weiter" : "Weiter"}</button>
    </div>`;
    document.body.appendChild(fb);
    const next = $("#next");
    if (extra) {
      const cp = $("#copy");
      setTimeout(() => cp.focus({ preventScroll: true }), 100);
      const tryCopy = () => {
        if (WK.check(cp.value, it.word.en, "en").result === "ok") { WK.sound.close(); nextTask(); }
        else { cp.classList.remove("wrong"); void cp.offsetWidth; cp.classList.add("wrong"); }
      };
      next.onclick = tryCopy;
      cp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); tryCopy(); } });
      const skip = document.createElement("button");
      skip.className = "btn ghost sm"; skip.textContent = "Überspringen"; skip.onclick = nextTask;
      next.after(skip);
    } else {
      next.onclick = nextTask;
      next.focus({ preventScroll: true });
    }
  }

  function nextTask() {
    const fb = $("#feedback"); if (fb) fb.remove();
    const s = session; if (!s) return;
    s.i++;
    if (s.i >= s.items.length) return endSession(false);
    render();
  }

  function endSession(aborted) {
    const fb = $("#feedback"); if (fb) fb.remove();
    const s = session; if (!s) return go("home");
    const answered = s.correct + s.wrong;
    if (aborted && !answered) { session = null; return go("home"); }
    let bonus = 0;
    if (!aborted) {
      bonus = 3;
      if (s.wrong === 0 && answered >= 5) bonus += 5;
      addStars(bonus);
      S.xp += 20;
    }
    s.bonus = bonus;
    S.missions++;
    WK.touchStreak(S);
    S.bestSession = Math.max(S.bestSession, s.stars + bonus);
    const list = nodes(s.subject);
    s.newUnlocked = list.filter((p) => WK.nodeUnlocked(S, list, p) && !s.unlockedBefore.includes(p.id));
    s.newConquered = list.filter((p) => WK.nodeMastery(S, p) >= 0.8 && !s.conqueredBefore.includes(p.id));
    s.levelUp = lvl().level > s.startLevel;
    s.aborted = aborted;
    save();
    go("result");
  }

  VIEWS.result = () => {
    const s = session; if (!s) return VIEWS.home();
    const answered = s.correct + s.wrong;
    const acc = answered ? Math.round((s.correct / answered) * 100) : 0;
    const L = lvl();
    const mood = acc >= 80 ? "wow" : "happy";
    const headline = s.aborted ? "Mission beendet" : acc === 100 ? "Perfekte Mission!" : acc >= 70 ? "Mission geschafft!" : "Gut gekämpft!";
    const sub = s.aborted ? "Deine Sterne hast du behalten." : acc >= 70 ? "Du wirst immer besser." : "Die schwierigen Aufgaben kommen bald wieder dran.";
    return `<section class="result">
      ${WK.kosmo(avatarColor(S.profile.avatar), mood)}
      <div class="stack" style="gap:6px"><h1>${headline}</h1><p class="muted">${sub}</p></div>
      <div><div class="big-stars" id="count">0</div><p class="muted small">Sterne gesammelt${s.bonus ? ` (inkl. ${s.bonus} Bonus)` : ""}</p></div>
      <div class="trophy-row">
        <div class="stat"><b>${acc} %</b><small>richtig</small></div>
        <div class="stat"><b>${s.bestCombo}</b><small>beste Serie</small></div>
        <div class="stat"><b>${WK.liveStreak(S)}</b><small>Tage in Folge</small></div>
      </div>
      ${s.levelUp ? `<div class="banner"><span class="avatar">${WK.kosmo(avatarColor(S.profile.avatar), "wow", "")}</span><div><b>Level ${L.level} erreicht!</b><span class="small muted">Neuer Rang: ${L.rank}</span></div></div>` : ""}
      ${s.newUnlocked.map((p) => `<div class="banner">${WK.orb(p, 44)}<div><b>${esc(p.name)} freigeschaltet!</b><span class="small muted">Ein neuer Planet wartet auf dich.</span></div></div>`).join("")}
      ${s.newConquered.map((p) => `<div class="banner">${WK.orb(p, 44)}<div><b>${esc(p.name)} erobert!</b><span class="small muted">Diesen Planeten hast du im Griff.</span></div></div>`).join("")}
      <div class="stack" style="width:100%">
        <button class="btn primary block" data-act="again">${I.refresh} Nochmal spielen</button>
        <button class="btn block" data-act="nav" data-to="home">Zurück zur Reise</button>
      </div>
    </section>`;
  };
  AFTER.result = () => {
    const s = session, total = s.stars + (s.bonus || 0), el = $("#count");
    if (!s.aborted) setTimeout(() => (s.newUnlocked.length || s.levelUp ? WK.sound.unlock() : WK.sound.win()), 200);
    const t0 = performance.now(), dur = Math.min(1400, 300 + total * 40);
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(total * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); else if (total) WK.burst(el, 40); };
    requestAnimationFrame(step);
  };

  /* ---------- Vokabellisten ---------- */
  VIEWS.lists = () => {
    const customs = S.lists.filter((l) => !l.planet), ps = nodes("en");
    const item = (l, unl) => {
      const info = WK.listInfo(S, l);
      return `<button class="list-item" data-act="open-list" data-id="${l.id}">${WK.orb(l, 42)}
        <span class="grow"><b>${esc(l.name)}</b><small>${info.total} Wörter · ${Math.round(info.mastery * 100)} % gelernt${unl ? "" : " · gesperrt"}</small></span>${I.chev.replace("<svg", '<svg class="chev"')}</button>`;
    };
    return `
      <div class="page-head"><h1 class="grow">Englisch-Vokabeln</h1></div>
      <div class="row" style="flex-wrap:wrap">
        <button class="btn primary grow" data-act="new-list">${I.plus} Neue Liste</button>
        <button class="btn grow" data-act="nav" data-to="import">${I.paste} Text einfügen</button>
      </div>
      <p class="section-label">DEINE LISTEN</p>
      ${customs.length ? `<div class="stack" style="gap:10px">${customs.map((l) => item(l, true)).join("")}</div>` :
        `<div class="empty">${WK.kosmo("#FFC94D", "calm")}<p><b>Noch keine eigene Liste</b></p><p class="small muted">Leg eine Liste für deine Unit an, zum Beispiel „Unit 1 – School“, und tipp die Wörter aus dem Buch ab.</p></div>`}
      <p class="section-label">PLANETEN DEINER KLASSE</p>
      <div class="stack" style="gap:10px">${ps.map((n) => item(n.list, WK.nodeUnlocked(S, ps, n))).join("")}</div>`;
  };

  let saveTimer = null;
  const saveSoon = () => { clearTimeout(saveTimer); saveTimer = setTimeout(save, 400); };

  VIEWS.list = () => {
    const l = listById(view.id); if (!l) return VIEWS.lists();
    return `
      <div class="page-head">
        <button class="icon-btn" data-act="list-back" aria-label="Zurück">${I.back}</button>
        <div class="grow" style="min-width:0"><p class="eyebrow">${l.planet ? "Planet" : "Eigene Liste"}</p><h2 style="overflow-wrap:anywhere">${esc(l.name)}</h2></div>
        ${WK.orb(l, 48)}
      </div>
      <div class="stack">
        ${l.planet ? "" : `<div class="field"><label for="l-name">Name der Liste</label><input id="l-name" class="input" maxlength="40" value="${esc(l.name)}" /></div>`}
        <button class="btn fun block" data-act="planet" data-id="${l.id}">${I.play} Mit dieser Liste üben</button>
        <div class="row between"><p class="section-label" style="margin:8px 2px 0">${l.words.length} WÖRTER</p></div>
        <div class="wrow-head"><span>Englisch</span><span>Deutsch</span><span></span></div>
        <div class="word-table" id="words">${l.words.map(wordRow).join("")}</div>
        <button class="btn block" data-act="add-word">${I.plus} Wort hinzufügen</button>
        <div class="row" style="flex-wrap:wrap;margin-top:10px">
          ${l.planet ? `<button class="btn ghost sm" data-act="restore-list">${I.refresh} Startwörter wiederherstellen</button>` : `<button class="btn danger sm" data-act="delete-list">${I.trash} Liste löschen</button>`}
        </div>
      </div>`;
  };
  function wordRow(w) {
    const unsure = !w.en.trim() || !w.de.trim();
    return `<div class="wrow ${unsure && (w.en || w.de) ? "unsure" : ""}" data-wid="${w.id}">
      <input class="input" data-f="en" lang="en" value="${esc(w.en)}" placeholder="book" aria-label="Englisch" autocapitalize="off" autocorrect="off" spellcheck="false" />
      <input class="input" data-f="de" lang="de" value="${esc(w.de)}" placeholder="Buch" aria-label="Deutsch" />
      <button class="icon-btn" data-act="del-word" data-wid="${w.id}" aria-label="Wort löschen">${I.trash}</button>
    </div>`;
  }
  AFTER.list = () => {
    const l = listById(view.id); if (!l) return;
    const nm = $("#l-name");
    if (nm) nm.addEventListener("input", () => { l.name = nm.value.trim() || "Meine Liste"; saveSoon(); });
    $("#words").addEventListener("input", (e) => {
      const row = e.target.closest(".wrow"); if (!row) return;
      const w = l.words.find((x) => x.id === row.dataset.wid); if (!w) return;
      w[e.target.dataset.f] = e.target.value;
      row.classList.toggle("unsure", (!w.en.trim() || !w.de.trim()) && !!(w.en || w.de));
      saveSoon();
    });
    $("#words").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.dataset.f) {
        e.preventDefault();
        if (e.target.dataset.f === "en") e.target.nextElementSibling.focus();
        else ACTIONS["add-word"]();
      }
    });
  };
  function cleanList(l) {
    if (!l) return;
    l.words = l.words.filter((w) => w.en.trim() || w.de.trim());
    l.words.forEach((w) => { w.en = w.en.trim(); w.de = w.de.trim(); });
    save();
  }

  /* ---------- Text einfügen ---------- */
  let importRows = null;
  VIEWS.import = () => {
    const customs = S.lists.filter((l) => !l.planet);
    if (!importRows) return `
      <div class="page-head"><button class="icon-btn" data-act="nav" data-to="lists" aria-label="Zurück">${I.back}</button><h2 class="grow">Wörter einfügen</h2></div>
      <div class="stack">
        <p class="muted">Tipp oder kopier deine Vokabeln hier hinein. Eine Zeile pro Wort, Englisch zuerst.</p>
        <textarea id="imp-text" class="input" placeholder="book - Buch&#10;pencil - Bleistift&#10;teacher = Lehrer / Lehrerin"></textarea>
        <p class="small muted">Erlaubte Trennzeichen: Bindestrich, Gleichheitszeichen, Doppelpunkt oder Tabulator.</p>
        <p id="imp-err" class="small" style="color:var(--rose)" hidden>Füge zuerst ein paar Wörter ein.</p>
        <button class="btn primary block" data-act="imp-parse">${I.sparkle} Wörter erkennen</button>
      </div>`;
    const unsure = importRows.filter((r) => r.unsure || !r.en || !r.de).length;
    return `
      <div class="page-head"><button class="icon-btn" data-act="imp-back" aria-label="Zurück">${I.back}</button><h2 class="grow">Bitte kontrollieren</h2></div>
      <div class="stack">
        <p class="muted">${importRows.length} Zeilen erkannt.${unsure ? ` <span style="color:var(--rose)">${unsure} rosa Zeilen</span> bitte prüfen oder ergänzen.` : " Sieht gut aus!"}</p>
        <div class="wrow-head"><span>Englisch</span><span>Deutsch</span><span></span></div>
        <div class="word-table" id="imp-rows">${importRows.map((r, i) => `<div class="wrow ${r.unsure || !r.en || !r.de ? "unsure" : ""}" data-i="${i}">
          <input class="input" data-f="en" value="${esc(r.en)}" aria-label="Englisch" autocapitalize="off" spellcheck="false" />
          <input class="input" data-f="de" value="${esc(r.de)}" aria-label="Deutsch" />
          <button class="icon-btn" data-act="imp-del" data-i="${i}" aria-label="Zeile löschen">${I.trash}</button></div>`).join("")}</div>
        <button class="btn sm" data-act="imp-add">${I.plus} Zeile hinzufügen</button>
        <div class="card stack">
          <div class="field"><label for="imp-target">Wohin sollen die Wörter?</label>
            <select id="imp-target" class="input">
              <option value="__new">In eine neue Liste</option>
              ${customs.map((l) => `<option value="${l.id}">${esc(l.name)}</option>`).join("")}
            </select></div>
          <div class="field" id="imp-name-f"><label for="imp-name">Name der neuen Liste</label><input id="imp-name" class="input" maxlength="40" placeholder="Unit 1 – School" /></div>
          <button class="btn primary block" data-act="imp-save">${I.check} Wörter übernehmen</button>
        </div>
      </div>`;
  };
  AFTER.import = () => {
    const t = $("#imp-target");
    if (t) t.addEventListener("change", () => { $("#imp-name-f").hidden = t.value !== "__new"; });
    const rows = $("#imp-rows");
    if (rows) rows.addEventListener("input", (e) => {
      const row = e.target.closest(".wrow"); const r = importRows[+row.dataset.i];
      r[e.target.dataset.f] = e.target.value; r.unsure = false;
      row.classList.toggle("unsure", !r.en.trim() || !r.de.trim());
    });
  };

  /* ---------- Ich (Profil) ---------- */
  VIEWS.me = () => {
    const L = lvl();
    const hardV = WK.allHardWords(S), hardB = hardBankItems();
    const acc = S.answers ? Math.round((S.correct / S.answers) * 100) + " %" : "–";
    const subj = D.subjects.map((x) => {
      const ps = nodes(x.key);
      const done = ps.filter((p) => WK.nodeMastery(S, p) >= 0.8).length;
      const avg = ps.length ? ps.reduce((a, p) => a + WK.nodeMastery(S, p), 0) / ps.length : 0;
      return `<div class="subj-progress"><span class="subj-tag subj-${x.key}">${esc(x.tag)}</span>
        <div class="grow"><div class="row between"><b>${esc(x.name)}</b><small class="muted">${done} von ${ps.length} erobert</small></div>
        <div class="xpbar" style="margin-top:6px"><i style="width:${Math.round(avg * 100)}%;background:${x.color}"></i></div></div></div>`;
    }).join("");
    return `
      <div class="card profile-card">
        ${avatarHtml()}
        <div class="grow" style="min-width:0">
          <h2 style="overflow-wrap:anywhere">${esc(S.profile.name)}</h2>
          <p class="muted small">${esc(gradeLabel(grade()))} · Level ${L.level} · ${L.rank}</p>
          <div class="xpbar" style="margin-top:8px"><i style="width:${Math.round(L.pct * 100)}%"></i></div>
          <p class="small muted" style="margin-top:4px">${L.into} / ${L.need} XP bis Level ${L.level + 1}</p>
        </div>
      </div>
      <p class="section-label">DEINE FÄCHER</p>
      <div class="card stack" style="gap:16px">${subj}</div>
      <p class="section-label">DEIN FORTSCHRITT</p>
      <div class="tiles-grid">
        <div class="tile-stat"><b style="color:var(--gold)">${S.stars}</b><small>Sterne gesamt</small></div>
        <div class="tile-stat"><b style="color:#FFB08A">${WK.liveStreak(S)}</b><small>Tage in Folge (Rekord ${S.bestStreak})</small></div>
        <div class="tile-stat"><b>${acc}</b><small>Trefferquote</small></div>
        <div class="tile-stat"><b>${S.missions}</b><small>Missionen geflogen</small></div>
      </div>
      <p class="section-label">KNIFFLIGES ZUM WIEDERHOLEN</p>
      ${hardV.length || hardB.length ? `<div class="card stack">
        ${hardV.length ? `<div class="hard-list">${hardV.slice(0, 12).map((h) => `<span lang="en">${esc(h.word.en)}</span>`).join("")}</div>` : ""}
        ${hardB.length ? `<p class="small muted">Dazu ${hardB.length} knifflige Deutsch-Aufgabe${hardB.length === 1 ? "" : "n"}.</p>` : ""}
        <button class="btn fun block" data-act="start" data-id="__hard" data-mode="hard">${I.target} Knifflige Aufgaben üben</button></div>`
        : `<div class="empty"><p class="small muted">Was öfter danebengeht, sammelt Kosmo hier zum Wiederholen.</p></div>`}
      <p class="section-label">EINSTELLUNGEN</p>
      <div class="card" style="padding-block:4px">
        <div class="setting"><span class="grow">Klasse<br><span class="small muted">${esc(gradeLabel(grade()))}</span></span><button class="btn sm" data-act="edit-grade">${I.edit} Ändern</button></div>
        <div class="setting"><span class="grow">Melodien<br><span class="small muted">Belohnungsmusik bei richtigen Antworten</span></span><label class="switch"><input type="checkbox" id="set-sound" ${S.settings.sound ? "checked" : ""} aria-label="Melodien"><span></span></label></div>
        <div class="setting"><span class="grow">Name und Astronaut</span><button class="btn sm" data-act="edit-profile">${I.edit} Ändern</button></div>
        <div class="setting"><span class="grow">Sicherung<br><span class="small muted">Für ein neues Gerät oder als Backup</span></span>
          <div class="row" style="gap:8px"><button class="icon-btn" data-act="backup" aria-label="Sicherung speichern">${I.download}</button><button class="icon-btn" data-act="restore" aria-label="Sicherung laden">${I.upload}</button></div></div>
        <div class="setting"><span class="grow">Neu anfangen</span><button class="btn danger sm" data-act="reset">Zurücksetzen</button></div>
      </div>
      <input type="file" id="restore-file" accept=".json,application/json" hidden />
      <p class="small muted" style="text-align:center;margin-top:18px">Alle Daten bleiben auf diesem Gerät. Wortkosmos sendet nichts ins Internet.</p>`;
  };
  AFTER.me = () => {
    $("#set-sound").onchange = (e) => { S.settings.sound = e.target.checked; save(); WK.sound.tap(); };
    $("#restore-file").onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      if (f.size > 5 * 1024 * 1024) { WK.toast("Die Datei ist zu groß für eine Wortkosmos-Sicherung."); e.target.value = ""; return; }
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!data || !Array.isArray(data.lists)) throw new Error("x");
          confirmBox({ title: "Sicherung laden?", text: "Der aktuelle Stand auf diesem Gerät wird ersetzt.", yes: "Laden", onYes: () => {
            S = WK.migrate(data, D); WK.state = S; save(); WK.toast("Sicherung geladen");
            go(!S.profile ? "welcome" : !S.profile.grade ? "grade" : "home");
          } });
        } catch (err) { WK.toast("Diese Datei ist keine Wortkosmos-Sicherung."); }
      };
      r.readAsText(f);
      e.target.value = "";
    };
  };

  function editProfile() {
    draftAvatar = S.profile.avatar;
    const o = openOverlay(`<div class="sheet stack" role="dialog" aria-modal="true" aria-label="Profil ändern">
      <div class="grip"></div><h2>Profil ändern</h2>
      <div class="field"><label for="p-name">Name</label><input id="p-name" class="input" maxlength="20" value="${esc(S.profile.name)}" autofocus /></div>
      <div class="field"><label>Astronaut</label><div class="avatars" id="p-av">${D.avatars.map((a) => `<button type="button" data-av="${a.key}" aria-pressed="${a.key === draftAvatar}" aria-label="${a.name}">${WK.kosmo(a.color, "happy", "")}</button>`).join("")}</div></div>
      <button class="btn primary block" id="p-save">Speichern</button></div>`);
    $$("#p-av button", o).forEach((b) => b.onclick = () => { draftAvatar = b.dataset.av; $$("#p-av button", o).forEach((x) => x.setAttribute("aria-pressed", x === b)); });
    $("#p-save", o).onclick = () => {
      const n = $("#p-name", o).value.trim();
      if (!n) { $("#p-name", o).focus(); return; }
      S.profile.name = n; S.profile.avatar = draftAvatar; save(); closeOverlay(); render();
    };
  }

  function editGrade() {
    const o = openOverlay(`<div class="sheet stack" role="dialog" aria-modal="true" aria-label="Klasse ändern">
      <div class="grip"></div><h2>In welche Klasse gehst du?</h2>
      <p class="muted small">Dein Fortschritt bleibt erhalten. Es ändern sich nur die Planeten auf deiner Reise.</p>
      ${gradeButtons(grade())}</div>`);
    bindGradeButtons(o, (g) => {
      S.profile.grade = g; save(); scrolledHome = false;
      setTimeout(() => { closeOverlay(); render(); WK.toast(`Jetzt: ${gradeLabel(g)}`); }, 180);
    });
  }

  /* ================= Aktionen ================= */
  const ACTIONS = {
    nav: (b) => go(b.dataset.to),
    "welcome-go": () => {
      const n = $("#w-name").value.trim(), err = $("#w-err");
      if (!n) { err.textContent = "Schreib zuerst deinen Namen."; $("#w-name").focus(); return; }
      if (!draftGrade) { err.textContent = "Wähle noch deine Klasse aus."; $("#grade-grid").scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      S.profile = { name: n, avatar: draftAvatar, grade: draftGrade };
      save(); WK.sound.win(); go("home"); WK.toast(`Willkommen an Bord, ${n}!`);
    },
    subject: (b) => {
      if (S.subject === b.dataset.sub) return;
      S.subject = b.dataset.sub; save(); WK.sound.tap(); scrolledHome = false; render();
    },
    planet: (b) => openPlanet(b.dataset.id),
    kosmo: () => {
      WK.sound.tap();
      const t = $("#bubble-text"), ps = nodes(S.subject); if (t && ps.length) t.innerHTML = homeMessage(S.subject, WK.currentNode(S, ps));
    },
    start: (b) => { closeOverlay(); startSession(b.dataset.id, b.dataset.mode); },
    check: () => checkTyped(),
    skip: () => {
      const s = session; if (!s || s.state.answered) return;
      const inp = $("#type") || $("#fn") || $("#th");
      $$("#task .type-field").forEach((x) => { x.readOnly = true; x.classList.add("wrong"); });
      finish("wrong", inp || $("#slots") || $("#task"));
    },
    hint: () => {
      const s = session, it = s.items[s.i]; if (s.state.answered) return;
      s.state.hint = Math.min(it.word.en.length, s.state.hint + 1);
      const shown = it.word.en.slice(0, s.state.hint);
      $("#hint-out").innerHTML = `Es beginnt mit <b lang="en">${esc(shown)}…</b>`;
      const inp = $("#type"); if (!inp.value) inp.value = shown; inp.focus();
    },
    "scr-clear": () => { const s = session; if (!s || s.state.answered) return; s.state.built.fill(null); s.state.paint(); },
    flip: () => flipCard(),
    "flash-ok": (b) => finish("ok", b),
    "flash-again": (b) => {
      const s = session, it = s.items[s.i];
      if (!it.retry) s.items.push(Object.assign({}, it, { retry: true }));
      s.state.hint = 1;
      finish("wrong", b);
    },
    quit: () => confirmBox({ title: "Mission beenden?", text: "Deine bisher gesammelten Sterne behältst du.", yes: "Beenden", no: "Weiterspielen", danger: true, onYes: () => endSession(true) }),
    again: () => { const s = session; startSession(s.id, s.mode); },
    "open-list": (b) => { closeOverlay(); go("list", { id: b.dataset.id }); },
    "list-back": () => { cleanList(listById(view.id)); go("lists"); },
    "new-list": () => {
      const pal = [["#FFB3D3", "#8B6CFF"], ["#A3FFF0", "#2A73D9"], ["#FFE39A", "#FF6FAE"], ["#B8F28A", "#1BA6B8"], ["#FFC4A3", "#C23A9A"]];
      const n = S.lists.filter((l) => !l.planet).length;
      const l = { id: "c-" + WK.uid(), planet: null, name: "Unit " + (n + 1), short: "Unit " + (n + 1), colors: pal[n % pal.length], ring: n % 2 === 1, words: [] };
      S.lists.push(l); save(); go("list", { id: l.id });
      setTimeout(() => { const i = $("#l-name"); if (i) { i.focus(); i.select(); } }, 80);
    },
    "add-word": () => {
      const l = listById(view.id);
      const w = { id: WK.uid(), en: "", de: "" };
      l.words.push(w);
      $("#words").insertAdjacentHTML("beforeend", wordRow(w));
      const row = $(`.wrow[data-wid="${w.id}"]`);
      row.querySelector("input").focus();
      row.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    "del-word": (b) => {
      const l = listById(view.id);
      l.words = l.words.filter((w) => w.id !== b.dataset.wid);
      b.closest(".wrow").remove(); save();
    },
    "delete-list": () => {
      const l = listById(view.id);
      confirmBox({ title: "Liste löschen?", text: `„${l.name}“ mit ${l.words.length} Wörtern wird gelöscht.`, yes: "Löschen", danger: true, onYes: () => {
        S.lists = S.lists.filter((x) => x !== l); save(); WK.toast("Liste gelöscht"); go("lists");
      } });
    },
    "restore-list": () => {
      const l = listById(view.id);
      confirmBox({ title: "Startwörter wiederherstellen?", text: "Deine Änderungen an diesem Planeten werden durch die ursprünglichen Wörter ersetzt.", yes: "Wiederherstellen", onYes: () => {
        const fresh = WK.freshLists(D).find((x) => x.planet === l.planet);
        l.words = fresh.words; save(); render(); WK.toast("Startwörter wiederhergestellt");
      } });
    },
    "imp-parse": () => {
      const rows = WK.parsePairs($("#imp-text").value);
      if (!rows.length) { $("#imp-err").hidden = false; return; }
      importRows = rows; render();
    },
    "imp-back": () => { importRows = null; render(); },
    "imp-del": (b) => { importRows.splice(+b.dataset.i, 1); render(); },
    "imp-add": () => { importRows.push({ en: "", de: "", unsure: true }); render(); const r = $$("#imp-rows .wrow"); r[r.length - 1].querySelector("input").focus(); },
    "imp-save": () => {
      const good = importRows.filter((r) => r.en.trim() && r.de.trim());
      if (!good.length) { WK.toast("Es fehlen noch Wortpaare mit Englisch und Deutsch."); return; }
      const tv = $("#imp-target").value;
      let l;
      if (tv === "__new") {
        const n = S.lists.filter((x) => !x.planet).length;
        const pal = [["#FFB3D3", "#8B6CFF"], ["#A3FFF0", "#2A73D9"], ["#FFE39A", "#FF6FAE"], ["#B8F28A", "#1BA6B8"], ["#FFC4A3", "#C23A9A"]];
        const name = $("#imp-name").value.trim() || "Unit " + (n + 1);
        l = { id: "c-" + WK.uid(), planet: null, name, short: name, colors: pal[n % pal.length], ring: n % 2 === 1, words: [] };
        S.lists.push(l);
      } else l = listById(tv);
      good.forEach((r) => l.words.push({ id: WK.uid(), en: r.en.trim(), de: r.de.trim() }));
      const skipped = importRows.length - good.length;
      importRows = null; save();
      go("list", { id: l.id });
      WK.toast(`${good.length} Wörter übernommen${skipped ? `, ${skipped} unvollständige ausgelassen` : ""}`, 3200);
    },
    "edit-profile": () => editProfile(),
    "edit-grade": () => editGrade(),
    backup: () => {
      try {
        const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `wortkosmos-sicherung-${WK.todayStr()}.json`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        WK.toast("Sicherung gespeichert");
      } catch (e) { WK.toast("Speichern hat nicht geklappt."); }
    },
    restore: () => $("#restore-file").click(),
    reset: () => {
      const o = openOverlay(`<div class="dialog stack" role="dialog" aria-modal="true" aria-label="Zurücksetzen">
        <h3>Was soll zurückgesetzt werden?</h3>
        <p class="muted small">Das kann nicht rückgängig gemacht werden. Speichere vorher eine Sicherung, wenn du unsicher bist.</p>
        <button class="btn danger block" data-x="progress">Nur Sterne und Lernstand</button>
        <button class="btn danger block" data-x="all">Alles, auch eigene Listen und Profil</button>
        <button class="btn block" data-x="no">Abbrechen</button></div>`, true);
      o.querySelector("[data-x=no]").onclick = closeOverlay;
      o.querySelector("[data-x=progress]").onclick = () => {
        const keep = { profile: S.profile, settings: S.settings, lists: S.lists, subject: S.subject };
        S = Object.assign(WK.freshState(D), keep); WK.state = S; save(); closeOverlay(); WK.toast("Lernstand zurückgesetzt"); go("home");
      };
      o.querySelector("[data-x=all]").onclick = () => {
        S = WK.freshState(D); WK.state = S; save(); closeOverlay(); scrolledHome = false; draftGrade = null; go("welcome");
      };
    }
  };

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b || b.disabled) return;
    const fn = ACTIONS[b.dataset.act];
    if (fn) { e.preventDefault(); fn(b); }
  });

  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) return;
    if (e.key === "Escape" && $("#overlay")) { closeOverlay(); return; }
    if (view.name !== "play" || !session || $("#overlay")) return;
    const fb = $("#feedback");
    const ae = document.activeElement;
    if (fb && (e.key === "Enter" || (e.key === " " && (!ae || ae.tagName !== "INPUT"))) && (!ae || (ae.id !== "copy" && ae.id !== "next" && !fb.contains(ae)))) {
      e.preventDefault(); $("#next").click(); return;
    }
    if (!fb && /^[1-4]$/.test(e.key) && (!ae || ae.tagName !== "INPUT")) { const b = $$("#task .answer")[+e.key - 1]; if (b) b.click(); }
  });

  // Nur lesend: aktuelle Aufgabe (für automatische Tests)
  WK.currentTask = () => (session && session.items[session.i]) || null;

  /* ---------- Start ---------- */
  WK.startSky();
  render();
  if (loaded.error) WK.toast(loaded.error, 4000);

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
