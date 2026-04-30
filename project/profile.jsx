// Editorial profile page — visual essay style.
// Built per spec: subtle nav, dominant multi-line title, hero image, two-column block,
// pull quote, image grid, second paragraph, closing wide image. Scroll fade-ins.

const { useEffect, useRef, useState: useStateProfile } = React;

// IntersectionObserver hook for soft fade-in
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useStateProfile(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // If element is already in viewport on mount (e.g. above the fold), show immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Stable image picker — uses person.id as a seed so each person gets the same set every load.
// Uses picsum.photos (random but deterministic per seed). Aspect ratios match editorial spreads.
function imgFor(seed, w, h) {
  return `https://picsum.photos/seed/${seed}-${w}x${h}/${w}/${h}`;
}

function Profile({ person, onBack, onPrev, onNext }) {
  const ed = (window.EDITORIAL && window.EDITORIAL[person.id]) || window.EDITORIAL_DEFAULT(person);
  const idx = PEOPLE.findIndex(p => p.id === person.id);

  // Subtle parallax on hero
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `scale(1.02) translateY(${y * 0.04}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [person.id]);

  // Reset scroll on person change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [person.id]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onBack();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack, onPrev, onNext]);

  return (
    <article className="profile">
      {/* Subtle top nav */}
      <nav className="profile-nav">
        <button className="nav-logo" onClick={onBack} aria-label="Back to index">Hysk</button>
        <div className="nav-links">
          <span className="nav-pill">Architecture</span>
          <span className="nav-pill">Art &amp; Design</span>
          <span className="nav-pill">Film</span>
          <span className="nav-pill">Fashion</span>
          <span className="nav-pill">Music</span>
          <span className="nav-pill">Performance</span>
          <span className="nav-pill">Photography</span>
        </div>
        <div className="nav-meta">
          <span className="nav-icon" aria-hidden="true">⌕</span>
          <span className="nav-icon" aria-hidden="true">≡</span>
        </div>
      </nav>

      {/* Hero title */}
      <header className="profile-hero">
        <div className="hero-eyebrow">
          <span>{ed.category}</span>
          <span className="hero-dot">·</span>
          <span>{ed.location}</span>
        </div>
        <h1 className="hero-title">
          {ed.title.map((line, i) => (
            <Reveal as="span" key={i} delay={i * 90} className="hero-line">
              <span dangerouslySetInnerHTML={{ __html: line.replace(/\b(and|the|of|in|by|on)\b/gi, '<span class="hero-small">$1</span>') }} />
            </Reveal>
          ))}
        </h1>
        <Reveal as="div" delay={ed.title.length * 90 + 60} className="hero-byline">
          <span>{person.name}</span>
          <span className="hero-byline-dash">—</span>
          <span className="hero-byline-role">{person.role}</span>
        </Reveal>
      </header>

      {/* Hero image */}
      <Reveal className="hero-image-wrap">
        <img
          ref={heroRef}
          className="hero-image"
          src={imgFor(person.id + 'hero', 1600, 1000)}
          alt=""
          loading="eager"
        />
      </Reveal>

      {/* Two-column editorial block */}
      <section className="ed-block">
        <Reveal className="ed-meta" as="aside">
          <div className="ed-meta-row">
            <div className="ed-meta-label">Date</div>
            <div className="ed-meta-val">{ed.date}</div>
          </div>
          <div className="ed-meta-row">
            <div className="ed-meta-label">Location</div>
            <div className="ed-meta-val">{ed.location}</div>
          </div>
          <div className="ed-meta-row">
            <div className="ed-meta-label">Category</div>
            <div className="ed-meta-val">{ed.category}</div>
          </div>
          <div className="ed-meta-row">
            <div className="ed-meta-label">Found at</div>
            <div className="ed-meta-val">{ed.handle}</div>
          </div>
        </Reveal>
        <Reveal className="ed-body" delay={120}>
          <p className="ed-dropcap">{ed.intro}</p>
        </Reveal>
      </section>

      {/* Pull quote */}
      <Reveal className="pull-quote" as="blockquote">
        <span className="pull-mark">"</span>
        {ed.pullQuote}
      </Reveal>

      {/* Image grid */}
      <section className="image-grid">
        <Reveal className="grid-img grid-img-tall">
          <img src={imgFor(person.id + 'a', 700, 980)} alt="" loading="lazy" />
        </Reveal>
        <Reveal className="grid-img grid-img-square" delay={120}>
          <img src={imgFor(person.id + 'b', 800, 800)} alt="" loading="lazy" />
        </Reveal>
        <Reveal className="grid-img grid-img-wide" delay={240}>
          <img src={imgFor(person.id + 'c', 1200, 700)} alt="" loading="lazy" />
        </Reveal>
      </section>

      {/* Second paragraph */}
      <Reveal className="ed-coda" as="section">
        <p>{ed.coda}</p>
      </Reveal>

      {/* Closing image */}
      <Reveal className="closing-image">
        <img src={imgFor(person.id + 'close', 1800, 900)} alt="" loading="lazy" />
      </Reveal>

      {/* Footer */}
      <footer className="profile-footer">
        <Reveal className="footer-credits">
          <div className="footer-divider" />
          <div className="footer-line">{ed.credits}</div>
          <div className="footer-line footer-line-meta">Hysk · An ongoing index of taste · Volume 04, Spring 2026</div>
        </Reveal>
        <Reveal className="footer-nav" delay={120}>
          <button className="footer-nav-btn" onClick={onPrev}>← Previous</button>
          <button className="footer-nav-btn footer-nav-index" onClick={onBack}>Return to Index</button>
          <button className="footer-nav-btn" onClick={onNext}>Next →</button>
        </Reveal>
      </footer>
    </article>
  );
}

window.Profile = Profile;
