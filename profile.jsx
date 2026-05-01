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

  // Auto-fit: dimensiona o título para encher exatamente a largura disponível em uma única linha
  useEffect(() => {
    const fit = () => {
      const t = titleRef.current;
      const r = rightRef.current;
      if (!t || !r) return;
      const cs = getComputedStyle(r);
      const w = r.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w <= 0) return;
      // Mede largura natural a um tamanho fixo, calcula proporção
      t.style.fontSize = '100px';
      const natural = t.scrollWidth;
      if (natural <= 0) return;
      let next = (w / natural) * 100 * 0.99;
      next = Math.max(22, Math.min(96, next));
      t.style.fontSize = next + 'px';
    };
    fit();
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

  // Body text — quantidade moderada que preenche as 3 colunas naturalmente
  const baseText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  const fullText = baseText ? (baseText + ' ' + baseText) : '';

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

      <footer className="ed-footer">
        <button className="ed-footer__prev" onClick={onPrev}>← Anterior</button>
        <button className="ed-footer__back" onClick={onBack}>Voltar ao índice</button>
        <button className="ed-footer__next" onClick={onNext}>Próximo →</button>
      </footer>

    </article>
  );
}

window.Profile = Profile;
