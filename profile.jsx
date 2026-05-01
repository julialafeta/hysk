const { useEffect } = React;

function imgFor(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function Profile({ person, onBack, onPrev, onNext }) {
  const ed = (window.EDITORIAL && window.EDITORIAL[person.id]) || window.EDITORIAL_DEFAULT(person);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Body text — repete o conteúdo disponível para densificar as colunas
  const allParts = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean);
  const paragraphs = [];
  while (paragraphs.length < 8 && allParts.length) {
    paragraphs.push(...allParts);
  }

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
          <div className="ed-right">
            <div className="ed-kicker">{kickerText}</div>
            <h1 className="ed-title">{titleText}</h1>
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
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
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
