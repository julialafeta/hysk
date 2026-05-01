const { useEffect, useRef, useState: useSP } = React;

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useSP(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.05 });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-shown' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

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

  const s = person.id;
  const titleText = Array.isArray(ed.title) ? ed.title.join(' ') : (ed.title || person.name);
  const category = ed.category || 'Perfil';
  const vol = 'Vol. 04';

  // Build enough text for columns — combine all available content
  const allParts = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean);
  // Ensure we have at least 3 paragraphs for the columns
  const colParts = allParts.length >= 3
    ? allParts
    : [...allParts, ...allParts].slice(0, 4);

  return (
    <article className="profile">

      <nav className="ed-nav">
        <button className="ed-nav__back" onClick={onBack}>← Índice</button>
        <span className="ed-nav__wordmark">Hysk · {vol}</span>
        <div className="ed-nav__arrows">
          <button onClick={onPrev}>←</button>
          <button onClick={onNext}>→</button>
        </div>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DUPLA 1
          Página esquerda: foto full-bleed
          Página direita: label + título (1 linha) + créditos + 3 colunas
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spread-1">

        <div className="s1-photo">
          <img src={imgFor(`${s}-open`, 900, 1200)} alt="" loading="eager" />
        </div>

        <Reveal className="s1-text" delay={80}>
          <div className="s1-header">
            <div className="ed-label">{category} · {vol}</div>
            <h1 className="s1-title">{titleText}</h1>
            <p className="s1-dek">{person.role}</p>
            <div className="ed-credits">
              <div>Texto <em>Editorial Hysk</em></div>
              <div>Fotos <em>Arquivo Pessoal</em></div>
              <div>Edição <em>Primavera 2026</em></div>
            </div>
          </div>
          <div className="s1-footer">
            <div className="s1-cols">
              {colParts.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="pg-num">— 01</div>
          </div>
        </Reveal>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DUPLA 2
          Coluna esquerda (estreita): label + título grande + créditos + número
          Centro: 3 fotos empilhadas
          Direita: 1 foto editorial grande
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spread-2">

        <Reveal className="s2-meta">
          <div className="s2-meta-top">
            <div className="ed-label">{category}</div>
            <h2 className="s2-title">{person.name}</h2>
            <p className="s2-role">{person.role}</p>
          </div>
          <div className="s2-meta-bottom">
            <div className="ed-credits">
              <div>Por <em>Hysk</em></div>
              <div>Fotos <em>Arquivo</em></div>
            </div>
            <div className="pg-num">— 02 · Ensaio</div>
          </div>
        </Reveal>

        <div className="s2-thumbs">
          <Reveal className="s2-thumb">
            <img src={imgFor(`${s}-t1`, 420, 540)} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="s2-thumb" delay={70}>
            <img src={imgFor(`${s}-t2`, 420, 320)} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="s2-thumb" delay={140}>
            <img src={imgFor(`${s}-t3`, 420, 380)} alt="" loading="lazy" />
          </Reveal>
        </div>

        <Reveal className="s2-hero">
          <img src={imgFor(`${s}-feat`, 820, 1100)} alt="" loading="lazy" />
        </Reveal>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DUPLA 3
          Esquerda: foto grande + 3 fotos pequenas empilhadas
          Direita: label + 2 colunas texto + pull quote + mais texto
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spread-3">

        <div className="s3-images">
          <Reveal className="s3-main">
            <img src={imgFor(`${s}-ed1`, 560, 760)} alt="" loading="lazy" />
          </Reveal>
          <div className="s3-stack">
            <Reveal className="s3-sm">
              <img src={imgFor(`${s}-ed2`, 280, 220)} alt="" loading="lazy" />
            </Reveal>
            <Reveal className="s3-sm" delay={70}>
              <img src={imgFor(`${s}-ed3`, 280, 300)} alt="" loading="lazy" />
            </Reveal>
            <Reveal className="s3-sm" delay={140}>
              <img src={imgFor(`${s}-ed4`, 280, 240)} alt="" loading="lazy" />
            </Reveal>
          </div>
        </div>

        <Reveal className="s3-text" delay={80}>
          <div className="ed-label">{category}</div>
          <div className="s3-cols">
            {colParts.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <blockquote className="pull-quote">"{ed.pullQuote}"</blockquote>
          <div className="s3-cols">
            {colParts.slice(2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="pg-num">— 03</div>
        </Reveal>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DUPLA 4 — Fechamento
          Página esquerda: foto ambiente/atelier
          Página direita: nome em display grande + cargo + créditos
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="spread-4">

        <div className="s4-photo">
          <img src={imgFor(`${s}-close`, 820, 1100)} alt="" loading="lazy" />
        </div>

        <Reveal className="s4-text" delay={120}>
          <div className="s4-text-top">
            <div className="ed-label">Perfil · {category}</div>
            <h2 className="s4-title">{person.name}</h2>
            <p className="s4-sub">{person.role}</p>
            <p className="s4-blurb">{person.blurb}</p>
          </div>
          <div className="s4-text-bottom">
            <div className="ed-credits">
              <div>Fotos <em>Arquivo Pessoal</em></div>
              <div>Edição <em>Hysk · {vol}</em></div>
            </div>
            <div className="pg-num">— 04</div>
          </div>
        </Reveal>

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
