/* Wortkosmos – Mathe-Aufgaben. Jede Aufgabe wird zufällig erzeugt,
   daher gibt es unbegrenzt neue Übungen.
   Eine Aufgabe sieht so aus:
   { kind: "num" | "frac" | "time" | "choice", prompt, big?, story?, unit?, answer, options?, explain } */
(function (root) {
  "use strict";

  /* ---------- Hilfen ---------- */
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const lcm = (a, b) => (a / gcd(a, b)) * b;
  const round = (x, d = 6) => Math.round(x * 10 ** d) / 10 ** d;
  const NB = " "; // schmales Leerzeichen als Tausendertrennung

  // Zahl in österreichischer Schreibweise: 12 500 und 3,75
  function fmt(x, dec) {
    x = round(x, 6);
    let s = dec != null ? x.toFixed(dec) : String(x);
    let [int, frac] = s.split(".");
    const neg = int.startsWith("-"); if (neg) int = int.slice(1);
    if (int.length > 4) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
    return (neg ? "−" : "") + int + (frac ? "," + frac : "");
  }
  const money = (x) => fmt(x, Number.isInteger(round(x, 2)) ? 0 : 2);
  const fr = (n, d) => `${n}/${d}`;
  const hm = (h, m) => `${h}:${String(m).padStart(2, "0")}`;

  const NAMES = [["Lena", "sie"], ["Jonas", "er"], ["Mia", "sie"], ["Paul", "er"], ["Emma", "sie"], ["Felix", "er"],
    ["Sara", "sie"], ["David", "er"], ["Lea", "sie"], ["Noah", "er"], ["Anna", "sie"], ["Elias", "er"]];
  const who = () => { const [n, p] = pick(NAMES); return { n, p, P: p[0].toUpperCase() + p.slice(1), sein: p === "er" ? "seinem" : "ihrem" }; };

  /* ================= 3. Klasse Volksschule ================= */
  const VS3 = {
    plus1000() {
      const a = R(100, 850), b = R(10, 1000 - a);
      return { kind: "num", prompt: "Rechne:", big: `${a} + ${b}`, answer: a + b, explain: `${a} + ${b} = ${a + b}` };
    },
    minus1000() {
      const a = R(200, 1000), b = R(10, a - 10);
      return { kind: "num", prompt: "Rechne:", big: `${a} − ${b}`, answer: a - b, explain: `${a} − ${b} = ${a - b}` };
    },
    einmaleins() {
      const a = R(2, 10), b = R(2, 10);
      if (Math.random() < 0.25) return { kind: "num", prompt: "Welche Zahl fehlt?", big: `${a} · ? = ${a * b}`, answer: b, explain: `${a} · ${b} = ${a * b}` };
      return { kind: "num", prompt: "Rechne:", big: `${a} · ${b}`, answer: a * b, explain: `${a} · ${b} = ${a * b}` };
    },
    geteilt() {
      const b = R(2, 10), q = R(2, 10), a = b * q;
      return { kind: "num", prompt: "Rechne:", big: `${a} : ${b}`, answer: q, explain: `${a} : ${b} = ${q}, weil ${q} · ${b} = ${a}` };
    },
    ergaenzen() {
      if (Math.random() < 0.5) { const a = R(5, 95); return { kind: "num", prompt: "Ergänze auf 100:", big: `${a} + ? = 100`, answer: 100 - a, explain: `${a} + ${100 - a} = 100` }; }
      const a = Math.random() < 0.5 ? R(1, 99) * 10 : R(101, 989);
      return { kind: "num", prompt: "Ergänze auf 1000:", big: `${a} + ? = 1000`, answer: 1000 - a, explain: `${a} + ${1000 - a} = 1000` };
    },
    laengen() {
      const t = R(0, 4);
      if (t === 0) { const m = R(2, 9); return { kind: "num", prompt: "Wandle um:", big: `${m} m = ? cm`, unit: "cm", answer: m * 100, explain: `1 m = 100 cm, also ${m} m = ${m * 100} cm` }; }
      if (t === 1) { const m = R(1, 8), c = R(5, 95); return { kind: "num", prompt: "Wandle um:", big: `${m} m ${c} cm = ? cm`, unit: "cm", answer: m * 100 + c, explain: `${m} m = ${m * 100} cm, dazu ${c} cm ergibt ${m * 100 + c} cm` }; }
      if (t === 2) { const c = R(2, 9); return { kind: "num", prompt: "Wandle um:", big: `${c} cm = ? mm`, unit: "mm", answer: c * 10, explain: `1 cm = 10 mm, also ${c} cm = ${c * 10} mm` }; }
      if (t === 3) { const k = R(2, 9); return { kind: "num", prompt: "Wandle um:", big: `${k} km = ? m`, unit: "m", answer: k * 1000, explain: `1 km = 1000 m, also ${k} km = ${k * 1000} m` }; }
      const c = R(2, 9) * 100; return { kind: "num", prompt: "Wandle um:", big: `${c} cm = ? m`, unit: "m", answer: c / 100, explain: `100 cm = 1 m, also ${c} cm = ${c / 100} m` };
    },
    geld() {
      const t = R(0, 2);
      if (t === 0) { const e = R(1, 9), c = R(1, 19) * 5; const v = e * 100 + c; return { kind: "num", prompt: "Wie viel Cent sind das?", big: `${money(v / 100)} €`, unit: "Cent", answer: v, explain: `1 € = 100 Cent, also ${money(v / 100)} € = ${v} Cent` }; }
      if (t === 1) { const v = R(11, 99) * 10 + R(0, 1) * 5; return { kind: "num", prompt: "Wie viel Euro sind das?", big: `${v} Cent = ? €`, unit: "€", answer: v / 100, explain: `100 Cent = 1 €, also ${v} Cent = ${money(v / 100)} €` }; }
      const pay = pick([5, 10, 20]), price = R(10, pay * 10 - 2) * 10; const ch = pay * 100 - price;
      return { kind: "num", prompt: "Wie viel Wechselgeld bekommst du?", story: `Du kaufst ein Buch um ${money(price / 100)} € und zahlst mit einem ${pay}-€-Schein.`, unit: "€", answer: ch / 100, explain: `${pay} € − ${money(price / 100)} € = ${money(ch / 100)} €` };
    },
    zeit() {
      const t = R(0, 2);
      if (t === 0) { const h = R(1, 3), m = R(1, 11) * 5; return { kind: "num", prompt: "Wie viele Minuten sind das?", big: `${h} h ${m} min`, unit: "min", answer: h * 60 + m, explain: `${h} h = ${h * 60} min, dazu ${m} min ergibt ${h * 60 + m} min` }; }
      if (t === 1) { const h = R(2, 4); return { kind: "num", prompt: "Wie viele Minuten sind das?", big: `${h} Stunden`, unit: "min", answer: h * 60, explain: `1 Stunde hat 60 Minuten, also ${h} · 60 = ${h * 60} min` }; }
      const h = R(7, 17), m = R(2, 11) * 5, add = R(3, 11) * 5; const tot = h * 60 + m + add;
      return { kind: "time", prompt: "Wie spät ist es dann?", story: `Es ist ${hm(h, m)} Uhr. In ${add} Minuten beginnt das Training.`, answer: [Math.floor(tot / 60), tot % 60], explain: `${hm(h, m)} Uhr + ${add} min = ${hm(Math.floor(tot / 60), tot % 60)} Uhr` };
    },
    sach3() {
      const w = who(), t = R(0, 6);
      if (t === 0) { const a = R(20, 300), b = R(10, 200); return { kind: "num", prompt: "Sachaufgabe", story: `${w.n} hat ${a} Sticker. ${w.P} bekommt noch ${b} Sticker dazu. Wie viele Sticker hat ${w.p} jetzt?`, unit: "Sticker", answer: a + b, explain: `${a} + ${b} = ${a + b}` }; }
      if (t === 1) { const a = R(30, 60), b = R(5, a - 5); return { kind: "num", prompt: "Sachaufgabe", story: `In einem Bus sitzen ${a} Personen. An der Haltestelle steigen ${b} aus. Wie viele Personen sitzen noch im Bus?`, unit: "Personen", answer: a - b, explain: `${a} − ${b} = ${a - b}` }; }
      if (t === 2) { const a = R(4, 10), b = R(3, 9); return { kind: "num", prompt: "Sachaufgabe", story: `In einer Packung sind ${a} Kekse. Wie viele Kekse sind in ${b} Packungen?`, unit: "Kekse", answer: a * b, explain: `${b} · ${a} = ${a * b}` }; }
      if (t === 3) { const b = R(3, 6), g = R(3, 8); return { kind: "num", prompt: "Sachaufgabe", story: `${b * g} Kinder bilden Gruppen mit je ${b} Kindern. Wie viele Gruppen gibt es?`, unit: "Gruppen", answer: g, explain: `${b * g} : ${b} = ${g}` }; }
      if (t === 4) { const a = R(2, 9), b = R(2, 6); return { kind: "num", prompt: "Sachaufgabe", story: `Ein Heft kostet ${a} €. ${w.n} kauft ${b} Hefte. Wie viel muss ${w.p} bezahlen?`, unit: "€", answer: a * b, explain: `${b} · ${a} € = ${a * b} €` }; }
      if (t === 5) { const a = R(150, 450), b = R(60, a - 60); return { kind: "num", prompt: "Sachaufgabe", story: `In der Schule sind ${a} Kinder. ${b} davon sind Mädchen. Wie viele Buben sind es?`, unit: "Buben", answer: a - b, explain: `${a} − ${b} = ${a - b}` }; }
      const a = R(2, 9), b = R(3, 10); return { kind: "num", prompt: "Sachaufgabe", story: `${w.n} spart jede Woche ${a} €. Wie viel Geld hat ${w.p} nach ${b} Wochen?`, unit: "€", answer: a * b, explain: `${b} · ${a} € = ${a * b} €` };
    }
  };

  /* ================= 4. Klasse Volksschule ================= */
  const VS4 = {
    plusschriftlich() {
      const a = R(1000, 60000), b = R(1000, 39999);
      return { kind: "num", prompt: "Rechne schriftlich:", big: `${fmt(a)} + ${fmt(b)}`, answer: a + b, explain: `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}` };
    },
    minusschriftlich() {
      const a = R(5000, 99999), b = R(1000, a - 500);
      return { kind: "num", prompt: "Rechne schriftlich:", big: `${fmt(a)} − ${fmt(b)}`, answer: a - b, explain: `${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}` };
    },
    mal() {
      let a, b;
      if (Math.random() < 0.6) { a = R(102, 999); b = R(3, 9); } else { a = R(21, 99); b = R(12, 39); }
      return { kind: "num", prompt: "Rechne schriftlich:", big: `${a} · ${b}`, answer: a * b, explain: `${a} · ${b} = ${fmt(a * b)}` };
    },
    division() {
      const b = R(2, 9), q = R(102, 999), a = b * q;
      return { kind: "num", prompt: "Rechne schriftlich:", big: `${fmt(a)} : ${b}`, answer: q, explain: `${fmt(a)} : ${b} = ${q}, Probe: ${q} · ${b} = ${fmt(a)}` };
    },
    runden() {
      const n = R(1001, 99999);
      const [p, name] = pick([[10, "Zehner"], [100, "Hunderter"], [1000, "Tausender"]]);
      const r = Math.round(n / p) * p;
      return { kind: "num", prompt: `Runde auf ${name}:`, big: fmt(n), answer: r, explain: `${fmt(n)} ≈ ${fmt(r)} (ab 5 wird aufgerundet)` };
    },
    gewichte() {
      const t = R(0, 3);
      if (t === 0) { const k = R(2, 9); return { kind: "num", prompt: "Wandle um:", big: `${k} kg = ? g`, unit: "g", answer: k * 1000, explain: `1 kg = 1000 g, also ${k} kg = ${fmt(k * 1000)} g` }; }
      if (t === 1) { const k = R(1, 5), g = R(1, 19) * 50; return { kind: "num", prompt: "Wandle um:", big: `${k} kg ${g} g = ? g`, unit: "g", answer: k * 1000 + g, explain: `${k} kg = ${fmt(k * 1000)} g, dazu ${g} g ergibt ${fmt(k * 1000 + g)} g` }; }
      if (t === 2) { const tn = R(2, 9); return { kind: "num", prompt: "Wandle um:", big: `${tn} t = ? kg`, unit: "kg", answer: tn * 1000, explain: `1 t = 1000 kg, also ${tn} t = ${fmt(tn * 1000)} kg` }; }
      const g = R(2, 9) * 1000; return { kind: "num", prompt: "Wandle um:", big: `${fmt(g)} g = ? kg`, unit: "kg", answer: g / 1000, explain: `1000 g = 1 kg, also ${fmt(g)} g = ${g / 1000} kg` };
    },
    bruchteile() {
      const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 3], [2, 3], [1, 5], [1, 10], [1, 8]]);
      const whole = d * R(2, 15), part = (whole / d) * n;
      return { kind: "num", prompt: "Berechne:", big: `${fr(n, d)} von ${whole}`, answer: part, explain: `${whole} : ${d} = ${whole / d}${n > 1 ? `, mal ${n} = ${part}` : ""}` };
    },
    rechteck() {
      const a = R(3, 15), b = R(2, a);
      if (Math.random() < 0.5) return { kind: "num", prompt: "Berechne den Umfang:", story: `Ein Rechteck ist ${a} cm lang und ${b} cm breit.`, unit: "cm", answer: 2 * (a + b), explain: `u = 2 · (${a} + ${b}) = ${2 * (a + b)} cm` };
      return { kind: "num", prompt: "Berechne die Fläche:", story: `Ein Rechteck ist ${a} cm lang und ${b} cm breit.`, unit: "cm²", answer: a * b, explain: `A = ${a} · ${b} = ${a * b} cm²` };
    },
    zeitspanne() {
      const h = R(8, 18), m = R(0, 11) * 5, dur = R(5, 30) * 5; const e = h * 60 + m + dur;
      const what = pick(["Der Film", "Das Fußballspiel", "Der Ausflug", "Die Zugfahrt", "Das Konzert"]);
      return { kind: "num", prompt: "Wie viele Minuten dauert das?", story: `${what} beginnt um ${hm(h, m)} Uhr und endet um ${hm(Math.floor(e / 60), e % 60)} Uhr.`, unit: "min", answer: dur, explain: `Von ${hm(h, m)} bis ${hm(Math.floor(e / 60), e % 60)} Uhr sind es ${dur} Minuten${dur >= 60 ? ` (${Math.floor(dur / 60)} h ${dur % 60} min)` : ""}` };
    },
    sach4() {
      const w = who(), t = R(0, 7);
      if (t === 0) { const a = R(800, 2000), b = R(200, 500), c = R(50, 200); return { kind: "num", prompt: "Sachaufgabe", story: `Ein Bauer erntet ${fmt(a)} kg Äpfel. Er verkauft ${b} kg und verschenkt ${c} kg. Wie viele kg bleiben übrig?`, unit: "kg", answer: a - b - c, explain: `${fmt(a)} − ${b} − ${c} = ${fmt(a - b - c)}` }; }
      if (t === 1) { const a = R(5, 12), b = R(18, 28); return { kind: "num", prompt: "Sachaufgabe", story: `Ein Kinoeintritt kostet ${a} €. Eine Klasse mit ${b} Kindern geht ins Kino. Wie viel kostet das zusammen?`, unit: "€", answer: a * b, explain: `${b} · ${a} € = ${a * b} €` }; }
      if (t === 2) { const k = R(20, 150); return { kind: "num", prompt: "Sachaufgabe", story: `Eine Firma packt ${k * 6} Eier in Schachteln zu je 6 Stück. Wie viele Schachteln braucht sie?`, unit: "Schachteln", answer: k, explain: `${k * 6} : 6 = ${k}` }; }
      if (t === 3) { const a = R(2, 5), b = R(8, 25); return { kind: "num", prompt: "Sachaufgabe", story: `${w.n} kauft 3 Hefte zu je ${a} € und ein Buch um ${b} €. Wie viel bezahlt ${w.p} insgesamt?`, unit: "€", answer: 3 * a + b, explain: `3 · ${a} € + ${b} € = ${3 * a + b} €` }; }
      if (t === 4) { const a = R(20, 60), b = R(5, a - 5); return { kind: "num", prompt: "Sachaufgabe", story: `Eine Wanderung ist ${a} km lang. Am ersten Tag gehen sie ${b} km. Wie viele km fehlen noch?`, unit: "km", answer: a - b, explain: `${a} − ${b} = ${a - b}` }; }
      if (t === 5) { const a = R(250, 900), b = R(80, a - 20); return { kind: "num", prompt: "Sachaufgabe", story: `Ein Fahrrad kostet ${a} €. ${w.n} hat schon ${b} € gespart. Wie viel Geld fehlt noch?`, unit: "€", answer: a - b, explain: `${a} − ${b} = ${a - b}` }; }
      if (t === 6) { const a = R(120, 480), b = R(5, 7); return { kind: "num", prompt: "Sachaufgabe", story: `Eine Bäckerei backt jeden Tag ${a} Semmeln. Wie viele Semmeln sind das in ${b} Tagen?`, unit: "Semmeln", answer: a * b, explain: `${b} · ${a} = ${fmt(a * b)}` }; }
      const a = R(5000, 20000), b = R(500, 2000), c = R(200, 1500); return { kind: "num", prompt: "Sachaufgabe", story: `Im Stadion sitzen ${fmt(a)} Zuschauer. In der Pause gehen ${fmt(b)} nach Hause, ${fmt(c)} kommen neu dazu. Wie viele Zuschauer sind jetzt im Stadion?`, unit: "Zuschauer", answer: a - b + c, explain: `${fmt(a)} − ${fmt(b)} + ${fmt(c)} = ${fmt(a - b + c)}` };
    }
  };

  /* ================= 1. Klasse Mittelschule ================= */
  const RULES = {
    2: "Eine Zahl ist durch 2 teilbar, wenn die letzte Ziffer gerade ist.",
    3: "Eine Zahl ist durch 3 teilbar, wenn ihre Ziffernsumme durch 3 teilbar ist.",
    4: "Eine Zahl ist durch 4 teilbar, wenn die letzten zwei Ziffern eine durch 4 teilbare Zahl bilden.",
    5: "Eine Zahl ist durch 5 teilbar, wenn sie auf 0 oder 5 endet.",
    9: "Eine Zahl ist durch 9 teilbar, wenn ihre Ziffernsumme durch 9 teilbar ist.",
    10: "Eine Zahl ist durch 10 teilbar, wenn sie auf 0 endet."
  };
  const digitSum = (n) => String(n).split("").reduce((s, d) => s + +d, 0);

  const MS1 = {
    teilbar() {
      const d = pick([2, 3, 4, 5, 9, 10]);
      let n = R(100, 999);
      if (Math.random() < 0.5) n = d * R(Math.ceil(100 / d), Math.floor(999 / d));
      const yes = n % d === 0;
      const extra = d === 3 || d === 9 ? ` Ziffernsumme: ${digitSum(n)}.` : "";
      return { kind: "choice", prompt: "Teilbar oder nicht?", big: `Ist ${n} durch ${d} teilbar?`, options: ["Ja", "Nein"], answer: yes ? "Ja" : "Nein", explain: RULES[d] + extra + ` ${n} : ${d} = ${yes ? n / d : fmt(round(n / d, 2)) + "…"}` };
    },
    ggtkgv() {
      if (Math.random() < 0.5) {
        const g = R(2, 9); let x, y; do { x = R(2, 9); y = R(2, 9); } while (x === y || gcd(x, y) !== 1);
        const a = g * x, b = g * y;
        return { kind: "num", prompt: "Größter gemeinsamer Teiler:", big: `ggT(${a}, ${b})`, answer: g, explain: `${a} = ${g} · ${x}, ${b} = ${g} · ${y}, also ggT = ${g}` };
      }
      let a, b; do { a = R(2, 12); b = R(2, 12); } while (a === b);
      const l = lcm(a, b);
      return { kind: "num", prompt: "Kleinstes gemeinsames Vielfaches:", big: `kgV(${a}, ${b})`, answer: l, explain: `Die kleinste Zahl, die durch ${a} und ${b} teilbar ist, ist ${l}` };
    },
    rechenregeln() {
      const t = R(0, 3);
      if (t === 0) { const a = R(2, 20), b = R(2, 9), c = R(2, 9); return { kind: "num", prompt: "Punkt vor Strich:", big: `${a} + ${b} · ${c}`, answer: a + b * c, explain: `Zuerst ${b} · ${c} = ${b * c}, dann ${a} + ${b * c} = ${a + b * c}` }; }
      if (t === 1) { const a = R(2, 12), b = R(2, 12), c = R(2, 9); return { kind: "num", prompt: "Klammer zuerst:", big: `(${a} + ${b}) · ${c}`, answer: (a + b) * c, explain: `Zuerst ${a} + ${b} = ${a + b}, dann ${a + b} · ${c} = ${(a + b) * c}` }; }
      if (t === 2) { let a, b, c, d; do { a = R(3, 12); b = R(3, 12); c = R(2, 9); d = R(2, 9); } while (a * b <= c * d); return { kind: "num", prompt: "Punkt vor Strich:", big: `${a} · ${b} − ${c} · ${d}`, answer: a * b - c * d, explain: `${a * b} − ${c * d} = ${a * b - c * d}` }; }
      const c = R(2, 9), q = R(2, 9), a = R(q + 1, 60); return { kind: "num", prompt: "Punkt vor Strich:", big: `${a} − ${c * q} : ${c}`, answer: a - q, explain: `Zuerst ${c * q} : ${c} = ${q}, dann ${a} − ${q} = ${a - q}` };
    },
    dezimal() {
      const t = R(0, 3);
      if (t === 0) { const a = R(105, 9999) / 100, b = R(105, 4999) / 100; return { kind: "num", prompt: "Rechne:", big: `${fmt(a, 2)} + ${fmt(b, 2)}`, answer: round(a + b, 2), explain: `${fmt(a, 2)} + ${fmt(b, 2)} = ${fmt(round(a + b, 2), 2)}` }; }
      if (t === 1) { const a = R(500, 9999) / 100, b = R(105, Math.round(a * 100) - 5) / 100; return { kind: "num", prompt: "Rechne:", big: `${fmt(a, 2)} − ${fmt(b, 2)}`, answer: round(a - b, 2), explain: `${fmt(a, 2)} − ${fmt(b, 2)} = ${fmt(round(a - b, 2), 2)}` }; }
      if (t === 2) { const a = R(11, 999) / 100, f = pick([10, 100, 1000]); return { kind: "num", prompt: "Rechne:", big: `${fmt(a)} · ${f}`, answer: round(a * f), explain: `Mal ${f}: Komma um ${String(f).length - 1} Stelle${f > 10 ? "n" : ""} nach rechts, ${fmt(a)} · ${f} = ${fmt(round(a * f))}` }; }
      const a = R(11, 9999) / 10, f = pick([10, 100]); return { kind: "num", prompt: "Rechne:", big: `${fmt(a)} : ${f}`, answer: round(a / f), explain: `Durch ${f}: Komma um ${String(f).length - 1} Stelle${f > 10 ? "n" : ""} nach links, ${fmt(a)} : ${f} = ${fmt(round(a / f))}` };
    },
    kuerzen() {
      let n, d; do { d = R(2, 12); n = R(1, d - 1); } while (gcd(n, d) !== 1);
      const k = R(2, 9);
      return { kind: "frac", prompt: "Kürze so weit wie möglich:", big: fr(n * k, d * k), answer: [n, d], reduce: true, explain: `Zähler und Nenner durch ${k}: ${fr(n * k, d * k)} = ${fr(n, d)}` };
    },
    bruchdezimal() {
      if (Math.random() < 0.5) {
        const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [1, 20], [3, 20], [1, 25], [1, 8], [3, 8]]);
        return { kind: "num", prompt: "Schreib als Dezimalzahl:", big: fr(n, d), answer: round(n / d), explain: `${n} : ${d} = ${fmt(round(n / d))}` };
      }
      const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [1, 25]]);
      const dec = round(n / d);
      const places = String(dec).split(".")[1].length, base = 10 ** places, num = Math.round(dec * base);
      return { kind: "frac", prompt: "Schreib als gekürzten Bruch:", big: fmt(dec), answer: [n, d], reduce: true, explain: `${fmt(dec)} = ${fr(num, base)} = ${fr(n, d)}` };
    },
    flaechen() {
      const t = R(0, 3);
      if (t === 0) { const a = R(4, 25), b = R(2, a); return { kind: "num", prompt: "Berechne den Umfang:", story: `Ein Rechteck ist ${a} m lang und ${b} m breit.`, unit: "m", answer: 2 * (a + b), explain: `u = 2 · (${a} + ${b}) = ${2 * (a + b)} m` }; }
      if (t === 1) { const a = R(4, 25), b = R(2, a); return { kind: "num", prompt: "Berechne den Flächeninhalt:", story: `Ein Rechteck ist ${a} m lang und ${b} m breit.`, unit: "m²", answer: a * b, explain: `A = ${a} · ${b} = ${a * b} m²` }; }
      if (t === 2) { const a = R(3, 15); return { kind: "num", prompt: "Berechne den Flächeninhalt:", story: `Ein Quadrat hat die Seitenlänge ${a} cm.`, unit: "cm²", answer: a * a, explain: `A = ${a} · ${a} = ${a * a} cm²` }; }
      const a = R(3, 15), b = R(2, 12); return { kind: "num", prompt: "Wie breit ist das Rechteck?", story: `Ein Rechteck hat den Flächeninhalt ${a * b} cm² und ist ${a} cm lang.`, unit: "cm", answer: b, explain: `b = A : a = ${a * b} : ${a} = ${b} cm` };
    },
    einheiten() {
      const opts = [
        () => { const x = R(2, 9); return [`${x} m² = ? dm²`, "dm²", x * 100, "1 m² = 100 dm²"]; },
        () => { const x = R(2, 9); return [`${x} dm² = ? cm²`, "cm²", x * 100, "1 dm² = 100 cm²"]; },
        () => { const x = R(2, 9); return [`${x} m² = ? cm²`, "cm²", x * 10000, "1 m² = 10 000 cm²"]; },
        () => { const x = R(2, 9); return [`${x} ha = ? a`, "a", x * 100, "1 ha = 100 a"]; },
        () => { const x = R(2, 9); return [`${x} a = ? m²`, "m²", x * 100, "1 a = 100 m²"]; },
        () => { const x = R(2, 9) * 100; return [`${x} dm² = ? m²`, "m²", x / 100, "100 dm² = 1 m²"]; },
        () => { const x = R(2, 9); return [`${x} l = ? ml`, "ml", x * 1000, "1 l = 1000 ml"]; },
        () => { const x = R(2, 9); return [`${x} dm³ = ? l`, "l", x, "1 dm³ = 1 l"]; }
      ];
      const [big, unit, ans, rule] = pick(opts)();
      return { kind: "num", prompt: "Wandle um:", big, unit, answer: ans, explain: `${rule}, also ${big.replace("?", fmt(ans))}` };
    },
    quader() {
      if (Math.random() < 0.3) { const a = R(2, 10); return { kind: "num", prompt: "Berechne das Volumen:", story: `Ein Würfel hat die Kantenlänge ${a} cm.`, unit: "cm³", answer: a ** 3, explain: `V = ${a} · ${a} · ${a} = ${a ** 3} cm³` }; }
      const a = R(2, 12), b = R(2, 10), c = R(2, 8);
      return { kind: "num", prompt: "Berechne das Volumen:", story: `Ein Quader ist ${a} cm lang, ${b} cm breit und ${c} cm hoch.`, unit: "cm³", answer: a * b * c, explain: `V = ${a} · ${b} · ${c} = ${a * b * c} cm³` };
    },
    winkel() {
      if (Math.random() < 0.5) {
        const kinds = [["spitzer Winkel", () => R(5, 85)], ["rechter Winkel", () => 90], ["stumpfer Winkel", () => R(95, 175)], ["gestreckter Winkel", () => 180], ["erhabener Winkel", () => R(185, 355)]];
        const [name, f] = pick(kinds), a = f();
        const others = kinds.map((k) => k[0]).filter((k) => k !== name).sort(() => Math.random() - 0.5).slice(0, 3);
        return { kind: "choice", prompt: "Welche Winkelart ist das?", big: `α = ${a}°`, options: [name, ...others], answer: name, explain: "Spitz: unter 90°. Recht: genau 90°. Stumpf: zwischen 90° und 180°. Gestreckt: genau 180°. Erhaben: über 180°." };
      }
      const to = pick([90, 180]), a = R(5, to - 5);
      return { kind: "num", prompt: `Ergänze auf ${to}°:`, big: `${a}° + ? = ${to}°`, unit: "°", answer: to - a, explain: `${to}° − ${a}° = ${to - a}°` };
    }
  };

  /* ================= 2. Klasse Mittelschule ================= */
  function randFrac(maxD = 10) { let n, d; do { d = R(2, maxD); n = R(1, d - 1); } while (gcd(n, d) !== 1); return [n, d]; }
  const reduce = ([n, d]) => { const g = gcd(n, d); return [n / g, d / g]; };

  const MS2 = {
    bruchplus() {
      for (;;) {
        let [a, b] = randFrac(8), [c, d] = randFrac(8);
        const plus = Math.random() < 0.55;
        if (!plus && a / b < c / d) [a, b, c, d] = [c, d, a, b];
        const den = lcm(b, d), num = plus ? a * (den / b) + c * (den / d) : a * (den / b) - c * (den / d);
        if (num <= 0) continue;
        const [rn, rd] = reduce([num, den]);
        if (rd === 1) continue;
        return { kind: "frac", prompt: "Rechne und kürze:", big: `${fr(a, b)} ${plus ? "+" : "−"} ${fr(c, d)}`, answer: [rn, rd], reduce: true, explain: `Gemeinsamer Nenner ${den}: ${fr(a * den / b, den)} ${plus ? "+" : "−"} ${fr(c * den / d, den)} = ${fr(num, den)}${rn !== num ? " = " + fr(rn, rd) : ""}` };
      }
    },
    bruchmal() {
      for (;;) {
        const [a, b] = randFrac(9), [c, d] = randFrac(9);
        const mul = Math.random() < 0.55;
        const num = mul ? a * c : a * d, den = mul ? b * d : b * c;
        const [rn, rd] = reduce([num, den]);
        if (rd === 1) continue;
        return { kind: "frac", prompt: "Rechne und kürze:", big: `${fr(a, b)} ${mul ? "·" : ":"} ${fr(c, d)}`, answer: [rn, rd], reduce: true,
          explain: mul ? `Zähler mal Zähler, Nenner mal Nenner: ${fr(num, den)}${rn !== num ? " = " + fr(rn, rd) : ""}` : `Mit dem Kehrwert multiplizieren: ${fr(a, b)} · ${fr(d, c)} = ${fr(num, den)}${rn !== num ? " = " + fr(rn, rd) : ""}` };
      }
    },
    prozent() {
      const t = R(0, 2);
      if (t === 0) { const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]); const G = (100 / gcd(100, p)) * R(1, 12) * pick([1, 2, 5]); const W = (G * p) / 100; return { kind: "num", prompt: "Berechne:", big: `${p} % von ${fmt(G)} €`, unit: "€", answer: W, explain: `${fmt(G)} : 100 · ${p} = ${fmt(W)} €` }; }
      if (t === 1) { const p = pick([10, 20, 25, 40, 50, 60, 75, 80]); const G = pick([20, 40, 50, 80, 120, 200, 400]); const W = (G * p) / 100; if (!Number.isInteger(W)) return MS2.prozent(); return { kind: "num", prompt: "Wie viel Prozent sind das?", story: `${G} Kinder machen beim Schulfest mit. ${W} davon helfen beim Buffet.`, unit: "%", answer: p, explain: `${W} : ${G} = ${fmt(W / G)} = ${p} %` }; }
      const p = pick([10, 20, 25, 50]), W = R(2, 20) * (p === 25 ? 1 : 2);
      return { kind: "num", prompt: "Berechne den Grundwert:", story: `${p} % einer Summe sind ${W} €. Wie groß ist die ganze Summe?`, unit: "€", answer: (W * 100) / p, explain: `${W} € : ${p} · 100 = ${fmt((W * 100) / p)} €` };
    },
    direkt() {
      const item = pick([["Hefte", "kosten"], ["Kugelschreiber", "kosten"], ["Semmeln", "kosten"], ["Kinotickets", "kosten"]]);
      const unitC = R(3, 40) * 5; const a = R(2, 6); let b; do { b = R(2, 12); } while (b === a);
      const ta = (unitC * a) / 100, tb = (unitC * b) / 100;
      return { kind: "num", prompt: "Schlussrechnung", story: `${a} ${item[0]} ${item[1]} ${money(ta)} €. Wie viel kosten ${b} ${item[0]}?`, unit: "€", answer: round(tb, 2), explain: `1 Stück kostet ${money(ta)} : ${a} = ${money(unitC / 100)} €, ${b} Stück kosten ${b} · ${money(unitC / 100)} = ${money(tb)} €` };
    },
    indirekt() {
      for (;;) {
        const a = R(2, 8), t = R(2, 12), P = a * t;
        const divs = []; for (let i = 2; i <= 12; i++) if (P % i === 0 && i !== a && P / i >= 2) divs.push(i);
        if (!divs.length) continue;
        const b = pick(divs), tb = P / b;
        const [who2, what] = pick([["Maler", "eine Halle zu streichen"], ["Arbeiter", "eine Mauer zu bauen"], ["Bagger", "eine Baugrube auszuheben"]]);
        return { kind: "num", prompt: "Schlussrechnung (indirekt)", story: `${a} ${who2} brauchen ${t} Tage, um ${what}. Wie viele Tage brauchen ${b} ${who2} dafür?`, unit: "Tage", answer: tb, explain: `1 ${who2} bräuchte ${a} · ${t} = ${P} Tage, ${b} ${who2} brauchen ${P} : ${b} = ${tb} Tage` };
      }
    },
    gleichungen() {
      const t = R(0, 4), x = R(2, 15);
      if (t === 0) { const a = R(2, 30); return { kind: "num", prompt: "Löse die Gleichung:", big: `x + ${a} = ${x + a}`, unit: "", prefix: "x =", answer: x, explain: `x = ${x + a} − ${a} = ${x}` }; }
      if (t === 1) { const a = R(2, 30); return { kind: "num", prompt: "Löse die Gleichung:", big: `x − ${a} = ${x}`, prefix: "x =", answer: x + a, explain: `x = ${x} + ${a} = ${x + a}` }; }
      if (t === 2) { const a = R(2, 9); return { kind: "num", prompt: "Löse die Gleichung:", big: `${a} · x = ${a * x}`, prefix: "x =", answer: x, explain: `x = ${a * x} : ${a} = ${x}` }; }
      if (t === 3) { const a = R(2, 9), b = R(1, 20); return { kind: "num", prompt: "Löse die Gleichung:", big: `${a} · x + ${b} = ${a * x + b}`, prefix: "x =", answer: x, explain: `${a} · x = ${a * x + b} − ${b} = ${a * x}, x = ${a * x} : ${a} = ${x}` }; }
      const a = R(2, 9); return { kind: "num", prompt: "Löse die Gleichung:", big: `x : ${a} = ${x}`, prefix: "x =", answer: x * a, explain: `x = ${x} · ${a} = ${x * a}` };
    },
    dreieck() {
      const t = R(0, 2);
      if (t === 0) { const a = R(25, 100), b = R(20, 155 - a); return { kind: "num", prompt: "Berechne den dritten Winkel:", story: `In einem Dreieck ist α = ${a}° und β = ${b}°.`, prefix: "γ =", unit: "°", answer: 180 - a - b, explain: `Die Winkelsumme im Dreieck ist 180°: γ = 180° − ${a}° − ${b}° = ${180 - a - b}°` }; }
      if (t === 1) { let g, h; do { g = R(3, 16); h = R(2, 12); } while ((g * h) % 2); return { kind: "num", prompt: "Berechne den Flächeninhalt:", story: `Ein Dreieck hat die Grundlinie g = ${g} cm und die Höhe h = ${h} cm.`, unit: "cm²", answer: (g * h) / 2, explain: `A = g · h : 2 = ${g} · ${h} : 2 = ${(g * h) / 2} cm²` }; }
      const g = R(3, 15), h = R(2, 12);
      return { kind: "num", prompt: "Berechne den Flächeninhalt:", story: `Ein Parallelogramm hat die Grundlinie g = ${g} cm und die Höhe h = ${h} cm.`, unit: "cm²", answer: g * h, explain: `A = g · h = ${g} · ${h} = ${g * h} cm²` };
    }
  };

  /* ---------- Themenliste ---------- */
  const T = (key, name, short, colors, ring, gen) => ({ key, name, short, colors, ring, gen });
  const TOPICS = [
    T("plus1000", "Planet Plus bis 1000", "Plus", ["#FFE39A", "#E0961C"], false, VS3.plus1000),
    T("minus1000", "Planet Minus bis 1000", "Minus", ["#C9F2FF", "#2C93C9"], true, VS3.minus1000),
    T("einmaleins", "Planet Einmaleins", "Einmaleins", ["#FFC2D9", "#D13B7A"], false, VS3.einmaleins),
    T("geteilt", "Planet Geteilt", "Geteilt", ["#D9CCFF", "#6B47E8"], true, VS3.geteilt),
    T("ergaenzen", "Planet Ergänzen", "Ergänzen", ["#B8F2D0", "#1F9E63"], false, VS3.ergaenzen),
    T("laengen", "Planet Längen", "Längen", ["#FFD9A3", "#D9731F"], true, VS3.laengen),
    T("geld", "Planet Geld", "Geld", ["#FFF0A8", "#C9A10E"], false, VS3.geld),
    T("zeit", "Planet Uhr & Zeit", "Zeit", ["#BFF0FF", "#2B8FD6"], true, VS3.zeit),
    T("sach3", "Planet Sachaufgaben", "Sachaufg.", ["#FFB8E0", "#B03FC4"], false, VS3.sach3),

    T("plusschriftlich", "Planet Schriftlich Plus", "Plus", ["#FFE39A", "#E0961C"], false, VS4.plusschriftlich),
    T("minusschriftlich", "Planet Schriftlich Minus", "Minus", ["#C9F2FF", "#2C93C9"], true, VS4.minusschriftlich),
    T("mal", "Planet Malnehmen", "Mal", ["#FFC2D9", "#D13B7A"], false, VS4.mal),
    T("division", "Planet Dividieren", "Dividieren", ["#D9CCFF", "#6B47E8"], true, VS4.division),
    T("runden", "Planet Runden", "Runden", ["#B8F2D0", "#1F9E63"], false, VS4.runden),
    T("gewichte", "Planet Gewichte", "Gewichte", ["#FFD9A3", "#D9731F"], true, VS4.gewichte),
    T("bruchteile", "Planet Bruchteile", "Bruchteile", ["#FFF0A8", "#C9A10E"], false, VS4.bruchteile),
    T("rechteck", "Planet Rechteck", "Rechteck", ["#BFF0FF", "#2B8FD6"], true, VS4.rechteck),
    T("zeitspanne", "Planet Zeitspannen", "Zeitspannen", ["#D4F5B0", "#4E9A2A"], false, VS4.zeitspanne),
    T("sach4", "Planet Sachaufgaben", "Sachaufg.", ["#FFB8E0", "#B03FC4"], true, VS4.sach4),

    T("teilbar", "Planet Teilbarkeit", "Teilbar", ["#FFE39A", "#E0961C"], false, MS1.teilbar),
    T("ggtkgv", "Planet ggT & kgV", "ggT/kgV", ["#C9F2FF", "#2C93C9"], true, MS1.ggtkgv),
    T("rechenregeln", "Planet Rechenregeln", "Regeln", ["#FFC2D9", "#D13B7A"], false, MS1.rechenregeln),
    T("dezimal", "Planet Dezimalzahlen", "Dezimal", ["#D9CCFF", "#6B47E8"], true, MS1.dezimal),
    T("kuerzen", "Planet Brüche kürzen", "Kürzen", ["#B8F2D0", "#1F9E63"], false, MS1.kuerzen),
    T("bruchdezimal", "Planet Bruch & Dezimal", "Bruch/Dez.", ["#FFD9A3", "#D9731F"], true, MS1.bruchdezimal),
    T("flaechen", "Planet Rechteck & Quadrat", "Flächen", ["#FFF0A8", "#C9A10E"], false, MS1.flaechen),
    T("einheiten", "Planet Maßeinheiten", "Einheiten", ["#BFF0FF", "#2B8FD6"], true, MS1.einheiten),
    T("quader", "Planet Quader & Würfel", "Quader", ["#D4F5B0", "#4E9A2A"], false, MS1.quader),
    T("winkel", "Planet Winkel", "Winkel", ["#FFB8E0", "#B03FC4"], true, MS1.winkel),

    T("bruchplus", "Planet Brüche plus & minus", "Brüche ±", ["#FFE39A", "#E0961C"], false, MS2.bruchplus),
    T("bruchmal", "Planet Brüche mal & durch", "Brüche ·:", ["#C9F2FF", "#2C93C9"], true, MS2.bruchmal),
    T("prozent", "Planet Prozent", "Prozent", ["#FFC2D9", "#D13B7A"], false, MS2.prozent),
    T("direkt", "Planet Schlussrechnung", "Direkt", ["#D9CCFF", "#6B47E8"], true, MS2.direkt),
    T("indirekt", "Planet Indirekt", "Indirekt", ["#B8F2D0", "#1F9E63"], false, MS2.indirekt),
    T("gleichungen", "Planet Gleichungen", "Gleichungen", ["#FFD9A3", "#D9731F"], true, MS2.gleichungen),
    T("dreieck", "Planet Dreieck", "Dreieck", ["#BFF0FF", "#2B8FD6"], false, MS2.dreieck)
  ];

  /* ---------- Antworten prüfen ---------- */
  // "1.250", "1 250", "3,5", "3.5" -> Zahl
  function parseNum(s) {
    let t = String(s || "").trim().replace(/[\s  ]/g, "").replace(/[€%°]/g, "").replace(/^−/, "-");
    if (!t) return NaN;
    if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, "");
    if (!/^-?\d+(\.\d+)?$/.test(t)) return NaN;
    return Number(t);
  }

  function check(task, input) {
    if (task.kind === "choice") return input === task.answer ? "ok" : "wrong";
    if (task.kind === "num") {
      const v = parseNum(input);
      if (Number.isNaN(v)) return "wrong";
      return Math.abs(v - task.answer) < 1e-6 ? "ok" : "wrong";
    }
    if (task.kind === "frac") {
      const n = parseNum(input[0]), d = parseNum(input[1]);
      if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) return "wrong";
      const [an, ad] = task.answer;
      if (n === an && d === ad) return "ok";
      if (n * ad === an * d) return task.reduce ? "close" : "ok"; // gleicher Wert, aber nicht gekürzt
      return "wrong";
    }
    if (task.kind === "time") {
      const h = parseNum(input[0]), m = parseNum(input[1]);
      return h === task.answer[0] && m === task.answer[1] ? "ok" : "wrong";
    }
    return "wrong";
  }

  function solutionText(task) {
    if (task.kind === "frac") return fr(task.answer[0], task.answer[1]);
    if (task.kind === "time") return hm(task.answer[0], task.answer[1]) + " Uhr";
    if (task.kind === "choice") return task.answer;
    const v = task.unit === "€" ? money(task.answer) : fmt(task.answer);
    return (task.prefix ? task.prefix + " " : "") + v + (task.unit ? (task.unit === "°" ? "" : " ") + task.unit : "");
  }

  root.WK_MATH = { topics: TOPICS, check, parseNum, fmt, solutionText, gcd };
})(typeof window !== "undefined" ? window : globalThis);
