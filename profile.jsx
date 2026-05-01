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
    }, { threshold: 0.06 });
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
  const location = ed.location || '';

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

      {/* 1 — Abertura: imagem vertical + título + texto em colunas */}
      <section className="spread-open">
        <Reveal className="spread-open__img">
          <img src={imgFor(`${s}-open`, 800, 1100)} alt="" loading="eager" />
        </Reveal>
        <Reveal className="spread-open__text" delay={100}>
          <div className="ed-label">{category}{location ? ` · ${location}` : ''}</div>
          <h1 className="open-title">{titleText}</h1>
          <p className="open-dek">{person.role}</p>
          <div className="ed-credits">
            <div>Texto <em>Editorial</em></div>
            <div>Fotos <em>Arquivo</em></div>
          </div>
          <div className="body-cols"><p>{ed.intro}</p></div>
          <div className="pg-num">— 01</div>
        </Reveal>
      </section>

      {/* 2 — Feature: meta estreito + galeria de miniaturas + imagem grande */}
      <section className="spread-feature">
        <Reveal className="feature-meta">
          <div className="ed-label">Perfil</div>
          <h2 className="feature-title">{person.blurb}</h2>
          <div className="ed-credits">
            <div>Por <em>Hysk</em></div>
            <div>Fotos <em>Arquivo Pessoal</em></div>
          </div>
          <div className="pg-num">— 02</div>
        </Reveal>
        <div className="feature-thumbs">
          <Reveal className="ft-img">
            <img src={imgFor(`${s}-t1`, 360, 460)} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="ft-img" delay={80}>
            <img src={imgFor(`${s}-t2`, 360, 260)} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="ft-img" delay={160}>
            <img src={imgFor(`${s}-t3`, 360, 320)} alt="" loading="lazy" />
          </Reveal>
        </div>
        <Reveal className="feature-main">
          <img src={imgFor(`${s}-feat`, 720, 960)} alt="" loading="lazy" />
        </Reveal>
      </section>

      {/* 3 — Editorial: cluster de imagens + colunas de texto + pull quote */}
      <section className="spread-editorial">
        <div className="editorial-images">
          <Reveal className="ed-img-main">
            <img src={imgFor(`${s}-ed1`, 520, 720)} alt="" loading="lazy" />
          </Reveal>
          <div className="ed-img-stack">
            <Reveal className="ft-img">
              <img src={imgFor(`${s}-ed2`, 260, 200)} alt="" loading="lazy" />
            </Reveal>
            <Reveal className="ft-img" delay={80}>
              <img src={imgFor(`${s}-ed3`, 260, 280)} alt="" loading="lazy" />
            </Reveal>
            <Reveal className="ft-img" delay={160}>
              <img src={imgFor(`${s}-ed4`, 260, 220)} alt="" loading="lazy" />
            </Reveal>
          </div>
        </div>
        <Reveal className="editorial-body" delay={80}>
          <p className="body-text">{ed.intro}</p>
          <blockquote className="pull-quote">"{ed.pullQuote}"</blockquote>
          <p className="body-text">{ed.coda}</p>
          <div className="pg-num">— 03</div>
        </Reveal>
      </section>

      {/* 4 — Fechamento: imagem larga + nome grande */}
      <section className="spread-close">
        <Reveal className="close-img">
          <img src={imgFor(`${s}-close`, 1400, 760)} alt="" loading="lazy" />
        </Reveal>
        <Reveal className="close-text" delay={120}>
          <div className="ed-label">Perfil · Hysk Vol. 04</div>
          <h2 className="close-title">{person.name}</h2>
          <p className="close-sub">{person.role}</p>
          <div className="ed-credits" style={{ marginTop: '20px' }}>
            <div>Fotos <em>Arquivo Pessoal</em></div>
          </div>
          <div className="pg-num">— 04</div>
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
