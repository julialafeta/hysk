// Editorial content for each person — poetic title, body essay, pull quote.
// Indexed by person.id. Tone: interpretative, curatorial, like a critic wrote it.

const EDITORIAL = {
  ad: {
    title: ["A Library", "Cooled by Its Stairwells"],
    location: "Nairobi, Kenya",
    date: "April 2026",
    category: "Architecture",
    handle: "@ada.mwangi",
    intro: "Ada Mwangi designs public buildings the way other architects design cathedrals — slowly, and with the assumption that the people inside them deserve to feel held. Her libraries in Eastleigh and Kibera are also cooling shelters, civic offices, places to sit through the worst hours of the afternoon. She does not call this climate work. She calls it the basic question of who a building is for.",
    pullQuote: "A staircase is the most underrated room in any building. It's where the building admits what it really thinks of you.",
    coda: "There is a measured patience in her drawings — the unhurried sense that a building, if it is honest, will outlast its first argument. She sketches in pencil. She uses the word dignity without irony.",
    credits: "Words: M. Vey · Photography: T. Okoth · Issue 04, 2026"
  },
  ki: {
    title: ["The Inside of", "a Piano Sounds Like Weather"],
    location: "Kyoto, Japan",
    date: "March 2026",
    category: "Sound",
    handle: "@k.ota.recordings",
    intro: "Kiyoshi Ota records the interiors of objects most people consider silent. Pianos in disuse. Industrial washing machines. The half-second a fluorescent tube takes to warm up. He releases an album every two or three years, in editions of 300 cassette tapes, which sell out before the second pressing finishes.",
    pullQuote: "I am not interested in beautiful sounds. I am interested in the moment a sound becomes a room.",
    coda: "Listening, with him, is not metaphor. It is a discipline practiced over decades, like calligraphy or fasting. His students learn to sit in a space for an hour before they touch a microphone.",
    credits: "Words: J. Okafor · Photography: M. Vey · Issue 04, 2026"
  },
  ma: {
    title: ["A Mystic Walks", "Into an English Sentence"],
    location: "Lisbon, Portugal",
    date: "February 2026",
    category: "Letters",
    handle: "@m.vey.translates",
    intro: "Margot Vey translates 17th-century Portuguese mystics into a plainspoken English that does not try to flatter the originals. Her Maria do Céu reads like a letter from your most observant friend. Her Antônio Vieira, like a sermon you almost agree with. She insists translation is a creative discipline, not a technical one, and she has the manuscripts to prove it.",
    pullQuote: "Translation is not a service. It is the most intimate form of reading there is.",
    coda: "She works from a small apartment above a bakery in Alfama. She does not own a printer. Her drafts circulate, in pencil, between four readers she trusts and no one else.",
    credits: "Words: P. Sundaram · Photography: H. Sveinn · Issue 04, 2026"
  }
};

// Default editorial used for any person.id not explicitly authored above.
// Keeps the page complete without inventing fake biography for everyone.
const EDITORIAL_DEFAULT = (person) => ({
  title: ["A Practice", "Built on Refusal"],
  location: "—",
  date: "Spring/Summer 2026",
  category: person.role,
  handle: `@${person.id}.indexoftaste`,
  intro: `${person.name} works in a register most contemporary practitioners would consider impractical. ${person.blurb} The result is not a portfolio so much as a position — held quietly, repeated for years, against the grain of an industry that would prefer faster work and louder claims.`,
  pullQuote: person.why,
  coda: "The discipline of doing one thing, slowly, in public, is harder than it looks. It is also, increasingly, the only kind of work that lasts.",
  credits: "Words: Editorial · Photography: Archive · Issue 04, 2026"
});

window.EDITORIAL = EDITORIAL;
window.EDITORIAL_DEFAULT = EDITORIAL_DEFAULT;
