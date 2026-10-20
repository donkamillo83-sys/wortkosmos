/* Wortkosmos – Deutsch-Aufgaben (österreichische Fachbegriffe)
   Schreibweisen in den Listen:
   {x}  = Lücke, x ist die richtige Lösung
   [x]  = markierter Satzteil, der bestimmt werden soll */
(function (root) {
  "use strict";

  const TOPICS = [
    /* ---------------- 3. Klasse Volksschule ---------------- */
    {
      key: "artikel", name: "Planet Artikel", short: "Artikel", colors: ["#FFC2D9", "#D13B7A"], ring: false,
      type: "article", prompt: "Welcher Artikel passt?",
      rule: "Probier es laut: der Hund, die Katze, das Haus.",
      items: ["der Hund", "die Katze", "das Haus", "der Baum", "die Blume", "das Auto", "der Tisch", "die Tür",
        "das Fenster", "der Apfel", "die Banane", "das Brot", "der Stuhl", "die Schule", "das Buch", "der Ball",
        "die Sonne", "das Pferd", "der Mond", "die Maus", "das Kind", "der Vogel", "die Lampe", "das Bett",
        "der Lehrer", "die Tasche", "das Heft", "der Schuh", "die Hose", "das Glas", "der Löffel", "die Gabel", "das Messer"]
    },
    {
      key: "wortarten3", name: "Planet Wortarten", short: "Wortarten", colors: ["#FFE0A8", "#E08A1E"], ring: true,
      type: "pick", prompt: "Welche Wortart ist das?", options: ["Nomen", "Verb", "Adjektiv"],
      rule: "Nomen sind Namen für Dinge, Menschen und Tiere. Verben sagen, was man tut. Adjektive sagen, wie etwas ist.",
      items: [["Hund", "Nomen"], ["laufen", "Verb"], ["schnell", "Adjektiv"], ["Tisch", "Nomen"], ["schreiben", "Verb"],
        ["rot", "Adjektiv"], ["Sonne", "Nomen"], ["spielen", "Verb"], ["groß", "Adjektiv"], ["Schule", "Nomen"],
        ["lachen", "Verb"], ["klein", "Adjektiv"], ["Apfel", "Nomen"], ["singen", "Verb"], ["laut", "Adjektiv"],
        ["Freund", "Nomen"], ["essen", "Verb"], ["müde", "Adjektiv"], ["Wasser", "Nomen"], ["malen", "Verb"],
        ["lustig", "Adjektiv"], ["Baum", "Nomen"], ["springen", "Verb"], ["kalt", "Adjektiv"], ["Haus", "Nomen"],
        ["lesen", "Verb"], ["warm", "Adjektiv"], ["Blume", "Nomen"], ["schwimmen", "Verb"], ["leise", "Adjektiv"]]
    },
    {
      key: "mehrzahl", name: "Planet Mehrzahl", short: "Mehrzahl", colors: ["#C9F2FF", "#2C93C9"], ring: false,
      type: "text", prompt: "Wie heißt die Mehrzahl?",
      rule: "Die Mehrzahl hat immer den Artikel „die“: der Hund – die Hunde.",
      items: [["der Hund", "die Hunde"], ["die Katze", "die Katzen"], ["das Haus", "die Häuser"], ["der Baum", "die Bäume"],
        ["die Blume", "die Blumen"], ["das Kind", "die Kinder"], ["der Apfel", "die Äpfel"], ["die Maus", "die Mäuse"],
        ["das Buch", "die Bücher"], ["der Vogel", "die Vögel"], ["die Hand", "die Hände"], ["das Auto", "die Autos"],
        ["der Stuhl", "die Stühle"], ["das Ei", "die Eier"], ["der Fuß", "die Füße"], ["die Nuss", "die Nüsse"],
        ["das Glas", "die Gläser"], ["der Ball", "die Bälle"], ["die Stadt", "die Städte"], ["das Bild", "die Bilder"],
        ["der Zahn", "die Zähne"], ["die Uhr", "die Uhren"], ["das Heft", "die Hefte"], ["der Schuh", "die Schuhe"],
        ["die Frau", "die Frauen"], ["der Mann", "die Männer"], ["das Bett", "die Betten"], ["der Fisch", "die Fische"]]
    },
    {
      key: "grossklein", name: "Planet Groß & klein", short: "Groß/klein", colors: ["#D9CCFF", "#6B47E8"], ring: true,
      type: "case", prompt: "Wie schreibt man das fehlende Wort?",
      rule: "Nomen schreibt man groß. Verben und Adjektive schreibt man klein.",
      items: ["Wir gehen in den {Wald}.", "Der Hund {bellt} laut.", "Am Morgen esse ich ein {Brot}.", "Mein Bruder ist sehr {groß}.",
        "Die {Katze} schläft auf dem Sofa.", "Ich {spiele} gern Fußball.", "Im {Sommer} ist es heiß.", "Das Wasser ist {kalt}.",
        "Lisa malt ein schönes {Bild}.", "Wir {fahren} mit dem Bus.", "Der {Lehrer} erklärt die Aufgabe.", "Die Blume ist {gelb}.",
        "Hast du meine {Tasche} gesehen?", "Morgen {gehen} wir schwimmen.", "Das {Fenster} ist offen.", "Der Kuchen schmeckt {süß}.",
        "Unsere {Oma} wohnt in Linz.", "Die Kinder {lachen} laut.", "Ich trinke ein Glas {Milch}.", "Der Weg ist {lang}."]
    },
    {
      key: "iei", name: "Planet ie oder i", short: "ie oder i", colors: ["#B8F2D0", "#1F9E63"], ring: false,
      type: "gap", prompt: "ie oder i?", options: ["ie", "i"], inWord: true,
      rule: "Hörst du ein langes i, schreibst du meistens „ie“. Ein kurzes i schreibst du mit „i“.",
      items: ["Das L{ie}d ist schön.", "Das K{i}nd lacht.", "Die W{ie}se ist grün.", "Der F{i}sch schwimmt.",
        "Die B{ie}ne summt.", "Das T{ie}r schläft.", "Ich b{i}n müde.", "Der W{i}nd weht.", "Wir sp{ie}len Ball.",
        "Das Z{ie}l ist nah.", "Der R{i}ng glänzt.", "Der D{ie}b läuft weg.", "Die M{i}lch ist kalt.",
        "Der Sp{ie}gel hängt an der Wand.", "Wir s{i}ngen ein Lied.", "Mein Kn{ie} tut weh.", "Der H{i}mmel ist blau.",
        "Ich fl{ie}ge nach Wien.", "Die K{i}rche ist alt.", "Der Br{ie}f ist da."]
    },

    /* ---------------- 4. Klasse Volksschule ---------------- */
    {
      key: "wortarten4", name: "Planet Wortarten", short: "Wortarten", colors: ["#FFE0A8", "#E08A1E"], ring: true,
      type: "mark", prompt: "Welche Wortart ist das markierte Wort?",
      options: ["Nomen", "Verb", "Adjektiv", "Artikel", "Pronomen"],
      rule: "Pronomen (ich, du, er, sie, es, wir, ihr) stehen für ein Nomen. Artikel (der, die, das, ein, eine) begleiten ein Nomen.",
      items: [["[Der] Hund bellt.", "Artikel"], ["Der Hund [bellt].", "Verb"], ["[Er] spielt im Garten.", "Pronomen"],
        ["Das Wetter ist [schön].", "Adjektiv"], ["Die [Kinder] lachen.", "Nomen"], ["[Wir] gehen nach Hause.", "Pronomen"],
        ["Ich trinke [einen] Saft.", "Artikel"], ["Das Auto fährt [schnell].", "Adjektiv"], ["Mama [kocht] Suppe.", "Verb"],
        ["Der [Ball] ist rund.", "Nomen"], ["[Sie] liest ein Buch.", "Pronomen"], ["Die Suppe ist [heiß].", "Adjektiv"],
        ["[Eine] Katze schläft.", "Artikel"], ["Wir [schwimmen] im See.", "Verb"], ["Der [Winter] ist kalt.", "Nomen"],
        ["Das Bild ist [bunt].", "Adjektiv"], ["Paul [schreibt] einen Brief.", "Verb"], ["[Das] Pferd frisst Heu.", "Artikel"],
        ["Die [Schule] beginnt um acht.", "Nomen"], ["[Ihr] seid lustig.", "Pronomen"], ["Der Tee ist [süß].", "Adjektiv"],
        ["Die Vögel [fliegen] weg.", "Verb"], ["Ich sehe [ein] Flugzeug.", "Artikel"], ["[Es] regnet schon wieder.", "Pronomen"]]
    },
    {
      key: "praeteritum", name: "Planet Mitvergangenheit", short: "Vergangen", colors: ["#C9F2FF", "#2C93C9"], ring: false,
      type: "text", prompt: "Setze in die Mitvergangenheit (Präteritum):", dropFirst: true,
      rule: "In der Mitvergangenheit erzählt man: ich gehe → ich ging, ich spiele → ich spielte.",
      items: [["ich gehe", "ich ging"], ["du spielst", "du spieltest"], ["er läuft", "er lief"], ["wir singen", "wir sangen"],
        ["sie lacht", "sie lachte"], ["ich schreibe", "ich schrieb"], ["ihr lest", "ihr last"], ["er isst", "er aß"],
        ["ich komme", "ich kam"], ["sie trinkt", "sie trank"], ["wir fahren", "wir fuhren"], ["du siehst", "du sahst"],
        ["es regnet", "es regnete"], ["ich bin", "ich war"], ["wir haben", "wir hatten"], ["er springt", "er sprang"],
        ["ich male", "ich malte"], ["sie schwimmt", "sie schwamm"], ["wir lernen", "wir lernten"], ["er findet", "er fand"],
        ["ich schlafe", "ich schlief"], ["du gibst", "du gabst"]]
    },
    {
      key: "doppelt", name: "Planet Doppelte Mitlaute", short: "Doppelt", colors: ["#D9CCFF", "#6B47E8"], ring: true,
      type: "spell", prompt: "Welches Wort ist richtig geschrieben?",
      rule: "Nach einem kurzen Selbstlaut wird der Mitlaut oft verdoppelt: Mutter, Sonne. Statt kk schreibt man ck, statt zz schreibt man tz.",
      items: [["Mutter", "Muter"], ["Sonne", "Sone"], ["Wasser", "Waser"], ["Himmel", "Himel"], ["Bett", "Bet"],
        ["Löffel", "Löfel"], ["Teller", "Teler"], ["Suppe", "Supe"], ["Schnecke", "Schneke"], ["Katze", "Kaze"],
        ["Zucker", "Zuker"], ["Brücke", "Brüke"], ["Mütze", "Müze"], ["Glocke", "Gloke"], ["Platz", "Plaz"],
        ["Ball", "Bal"], ["schwimmen", "schwimen"], ["kommen", "komen"], ["Hose", "Hosse"], ["Name", "Namme"],
        ["Tafel", "Taffel"], ["Blume", "Blumme"], ["Brot", "Brott"], ["Hut", "Hutt"]]
    },
    {
      key: "sssz", name: "Planet s, ss oder ß", short: "s/ss/ß", colors: ["#B8F2D0", "#1F9E63"], ring: false,
      type: "gap", prompt: "s, ss oder ß?", options: ["s", "ss", "ß"], inWord: true,
      rule: "ss steht nach einem kurzen Selbstlaut (Wasser). ß steht nach einem langen Selbstlaut oder ei, au, eu (Straße, heißen). Ein weiches, summendes s schreibt man mit s (Rose).",
      items: ["Der Fu{ß}ball rollt.", "Das Wa{ss}er ist warm.", "Die Stra{ß}e ist lang.", "Ich e{ss}e einen Apfel.",
        "Das Glas ist gro{ß}.", "Die Ro{s}e blüht.", "Der Bu{s} kommt.", "Die Nu{ss} ist hart.", "Wir mü{ss}en gehen.",
        "Der Ha{s}e hoppelt.", "Der Schlü{ss}el ist weg.", "Ich wei{ß} es nicht.", "Das Eis ist sü{ß}.", "Die Ta{ss}e ist voll.",
        "Das macht Spa{ß}.", "Die Ka{ss}e ist offen.", "Die Mau{s} piepst.", "Er hei{ß}t Max.", "Der Kä{s}e schmeckt gut.",
        "Das Schlo{ss} ist alt.", "Wir spielen drau{ß}en.", "Das Gra{s} ist grün."]
    },
    {
      key: "steigern", name: "Planet Steigern", short: "Steigern", colors: ["#FFC2D9", "#D13B7A"], ring: true,
      type: "steiger", prompt: "Steigere das Adjektiv:",
      rule: "Adjektive kann man steigern: groß – größer – am größten.",
      items: [["groß", "größer", "am größten"], ["klein", "kleiner", "am kleinsten"], ["schnell", "schneller", "am schnellsten"],
        ["alt", "älter", "am ältesten"], ["jung", "jünger", "am jüngsten"], ["warm", "wärmer", "am wärmsten"],
        ["kalt", "kälter", "am kältesten"], ["lang", "länger", "am längsten"], ["kurz", "kürzer", "am kürzesten"],
        ["hoch", "höher", "am höchsten"], ["gut", "besser", "am besten"], ["viel", "mehr", "am meisten"],
        ["schön", "schöner", "am schönsten"], ["laut", "lauter", "am lautesten"], ["stark", "stärker", "am stärksten"],
        ["dick", "dicker", "am dicksten"], ["nah", "näher", "am nächsten"], ["klug", "klüger", "am klügsten"],
        ["leise", "leiser", "am leisesten"], ["hell", "heller", "am hellsten"]]
    },
    {
      key: "satzzeichen", name: "Planet Satzzeichen", short: "Satzzeichen", colors: ["#FFF0A8", "#C9A10E"], ring: false,
      type: "gap", prompt: "Welches Satzzeichen fehlt?", options: [".", "?", "!"],
      rule: "Nach einer Frage steht ein Fragezeichen, nach einem Befehl oder Ausruf ein Rufzeichen, sonst ein Punkt.",
      items: ["Wie heißt du{?}", "Ich gehe heute in die Schule{.}", "Pass auf{!}", "Wo wohnst du{?}", "Der Himmel ist blau{.}",
        "Komm sofort her{!}", "Hast du Hunger{?}", "Wir spielen im Garten{.}", "Hilfe{!}", "Wann beginnt der Film{?}",
        "Mein Hund heißt Bello{.}", "Sei leise{!}", "Magst du Eis{?}", "Heute ist Montag{.}", "Hör auf{!}", "Warum lachst du{?}"]
    },

    /* ---------------- 1. Klasse Mittelschule ---------------- */
    {
      key: "wortartenms", name: "Planet Wortarten", short: "Wortarten", colors: ["#FFE0A8", "#E08A1E"], ring: true,
      type: "mark", prompt: "Welche Wortart ist das markierte Wort?",
      options: ["Nomen", "Verb", "Adjektiv", "Pronomen", "Präposition", "Konjunktion", "Artikel"],
      rule: "Präpositionen (auf, unter, mit, nach) zeigen ein Verhältnis an. Konjunktionen (und, aber, weil, dass) verbinden Wörter oder Sätze.",
      items: [["Der Hund schläft [unter] dem Tisch.", "Präposition"], ["Ich bleibe zu Hause, [weil] es regnet.", "Konjunktion"],
        ["[Wir] fahren morgen nach Graz.", "Pronomen"], ["Die [Freundschaft] ist wichtig.", "Nomen"],
        ["Das Konzert war [großartig].", "Adjektiv"], ["Lisa [versteckt] den Schlüssel.", "Verb"],
        ["Er wartet [auf] den Bus.", "Präposition"], ["Ich mag Äpfel [und] Birnen.", "Konjunktion"],
        ["[Die] Straße ist nass.", "Artikel"], ["Das Buch gehört [ihm].", "Pronomen"], ["Wir [besuchen] unsere Tante.", "Verb"],
        ["Sie kommt nicht, [denn] sie ist krank.", "Konjunktion"], ["Das [Lachen] steckt an.", "Nomen"],
        ["[Ein] Vogel singt.", "Artikel"], ["Ich gehe [mit] meiner Schwester.", "Präposition"],
        ["Er ist müde, [aber] glücklich.", "Konjunktion"], ["Das Wasser ist [eiskalt].", "Adjektiv"],
        ["[Unsere] Lehrerin ist nett.", "Pronomen"], ["Der Bäcker [backt] Brot.", "Verb"], ["Die [Ferien] beginnen bald.", "Nomen"],
        ["Wir spielen [nach] der Schule.", "Präposition"], ["Ich weiß, [dass] du recht hast.", "Konjunktion"],
        ["Hast [du] Zeit?", "Pronomen"], ["Das Kleid ist [teuer].", "Adjektiv"]]
    },
    {
      key: "zeitformen", name: "Planet Zeitformen", short: "Zeitformen", colors: ["#C9F2FF", "#2C93C9"], ring: false,
      type: "mark", prompt: "In welcher Zeitform steht der Satz?",
      options: ["Gegenwart", "Mitvergangenheit", "Vergangenheit", "Vorvergangenheit", "Zukunft"],
      rule: "Gegenwart: ich lese. Mitvergangenheit: ich las. Vergangenheit: ich habe gelesen. Vorvergangenheit: ich hatte gelesen. Zukunft: ich werde lesen.",
      items: [["Ich lese ein Buch.", "Gegenwart"], ["Wir gingen ins Kino.", "Mitvergangenheit"], ["Sie hat Fußball gespielt.", "Vergangenheit"],
        ["Er wird morgen kommen.", "Zukunft"], ["Ich hatte die Tür geschlossen.", "Vorvergangenheit"], ["Du schreibst einen Brief.", "Gegenwart"],
        ["Die Kinder lachten laut.", "Mitvergangenheit"], ["Wir sind nach Wien gefahren.", "Vergangenheit"], ["Ihr werdet das schaffen.", "Zukunft"],
        ["Sie war schon gegangen.", "Vorvergangenheit"], ["Der Hund bellt.", "Gegenwart"], ["Ich schlief lange.", "Mitvergangenheit"],
        ["Er hat seine Hausübung gemacht.", "Vergangenheit"], ["Es wird bald regnen.", "Zukunft"], ["Wir hatten den Bus verpasst.", "Vorvergangenheit"],
        ["Mama kocht das Mittagessen.", "Gegenwart"], ["Der Lehrer erklärte die Aufgabe.", "Mitvergangenheit"],
        ["Ich bin früh aufgestanden.", "Vergangenheit"], ["Morgen werden wir wandern.", "Zukunft"], ["Die Sonne war untergegangen.", "Vorvergangenheit"],
        ["Wir spielen Karten.", "Gegenwart"], ["Sie fuhr mit dem Rad.", "Mitvergangenheit"], ["Hast du das gesehen?", "Vergangenheit"]]
    },
    {
      key: "dasdass", name: "Planet das oder dass", short: "das/dass", colors: ["#D9CCFF", "#6B47E8"], ring: true,
      type: "gap", prompt: "das oder dass?", options: ["das", "dass"],
      rule: "Kannst du „dieses“ oder „welches“ einsetzen, schreibst du „das“. Sonst schreibst du „dass“.",
      items: ["Ich hoffe, {dass} du bald kommst.", "{Das} Buch ist spannend.", "Ich weiß, {dass} du recht hast.",
        "Das ist das Haus, {das} mir gefällt.", "Er sagt, {dass} es regnet.", "Siehst du {das} Pferd dort?",
        "Es ist wichtig, {dass} wir pünktlich sind.", "Das Kind, {das} dort spielt, ist mein Bruder.",
        "Ich glaube, {dass} morgen schulfrei ist.", "{Das} habe ich nicht gewusst.", "Sie freut sich, {dass} du da bist.",
        "Das Fahrrad, {das} im Hof steht, gehört mir.", "Wir wussten nicht, {dass} der Zug Verspätung hat.",
        "Hast du {das} gehört?", "Ich finde es toll, {dass} du hilfst.", "Das Lied, {das} sie singt, ist neu.",
        "Mama erlaubt, {dass} ich länger aufbleibe.", "Gib mir bitte {das} Heft.", "Er hofft, {dass} er gewinnt.",
        "Es stimmt, {dass} Wale Säugetiere sind.", "{Das} Wetter ist schön."]
    },
    {
      key: "faelle", name: "Planet Die vier Fälle", short: "Fälle", colors: ["#B8F2D0", "#1F9E63"], ring: false,
      type: "mark", prompt: "In welchem Fall steht der markierte Satzteil?",
      options: ["1. Fall (Nominativ)", "2. Fall (Genitiv)", "3. Fall (Dativ)", "4. Fall (Akkusativ)"],
      rule: "Frag: Wer oder was? (1. Fall) – Wessen? (2. Fall) – Wem? (3. Fall) – Wen oder was? (4. Fall)",
      items: [["[Der Hund] bellt.", "1. Fall (Nominativ)"], ["Ich sehe [den Hund].", "4. Fall (Akkusativ)"],
        ["Ich gebe [dem Hund] einen Knochen.", "3. Fall (Dativ)"], ["Das ist der Ball [des Hundes].", "2. Fall (Genitiv)"],
        ["[Meine Schwester] liest gern.", "1. Fall (Nominativ)"], ["Wir besuchen [unsere Oma].", "4. Fall (Akkusativ)"],
        ["Ich helfe [meinem Freund].", "3. Fall (Dativ)"], ["Das Auto [meines Vaters] ist blau.", "2. Fall (Genitiv)"],
        ["Er schenkt [der Lehrerin] Blumen.", "3. Fall (Dativ)"], ["Sie kauft [einen Apfel].", "4. Fall (Akkusativ)"],
        ["[Das Wetter] ist schön.", "1. Fall (Nominativ)"], ["Die Farbe [des Himmels] ist blau.", "2. Fall (Genitiv)"],
        ["Ich schreibe [meiner Tante] einen Brief.", "3. Fall (Dativ)"], ["Wir suchen [den Schlüssel].", "4. Fall (Akkusativ)"],
        ["[Die Kinder] spielen im Hof.", "1. Fall (Nominativ)"], ["Das Fell [der Katze] ist weich.", "2. Fall (Genitiv)"],
        ["Der Arzt hilft [dem Patienten].", "3. Fall (Dativ)"], ["Ich höre [die Musik].", "4. Fall (Akkusativ)"],
        ["[Ein Vogel] sitzt auf dem Dach.", "1. Fall (Nominativ)"], ["Das Ende [des Films] war spannend.", "2. Fall (Genitiv)"],
        ["Das Buch gehört [dem Mädchen].", "3. Fall (Dativ)"], ["Er trinkt [ein Glas Milch].", "4. Fall (Akkusativ)"],
        ["[Unser Lehrer] ist streng.", "1. Fall (Nominativ)"], ["Wir danken [unseren Eltern].", "3. Fall (Dativ)"]]
    },
    {
      key: "nominal", name: "Planet Groß oder klein", short: "Groß/klein", colors: ["#FFC2D9", "#D13B7A"], ring: true,
      type: "case", prompt: "Wie schreibt man das fehlende Wort?",
      rule: "Steht vor einem Verb oder Adjektiv ein Begleiter (das, beim, zum, im) oder ein Mengenwort (etwas, nichts, viel, alles), wird es zum Nomen und groß geschrieben.",
      items: ["Beim {Laufen} wird mir warm.", "Wir {laufen} um den See.", "Das {Schwimmen} macht Spaß.", "Ich wünsche dir alles {Gute}.",
        "Er hat etwas {Neues} gelernt.", "Das Auto ist {neu}.", "Zum {Lesen} brauche ich eine Brille.", "Sie kann gut {lesen}.",
        "Im {Dunkeln} sehe ich nichts.", "Es wird schon {dunkel}.", "Ich habe nichts {Besonderes} erlebt.", "Das war {besonders} schön.",
        "Vom vielen {Reden} bin ich müde.", "Wir müssen leise {reden}.", "Am {Morgen} frühstücke ich.", "Ich stehe {morgens} früh auf.",
        "Das {Beste} kommt zum Schluss.", "Viel {Glück} beim Test!", "Beim {Essen} spricht man nicht.", "Wir {essen} um zwölf.",
        "Ich freue mich aufs {Wandern}."]
    },

    /* ---------------- 2. Klasse Mittelschule ---------------- */
    {
      key: "satzglieder", name: "Planet Satzglieder", short: "Satzglieder", colors: ["#FFE0A8", "#E08A1E"], ring: true,
      type: "mark", prompt: "Welches Satzglied ist markiert?",
      options: ["Subjekt", "Prädikat", "Dativobjekt", "Akkusativobjekt", "Adverbiale Bestimmung"],
      rule: "Subjekt: Wer oder was? Prädikat: Was tut jemand? Dativobjekt: Wem? Akkusativobjekt: Wen oder was? Adverbiale Bestimmung: Wo? Wann? Wie? Warum?",
      items: [["[Der Bäcker] backt frisches Brot.", "Subjekt"], ["Der Bäcker [backt] frisches Brot.", "Prädikat"],
        ["Der Bäcker backt [frisches Brot].", "Akkusativobjekt"], ["Ich schenke [meiner Mutter] Blumen.", "Dativobjekt"],
        ["Wir treffen uns [im Park].", "Adverbiale Bestimmung"], ["[Am Montag] schreiben wir eine Schularbeit.", "Adverbiale Bestimmung"],
        ["[Meine Freundin] wohnt in Salzburg.", "Subjekt"], ["Die Kinder [spielen] Fußball.", "Prädikat"],
        ["Er liest [einen Comic].", "Akkusativobjekt"], ["Sie hilft [ihrem Bruder].", "Dativobjekt"],
        ["[Wegen des Regens] bleiben wir zu Hause.", "Adverbiale Bestimmung"], ["Der Hund [rennt] über die Wiese.", "Prädikat"],
        ["Die Lehrerin gibt [den Schülern] die Hefte.", "Dativobjekt"], ["Die Lehrerin gibt den Schülern [die Hefte].", "Akkusativobjekt"],
        ["[Das Konzert] beginnt um acht.", "Subjekt"], ["Opa [erzählt] eine Geschichte.", "Prädikat"], ["Ich esse [eine Banane].", "Akkusativobjekt"],
        ["Der Kellner bringt [dem Gast] die Suppe.", "Dativobjekt"], ["[Alle Kinder] freuen sich auf die Ferien.", "Subjekt"],
        ["Die Katze schläft [auf dem Sofa].", "Adverbiale Bestimmung"], ["Er läuft [sehr schnell].", "Adverbiale Bestimmung"]]
    },
    {
      key: "aktivpassiv", name: "Planet Aktiv & Passiv", short: "Aktiv/Passiv", colors: ["#C9F2FF", "#2C93C9"], ring: false,
      type: "mark", prompt: "Steht der Satz im Aktiv oder im Passiv?", options: ["Aktiv", "Passiv"],
      rule: "Im Aktiv tut jemand etwas (Oma füttert den Hund). Im Passiv wird etwas getan, gebildet mit „werden“ (Der Hund wird gefüttert).",
      items: [["Der Koch bereitet das Essen zu.", "Aktiv"], ["Das Essen wird vom Koch zubereitet.", "Passiv"],
        ["Die Kinder bauen eine Sandburg.", "Aktiv"], ["Die Sandburg wird von den Kindern gebaut.", "Passiv"],
        ["Das Haus wurde 1920 gebaut.", "Passiv"], ["Der Postbote bringt die Briefe.", "Aktiv"], ["Die Briefe werden gebracht.", "Passiv"],
        ["Der Lehrer korrigiert die Tests.", "Aktiv"], ["Die Tests wurden korrigiert.", "Passiv"], ["Der Hund wird gefüttert.", "Passiv"],
        ["Oma füttert den Hund.", "Aktiv"], ["Das Fenster wird geöffnet.", "Passiv"], ["Wir öffnen das Fenster.", "Aktiv"],
        ["Der Rasen wurde gemäht.", "Passiv"], ["Papa mäht den Rasen.", "Aktiv"], ["Das Spiel wird abgesagt.", "Passiv"],
        ["Der Schiedsrichter pfeift das Spiel an.", "Aktiv"], ["Die Bücher werden gelesen.", "Passiv"], ["Sie liest viele Bücher.", "Aktiv"],
        ["Der Dieb wurde gefasst.", "Passiv"]]
    },
    {
      key: "komma", name: "Planet Komma", short: "Komma", colors: ["#D9CCFF", "#6B47E8"], ring: true,
      type: "gap", prompt: "Gehört an die Lücke ein Komma?", options: ["Komma", "kein Komma"], marks: { ",": "Komma", "": "kein Komma" },
      rule: "Vor Bindewörtern wie dass, weil, wenn, ob, obwohl und aber steht ein Komma. Vor „und“ und „oder“ steht meistens keines.",
      items: ["Ich glaube{,} dass es morgen regnet.", "Wir gehen ins Kino{} und essen Popcorn.", "Er kommt nicht{,} weil er krank ist.",
        "Ich kaufe Äpfel{,} Birnen und Bananen.", "Sie lacht{} und tanzt.", "Als es dunkel wurde{,} gingen wir heim.",
        "Wenn du willst{,} komme ich mit.", "Ich weiß nicht{,} ob er kommt.", "Wir spielen Fußball{} oder Volleyball.",
        "Mama sagt{,} dass wir leise sein sollen.", "Ich gehe heute früh{} ins Bett.", "Obwohl es kalt ist{,} gehen wir schwimmen.",
        "Sie fragt{,} wann der Zug fährt.", "Er isst einen Apfel{} und eine Banane.", "Ich habe Hunger{,} aber kein Geld.",
        "Komm bitte schnell{,} sonst verpassen wir den Bus.", "Wir fahren morgen{} nach Salzburg.", "Max{,} komm bitte her!",
        "Nach der Schule{} gehe ich nach Hause."]
    },
    {
      key: "zeitbilden", name: "Planet Zeitformen bilden", short: "Zeiten", colors: ["#B8F2D0", "#1F9E63"], ring: false,
      type: "transform",
      rule: "Vergangenheit (Perfekt) bildest du mit „haben“ oder „sein“ und dem Mittelwort: ich habe gespielt, ich bin gefahren. Zukunft bildest du mit „werden“: ich werde lernen.",
      items: [["Setze in die Vergangenheit (Perfekt):", "Ich spiele Fußball.", "Ich habe Fußball gespielt."],
        ["Setze in die Vergangenheit (Perfekt):", "Wir fahren nach Wien.", "Wir sind nach Wien gefahren."],
        ["Setze in die Vergangenheit (Perfekt):", "Er liest ein Buch.", "Er hat ein Buch gelesen."],
        ["Setze in die Vergangenheit (Perfekt):", "Sie schwimmt im See.", "Sie ist im See geschwommen."],
        ["Setze in die Vergangenheit (Perfekt):", "Du schreibst einen Brief.", "Du hast einen Brief geschrieben."],
        ["Setze in die Vergangenheit (Perfekt):", "Ihr esst Pizza.", "Ihr habt Pizza gegessen."],
        ["Setze in die Vergangenheit (Perfekt):", "Ich komme spät.", "Ich bin spät gekommen."],
        ["Setze in die Vergangenheit (Perfekt):", "Wir trinken Tee.", "Wir haben Tee getrunken."],
        ["Setze in die Vergangenheit (Perfekt):", "Er läuft schnell.", "Er ist schnell gelaufen."],
        ["Setze in die Vergangenheit (Perfekt):", "Ich finde den Schlüssel.", "Ich habe den Schlüssel gefunden."],
        ["Setze in die Vergangenheit (Perfekt):", "Wir gehen ins Kino.", "Wir sind ins Kino gegangen."],
        ["Setze in die Vergangenheit (Perfekt):", "Ich vergesse das Heft.", "Ich habe das Heft vergessen."],
        ["Setze in die Zukunft (Futur):", "Ich lerne Vokabeln.", "Ich werde Vokabeln lernen."],
        ["Setze in die Zukunft (Futur):", "Wir besuchen Oma.", "Wir werden Oma besuchen."],
        ["Setze in die Zukunft (Futur):", "Es schneit.", "Es wird schneien."],
        ["Setze in die Zukunft (Futur):", "Du gewinnst das Spiel.", "Du wirst das Spiel gewinnen."]]
    },
    {
      key: "fremdwoerter", name: "Planet Fremdwörter", short: "Fremdwörter", colors: ["#FFF0A8", "#C9A10E"], ring: true,
      type: "spell", prompt: "Welches Wort ist richtig geschrieben?",
      rule: "Fremdwörter kommen oft aus dem Griechischen, Lateinischen, Englischen oder Französischen und behalten ihre Schreibweise: ph, th, rh, y.",
      items: [["Rhythmus", "Rythmus"], ["Theater", "Teater"], ["Physik", "Fysik"], ["Restaurant", "Restorant"],
        ["Interesse", "Interresse"], ["Maschine", "Maschiene"], ["Garage", "Garasche"], ["Biologie", "Biologi"],
        ["Bibliothek", "Bibliotek"], ["Mathematik", "Matematik"], ["Diskussion", "Diskusion"], ["Information", "Informazion"],
        ["Chaos", "Kaos"], ["Strategie", "Strategi"], ["Atmosphäre", "Atmosfäre"], ["Temperatur", "Temparatur"],
        ["Medizin", "Medizien"], ["Thermometer", "Termometer"], ["Ingenieur", "Inschenör"], ["Training", "Träning"],
        ["Toilette", "Toalette"], ["Computer", "Kompjuter"]]
    }
  ];

  /* ---------- Aufgaben aus den Listen bauen ---------- */
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const isCap = (s) => s && s.charAt(0) !== s.charAt(0).toLowerCase();

  function splitGap(sentence) {
    const m = sentence.match(/^(.*?)\{(.*?)\}(.*)$/);
    return m ? { pre: m[1], mid: m[2], post: m[3] } : { pre: sentence, mid: "", post: "" };
  }
  function splitMark(sentence) {
    const m = sentence.match(/^(.*?)\[(.*?)\](.*)$/);
    return m ? { pre: m[1], mid: m[2], post: m[3] } : { pre: sentence, mid: "", post: "" };
  }

  function build(t) {
    return t.items.map((it, i) => {
      const id = "i" + i;
      const base = { id, lang: "de", prompt: t.prompt };
      switch (t.type) {
        case "article": {
          const [art, ...rest] = it.split(" ");
          return Object.assign(base, { mode: "choice", show: { pre: rest.join(" "), style: "plain" }, options: ["der", "die", "das"], answer: art, solution: it });
        }
        case "pick":
          return Object.assign(base, { mode: "choice", show: { pre: it[0], style: "plain" }, options: t.options, answer: it[1], solution: it[0] + " → " + it[1] });
        case "text": {
          const answers = [it[1]];
          if (t.dropFirst) answers.push(it[1].split(" ").slice(1).join(" "));
          if (/^die /.test(it[1])) answers.push(it[1].slice(4));
          return Object.assign(base, { mode: "text", show: { pre: it[0], style: "plain" }, answers, answer: it[1], solution: it[0] + " → " + it[1] });
        }
        case "transform":
          return Object.assign(base, { mode: "text", prompt: it[0], show: { pre: it[1], style: "sentence" }, answers: [it[2]], answer: it[2], solution: it[2] });
        case "steiger": {
          const askSup = i % 2 === 1;
          return Object.assign(base, {
            mode: "text",
            show: { pre: askSup ? `${it[0]} → ${it[1]} → …` : `${it[0]} → …`, style: "plain" },
            answers: askSup ? [it[2], it[2].replace(/^am /, "")] : [it[1]],
            answer: askSup ? it[2] : it[1],
            solution: it.join(" – ")
          });
        }
        case "spell":
          return Object.assign(base, { mode: "choice", show: { style: "none" }, options: [it[0], it[1]], answer: it[0], solution: it[0] });
        case "case": {
          const g = splitGap(it);
          const other = isCap(g.mid) ? low(g.mid) : cap(g.mid);
          return Object.assign(base, { mode: "choice", show: { pre: g.pre, post: g.post, style: "gap" }, options: [g.mid, other], answer: g.mid, solution: g.pre + g.mid + g.post });
        }
        case "gap": {
          const g = splitGap(it);
          let answer = g.mid, options = t.options.slice();
          if (t.marks) answer = t.marks[g.mid];
          else if (!t.inWord && isCap(g.mid)) options = options.map(cap);
          const full = g.pre + g.mid + g.post;
          return Object.assign(base, { mode: "choice", show: { pre: g.pre, post: g.post, style: t.inWord ? "gapword" : "gap" }, options, answer, solution: full });
        }
        case "mark": {
          const m = splitMark(it[0]);
          return Object.assign(base, { mode: "choice", show: { pre: m.pre, mid: m.mid, post: m.post, style: m.mid ? "mark" : "sentence" }, options: t.options, answer: it[1], solution: it[1] });
        }
      }
      return null;
    }).filter(Boolean);
  }

  const cache = {};
  root.WK_DE = {
    topics: TOPICS,
    items(t) { if (!cache[t.key]) cache[t.key] = build(t); return cache[t.key]; }
  };
})(typeof window !== "undefined" ? window : globalThis);
