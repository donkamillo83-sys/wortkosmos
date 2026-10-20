/* Wortkosmos – Kernlogik: Speicherung, Antwortprüfung, Lernstand, Punkte.
   Enthält keine Oberfläche, damit sie getrennt getestet werden kann. */
(function (root) {
  "use strict";

  const STORAGE_KEY = "wortkosmos.v1";
  const SKILL_TARGET = 12; // so viele Punkte braucht ein Mathe-Planet für 100 %
  const SCHEMA = 1;

  /* ---------- Hilfsfunktionen ---------- */
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const todayStr = (d = new Date()) => {
    const z = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ---------- Startzustand ---------- */
  function freshLists(data) {
    return data.planets.map((p) => ({
      id: "p-" + p.key,
      planet: p.key,
      name: p.name,
      short: p.short,
      colors: p.colors,
      ring: p.ring,
      words: p.words.map(([en, de], i) => ({ id: p.key + "-" + i, en, de }))
    }));
  }

  function freshState(data) {
    return {
      schema: SCHEMA,
      profile: null,
      settings: { sound: true },
      stars: 0,
      xp: 0,
      streak: { count: 0, last: null },
      bestStreak: 0,
      bestSession: 0,
      today: null,
      missions: 0,
      answers: 0,
      correct: 0,
      stats: {},
      skills: {},
      subject: "en",
      lists: freshLists(data),
      createdAt: Date.now()
    };
  }

  /* ---------- Speichern und Laden ---------- */
  function load(data, storage) {
    let raw = null;
    try { raw = storage.getItem(STORAGE_KEY); } catch (e) { raw = null; }
    if (!raw) return { state: freshState(data), fresh: true };
    try {
      const s = JSON.parse(raw);
      return { state: migrate(s, data), fresh: false };
    } catch (e) {
      return { state: freshState(data), fresh: true, error: "Gespeicherte Daten waren beschädigt und wurden neu angelegt." };
    }
  }

  /* Alles, was aus dem Speicher oder einer Sicherungsdatei kommt, wird geprüft
     und auf erlaubte Werte zurechtgestutzt. So kann eine manipulierte Datei
     keinen fremden Code oder kaputte Werte einschleusen. */
  const num = (v, max = 1e9) => { const n = Math.floor(Number(v)); return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : 0; };
  const str = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, max);
  const safeId = (v) => { const t = String(v == null ? "" : v).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40); return t || uid(); };
  const HEX = /^#[0-9a-fA-F]{6}$/;
  const dateStr = (v) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);

  function cleanList(l, planetKeys) {
    if (!l || typeof l !== "object") return null;
    const colors = Array.isArray(l.colors) && l.colors.length === 2 && l.colors.every((c) => HEX.test(c)) ? l.colors : ["#C9B8FF", "#6B47E8"];
    const planet = planetKeys.includes(l.planet) ? l.planet : null;
    const seen = new Set();
    const words = (Array.isArray(l.words) ? l.words : []).slice(0, 2000).map((w) => {
      let id = safeId(w && w.id);
      while (seen.has(id)) id = uid();
      seen.add(id);
      return { id, en: str(w && w.en, 80), de: str(w && w.de, 120) };
    });
    return { id: planet ? "p-" + planet : safeId(l.id), planet, name: str(l.name, 40) || "Meine Liste", short: str(l.short || l.name, 24), colors, ring: !!l.ring, words };
  }

  function migrate(s, data) {
    const base = freshState(data);
    if (!s || typeof s !== "object") return base;
    const planetKeys = data.planets.map((p) => p.key);
    const out = base;
    out.profile = s.profile && typeof s.profile === "object" && str(s.profile.name, 20).trim()
      ? {
          name: str(s.profile.name, 20).trim(),
          avatar: data.avatars.some((a) => a.key === s.profile.avatar) ? s.profile.avatar : data.avatars[0].key,
          grade: data.grades.some((g) => g.key === s.profile.grade) ? s.profile.grade : null
        }
      : null;
    out.subject = data.subjects.some((x) => x.key === s.subject) ? s.subject : "en";
    out.skills = {};
    if (s.skills && typeof s.skills === "object") {
      Object.keys(s.skills).slice(0, 500).forEach((k) => {
        if (!/^[A-Za-z0-9_-]{1,40}$/.test(k)) return;
        const v = s.skills[k] || {};
        out.skills[k] = { score: Math.min(SKILL_TARGET, num(v.score)), seen: num(v.seen), ok: num(v.ok), bad: num(v.bad), last: num(v.last, 1e14) };
      });
    }
    out.settings = { sound: !(s.settings && s.settings.sound === false) };
    ["stars", "xp", "bestStreak", "bestSession", "missions", "answers", "correct"].forEach((k) => { out[k] = num(s[k]); });
    out.correct = Math.min(out.correct, out.answers);
    out.streak = { count: num(s.streak && s.streak.count, 100000), last: dateStr(s.streak && s.streak.last) };
    if (s.today && dateStr(s.today.date)) out.today = { date: s.today.date, stars: num(s.today.stars) };
    out.createdAt = num(s.createdAt, 1e14) || Date.now();
    out.stats = {};
    if (s.stats && typeof s.stats === "object") {
      Object.keys(s.stats).slice(0, 20000).forEach((k) => {
        if (!/^[A-Za-z0-9_-]{1,40}:[A-Za-z0-9_-]{1,40}$/.test(k)) return;
        const v = s.stats[k] || {};
        out.stats[k] = { box: Math.min(5, num(v.box)), seen: num(v.seen), ok: num(v.ok), bad: num(v.bad), last: num(v.last, 1e14) };
      });
    }
    let lists = (Array.isArray(s.lists) ? s.lists : []).slice(0, 300).map((l) => cleanList(l, planetKeys)).filter(Boolean);
    const ids = new Set();
    lists = lists.filter((l) => (ids.has(l.id) ? false : ids.add(l.id)));
    // fehlende Planeten (z. B. nach einem Update) ergänzen, Reihenfolge der Planeten beibehalten
    base.lists.forEach((bl) => { if (!lists.some((l) => l.planet === bl.planet)) lists.push(bl); });
    const order = (l) => (l.planet ? planetKeys.indexOf(l.planet) : 1000);
    out.lists = lists.sort((a, b2) => order(a) - order(b2));
    out.schema = SCHEMA;
    return out;
  }

  function save(state, storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------- Antwortprüfung ---------- */
  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[’`´]/g, "'")
      .replace(/\(.*?\)/g, " ")
      .replace(/[.!?"„“]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function umlautFold(s) {
    return s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  }

  // "Lehrer / Lehrerin" -> ["lehrer", "lehrerin"]
  function variants(target) {
    return String(target || "")
      .split(/[\/,;]/)
      .map(normalize)
      .filter(Boolean);
  }

  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  const DE_ARTICLES = /^(der|die|das|ein|eine|einen) /;

  /* Ergebnis: "ok" (richtig), "close" (ein Tippfehler), "wrong" */
  function check(input, target, lang) {
    let a = normalize(input);
    if (!a) return { result: "wrong", expected: variants(target)[0] || target };
    const opts = variants(target);
    const forms = [];
    opts.forEach((o) => {
      forms.push(o);
      if (lang === "en") {
        if (o.startsWith("to ")) forms.push(o.slice(3));
        forms.push(o.replace(/-/g, " "));
      } else {
        forms.push(umlautFold(o));
      }
    });
    let cand = [a];
    if (lang === "en" && !a.startsWith("to ")) cand.push("to " + a);
    if (lang === "de") {
      cand.push(umlautFold(a));
      if (DE_ARTICLES.test(a)) {
        const na = a.replace(DE_ARTICLES, "");
        cand.push(na, umlautFold(na));
      }
    }
    if (cand.some((c) => forms.includes(c))) return { result: "ok", expected: target };
    // genau ein Buchstabe daneben bei Wörtern ab 4 Buchstaben
    let best = Infinity;
    cand.forEach((c) => forms.forEach((f) => { if (f.length >= 4) best = Math.min(best, lev(c, f)); }));
    if (best === 1) return { result: "close", expected: target };
    return { result: "wrong", expected: target };
  }

  /* ---------- Lernstand (Leitner-Fächer 0–5) ---------- */
  const wordKey = (listId, wordId) => listId + ":" + wordId;

  function getStat(state, listId, wordId) {
    return state.stats[wordKey(listId, wordId)] || { box: 0, seen: 0, ok: 0, bad: 0, last: 0 };
  }

  function record(state, listId, wordId, correct) {
    const k = wordKey(listId, wordId);
    const s = Object.assign({ box: 0, seen: 0, ok: 0, bad: 0, last: 0 }, state.stats[k]);
    s.seen++;
    s.last = Date.now();
    if (correct) { s.ok++; s.box = Math.min(5, s.box + 1); }
    else { s.bad++; s.box = Math.max(0, s.box - 2); }
    state.stats[k] = s;
    state.answers++;
    if (correct) state.correct++;
    return s;
  }

  function isHard(st) {
    return st.seen > 0 && st.bad >= 2 && st.box < 3;
  }

  function mastery(state, list) {
    if (!list.words.length) return 0;
    const learned = list.words.filter((w) => getStat(state, list.id, w.id).box >= 2).length;
    return learned / list.words.length;
  }

  function listInfo(state, list) {
    let learned = 0, hard = 0, seen = 0;
    list.words.forEach((w) => {
      const s = getStat(state, list.id, w.id);
      if (s.box >= 2) learned++;
      if (s.seen) seen++;
      if (isHard(s)) hard++;
    });
    return { total: list.words.length, learned, hard, seen, mastery: list.words.length ? learned / list.words.length : 0 };
  }

  function planets(state) {
    return state.lists.filter((l) => l.planet);
  }

  const UNLOCK_AT = 0.5;
  function isUnlocked(state, list) {
    if (!list.planet) return true;
    const ps = planets(state);
    const i = ps.indexOf(list);
    if (i <= 0) return true;
    return mastery(state, ps[i - 1]) >= UNLOCK_AT;
  }

  function currentPlanet(state) {
    const ps = planets(state);
    let cur = ps[0];
    for (const p of ps) {
      if (!isUnlocked(state, p)) break;
      cur = p;
      if (mastery(state, p) < 0.8) break;
    }
    return cur;
  }

  function allHardWords(state) {
    const out = [];
    state.lists.forEach((l) => l.words.forEach((w) => {
      const s = getStat(state, l.id, w.id);
      if (isHard(s)) out.push({ list: l, word: w, stat: s });
    }));
    return out.sort((a, b) => b.stat.bad - a.stat.bad);
  }

  /* ---------- Lerneinheit zusammenstellen ----------
     Neue und schwache Wörter kommen öfter dran. */
  function pickItems(state, prefix, items, n, onlyHard) {
    let pool = items.slice();
    if (onlyHard) pool = pool.filter((w) => isHard(getStat(state, prefix, w.id)));
    const scored = pool.map((w) => {
      const s = getStat(state, prefix, w.id);
      const age = s.last ? (Date.now() - s.last) / 3.6e6 : 999;
      const score = (5 - s.box) * 3 + (s.seen ? 0 : 4) + Math.min(age / 24, 3) + s.bad + Math.random() * 3;
      return { w, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return shuffle(scored.slice(0, n).map((x) => x.w));
  }
  function pickWords(state, list, n, onlyHard) {
    return pickItems(state, list.id, list.words.filter((w) => w.en && w.de), n, onlyHard);
  }

  // Im Mix-Modus richtet sich die Übung nach dem Lernstand: erkennen -> erinnern -> schreiben
  function modeForWord(state, listId, word, young) {
    const box = getStat(state, listId, word.id).box;
    if (box === 0) return "quiz";
    if (young) { // Volksschule: mehr erkennen, weniger frei schreiben
      if (box === 1) return Math.random() < 0.5 ? "quiz" : "scramble";
      return Math.random() < 0.6 ? "scramble" : "en";
    }
    if (box === 1) return Math.random() < 0.5 ? "de" : "scramble";
    if (box === 2) return Math.random() < 0.6 ? "en" : "scramble";
    return "en";
  }

  /* ---------- Mathe-Fortschritt pro Thema ---------- */
  function getSkill(state, key) {
    return state.skills[key] || { score: 0, seen: 0, ok: 0, bad: 0, last: 0 };
  }
  function recordSkill(state, key, correct) {
    const s = Object.assign({ score: 0, seen: 0, ok: 0, bad: 0, last: 0 }, state.skills[key]);
    s.seen++; s.last = Date.now();
    if (correct) { s.ok++; s.score = Math.min(SKILL_TARGET, s.score + 1); }
    else { s.bad++; s.score = Math.max(0, s.score - 1); }
    state.skills[key] = s;
    state.answers++;
    if (correct) state.correct++;
    return s;
  }

  /* ---------- Lernpfad: Planeten je Fach und Klasse ----------
     Knoten-Arten: vocab (Englisch-Liste), bank (Deutsch-Aufgaben), gen (Mathe) */
  function nodeFor(state, data, subject, key, extras) {
    if (subject === "en") {
      const l = state.lists.find((x) => x.planet === key);
      return l ? { kind: "vocab", subject, id: l.id, key, name: l.name, short: l.short, colors: l.colors, ring: l.ring, list: l } : null;
    }
    if (subject === "de") {
      const t = extras.de && extras.de.topics.find((x) => x.key === key);
      return t ? { kind: "bank", subject, id: "d-" + key, key, name: t.name, short: t.short, colors: t.colors, ring: t.ring, topic: t, items: extras.de.items(t) } : null;
    }
    const t = extras.ma && extras.ma.topics.find((x) => x.key === key);
    return t ? { kind: "gen", subject, id: "m-" + key, key, name: t.name, short: t.short, colors: t.colors, ring: t.ring, topic: t } : null;
  }

  function path(state, data, subject, grade, extras) {
    const p = (data.paths[grade] || data.paths.ms1)[subject] || [];
    return p.map((k) => nodeFor(state, data, subject, k, extras)).filter(Boolean);
  }

  function nodeInfo(state, node) {
    if (node.kind === "vocab") return listInfo(state, node.list);
    if (node.kind === "bank") {
      let learned = 0, hard = 0, seen = 0;
      node.items.forEach((it) => {
        const s = getStat(state, node.id, it.id);
        if (s.box >= 2) learned++;
        if (s.seen) seen++;
        if (isHard(s)) hard++;
      });
      const total = node.items.length;
      return { total, learned, hard, seen, mastery: total ? learned / total : 0 };
    }
    const sk = getSkill(state, node.key);
    return { total: sk.seen, learned: sk.ok, hard: 0, seen: sk.seen, mastery: sk.score / SKILL_TARGET, accuracy: sk.seen ? sk.ok / sk.seen : 0 };
  }
  const nodeMastery = (state, node) => nodeInfo(state, node).mastery;

  function nodeUnlocked(state, nodes, node) {
    const i = nodes.indexOf(node);
    if (i <= 0) return true;
    return nodeMastery(state, nodes[i - 1]) >= UNLOCK_AT;
  }

  function currentNode(state, nodes) {
    let cur = nodes[0];
    for (const n of nodes) {
      if (!nodeUnlocked(state, nodes, n)) break;
      cur = n;
      if (nodeMastery(state, n) < 0.8) break;
    }
    return cur;
  }

  function distractors(state, list, word, count) {
    const own = list.words.filter((w) => w.id !== word.id && w.de && normalize(w.de) !== normalize(word.de));
    let pool = shuffle(own).map((w) => w.de);
    if (pool.length < count) {
      const extra = [];
      state.lists.forEach((l) => l !== list && l.words.forEach((w) => extra.push(w.de)));
      pool = pool.concat(shuffle(extra.filter((d) => normalize(d) !== normalize(word.de) && !pool.includes(d))));
    }
    return [...new Set(pool)].slice(0, count);
  }

  /* ---------- Sterne, XP, Level ---------- */
  const STAR_VALUES = { quiz: 1, flash: 1, scramble: 2, de: 2, en: 3, choice: 1, text: 2, num: 2, time: 2, frac: 3 };

  function starsFor(mode, result, usedHint) {
    if (result === "wrong") return 0;
    let v = STAR_VALUES[mode] || 1;
    if (result === "close") v = Math.max(1, v - 1);
    if (usedHint) v = Math.max(1, v - 1);
    return v;
  }

  function levelInfo(xp, ranks) {
    let level = 1, need = 100, start = 0;
    while (xp >= start + need) { start += need; level++; need = 100 + (level - 1) * 50; }
    const rank = ranks[Math.min(ranks.length - 1, Math.floor((level - 1) / 3))];
    return { level, rank, into: xp - start, need, pct: (xp - start) / need };
  }

  function touchStreak(state, now = new Date()) {
    const t = todayStr(now);
    if (state.streak.last === t) return state.streak.count;
    const y = new Date(now); y.setDate(y.getDate() - 1);
    state.streak.count = state.streak.last === todayStr(y) ? state.streak.count + 1 : 1;
    state.streak.last = t;
    state.bestStreak = Math.max(state.bestStreak, state.streak.count);
    return state.streak.count;
  }

  function liveStreak(state, now = new Date()) {
    const t = todayStr(now);
    const y = new Date(now); y.setDate(y.getDate() - 1);
    if (state.streak.last === t || state.streak.last === todayStr(y)) return state.streak.count;
    return 0;
  }

  /* ---------- Text in Wortpaare zerlegen (Einfügen, später auch Foto) ---------- */
  const SEPS = [/\t+/, /\s+[-–—=]\s+/, /\s*[=:;]\s*/, /\s+[-–—]\s*|\s*[-–—]\s+/, /\s{3,}/];

  function parsePairs(text) {
    const rows = [];
    String(text || "").split(/\r?\n/).forEach((line) => {
      const clean = line.replace(/^\s*[\d]+[.)]\s*/, "").replace(/^[•*·\-]\s+/, "").trim();
      if (!clean) return;
      let parts = null;
      for (const sep of SEPS) {
        const p = clean.split(sep).map((x) => x.trim()).filter(Boolean);
        if (p.length >= 2) { parts = [p[0], p.slice(1).join(" ")]; break; }
      }
      if (parts) rows.push({ en: parts[0], de: parts[1], unsure: parts[0].length > 30 || parts[1].length > 40 });
      else rows.push({ en: clean, de: "", unsure: true });
    });
    return rows;
  }

  root.WK = Object.assign(root.WK || {}, {
    STORAGE_KEY, uid, todayStr, shuffle,
    freshState, freshLists, load, save, migrate,
    normalize, variants, lev, check,
    wordKey, getStat, record, isHard, mastery, listInfo, planets, isUnlocked, currentPlanet, allHardWords, UNLOCK_AT,
    pickItems, pickWords, modeForWord, distractors,
    SKILL_TARGET, getSkill, recordSkill, path, nodeInfo, nodeMastery, nodeUnlocked, currentNode,
    starsFor, levelInfo, touchStreak, liveStreak,
    parsePairs
  });
})(typeof window !== "undefined" ? window : globalThis);
