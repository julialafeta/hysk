const { useEffect, useRef } = React;

function imgFor(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function Profile({ person, onBack, onPrev, onNext }) {
  const ed = (window.EDITORIAL && window.EDITORIAL[person.id]) || window.EDITORIAL_DEFAULT(person);
  const titleRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [person.id]);

  // Auto-fit: encontra o maior font-size que cabe na largura disponível em UMA linha (busca binária)
  useEffect(() => {
    const fit = () => {
      const t = titleRef.current;
      const r = rightRef.current;
      if (!t || !r) return;
      const cs = getComputedStyle(r);
      const w = r.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w <= 0) return;
      // Busca binária pelo maior font-size onde scrollWidth <= largura disponível
      let lo = 14, hi = 140;
      for (let i = 0; i < 25; i++) {
        if (hi - lo < 0.3) break;
        const mid = (lo + hi) / 2;
        t.style.fontSize = mid + 'px';
        if (t.scrollWidth > w) hi = mid;
        else lo = mid;
      }
      t.style.fontSize = lo + 'px';
    };
    // múltiplos triggers para capturar layout final em todos os cenários
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onBack();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack, onPrev, onNext]);

  const titleText = Array.isArray(ed.title) ? ed.title.join(' ') : (ed.title || person.name);
  const kickerText = (person.role || ed.category || 'Perfil');
  const subtitle = ed.intro || person.blurb || '';

  // Body text — quantidade adequada que balanceia bem nas 3 colunas
  const baseText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let fullText = baseText;
  while (fullText && fullText.length < 1800) fullText += ' ' + baseText;

  // Conteúdo da seção 2
  const s2Kicker = ed.category || 'Ensaio';
  const s2Intro = (ed.coda || person.blurb || person.why || '').split('. ').slice(0, 2).join('. ').trim() || person.blurb || '';
  const s2IntroFinal = s2Intro && !s2Intro.endsWith('.') ? s2Intro + '.' : s2Intro;
  const s2Title = person.name.split(' ').slice(-1)[0];

  // Conteúdo da seção 3
  const s3Kicker = 'Moda';
  const s3Caption = `1, 2, 3 & 4. ${person.name} em estúdio: "${(person.why || person.blurb || '').split('.')[0]}"`;
  const s3Quote = `"${ed.pullQuote || person.why || person.blurb || ''}"`;
  // Body text dividido para colunas laterais
  const s3FullText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let s3LongText = s3FullText;
  while (s3LongText && s3LongText.length < 1500) s3LongText += ' ' + s3FullText;
  const s3Mid = Math.floor(s3LongText.length / 2);
  // Quebra na palavra mais próxima do meio
  let s3SplitAt = s3LongText.lastIndexOf(' ', s3Mid);
  if (s3SplitAt < 0) s3SplitAt = s3Mid;
  const s3LeftText = s3LongText.slice(0, s3SplitAt).trim();
  const s3RightText = s3LongText.slice(s3SplitAt).trim();

  return (
    <article className="profile">

      <nav className="ed-nav">
        <button className="ed-nav__back" onClick={onBack}>← Índice</button>
        <span className="ed-nav__wordmark">Hysk · Vol. 04</span>
        <div className="ed-nav__arrows">
          <button onClick={onPrev}>←</button>
          <button onClick={onNext}>→</button>
        </div>
      </nav>

      <section className="ed-section">
        <div className="ed-grid">

          {/* metade esquerda 50% — imagem com moldura branca */}
          <div className="ed-left">
            <div className="ed-image">
              <img src={imgFor(`${person.id}-portrait`, 900, 1200)} alt="" loading="eager" />
            </div>
          </div>

          {/* metade direita 50% — kicker · título · subtítulo · metadata · 3 colunas */}
          <div className="ed-right" ref={rightRef}>
            <div className="ed-kicker">{kickerText}</div>
            <h1 className="ed-title" ref={titleRef}>{titleText}</h1>
            <p className="ed-subtitle">{subtitle}</p>
            <div className="ed-meta">
              <div className="ed-meta-item">
                <div className="ed-meta-label">por</div>
                <div className="ed-meta-value">Editorial Hysk</div>
              </div>
              <div className="ed-meta-item">
                <div className="ed-meta-label">fotografia</div>
                <div className="ed-meta-value">Arquivo Pessoal</div>
              </div>
              <div className="ed-meta-item">
                <div className="ed-meta-label">edição</div>
                <div className="ed-meta-value">Vol. 04 · Primavera 2026</div>
              </div>
            </div>
            <div className="ed-columns">
              <p>{fullText}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 2 — Ensaio editorial
          esquerda: kicker + intro + título centrado + 2 thumbs + créditos
          direita: imagem full-bleed
          ════════════════════════════════════════ */}
      <section className="s2-section">
        <div className="s2-grid">

          <div className="s2-left">
            <div className="s2-kicker">{s2Kicker}</div>
            <p className="s2-intro">{s2IntroFinal}</p>

            <h2 className="s2-title">{s2Title}</h2>

            <div className="s2-thumbs">
              <div className="s2-thumb">
                <img src={imgFor(`${person.id}-s2a`, 600, 800)} alt="" loading="lazy" />
              </div>
              <div className="s2-thumb">
                <img src={imgFor(`${person.id}-s2b`, 600, 800)} alt="" loading="lazy" />
              </div>
            </div>

            <div className="s2-credits">
              <div className="s2-credits-row">
                <div className="s2-credits-label">por</div>
                <div className="s2-credits-value">Editorial Hysk</div>
              </div>
              <div className="s2-credits-row">
                <div className="s2-credits-label">fotos</div>
                <div className="s2-credits-value">Pablo Saborido</div>
              </div>
            </div>
          </div>

          <div className="s2-right">
            <img src={imgFor(`${person.id}-s2hero`, 1400, 1700)} alt="" loading="lazy" />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 3 — Spread editorial com pull quote
          esquerda: kicker + imagem grande + pilha de 3 thumbs + legenda
          direita: 3 colunas (texto · quote bold · texto)
          ════════════════════════════════════════ */}
      <section className="s3-section">
        <div className="s3-grid">

          <div className="s3-left">
            <div className="s3-kicker">{s3Kicker}</div>

            <div className="s3-main">
              <img src={imgFor(`${person.id}-s3main`, 700, 940)} alt="" loading="lazy" />
            </div>

            <div className="s3-stack">
              <div className="s3-stack-img">
                <img src={imgFor(`${person.id}-s3a`, 400, 540)} alt="" loading="lazy" />
              </div>
              <div className="s3-stack-img">
                <img src={imgFor(`${person.id}-s3b`, 400, 540)} alt="" loading="lazy" />
              </div>
              <div className="s3-stack-img">
                <img src={imgFor(`${person.id}-s3c`, 400, 540)} alt="" loading="lazy" />
              </div>
            </div>

            <div className="s3-caption">{s3Caption}</div>
          </div>

          <div className="s3-right">
            <p className="s3-col s3-col--body">{s3LeftText}</p>
            <p className="s3-col s3-col--quote">{s3Quote}</p>
            <p className="s3-col s3-col--body">{s3RightText}</p>
          </div>

        </div>
      </section>

      <footer className="ed-footer">
        <button className="ed-footer__prev" onClick={onPrev}>← Anterior</button>
        <button className="ed-footer__back" onClick={onBack}>Voltar ao índice</button>
        <button className="ed-footer__next" onClick={onNext}>Próximo →</button>
      </footer>

    </article>
  );
}

window.Profile = Profile;
