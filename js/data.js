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
  ranks: ["Sternenkadett", "Raketenpilot", "Navigator", "Weltraumforscher", "Kapitän", "Kommandant", "Sternenlegende"]
};
