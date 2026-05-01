const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "An Index of Taste",
  "background": "#F4F0E8",
  "spacing": 132,
  "figureScale": 0.33,
  "showCaptions": false
}/*EDITMODE-END*/;

const HEADLINE_OPTIONS = [
  "Underseen",
  "People You Should Know",
  "A Better Reference Set",
  "An Index of Taste",
  "Worth Your Attention"
];

function IndexView({ tweaks, onSelect }) {
  return (
    <div className="page" style={{ background: tweaks.background }}>
      <header className="masthead">
        <div className="eyebrow">Vol. 04 — Spring 2026</div>
        <h1 className="headline">{tweaks.headline}</h1>
      </header>

      <main
        className="gallery"
        style={{ gap: `${tweaks.spacing}px`, '--fig-scale': String(tweaks.figureScale) }}
        data-captions={tweaks.showCaptions ? "on" : "off"}
      >
        {PEOPLE.map((person) => (
          <Figure key={person.id} person={person} onClick={onSelect} />
        ))}
      </main>

      <footer className="colophon">
        <span>Hysk</span>
        <span>An ongoing index</span>
        <span>{PEOPLE.length} entries</span>
      </footer>
    </div>
  );
}

function getRoute() {
  const m = window.location.pathname.match(/^\/p\/([^/]+)/);
  return m ? { view: 'profile', id: m[1] } : { view: 'index' };
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onPop = () => setRoute(getRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const activeId = route.view === 'profile' ? route.id : null;

  useEffect(() => {
    document.body.style.background = activeId ? "#2a2724" : tweaks.background;
  }, [tweaks.background, activeId]);

  const activeIdx = activeId ? PEOPLE.findIndex(p => p.id === activeId) : -1;
  const activePerson = activeIdx >= 0 ? PEOPLE[activeIdx] : null;

  const goTo = (id) => { window.history.pushState(null, null, `/p/${id}`); setRoute({ view: 'profile', id }); };
  const goPrev = () => goTo(PEOPLE[(activeIdx - 1 + PEOPLE.length) % PEOPLE.length].id);
  const goNext = () => goTo(PEOPLE[(activeIdx + 1) % PEOPLE.length].id);
  const goBack = () => { window.history.pushState(null, null, '/'); setRoute({ view: 'index' }); };

  if (activePerson) {
    return (
      <div className="profile-shell">
        <Profile
          key={activePerson.id}
          person={activePerson}
          onBack={goBack}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    );
  }

  return (
    <>
      <IndexView tweaks={tweaks} onSelect={(p) => goTo(p.id)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Headline">
          <TweakSelect
            label="Text"
            value={tweaks.headline}
            options={HEADLINE_OPTIONS.map(o => ({ value: o, label: o }))}
            onChange={(v) => setTweak("headline", v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakSlider
            label="Figure size"
            min={0.005} max={1} step={0.005}
            value={tweaks.figureScale}
            onChange={(v) => setTweak("figureScale", v)}
          />
          <TweakSlider
            label="Spacing"
            min={8} max={140} step={2}
            value={tweaks.spacing}
            onChange={(v) => setTweak("spacing", v)}
          />
          <TweakToggle
            label="Show captions"
            value={tweaks.showCaptions}
            onChange={(v) => setTweak("showCaptions", v)}
          />
        </TweakSection>
        <TweakSection label="Surface">
          <TweakColor
            label="Background"
            value={tweaks.background}
            onChange={(v) => setTweak("background", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
