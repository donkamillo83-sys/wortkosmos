/* Wortkosmos – Startwortschatz (1. Klasse Mittelschule, britisches Englisch)
   Jeder Planet ist eine Vokabelliste. Die Wörter können in der App bearbeitet werden. */
window.WK_DATA = {
  version: 1,
  planets: [
    {
      key: "schule", name: "Planet Schule", short: "Schule",
      colors: ["#8AF5E2", "#139C86"], ring: false,
      words: [
        ["hello", "Hallo"], ["goodbye", "Auf Wiedersehen"], ["please", "bitte"],
        ["thank you", "danke"], ["school", "Schule"], ["teacher", "Lehrer / Lehrerin"],
        ["book", "Buch"], ["pencil", "Bleistift"], ["pen", "Kugelschreiber / Füller"],
        ["rubber", "Radiergummi"], ["ruler", "Lineal"], ["schoolbag", "Schultasche"],
        ["classroom", "Klassenzimmer"], ["desk", "Schreibtisch / Pult"], ["chair", "Sessel / Stuhl"],
        ["board", "Tafel"], ["pupil", "Schüler / Schülerin"], ["homework", "Hausübung / Hausaufgabe"]
      ]
    },
    {
      key: "familie", name: "Planet Familie", short: "Familie",
      colors: ["#FFB3D3", "#D63B80"], ring: true,
      words: [
        ["family", "Familie"], ["mother", "Mutter"], ["father", "Vater"],
        ["parents", "Eltern"], ["sister", "Schwester"], ["brother", "Bruder"],
        ["grandma", "Oma"], ["grandpa", "Opa"], ["aunt", "Tante"], ["uncle", "Onkel"],
        ["cousin", "Cousin / Cousine"], ["baby", "Baby"], ["son", "Sohn"],
        ["daughter", "Tochter"], ["friend", "Freund / Freundin"], ["name", "Name"]
      ]
    },
    {
      key: "farben", name: "Planet Farben & Zahlen", short: "Farben",
      colors: ["#FFE39A", "#E0961C"], ring: false,
      words: [
        ["red", "rot"], ["blue", "blau"], ["green", "grün"], ["yellow", "gelb"],
        ["black", "schwarz"], ["white", "weiß"], ["orange", "orange"], ["pink", "rosa"],
        ["brown", "braun"], ["grey", "grau"], ["one", "eins"], ["two", "zwei"],
        ["three", "drei"], ["four", "vier"], ["five", "fünf"], ["six", "sechs"],
        ["seven", "sieben"], ["eight", "acht"], ["nine", "neun"], ["ten", "zehn"]
      ]
    },
    {
      key: "tiere", name: "Planet Tiere", short: "Tiere",
      colors: ["#B8F28A", "#3E9E2B"], ring: false,
      words: [
        ["dog", "Hund"], ["cat", "Katze"], ["bird", "Vogel"], ["fish", "Fisch"],
        ["horse", "Pferd"], ["mouse", "Maus"], ["rabbit", "Hase / Kaninchen"], ["cow", "Kuh"],
        ["pig", "Schwein"], ["sheep", "Schaf"], ["duck", "Ente"], ["lion", "Löwe"],
        ["elephant", "Elefant"], ["monkey", "Affe"], ["snake", "Schlange"], ["frog", "Frosch"]
      ]
    },
    {
      key: "essen", name: "Planet Essen", short: "Essen",
      colors: ["#C9B8FF", "#6B47E8"], ring: true,
      words: [
        ["apple", "Apfel"], ["banana", "Banane"], ["bread", "Brot"], ["cheese", "Käse"],
        ["milk", "Milch"], ["water", "Wasser"], ["juice", "Saft"], ["egg", "Ei"],
        ["butter", "Butter"], ["cake", "Kuchen"], ["chocolate", "Schokolade"],
        ["potato", "Kartoffel / Erdapfel"], ["tomato", "Tomate / Paradeiser"],
        ["breakfast", "Frühstück"], ["lunch", "Mittagessen"], ["dinner", "Abendessen"]
      ]
    },
    {
      key: "zuhause", name: "Planet Zuhause", short: "Zuhause",
      colors: ["#9FD8FF", "#2A73D9"], ring: false,
      words: [
        ["house", "Haus"], ["flat", "Wohnung"], ["room", "Zimmer"], ["kitchen", "Küche"],
        ["bathroom", "Badezimmer"], ["bedroom", "Schlafzimmer"], ["living room", "Wohnzimmer"],
        ["garden", "Garten"], ["door", "Tür"], ["window", "Fenster"], ["bed", "Bett"],
        ["table", "Tisch"], ["sofa", "Sofa"], ["lamp", "Lampe"], ["stairs", "Stiege / Treppe"]
      ]
    },
    {
      key: "koerper", name: "Planet Körper & Kleidung", short: "Körper",
      colors: ["#FFC4A3", "#E0603A"], ring: true,
      words: [
        ["head", "Kopf"], ["hand", "Hand"], ["foot", "Fuß"], ["eye", "Auge"],
        ["ear", "Ohr"], ["nose", "Nase"], ["mouth", "Mund"], ["arm", "Arm"],
        ["leg", "Bein"], ["hair", "Haare"], ["T-shirt", "T-Shirt"], ["trousers", "Hose"],
        ["shoes", "Schuhe"], ["jacket", "Jacke"], ["dress", "Kleid"], ["cap", "Kappe"]
      ]
    },
    {
      key: "zeit", name: "Planet Zeit", short: "Zeit",
      colors: ["#A3FFF0", "#1BA6B8"], ring: false,
      words: [
        ["Monday", "Montag"], ["Tuesday", "Dienstag"], ["Wednesday", "Mittwoch"],
        ["Thursday", "Donnerstag"], ["Friday", "Freitag"], ["Saturday", "Samstag"],
        ["Sunday", "Sonntag"], ["day", "Tag"], ["week", "Woche"], ["month", "Monat"],
        ["year", "Jahr"], ["today", "heute"], ["tomorrow", "morgen"], ["yesterday", "gestern"],
        ["morning", "Morgen / Vormittag"], ["evening", "Abend"]
      ]
    },
    {
      key: "abenteuer", name: "Planet Abenteuer", short: "Abenteuer",
      colors: ["#FFD36E", "#C23A9A"], ring: true,
      words: [
        ["to be", "sein"], ["to have", "haben"], ["to go", "gehen"], ["to play", "spielen"],
        ["to run", "laufen / rennen"], ["to read", "lesen"], ["to write", "schreiben"],
        ["to swim", "schwimmen"], ["to like", "mögen"], ["happy", "glücklich / froh"],
        ["sad", "traurig"], ["big", "groß"], ["small", "klein"], ["old", "alt"],
        ["new", "neu"], ["fast", "schnell"], ["what", "was"], ["where", "wo"],
        ["who", "wer"], ["why", "warum"], ["how", "wie"], ["I", "ich"], ["you", "du / ihr / Sie"],
        ["we", "wir"], ["they", "sie (Mehrzahl)"]
      ]
    },
    {
      key: "freizeit", name: "Planet Freizeit", short: "Freizeit",
      colors: ["#FFB8E0", "#B03FC4"], ring: false,
      words: [
        ["hobby", "Hobby"], ["football", "Fußball"], ["swimming", "Schwimmen"], ["music", "Musik"],
        ["guitar", "Gitarre"], ["piano", "Klavier"], ["film", "Film"], ["cinema", "Kino"],
        ["game", "Spiel"], ["to dance", "tanzen"], ["to ride a bike", "Rad fahren"], ["to draw", "zeichnen"],
        ["party", "Party / Feier"], ["weekend", "Wochenende"], ["holidays", "Ferien"], ["beach", "Strand"],
        ["team", "Mannschaft / Team"], ["free time", "Freizeit"]
      ]
    },
    {
      key: "stadt", name: "Planet Stadt & Reisen", short: "Stadt",
      colors: ["#C8D3E6", "#4B5E8C"], ring: true,
      words: [
        ["town", "Stadt"], ["street", "Straße"], ["shop", "Geschäft / Laden"], ["supermarket", "Supermarkt"],
        ["hospital", "Krankenhaus / Spital"], ["station", "Bahnhof"], ["train", "Zug"], ["plane", "Flugzeug"],
        ["ticket", "Fahrkarte / Ticket"], ["bridge", "Brücke"], ["church", "Kirche"], ["museum", "Museum"],
        ["park", "Park"], ["left", "links"], ["right", "rechts"], ["straight on", "geradeaus"],
        ["map", "Stadtplan / Landkarte"], ["suitcase", "Koffer"]
      ]
    },
    {
      key: "wetter", name: "Planet Wetter & Natur", short: "Wetter",
      colors: ["#BFF0FF", "#2B8FD6"], ring: false,
      words: [
        ["weather", "Wetter"], ["sun", "Sonne"], ["rain", "Regen"], ["snow", "Schnee"],
        ["wind", "Wind"], ["cloud", "Wolke"], ["sunny", "sonnig"], ["rainy", "regnerisch"],
        ["cloudy", "bewölkt"], ["windy", "windig"], ["hot", "heiß"], ["cold", "kalt"],
        ["thunderstorm", "Gewitter"], ["mountain", "Berg"], ["lake", "See"], ["river", "Fluss"],
        ["forest", "Wald"], ["sky", "Himmel"]
      ]
    },
    {
      key: "verben", name: "Planet Unregelmäßige Verben", short: "Verben",
      colors: ["#FFD9A3", "#D9731F"], ring: true,
      words: [
        ["went", "ging (go)"], ["saw", "sah (see)"], ["ate", "aß (eat)"], ["had", "hatte (have)"],
        ["was", "war (be)"], ["came", "kam (come)"], ["took", "nahm (take)"], ["gave", "gab (give)"],
        ["made", "machte (make)"], ["got", "bekam (get)"], ["said", "sagte (say)"], ["wrote", "schrieb (write)"],
        ["drank", "trank (drink)"], ["ran", "rannte (run)"], ["swam", "schwamm (swim)"], ["bought", "kaufte (buy)"],
        ["found", "fand (find)"], ["thought", "dachte (think)"], ["knew", "wusste (know)"], ["sang", "sang (sing)"]
      ]
    },
    {
      key: "berufe", name: "Planet Berufe", short: "Berufe",
      colors: ["#D4F5B0", "#4E9A2A"], ring: false,
      words: [
        ["job", "Beruf"], ["doctor", "Arzt / Ärztin"], ["nurse", "Krankenpfleger / Krankenpflegerin"],
        ["police officer", "Polizist / Polizistin"], ["firefighter", "Feuerwehrmann / Feuerwehrfrau"],
        ["cook", "Koch / Köchin"], ["baker", "Bäcker / Bäckerin"], ["farmer", "Bauer / Bäuerin"],
        ["mechanic", "Mechaniker / Mechanikerin"], ["shop assistant", "Verkäufer / Verkäuferin"],
        ["vet", "Tierarzt / Tierärztin"], ["pilot", "Pilot / Pilotin"], ["artist", "Künstler / Künstlerin"],
        ["office", "Büro"], ["to work", "arbeiten"], ["to earn", "verdienen"]
      ]
    }
  ],
  avatars: [
    { key: "teal", color: "#3EE6C8", name: "Türkis" },
    { key: "violet", color: "#8B6CFF", name: "Violett" },
    { key: "rose", color: "#FF6FAE", name: "Rosa" },
    { key: "gold", color: "#FFC94D", name: "Gold" },
    { key: "sky", color: "#5AB8FF", name: "Himmelblau" },
    { key: "lime", color: "#9BE15D", name: "Limette" }
  ],
  ranks: ["Sternenkadett", "Raketenpilot", "Navigator", "Weltraumforscher", "Kapitän", "Kommandant", "Sternenlegende"],

  grades: [
    { key: "vs3", label: "3. Klasse", school: "Volksschule" },
    { key: "vs4", label: "4. Klasse", school: "Volksschule" },
    { key: "ms1", label: "1. Klasse", school: "Mittelschule" },
    { key: "ms2", label: "2. Klasse", school: "Mittelschule" }
  ],

  subjects: [
    { key: "en", name: "Englisch", tag: "EN", color: "#3EE6C8" },
    { key: "de", name: "Deutsch", tag: "DE", color: "#FF6FAE" },
    { key: "ma", name: "Mathe", tag: "1+2", color: "#FFC94D" }
  ],

  /* Lernpfad je Klasse und Fach: die Reihenfolge der Planeten */
  paths: {
    vs3: {
      en: ["schule", "farben", "familie", "tiere", "koerper"],
      de: ["artikel", "wortarten3", "mehrzahl", "grossklein", "iei"],
      ma: ["plus1000", "minus1000", "einmaleins", "geteilt", "ergaenzen", "laengen", "geld", "zeit", "sach3"]
    },
    vs4: {
      en: ["farben", "familie", "tiere", "essen", "zuhause", "koerper", "zeit"],
      de: ["wortarten4", "praeteritum", "doppelt", "sssz", "steigern", "satzzeichen"],
      ma: ["plusschriftlich", "minusschriftlich", "mal", "division", "runden", "gewichte", "bruchteile", "rechteck", "zeitspanne", "sach4"]
    },
    ms1: {
      en: ["schule", "familie", "farben", "tiere", "essen", "zuhause", "koerper", "zeit", "abenteuer"],
      de: ["wortartenms", "zeitformen", "dasdass", "faelle", "nominal"],
      ma: ["teilbar", "ggtkgv", "rechenregeln", "dezimal", "kuerzen", "bruchdezimal", "flaechen", "einheiten", "quader", "winkel"]
    },
    ms2: {
      en: ["zeit", "abenteuer", "freizeit", "stadt", "wetter", "verben", "berufe"],
      de: ["satzglieder", "faelle", "aktivpassiv", "komma", "zeitbilden", "fremdwoerter"],
      ma: ["bruchplus", "bruchmal", "prozent", "direkt", "indirekt", "gleichungen", "dreieck"]
    }
  }
};
