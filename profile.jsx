const { useEffect, useRef } = React;

function imgFor(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function ProfileLayout1({ person, onBack, onPrev, onNext, preview }) {
  const ed = (window.EDITORIAL && window.EDITORIAL[person.id]) || window.EDITORIAL_DEFAULT(person);
  const titleRef = useRef(null);
  const rightRef = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => {
    if (preview) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [person.id, preview]);

  // Auto-fit: finds the largest font-size that fits in the available width on ONE line (binary search)
  useEffect(() => {
    const fit = () => {
      const t = titleRef.current;
      const r = rightRef.current;
      if (!t || !r) return;
      const cs = getComputedStyle(r);
      const w = r.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w <= 0) return;
      let lo = 14, hi = 64;
      for (let i = 0; i < 25; i++) {
        if (hi - lo < 0.3) break;
        const mid = (lo + hi) / 2;
        t.style.fontSize = mid + 'px';
        if (t.scrollWidth > w) hi = mid;
        else lo = mid;
      }
      t.style.fontSize = Math.max(14, lo - 1) + 'px';
    };
    fit();
    requestAnimationFrame(fit);
    setTimeout(fit, 100);
    setTimeout(fit, 500);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (rightRef.current) ro.observe(rightRef.current);
    window.addEventListener('resize', fit);
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); };
  }, [person.id]);

  // S2 (spread): limit quote column height to never exceed the side body columns
  // Scoped to this article instance (so previews don't conflict with the main profile)
  useEffect(() => {
    const fitQuote = () => {
      const root = articleRef.current;
      if (!root) return;
      const quote = root.querySelector('.s2-col--quote');
      const bodies = root.querySelectorAll('.s2-col--body');
      if (!quote || bodies.length === 0) return;
      quote.style.maxHeight = 'none';
      const maxBodyHeight = Math.max(...Array.from(bodies).map(b => b.offsetHeight));
      if (maxBodyHeight > 0) {
        quote.style.maxHeight = maxBodyHeight + 'px';
      }
    };
    fitQuote();
    requestAnimationFrame(fitQuote);
    setTimeout(fitQuote, 100);
    setTimeout(fitQuote, 500);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitQuote);
    window.addEventListener('resize', fitQuote);
    return () => window.removeEventListener('resize', fitQuote);
  }, [person.id]);

  useEffect(() => {
    if (preview) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onBack();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack, onPrev, onNext, preview]);

  const titleText = Array.isArray(ed.title) ? ed.title.join(' ') : (ed.title || person.name);
  const kickerText = (person.role || ed.category || 'Profile');
  const subtitle = ed.intro || person.blurb || '';

  // Position indicator: current profile number / total
  const profileIdx = PEOPLE.findIndex(p => p.id === person.id);
  const profileLabel = String(profileIdx + 1).padStart(2, '0') + ' / ' + String(PEOPLE.length).padStart(2, '0');

  // Body text – limit to ~250 words total (across all 3 columns)
  const baseText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let fullText = baseText;
  while (fullText && fullText.split(/\s+/).length < 250) fullText += ' ' + baseText;
  fullText = fullText.split(/\s+/).slice(0, 250).join(' ');

  // Section 3 content (editorial essay)
  const s3Kicker = ed.category || 'Essay';
  const s3Intro = (ed.coda || person.blurb || person.why || '').split('. ').slice(0, 2).join('. ').trim() || person.blurb || '';
  const s3IntroFinal = s3Intro && !s3Intro.endsWith('.') ? s3Intro + '.' : s3Intro;
  const s3Title = person.name.split(' ').slice(-1)[0];

  // Section 2 content (spread with pull quote)
  const s2Kicker = 'Fashion';
  const s2Caption = `1, 2, 3 & 4. ${person.name} in the studio: "${(person.why || person.blurb || '').split('.')[0]}"`;
  // Quote: combines pullQuote + why + blurb + coda and reduces to ~50% of words
  const s2QuoteFull = [ed.pullQuote, person.why, person.blurb, ed.coda].filter(Boolean).join(' ');
  const s2QuoteWords = s2QuoteFull.split(/\s+/);
  const s2QuoteHalf = s2QuoteWords.slice(0, Math.ceil(s2QuoteWords.length / 2)).join(' ');
  const s2Quote = `"${s2QuoteHalf}"`;

  // Section 4 content
  const s4Kicker = 'Fashion';
  const s4Subtitle = `${ed.location ? ed.location + ', ' : ''}${person.role.toLowerCase()} in first person.`;
  // Body text split for side columns
  const s2FullText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let s2LongText = s2FullText;
  while (s2LongText && s2LongText.length < 1500) s2LongText += ' ' + s2FullText;
  const s2Mid = Math.floor(s2LongText.length / 2);
  // Break at the word closest to the middle
  let s2SplitAt = s2LongText.lastIndexOf(' ', s2Mid);
  if (s2SplitAt < 0) s2SplitAt = s2Mid;
  const s2LeftText = s2LongText.slice(0, s2SplitAt).trim();
  const s2RightText = s2LongText.slice(s2SplitAt).trim();

  return (
    <article className="profile" ref={articleRef}>

      <nav className="ed-nav">
        <button className="ed-nav__back" onClick={onBack}>← Index</button>
        <span className="ed-nav__wordmark">Index of Taste · Vol. 01 · {profileLabel}</span>
        <div className="ed-nav__arrows">
          <button onClick={onPrev}>←</button>
          <button onClick={onNext}>→</button>
        </div>
      </nav>

      <section className="ed-section">
        <div className="ed-grid">

          {/* left half 50% – image with white frame */}
          <div className="ed-left">
            <div className="ed-image">
              <img src={imgFor(`${person.id}-portrait`, 900, 1200)} alt="" loading="eager" />
            </div>
          </div>

          {/* right half 50% – kicker · title · subtitle · metadata · 3 columns */}
          <div className="ed-right" ref={rightRef}>
            <div className="ed-kicker">{kickerText}</div>
            <h1 className="ed-title" ref={titleRef}>{titleText}</h1>
            <p className="ed-subtitle">{subtitle}</p>
            <div className="ed-meta">
              <div className="ed-meta-item">
                <div className="ed-meta-label">by</div>
                <div className="ed-meta-value">Editorial Index of Taste</div>
              </div>
              <div className="ed-meta-item">
                <div className="ed-meta-label">photography</div>
                <div className="ed-meta-value">Personal Archive</div>
              </div>
              <div className="ed-meta-item">
                <div className="ed-meta-label">edition</div>
                <div className="ed-meta-value">Vol. 01 · Spring/Summer 2026</div>
              </div>
            </div>
            <div className="ed-columns">
              <p>{fullText}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          ORDER: S2 appears as the second block (right after S1)
          SECTION 2 – Editorial spread with pull quote
          left: 3 columns (body · bold quote · body) – inverted via grid order
          right: kicker + large image + stack of 3 thumbs + caption
          ════════════════════════════════════════ */}
      <section className="s2-section">
        <div className="s2-grid">

          <div className="s2-left">
            <div className="s2-main">
              <img src={imgFor(`${person.id}-s2main`, 700, 940)} alt="" loading="lazy" />
            </div>

            <div className="s2-stack">
              <div className="s2-stack-img">
                <img src={imgFor(`${person.id}-s2a`, 400, 540)} alt="" loading="lazy" />
              </div>
              <div className="s2-stack-img">
                <img src={imgFor(`${person.id}-s2b`, 400, 540)} alt="" loading="lazy" />
              </div>
              <div className="s2-stack-img">
                <img src={imgFor(`${person.id}-s2c`, 400, 540)} alt="" loading="lazy" />
              </div>
            </div>

            <div className="s2-caption">{s2Caption}</div>
          </div>

          <div className="s2-right">
            <p className="s2-col s2-col--body">{s2LeftText}</p>
            <p className="s2-col s2-col--quote">{s2Quote}</p>
            <p className="s2-col s2-col--body">{s2RightText}</p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          ORDER: S3 appears as the third block (after S2)
          SECTION 3 – Editorial essay
          left: kicker + intro + centered title + 2 thumbs + credits
          right: full-bleed image
          ════════════════════════════════════════ */}
      <section className="s3-section">
        <div className="s3-grid">

          <div className="s3-left">
            <div className="s3-kicker">{s3Kicker}</div>
            <p className="s3-intro">{s3IntroFinal}</p>

            <h2 className="s3-title">{s3Title}</h2>

            <div className="s3-thumbs">
              <div className="s3-thumb">
                <img src={imgFor(`${person.id}-s3a`, 600, 800)} alt="" loading="lazy" />
              </div>
              <div className="s3-thumb">
                <img src={imgFor(`${person.id}-s3b`, 600, 800)} alt="" loading="lazy" />
              </div>
            </div>

            <div className="s3-credits">
              <div className="s3-credits-row">
                <div className="s3-credits-label">by</div>
                <div className="s3-credits-value">Editorial Index of Taste</div>
              </div>
              <div className="s3-credits-row">
                <div className="s3-credits-label">photos</div>
                <div className="s3-credits-value">Pablo Saborido</div>
              </div>
            </div>
          </div>

          <div className="s3-right">
            <img src={imgFor(`${person.id}-s3hero`, 1400, 1700)} alt="" loading="lazy" />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 – Final editorial spread
          full-bleed image covering the whole section
          kicker in the top-left corner (aligned with s2/s3)
          text overlay in the right half: title + subtitle + credits
          ════════════════════════════════════════ */}
      <section className="s4-section">
        <div className="s4-photo">
          <img src={imgFor(`${person.id}-s4hero`, 1800, 1100)} alt="" loading="lazy" />
        </div>

        <div className="s4-kicker">{s4Kicker}</div>

        <div className="s4-text">
          <h2 className="s4-title">{person.name}</h2>
          <p className="s4-subtitle">{s4Subtitle}</p>
          <div className="s4-credits">
            <div className="s4-credits-row">
              <div className="s4-credits-label">Text</div>
              <div className="s4-credits-value">Editorial Index of Taste</div>
            </div>
            <div className="s4-credits-row">
              <div className="s4-credits-label">Portrait</div>
              <div className="s4-credits-value">Pablo Saborido</div>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}

window.ProfileLayout1 = ProfileLayout1;

// Profile dispatcher – picks the right layout based on person.layout (default: 1)
// To assign a layout to a person, set person.layout = 2 / 3 / 4 in people.jsx
// Future layouts (ProfileLayout2/3/4) can be added in their own files and registered to window
function Profile(props) {
  const layout = (props.person && props.person.layout) || 1;
  let Layout;
  switch (layout) {
    case 1: Layout = window.ProfileLayout1; break;
    // case 2: Layout = window.ProfileLayout2; break;
    // case 3: Layout = window.ProfileLayout3; break;
    // case 4: Layout = window.ProfileLayout4; break;
    default: Layout = window.ProfileLayout1;
  }
  return Layout ? <Layout {...props} /> : null;
}

window.Profile = Profile;
