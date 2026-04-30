// 12 curated figures — abstract silhouettes (placeholders for real cut-out photography).
// Each has distinct proportions, palette, and silhouette cues to read as a directory of personalities.

const PEOPLE = [
  {
    id: "ad",
    name: "Ada Mwangi",
    role: "Architect, Nairobi",
    blurb: "Builds public libraries that double as cooling shelters. Treats stairwells like cathedrals.",
    why: "Reframing climate adaptation as civic dignity — not survivalism.",
    height: 360,
    palette: { coat: "#1a1a1a", inner: "#F4F0E8", pants: "#1a1a1a", skin: "#C49A7B", hair: "#0e0e0e" },
    silhouette: "long-coat",
    propProp: "tube"
  },
  {
    id: "ki",
    name: "Kiyoshi Ota",
    role: "Sound designer",
    blurb: "Records the inside of pianos, washing machines, abandoned malls.",
    why: "Listening as a discipline. He's why your favorite films feel haunted.",
    height: 340,
    palette: { coat: "#8a7a5e", inner: "#d9cdb6", pants: "#2b2b2b", skin: "#D6B89A", hair: "#1a1a1a" },
    silhouette: "puffer",
    propProp: "headphones"
  },
  {
    id: "ma",
    name: "Margot Vey",
    role: "Translator",
    blurb: "Renders 17th-century Portuguese mystics into plainspoken English.",
    why: "Proof that translation is a creative art, not a service.",
    height: 348,
    palette: { coat: "#b85a3a", inner: "#F4F0E8", pants: "#3a2a1a", skin: "#E6C9B0", hair: "#7a3a1a" },
    silhouette: "trench",
    propProp: "book"
  },
  {
    id: "no",
    name: "Noor Bakhash",
    role: "Cosmologist",
    blurb: "Studies dark matter halos. Writes the field's funniest papers.",
    why: "Argues that wonder is a methodology.",
    height: 372,
    palette: { coat: "#0a3a4a", inner: "#e6e0d0", pants: "#0a3a4a", skin: "#B89070", hair: "#0a0a0a" },
    silhouette: "long-coat",
    propProp: "tube"
  },
  {
    id: "te",
    name: "Tendai Mokoena",
    role: "Choreographer",
    blurb: "Stages dances inside grocery stores, parking garages, glass elevators.",
    why: "Made site-specific work feel urgent again after a decade of indifference.",
    height: 354,
    palette: { coat: "#d9b84a", inner: "#1a1a1a", pants: "#1a1a1a", skin: "#8A6448", hair: "#0a0a0a" },
    silhouette: "boxy",
    propProp: "bag"
  },
  {
    id: "el",
    name: "Elin Hägg",
    role: "Type designer",
    blurb: "Drew the typeface you're reading right now in your head.",
    why: "Considers letterforms ethical objects. She's right.",
    height: 338,
    palette: { coat: "#F4F0E8", inner: "#F4F0E8", pants: "#0e0e0e", skin: "#E8CDB6", hair: "#d4a050" },
    silhouette: "knit",
    propProp: "none"
  },
  {
    id: "ja",
    name: "Jamal Okafor",
    role: "Public defender",
    blurb: "Argues sentencing reform in three states. Quietly, repeatedly wins.",
    why: "Justice work without the brand. The opposite of a TED talk.",
    height: 366,
    palette: { coat: "#2a2a3a", inner: "#F4F0E8", pants: "#2a2a3a", skin: "#7A5640", hair: "#0a0a0a" },
    silhouette: "suit",
    propProp: "case"
  },
  {
    id: "yu",
    name: "Yuki Tanaka",
    role: "Mycologist",
    blurb: "Maps fungal networks under Tokyo. Thinks of the city as a body.",
    why: "Biological literacy as urban planning. A future we'll want.",
    height: 332,
    palette: { coat: "#4a6a3a", inner: "#d9cdb6", pants: "#8a7a5e", skin: "#D6B89A", hair: "#1a1a1a" },
    silhouette: "anorak",
    propProp: "jar"
  },
  {
    id: "ru",
    name: "Rumi Castellano",
    role: "Chef, Oaxaca",
    blurb: "No menu. Cooks what the market refused that morning.",
    why: "Took 'farm to table' off the marketing deck and back into a real kitchen.",
    height: 344,
    palette: { coat: "#F4F0E8", inner: "#F4F0E8", pants: "#7a4a2a", skin: "#C09070", hair: "#1a1a1a" },
    silhouette: "apron",
    propProp: "none"
  },
  {
    id: "ha",
    name: "Halldór Sveinn",
    role: "Glaciologist",
    blurb: "Films ice sheets the way other people film their kids growing up.",
    why: "Long-form attention to a thing that's leaving. The work is grief.",
    height: 376,
    palette: { coat: "#b85a3a", inner: "#0e0e0e", pants: "#0e0e0e", skin: "#E8CDB6", hair: "#a0826a" },
    silhouette: "parka",
    propProp: "camera"
  },
  {
    id: "in",
    name: "Inez Demir",
    role: "Bookbinder",
    blurb: "Hand-binds editions of out-of-print poetry. 40 books a year, no more.",
    why: "Scarcity as care, not marketing.",
    height: 336,
    palette: { coat: "#8a3a4a", inner: "#F4F0E8", pants: "#2a2a2a", skin: "#D6B89A", hair: "#3a1a1a" },
    silhouette: "knit",
    propProp: "book"
  },
  {
    id: "ke",
    name: "Kenji Park",
    role: "Game designer",
    blurb: "Makes one short, perfect game every two years. Refuses sequels.",
    why: "Discipline as an aesthetic. The opposite of the attention economy.",
    height: 358,
    palette: { coat: "#0e0e0e", inner: "#d9b84a", pants: "#0e0e0e", skin: "#D6B89A", hair: "#0a0a0a" },
    silhouette: "boxy",
    propProp: "none"
  },
  {
    id: "so",
    name: "Sofía Lindqvist",
    role: "Cartographer",
    blurb: "Maps disappearing villages in northern Patagonia. Walks every contour line.",
    why: "Cartography as memorial work — geography that refuses to forget.",
    height: 350,
    palette: { coat: "#3a4a3a", inner: "#F4F0E8", pants: "#1a1a1a", skin: "#E0BFA0", hair: "#7a4a2a" },
    silhouette: "anorak",
    propProp: "tube"
  },
  {
    id: "om",
    name: "Omar Diallo",
    role: "Composer",
    blurb: "Writes string quartets for non-musicians to play badly, on purpose.",
    why: "Re-locating musical meaning in effort, not virtuosity.",
    height: 364,
    palette: { coat: "#2a2a2a", inner: "#b85a3a", pants: "#2a2a2a", skin: "#7A5640", hair: "#0a0a0a" },
    silhouette: "long-coat",
    propProp: "case"
  },
  {
    id: "li",
    name: "Lin Wei",
    role: "Furniture maker",
    blurb: "One chair a month, no commissions, sold by silent auction.",
    why: "Refusal as practice. The patience modern craft forgot.",
    height: 334,
    palette: { coat: "#d9cdb6", inner: "#d9cdb6", pants: "#3a2a1a", skin: "#E0BFA0", hair: "#0a0a0a" },
    silhouette: "knit",
    propProp: "none"
  },
  {
    id: "fr",
    name: "Frida Volkov",
    role: "Marine biologist",
    blurb: "Lives on a research boat 9 months a year. Studies octopus cognition.",
    why: "Treating other minds as worth meeting, not classifying.",
    height: 340,
    palette: { coat: "#0a3a4a", inner: "#F4F0E8", pants: "#0a3a4a", skin: "#E8CDB6", hair: "#a0826a" },
    silhouette: "parka",
    propProp: "jar"
  },
  {
    id: "ba",
    name: "Babatunde Adeyemi",
    role: "Theater director",
    blurb: "Stages Yoruba folk plays in laundromats, train stations, hospital lobbies.",
    why: "Theater as public infrastructure, not subscription product.",
    height: 372,
    palette: { coat: "#b85a3a", inner: "#F4F0E8", pants: "#1a1a1a", skin: "#7A5640", hair: "#0a0a0a" },
    silhouette: "boxy",
    propProp: "bag"
  },
  {
    id: "iv",
    name: "Ivana Marković",
    role: "Botanist",
    blurb: "Documents weeds in the cracks of Belgrade's brutalist housing blocks.",
    why: "Attention to what cities call failure. The opposite of landscaping.",
    height: 342,
    palette: { coat: "#4a6a3a", inner: "#d9cdb6", pants: "#7a5e3a", skin: "#E0BFA0", hair: "#3a1a1a" },
    silhouette: "anorak",
    propProp: "jar"
  },
  {
    id: "ta",
    name: "Tarek Hamdan",
    role: "Filmmaker",
    blurb: "Eight-hour films. No score. Real time. He's serious.",
    why: "Asking how much patience an audience still has. The answer is more than we think.",
    height: 368,
    palette: { coat: "#2a2a3a", inner: "#F4F0E8", pants: "#2a2a3a", skin: "#C09070", hair: "#0a0a0a" },
    silhouette: "trench",
    propProp: "camera"
  },
  {
    id: "me",
    name: "Mei Tanaka",
    role: "Pastry chef",
    blurb: "Closes the shop when she's tired. Ten seats. Three desserts.",
    why: "Hospitality as boundary, not performance.",
    height: 330,
    palette: { coat: "#F4F0E8", inner: "#F4F0E8", pants: "#0e0e0e", skin: "#E8CDB6", hair: "#1a1a1a" },
    silhouette: "apron",
    propProp: "none"
  },
  {
    id: "an",
    name: "Anders Holm",
    role: "Carpenter",
    blurb: "Restores wooden churches in rural Norway. By hand, in winter.",
    why: "A vocation in a culture that mostly does jobs.",
    height: 374,
    palette: { coat: "#7a5e3a", inner: "#d9cdb6", pants: "#3a2a1a", skin: "#E8CDB6", hair: "#a0826a" },
    silhouette: "puffer",
    propProp: "case"
  },
  {
    id: "pr",
    name: "Priya Sundaram",
    role: "Mathematician",
    blurb: "Number theory. Refuses to use a computer. Notebooks only.",
    why: "Insists math is a humanity. The discipline is starting to agree.",
    height: 336,
    palette: { coat: "#8a3a4a", inner: "#F4F0E8", pants: "#1a1a1a", skin: "#C09070", hair: "#0a0a0a" },
    silhouette: "knit",
    propProp: "book"
  },
  {
    id: "lu",
    name: "Lucien Aubert",
    role: "Perfumer",
    blurb: "One scent every five years. Sells out in an afternoon.",
    why: "Olfactory restraint in an industry built on noise.",
    height: 352,
    palette: { coat: "#1a1a1a", inner: "#d9b84a", pants: "#1a1a1a", skin: "#E0BFA0", hair: "#3a2a1a" },
    silhouette: "suit",
    propProp: "none"
  },
  {
    id: "ze",
    name: "Zeynep Aksoy",
    role: "Weaver",
    blurb: "Revives Anatolian rug patterns from museum fragments. 200 hours per piece.",
    why: "Material memory. Pattern as inheritance, not aesthetic.",
    height: 344,
    palette: { coat: "#b85a3a", inner: "#F4F0E8", pants: "#3a2a1a", skin: "#D6B89A", hair: "#1a1a1a" },
    silhouette: "knit",
    propProp: "none"
  }
];

