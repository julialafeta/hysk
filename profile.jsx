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
      // hi limitado a um teto editorial para evitar tamanho exagerado em títulos curtos
      let lo = 14, hi = 64;
      for (let i = 0; i < 25; i++) {
        if (hi - lo < 0.3) break;
        const mid = (lo + hi) / 2;
        t.style.fontSize = mid + 'px';
        if (t.scrollWidth > w) hi = mid;
        else lo = mid;
      }
      // Margem de segurança: -1px para garantir que não acione ellipsis
      t.style.fontSize = Math.max(14, lo - 1) + 'px';
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

  // S2 (spread): limita altura da coluna do quote para nunca ultrapassar as duas colunas laterais
  useEffect(() => {
    const fitQuote = () => {
      const quote = document.querySelector('.s2-col--quote');
      const bodies = document.querySelectorAll('.s2-col--body');
      if (!quote || bodies.length === 0) return;
      // reseta para medir altura natural das colunas laterais
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

  // Indicador de posição: nº do perfil atual / total
  const profileIdx = PEOPLE.findIndex(p => p.id === person.id);
  const profileLabel = String(profileIdx + 1).padStart(2, '0') + ' / ' + String(PEOPLE.length).padStart(2, '0');

  // Body text — limita em ~250 palavras (somando as 3 colunas)
  const baseText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let fullText = baseText;
  while (fullText && fullText.split(/\s+/).length < 250) fullText += ' ' + baseText;
  fullText = fullText.split(/\s+/).slice(0, 250).join(' ');

  // Conteúdo da seção 3 (ensaio editorial)
  const s3Kicker = ed.category || 'Ensaio';
  const s3Intro = (ed.coda || person.blurb || person.why || '').split('. ').slice(0, 2).join('. ').trim() || person.blurb || '';
  const s3IntroFinal = s3Intro && !s3Intro.endsWith('.') ? s3Intro + '.' : s3Intro;
  const s3Title = person.name.split(' ').slice(-1)[0];

  // Conteúdo da seção 2 (spread com pull quote)
  const s2Kicker = 'Moda';
  const s2Caption = `1, 2, 3 & 4. ${person.name} em estúdio: "${(person.why || person.blurb || '').split('.')[0]}"`;
  // Quote: combina pullQuote + why + blurb + coda e reduz para ~50% das palavras
  const s2QuoteFull = [ed.pullQuote, person.why, person.blurb, ed.coda].filter(Boolean).join(' ');
  const s2QuoteWords = s2QuoteFull.split(/\s+/);
  const s2QuoteHalf = s2QuoteWords.slice(0, Math.ceil(s2QuoteWords.length / 2)).join(' ');
  const s2Quote = `"${s2QuoteHalf}"`;

  // Conteúdo da seção 4
  const s4Kicker = 'Moda';
  const s4Subtitle = `${ed.location ? ed.location + ', ' : ''}${person.role.toLowerCase()} em primeira pessoa.`;
  // Body text dividido para colunas laterais
  const s2FullText = [ed.intro, ed.coda, person.blurb, person.why].filter(Boolean).join(' ');
  let s2LongText = s2FullText;
  while (s2LongText && s2LongText.length < 1500) s2LongText += ' ' + s2FullText;
  const s2Mid = Math.floor(s2LongText.length / 2);
  // Quebra na palavra mais próxima do meio
  let s2SplitAt = s2LongText.lastIndexOf(' ', s2Mid);
  if (s2SplitAt < 0) s2SplitAt = s2Mid;
  const s2LeftText = s2LongText.slice(0, s2SplitAt).trim();
  const s2RightText = s2LongText.slice(s2SplitAt).trim();

  return (
    <article className="profile">

      <nav className="ed-nav">
        <button className="ed-nav__back" onClick={onBack}>← Índice</button>
        <span className="ed-nav__wordmark">Hysk · Vol. 04 · {profileLabel}</span>
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
          ORDEM: S2 aparece como segundo bloco (logo após S1)
          SEÇÃO 2 — Spread editorial com pull quote
          esquerda: 3 colunas (texto · quote bold · texto) — invertido via grid order
          direita: kicker + imagem grande + pilha de 3 thumbs + legenda
          ════════════════════════════════════════ */}
      <section className="s2-section">
        <div className="s2-grid">

          <div className="s2-left">
            <div className="s2-kicker">{s2Kicker}</div>

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
          ORDEM: S3 aparece como terceiro bloco (após S2)
          SEÇÃO 3 — Ensaio editorial
          esquerda: kicker + intro + título centrado + 2 thumbs + créditos
          direita: imagem full-bleed
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
                <div className="s3-credits-label">por</div>
                <div className="s3-credits-value">Editorial Hysk</div>
              </div>
              <div className="s3-credits-row">
                <div className="s3-credits-label">fotos</div>
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
          SEÇÃO 4 — Spread editorial final
          imagem full-bleed cobrindo toda a seção
          kicker no canto superior esquerdo (alinhado com s2/s3)
          texto sobreposto na metade direita: título + subtítulo + créditos
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
              <div className="s4-credits-label">Texto</div>
              <div className="s4-credits-value">Editorial Hysk</div>
            </div>
            <div className="s4-credits-row">
              <div className="s4-credits-label">Retrato</div>
              <div className="s4-credits-value">Pablo Saborido</div>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}

window.Profile = Profile;
