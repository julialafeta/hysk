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

  const allParts = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean);
  const colParts = allParts.length >= 3 ? allParts : [...allParts, ...allParts].slice(0, 4);
  const introShort = ed.intro ? ed.intro.split('. ')[0] + '.' : person.blurb;

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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PÁGINA 1 — 50/50 estrito
          metade esquerda (50%): imagem com moldura branca
          metade direita (50%): título + créditos + colunas
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="page page-1">
        <div className="half half-left">
          <Reveal className="p1-photo">
            <img src={imgFor(`${s}-open`, 900, 1200)} alt="" loading="eager" />
          </Reveal>
        </div>
        <div className="half half-right">
          <Reveal className="p1-text" delay={80}>
            <div className="p1-header">
              <div className="ed-label">{category} · {vol}</div>
              <h1 className="p1-title">{titleText}</h1>
              <p className="p1-dek">{person.role}</p>
              <div className="ed-credits">
                <div>Texto <em>Editorial Hysk</em></div>
                <div>Fotos <em>Arquivo Pessoal</em></div>
                <div>Edição <em>Primavera 2026</em></div>
              </div>
            </div>
            <div className="p1-cols">
              {colParts.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="p1-pgnum">— 01</div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PÁGINA 2 — 50/50 estrito
          metade esquerda (50%): bloco editorial — intro topo, título terço inferior, créditos base
          metade direita (50%): área visual — coluna de miniaturas + imagem grande
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="page page-2">
        <div className="half half-left">
          <Reveal className="p2-meta">
            <div className="p2-meta-top">
              <div className="ed-label">{category}</div>
              <p className="p2-intro">{introShort}</p>
            </div>
            <div className="p2-meta-title">
              <h2 className="p2-title">{person.name}</h2>
              <p className="p2-role">{person.role}</p>
            </div>
            <div className="p2-meta-bot">
              <div className="ed-credits">
                <div>Por <em>Hysk</em></div>
                <div>Fotos <em>Arquivo Pessoal</em></div>
              </div>
              <div className="p2-pgnum">— 02 · Ensaio</div>
            </div>
          </Reveal>
        </div>
        <div className="half half-right">
          <div className="p2-visual">
            <div className="p2-thumbs">
              <Reveal className="p2-thumb">
                <img src={imgFor(`${s}-t1`, 420, 540)} alt="" loading="lazy" />
              </Reveal>
              <Reveal className="p2-thumb" delay={70}>
                <img src={imgFor(`${s}-t2`, 420, 320)} alt="" loading="lazy" />
              </Reveal>
              <Reveal className="p2-thumb" delay={140}>
                <img src={imgFor(`${s}-t3`, 420, 380)} alt="" loading="lazy" />
              </Reveal>
            </div>
            <Reveal className="p2-hero">
              <img src={imgFor(`${s}-feat`, 820, 1100)} alt="" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PÁGINA 3 — 50/50 estrito
          metade esquerda (50%): cluster de imagens — grande + pequenas empilhadas
          metade direita (50%): texto + pull quote integrada
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="page page-3">
        <div className="half half-left">
          <div className="p3-images">
            <Reveal className="p3-main">
              <img src={imgFor(`${s}-ed1`, 560, 760)} alt="" loading="lazy" />
            </Reveal>
            <div className="p3-stack">
              <Reveal className="p3-sm">
                <img src={imgFor(`${s}-ed2`, 280, 220)} alt="" loading="lazy" />
              </Reveal>
              <Reveal className="p3-sm" delay={70}>
                <img src={imgFor(`${s}-ed3`, 280, 300)} alt="" loading="lazy" />
              </Reveal>
              <Reveal className="p3-sm" delay={140}>
                <img src={imgFor(`${s}-ed4`, 280, 240)} alt="" loading="lazy" />
              </Reveal>
            </div>
          </div>
        </div>
        <div className="half half-right">
          <Reveal className="p3-text" delay={80}>
            <div className="ed-label">{category}</div>
            <div className="p3-cols">
              {colParts.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <blockquote className="pull-quote">"{ed.pullQuote}"</blockquote>
            <div className="p3-cols">
              {colParts.slice(2).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="p3-pgnum">— 03</div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PÁGINA 4 — IMAGEM FULL-BLEED 50/50
          imagem ocupa 100% do bloco
          texto sobreposto ocupa exatamente a metade direita
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="page page-4">
        <div className="p4-photo">
          <img src={imgFor(`${s}-close`, 1800, 1100)} alt="" loading="lazy" />
        </div>
        <div className="p4-grid">
          <div className="half half-left p4-left" />
          <div className="half half-right p4-right">
            <Reveal className="p4-text" delay={120}>
              <div className="ed-label p4-label">Perfil · {category}</div>
              <h2 className="p4-title">{person.name}</h2>
              <p className="p4-sub">{person.role}</p>
              <div className="ed-credits p4-credits">
                <div>Texto <em>Hysk</em></div>
                <div>Fotos <em>Arquivo Pessoal</em></div>
              </div>
            </Reveal>
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