// Render a stylized cut-out figure — abstract, geometric, suggestive of fashion/personality.
// NOT literal photography. Treats each figure as a placeholder with intentional character.
function Figure({ person, onClick }) {
  const { palette: p, silhouette, propProp, height } = person;
  const W = 110;
  const H = height;

  const headR = 18;
  const headY = 32;
  const neckY = headY + headR;
  const shoulderY = neckY + 8;
  const torsoBottom = shoulderY + 130;
  const legBottom = H - 8;

  const renderBody = () => {
    switch (silhouette) {
      case "long-coat":
        return (
          <g>
            <path d={`M ${W/2 - 36} ${shoulderY}
                     Q ${W/2 - 42} ${shoulderY + 60} ${W/2 - 38} ${legBottom - 30}
                     L ${W/2 - 30} ${legBottom - 10}
                     L ${W/2 + 30} ${legBottom - 10}
                     L ${W/2 + 38} ${legBottom - 30}
                     Q ${W/2 + 42} ${shoulderY + 60} ${W/2 + 36} ${shoulderY}
                     Q ${W/2} ${shoulderY - 6} ${W/2 - 36} ${shoulderY} Z`}
                  fill={p.coat} />
            <rect x={W/2 - 8} y={shoulderY + 6} width="16" height="40" fill={p.inner} />
            <path d={`M ${W/2 - 14} ${shoulderY + 4} L ${W/2} ${shoulderY + 50} L ${W/2 + 14} ${shoulderY + 4} Z`}
                  fill={p.coat} opacity="0.85" />
          </g>
        );
      case "trench":
        return (
          <g>
            <path d={`M ${W/2 - 32} ${shoulderY}
                     L ${W/2 - 38} ${legBottom - 60}
                     L ${W/2 - 28} ${legBottom - 10}
                     L ${W/2 + 28} ${legBottom - 10}
                     L ${W/2 + 38} ${legBottom - 60}
                     L ${W/2 + 32} ${shoulderY}
                     Q ${W/2} ${shoulderY - 4} ${W/2 - 32} ${shoulderY} Z`}
                  fill={p.coat} />
            <line x1={W/2} y1={shoulderY + 8} x2={W/2} y2={legBottom - 20} stroke={p.pants} strokeWidth="0.8" opacity="0.4" />
            <rect x={W/2 - 34} y={shoulderY + 70} width="68" height="4" fill={p.pants} opacity="0.5" />
          </g>
        );
      case "puffer":
        return (
          <g>
            <path d={`M ${W/2 - 38} ${shoulderY}
                     Q ${W/2 - 44} ${shoulderY + 80} ${W/2 - 36} ${torsoBottom + 10}
                     L ${W/2 + 36} ${torsoBottom + 10}
                     Q ${W/2 + 44} ${shoulderY + 80} ${W/2 + 38} ${shoulderY}
                     Q ${W/2} ${shoulderY - 4} ${W/2 - 38} ${shoulderY} Z`}
                  fill={p.coat} />
            {[0,1,2,3].map(i => (
              <line key={i} x1={W/2 - 36} y1={shoulderY + 20 + i*22} x2={W/2 + 36} y2={shoulderY + 20 + i*22}
                    stroke={p.pants} strokeWidth="0.6" opacity="0.3" />
            ))}
            <rect x={W/2 - 22} y={torsoBottom + 8} width="18" height={legBottom - torsoBottom - 16} fill={p.pants} />
            <rect x={W/2 + 4} y={torsoBottom + 8} width="18" height={legBottom - torsoBottom - 16} fill={p.pants} />
          </g>
        );
      case "knit":
        return (
          <g>
            <path d={`M ${W/2 - 34} ${shoulderY}
                     Q ${W/2 - 40} ${shoulderY + 60} ${W/2 - 32} ${torsoBottom}
                     L ${W/2 + 32} ${torsoBottom}
                     Q ${W/2 + 40} ${shoulderY + 60} ${W/2 + 34} ${shoulderY}
                     Q ${W/2} ${shoulderY - 2} ${W/2 - 34} ${shoulderY} Z`}
                  fill={p.coat} stroke={p.pants} strokeWidth="0.5" opacity="0.95" />
            {[0,1,2,3,4,5].map(i => (
              <line key={i} x1={W/2 - 32} y1={shoulderY + 12 + i*16} x2={W/2 + 32} y2={shoulderY + 12 + i*16}
                    stroke={p.pants} strokeWidth="0.4" opacity="0.25" />
            ))}
            <path d={`M ${W/2 - 32} ${torsoBottom}
                     L ${W/2 - 38} ${legBottom - 10}
                     L ${W/2 + 38} ${legBottom - 10}
                     L ${W/2 + 32} ${torsoBottom} Z`}
                  fill={p.pants} />
          </g>
        );
      case "suit":
        return (
          <g>
            <path d={`M ${W/2 - 30} ${shoulderY}
                     L ${W/2 - 34} ${torsoBottom}
                     L ${W/2 + 34} ${torsoBottom}
                     L ${W/2 + 30} ${shoulderY}
                     Q ${W/2} ${shoulderY - 2} ${W/2 - 30} ${shoulderY} Z`}
                  fill={p.coat} />
            <path d={`M ${W/2 - 8} ${shoulderY + 4} L ${W/2} ${shoulderY + 50} L ${W/2 + 8} ${shoulderY + 4} Z`} fill={p.inner} />
            <rect x={W/2 - 2} y={shoulderY + 12} width="4" height="36" fill={p.pants} />
            <rect x={W/2 - 28} y={torsoBottom} width="24" height={legBottom - torsoBottom - 4} fill={p.pants} />
            <rect x={W/2 + 4} y={torsoBottom} width="24" height={legBottom - torsoBottom - 4} fill={p.pants} />
          </g>
        );
      case "boxy":
        return (
          <g>
            <rect x={W/2 - 42} y={shoulderY} width="84" height={torsoBottom - shoulderY + 4} fill={p.coat} />
            <path d={`M ${W/2 - 42} ${shoulderY} Q ${W/2} ${shoulderY - 4} ${W/2 + 42} ${shoulderY}`} fill={p.coat} />
            <rect x={W/2 - 8} y={shoulderY + 4} width="16" height="30" fill={p.inner} />
            <path d={`M ${W/2 - 38} ${torsoBottom + 4}
                     L ${W/2 - 42} ${legBottom - 10}
                     L ${W/2 - 4} ${legBottom - 10}
                     L ${W/2 - 4} ${torsoBottom + 4} Z`} fill={p.pants} />
            <path d={`M ${W/2 + 4} ${torsoBottom + 4}
                     L ${W/2 + 4} ${legBottom - 10}
                     L ${W/2 + 42} ${legBottom - 10}
                     L ${W/2 + 38} ${torsoBottom + 4} Z`} fill={p.pants} />
          </g>
        );
      case "anorak":
        return (
          <g>
            <path d={`M ${W/2 - 36} ${shoulderY}
                     Q ${W/2 - 40} ${shoulderY + 70} ${W/2 - 34} ${torsoBottom + 20}
                     L ${W/2 + 34} ${torsoBottom + 20}
                     Q ${W/2 + 40} ${shoulderY + 70} ${W/2 + 36} ${shoulderY}
                     Q ${W/2} ${shoulderY - 4} ${W/2 - 36} ${shoulderY} Z`}
                  fill={p.coat} />
            <ellipse cx={W/2} cy={shoulderY - 2} rx="22" ry="10" fill={p.coat} />
            <rect x={W/2 - 22} y={shoulderY + 60} width="44" height="22" fill="none" stroke={p.pants} strokeWidth="0.6" opacity="0.4" />
            <rect x={W/2 - 22} y={torsoBottom + 24} width="18" height={legBottom - torsoBottom - 32} fill={p.pants} />
            <rect x={W/2 + 4} y={torsoBottom + 24} width="18" height={legBottom - torsoBottom - 32} fill={p.pants} />
          </g>
        );
      case "apron":
        return (
          <g>
            <rect x={W/2 - 28} y={shoulderY} width="56" height={torsoBottom - shoulderY} fill={p.coat} />
            <path d={`M ${W/2 - 28} ${shoulderY} Q ${W/2} ${shoulderY - 4} ${W/2 + 28} ${shoulderY}`} fill={p.coat} />
            <path d={`M ${W/2 - 22} ${shoulderY + 26}
                     L ${W/2 - 26} ${torsoBottom + 60}
                     L ${W/2 + 26} ${torsoBottom + 60}
                     L ${W/2 + 22} ${shoulderY + 26} Z`} fill="#1a1a1a" opacity="0.92" />
            <path d={`M ${W/2 - 22} ${shoulderY + 26} L ${W/2} ${shoulderY + 8} L ${W/2 + 22} ${shoulderY + 26}`}
                  fill="none" stroke="#1a1a1a" strokeWidth="3" />
            <rect x={W/2 - 24} y={torsoBottom + 60} width="20" height={legBottom - torsoBottom - 68} fill={p.pants} />
            <rect x={W/2 + 4} y={torsoBottom + 60} width="20" height={legBottom - torsoBottom - 68} fill={p.pants} />
          </g>
        );
      case "parka":
        return (
          <g>
            <path d={`M ${W/2 - 42} ${shoulderY + 4}
                     Q ${W/2 - 48} ${shoulderY + 90} ${W/2 - 38} ${torsoBottom + 30}
                     L ${W/2 + 38} ${torsoBottom + 30}
                     Q ${W/2 + 48} ${shoulderY + 90} ${W/2 + 42} ${shoulderY + 4}
                     Q ${W/2} ${shoulderY - 6} ${W/2 - 42} ${shoulderY + 4} Z`}
                  fill={p.coat} />
            <path d={`M ${W/2 - 42} ${shoulderY + 4} Q ${W/2} ${shoulderY - 14} ${W/2 + 42} ${shoulderY + 4}`}
                  fill="none" stroke={p.inner} strokeWidth="6" strokeLinecap="round" opacity="0.7" />
            <rect x={W/2 - 22} y={torsoBottom + 32} width="18" height={legBottom - torsoBottom - 40} fill={p.pants} />
            <rect x={W/2 + 4} y={torsoBottom + 32} width="18" height={legBottom - torsoBottom - 40} fill={p.pants} />
          </g>
        );
      default:
        return null;
    }
  };

  const renderProp = () => {
    switch (propProp) {
      case "tube":
        return <rect x={W/2 + 30} y={shoulderY + 30} width="6" height="80" fill="#1a1a1a" opacity="0.85" />;
      case "headphones":
        return (
          <g>
            <path d={`M ${W/2 - headR - 2} ${headY - 6} Q ${W/2} ${headY - headR - 8} ${W/2 + headR + 2} ${headY - 6}`}
                  fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
            <circle cx={W/2 - headR - 2} cy={headY - 2} r="4" fill="#1a1a1a" />
            <circle cx={W/2 + headR + 2} cy={headY - 2} r="4" fill="#1a1a1a" />
          </g>
        );
      case "book":
        return <rect x={W/2 - 44} y={shoulderY + 60} width="14" height="20" fill="#b85a3a" />;
      case "bag":
        return (
          <g>
            <line x1={W/2 - 32} y1={shoulderY + 10} x2={W/2 - 38} y2={shoulderY + 80} stroke="#1a1a1a" strokeWidth="1.2" />
            <rect x={W/2 - 46} y={shoulderY + 80} width="18" height="22" fill="#1a1a1a" />
          </g>
        );
      case "case":
        return <rect x={W/2 + 26} y={shoulderY + 70} width="24" height="18" fill="#3a2a1a" />;
      case "jar":
        return (
          <g>
            <rect x={W/2 - 46} y={shoulderY + 80} width="14" height="18" fill={p.inner} stroke="#1a1a1a" strokeWidth="0.8" />
            <rect x={W/2 - 47} y={shoulderY + 76} width="16" height="5" fill="#1a1a1a" />
          </g>
        );
      case "camera":
        return (
          <g>
            <rect x={W/2 - 8} y={shoulderY + 56} width="16" height="10" fill="#0e0e0e" />
            <circle cx={W/2} cy={shoulderY + 61} r="3" fill={p.inner} />
            <line x1={W/2 - 8} y1={shoulderY + 56} x2={W/2 - 14} y2={shoulderY + 28} stroke="#0e0e0e" strokeWidth="1" />
            <line x1={W/2 + 8} y1={shoulderY + 56} x2={W/2 + 14} y2={shoulderY + 28} stroke="#0e0e0e" strokeWidth="1" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <button
      className="figure-btn"
      onClick={() => onClick(person)}
      aria-label={`${person.name}, ${person.role}`}
    >
      <FigurePreview person={person} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYEnd meet" className="figure-svg">
        <rect x={W/2 - 22} y={torsoBottom} width="18" height={legBottom - torsoBottom - 4} fill={p.pants} />
        <rect x={W/2 + 4} y={torsoBottom} width="18" height={legBottom - torsoBottom - 4} fill={p.pants} />
        <ellipse cx={W/2 - 13} cy={legBottom - 2} rx="10" ry="3" fill="#1a1a1a" />
        <ellipse cx={W/2 + 13} cy={legBottom - 2} rx="10" ry="3" fill="#1a1a1a" />
        {renderBody()}
        <rect x={W/2 - 46} y={shoulderY + 6} width="8" height="80" fill={p.coat} rx="3" />
        <rect x={W/2 + 38} y={shoulderY + 6} width="8" height="80" fill={p.coat} rx="3" />
        <circle cx={W/2 - 42} cy={shoulderY + 92} r="4" fill={p.skin} />
        <circle cx={W/2 + 42} cy={shoulderY + 92} r="4" fill={p.skin} />
        <rect x={W/2 - 5} y={neckY - 2} width="10" height="10" fill={p.skin} />
        <circle cx={W/2} cy={headY} r={headR} fill={p.skin} />
        <path d={`M ${W/2 - headR} ${headY - 4} Q ${W/2} ${headY - headR - 6} ${W/2 + headR} ${headY - 4} Q ${W/2 + headR - 2} ${headY - 14} ${W/2} ${headY - headR + 2} Q ${W/2 - headR + 2} ${headY - 14} ${W/2 - headR} ${headY - 4} Z`}
              fill={p.hair} />
        {renderProp()}
      </svg>
      <span className="figure-caption">[ {person.id} ]</span>
    </button>
  );
}

// Tiny editorial-thumbnail preview that renders above a figure on hover.
// Visually mirrors the profile page (title + image + columns + grid) at a small scale.
function FigurePreview({ person }) {
  const ed = (window.EDITORIAL && window.EDITORIAL[person.id]) || (window.EDITORIAL_DEFAULT && window.EDITORIAL_DEFAULT(person)) || { title: ['Profile'], category: person.role, location: '—' };
  const titleStr = ed.title.join(' ').toUpperCase();
  const heroSrc = `https://picsum.photos/seed/${person.id}hero-100x100/280/180`;
  const a = `https://picsum.photos/seed/${person.id}a-100x100/120/160`;
  const b = `https://picsum.photos/seed/${person.id}b-100x100/180/180`;
  const close = `https://picsum.photos/seed/${person.id}close-100x100/300/120`;
  return (
    <div className="figure-preview" aria-hidden="true">
      <div className="fp-nav">
        <span className="fp-logo">Aesthetica</span>
        <span className="fp-pills">
          <span /><span /><span /><span /><span />
        </span>
        <span className="fp-icons">⌕ ≡</span>
      </div>
      <div className="fp-title">{titleStr}</div>
      <img className="fp-hero" src={heroSrc} alt="" loading="lazy" />
      <div className="fp-meta">
        <div className="fp-meta-col">
          <div className="fp-meta-row" /><div className="fp-meta-row" /><div className="fp-meta-row" />
        </div>
        <div className="fp-body">
          <div className="fp-line" /><div className="fp-line" /><div className="fp-line" />
          <div className="fp-line fp-line-short" />
          <div className="fp-line" /><div className="fp-line" /><div className="fp-line fp-line-short" />
        </div>
      </div>
      <div className="fp-grid">
        <img src={a} alt="" loading="lazy" />
        <img src={b} alt="" loading="lazy" />
      </div>
      <img className="fp-close" src={close} alt="" loading="lazy" />
    </div>
  );
}

window.FigurePreview = FigurePreview;
window.PEOPLE = PEOPLE;
window.Figure = Figure;
