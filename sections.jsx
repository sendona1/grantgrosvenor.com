/* global React, Eyebrow, Button, Arrow, SectionHeader, StatGrid, Stripes, Ticker, Field, Questionnaire, COACHING_QUESTIONS, GROUP_QUESTIONS, FORM_ENDPOINTS */
const { useState, useEffect } = React;

/* ===== Nav ================================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = (href, label) => (
    <a className="gg-nav__link" href={href} onClick={() => setMenuOpen(false)}>{label}</a>
  );

  return (
    <nav className={`gg-nav ${scrolled ? 'gg-nav--scrolled' : ''}`}>
      <div className="gg-nav__inner">
        <a className="gg-nav__brand" href="#top">GRANTGROSVENOR</a>
        <div className={`gg-nav__links ${menuOpen ? 'gg-nav__links--open' : ''}`}>
          {navLink('#story', 'STORY')}
          {navLink('#coaching', 'COACHING')}
          {navLink('#group', 'COMEBACK GROUP')}
          {navLink('#sobriety', 'SOBRIETY')}
          {navLink('#brands', 'BRANDS')}
          {navLink('#design', 'DESIGN')}
          {navLink('#recovery', 'RECOVERY')}
          <Button variant="gold" size="sm" as="a" href="#contact" onClick={() => setMenuOpen(false)}>WORK WITH ME</Button>
        </div>
        <button className="gg-nav__menu" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>
    </nav>
  );
}

/* ===== Hero =============================================================== */
function Hero() {
  return (
    <section className="gg-hero" id="top">
      <div className="gg-hero__photo" aria-hidden="true"></div>
      <div className="gg-hero__photo-tag">TRACK FEST · LANE 5 · BIB GROSVENOR</div>

      <div className="gg-hero__inner">
        <div className="gg-hero__top">
          <div className="gg-hero__bib">
            <span className="gg-hero__bib-cap">1:46.45</span>
            <span className="gg-hero__bib-num">3:58</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="gg-hero__bib-cap" style={{ color: 'var(--gg-fg-3)' }}>MELBOURNE · US · WORLD RANKED</span>
            <div style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, color: 'var(--gg-fg-3)', letterSpacing: '0.16em', marginTop: 6, textTransform: 'uppercase' }}>
              EST. 2018 · BACK 2026
            </div>
          </div>
        </div>

        <h1 className="gg-hero__title">
          UNFINISHED<br />
          <span className="gg-hero__title-sub">BUSINESS.</span>
        </h1>

        <p className="gg-hero__lede">
          5 years completely removed from the sport. I'm back, I'm running faster than I did in college, and I'm doing it sober. This is the comeback I owe myself.
        </p>

        <div className="gg-hero__cta-row">
          <Button variant="gold" as="a" href="#contact">WORK WITH ME <Arrow /></Button>
          <Button variant="outline" as="a" href="#story">READ THE STORY</Button>
        </div>

        <div className="gg-hero__bottom">
          <div className="gg-hero__credit-list">
            <span>SUB-4 MILER</span>
            <span>2× NCAA CHAMPION</span>
            <span>UNIVERSITY OF OREGON</span>
            <span>WORLD RANKED</span>
          </div>
          <span className="gg-hero__bib-cap" style={{ color: 'var(--gg-fg-3)' }}>↓ SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/* ===== Stats ============================================================== */
function StatsSection() {
  return (
    <section className="gg-section" style={{ paddingTop: 0 }}>
      <div className="gg-container">
        <StatGrid items={[
          { value: '3:58', cap: 'SUB-FOUR MILE', gold: true },
          { value: '2×',   cap: 'NCAA NATIONAL CHAMPION' },
          { value: '5',    sup: 'YR', cap: 'AWAY · NOW BACK · SOBER' },
        ]} />
      </div>
    </section>
  );
}

/* ===== Story ============================================================== */
function StorySection() {
  return (
    <section className="gg-section" id="story">
      <div className="gg-container">
        <SectionHeader number="00" label="THE STORY" status="GRIT · REINVENTION · UNFINISHED" title={<>Walked away.<br/>Came back faster.</>} />
        <div className="gg-story">
          <div className="gg-story__media">
            <span className="gg-story__media-tag">FLAGSTAFF, AZ · ALTITUDE BLOCK</span>
          </div>
          <div className="gg-story__copy">
            <p>In 2016 I won two national titles with the University of Oregon (DMR, Team) and just missed qualifying for the Olympic Trials by 3 spots. I was broke, didn't love running, and turned to working.</p>
            <p>For 5 years I worked at Nike, FloSports and PitchBook Data — climbing the corporate ladder and partying. Until one day I thought: <em>you need to do something meaningful with your life. Connect with who I was.</em></p>
            <p>So I packed up everything and moved from Seattle to Arizona. I wanted to get back into shape, and see if I could still compete. 9 months later I ran a personal best of 1:47.7 in the 800m and I was hooked. 2 years later I got sober. And now 3 years without alcohol, at 33 years old, I'm faster than I was in college.</p>
            <p style={{ color: 'var(--gg-fg-1)', fontWeight: 600 }}>Good things come to those who send it.</p>
            <blockquote className="gg-story__pull">I have unfinished business with this sport, and I can't wait to discover how far I can take it.</blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Breaker (full-bleed photo strip between sections) ================ */
function Breaker() {
  return (
    <section className="gg-breaker" aria-hidden="false">
      <div className="gg-breaker__caption">
        <div className="gg-breaker__inner">
          <h3 className="gg-breaker__quote">Faster than I was in <em>college.</em></h3>
        </div>
      </div>
    </section>
  );
}

/* ===== Funnel section (reusable for Coaching + Group) ===================== */
function FunnelSection({ id, number, label, status, title, paragraphs, points, panel, onApply }) {
  return (
    <section className="gg-section" id={id}>
      <div className="gg-container">
        <SectionHeader number={number} label={label} status={status} title={title} />
        <div className="gg-funnel">
          <div className="gg-funnel__copy">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="gg-funnel__list">
              {points.map((pt, i) => (
                <li className="gg-funnel__list-item" key={i}>
                  <span className="gg-funnel__list-num">/ {String(i+1).padStart(2,'0')}</span>
                  <span className="gg-funnel__list-text">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="gg-funnel__panel">
            <div className="gg-funnel__panel-header">
              <div>
                <span className="gg-funnel__panel-tag">{panel.tag}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="gg-funnel__panel-meta">SLOTS</div>
                <div style={{ fontFamily: 'var(--gg-font-display)', fontSize: 32, lineHeight: 1, color: 'var(--gg-gold)', marginTop: 4 }}>{panel.slots}</div>
              </div>
            </div>
            <ul className="gg-funnel__panel-includes">
              {panel.includes.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
            <Button variant="gold" onClick={onApply}>
              {panel.cta} <Arrow />
            </Button>
            <div className="gg-funnel__panel-meta" style={{ textAlign: 'center' }}>
              {panel.meta}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===== Sobriety =========================================================== */
function SobrietySection() {
  return (
    <section className="gg-sobriety" id="sobriety">
      <div className="gg-sobriety__inner">
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', borderTop: '2px solid var(--gg-gold)', paddingTop: 16, marginBottom: 16 }}>
          <span className="gg-section-head__num">/ 03</span>
          <span className="gg-section-head__label">SOBRIETY</span>
          <span className="gg-section-head__status" style={{ marginLeft: 'auto' }}>A RESOURCE · 3 YEARS SOBER</span>
        </div>
        <h2 className="gg-section-head__title" style={{ marginBottom: 32 }}>Sobriety.<br/>What it gave me back.</h2>

        <div className="gg-sobriety__copy">
          <p>I'm 3 years without alcohol, and I'm faster, sharper, and happier than I've ever been. This section isn't a pitch. It's here as a resource — for anyone who's curious what's on the other side.</p>
          <p>A few of the benefits I've experienced:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 12 }}>
            <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, alignItems: 'baseline', borderBottom: '1px solid var(--gg-line)', paddingBottom: 12 }}><span style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--gg-gold)' }}>/ 01</span><span>Real, durable energy. Mornings stopped costing me anything.</span></li>
            <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, alignItems: 'baseline', borderBottom: '1px solid var(--gg-line)', paddingBottom: 12 }}><span style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--gg-gold)' }}>/ 02</span><span>Recovery, sleep and training adaptations that actually compound.</span></li>
            <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, alignItems: 'baseline', borderBottom: '1px solid var(--gg-line)', paddingBottom: 12 }}><span style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--gg-gold)' }}>/ 03</span><span>Clearer head. Better decisions. More patience for the long work.</span></li>
            <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, alignItems: 'baseline', borderBottom: '1px solid var(--gg-line)', paddingBottom: 12 }}><span style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--gg-gold)' }}>/ 04</span><span>Relationships that go deeper than the next round.</span></li>
            <li style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, alignItems: 'baseline' }}><span style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--gg-gold)' }}>/ 05</span><span>Time. Hours and hours of it, back in my life.</span></li>
          </ul>
          <p>If you're curious or sober-curious and want to talk, my inbox is open.</p>
          <p style={{ color: 'var(--gg-fg-2)', fontSize: 14 }}>If you're in crisis, please contact <a style={{ color: 'var(--gg-gold)', borderBottom: '1px solid var(--gg-gold)' }} href="https://988lifeline.org" target="_blank" rel="noreferrer">988</a> or the <a style={{ color: 'var(--gg-gold)', borderBottom: '1px solid var(--gg-gold)' }} href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noreferrer">SAMHSA helpline</a>.</p>
        </div>

        <Button variant="outline" as="a" href="mailto:grantgrosvenor1@gmail.com?subject=Sobriety">
          REACH OUT <Arrow />
        </Button>
      </div>
    </section>
  );
}

/* ===== Brands ============================================================ */
function BrandsSection() {
  const [v, setV] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setV(s => ({ ...s, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/xkoewbwb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Brand Deck Request] ${v.company || v.name || 'New request'}`,
          _replyto: v.email || '',
          form: 'Brand Deck Request',
          submitted_at: new Date().toISOString(),
          ...v,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submit failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { label: 'Instagram', handle: '@grantwgrosvenor', href: 'https://www.instagram.com/grantwgrosvenor/' },
    { label: 'YouTube',   handle: '@grant800m',       href: 'https://www.youtube.com/@grant800m' },
    { label: 'TikTok',    handle: '@grantgrosvenor',  href: 'https://www.tiktok.com/@grantgrosvenor' },
    { label: 'Strava',    handle: 'Grant Grosvenor',  href: 'https://strava.com/athletes/grantgrosvenor' },
  ];

  return (
    <section className="gg-section" id="brands">
      <div className="gg-container">
        <SectionHeader number="05" label="BRANDS" status="PARTNERSHIPS · MEDIA · SOCIAL" title={<>Where I show up.<br/>And how to reach me.</>} />

        <div className="gg-socials">
          {socials.map(s => (
            <a className="gg-socials__cell" key={s.label} href={s.href} target="_blank" rel="noreferrer">
              <span className="gg-socials__label">{s.label}</span>
              <span className="gg-socials__handle">{s.handle}</span>
              <span className="gg-socials__arrow"><Arrow /></span>
            </a>
          ))}
        </div>

        <div className="gg-funnel" style={{ marginTop: 64 }}>
          <div className="gg-funnel__copy">
            <p>If you're a brand interested in working together, request my brand deck below. It covers reach, audience, recent results, sponsorship tiers, and case studies from past partnerships.</p>
            <ul className="gg-funnel__list">
              <li className="gg-funnel__list-item"><span className="gg-funnel__list-num">/ 01</span><span className="gg-funnel__list-text">Audience breakdown across IG, YouTube, TikTok, Strava.</span></li>
              <li className="gg-funnel__list-item"><span className="gg-funnel__list-num">/ 02</span><span className="gg-funnel__list-text">2026 race + content calendar, with confirmed appearances.</span></li>
              <li className="gg-funnel__list-item"><span className="gg-funnel__list-num">/ 03</span><span className="gg-funnel__list-text">Partnership tiers, deliverables, and rate card.</span></li>
              <li className="gg-funnel__list-item"><span className="gg-funnel__list-num">/ 04</span><span className="gg-funnel__list-text">Selected case studies from past brand work.</span></li>
            </ul>
          </div>

          <aside className="gg-funnel__panel">
            <div className="gg-funnel__panel-header">
              <div>
                <span className="gg-funnel__panel-tag">REQUEST DECK</span>
                <div style={{ fontFamily: 'var(--gg-font-display)', fontSize: 36, lineHeight: 1, color: 'var(--gg-fg-1)', marginTop: 12 }}>BRAND<br/>DECK •26</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="gg-funnel__panel-meta">RESPONSE</div>
                <div style={{ fontFamily: 'var(--gg-font-display)', fontSize: 28, lineHeight: 1, color: 'var(--gg-gold)', marginTop: 4 }}>24H</div>
              </div>
            </div>

            {sent ? (
              <div style={{ background: 'var(--gg-green-soft)', border: '1px solid var(--gg-green)', padding: 20, borderRadius: 8 }}>
                <span className="gg-modal__cleared-tag">REQUEST RECEIVED</span>
                <h4 className="gg-modal__cleared-title" style={{ marginTop: 8, fontSize: 28 }}>Deck on the way.</h4>
                <p style={{ marginTop: 12, color: 'var(--gg-fg-1)', fontSize: 14 }}>I'll send the deck to your email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Your name" name="name" required value={v.name} onChange={set('name')} />
                <Field label="Work email" type="email" name="email" required value={v.email} onChange={set('email')} />
                <Field label="Brand / company" name="company" required value={v.company} onChange={set('company')} />
                <Field label="Briefly, what are you working on?" name="note" textarea rows={3} value={v.note} onChange={set('note')} placeholder="Campaign, product launch, ambassador program, etc." />
                {error && (
                  <div style={{ background: '#2a0e0d', border: '1px solid var(--gg-error)', padding: 12, borderRadius: 4, fontSize: 13, color: 'var(--gg-fg-1)' }}>
                    {error}
                  </div>
                )}
                <Button variant="gold" type="submit" disabled={submitting}>
                  {submitting ? 'SENDING…' : 'REQUEST BRAND DECK'} <Arrow />
                </Button>
                <p className="gg-form__legal">No mailing list. Deck is sent once, to the email above.</p>
              </form>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===== Design Requests =================================================== */
function DesignSection() {
  const [v, setV] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setV(s => ({ ...s, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mwvzebkb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Design Request] ${v.need || 'New project'} — ${v.name || ''}`,
          _replyto: v.email || '',
          form: 'Design Request',
          submitted_at: new Date().toISOString(),
          ...v,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submit failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const offerings = [
    { tag: 'WEBSITE', title: 'Athlete Websites', price: 'FROM $XXX',
      bullets: ['Professionally designed website to showcase you, your story and accomplishments', 'Completely custom. Website launched in 48–72 hours', 'Contact/form integration, payment integration, affiliate links, contact', 'Build credibility and establish better brand visibility', 'You own the domain, the code, and the assets'] },
    { tag: 'BRAND DECK', title: 'Brand Decks for Athletes', price: 'FROM $XX',
      bullets: ['Designed specifically to showcase your athletic accomplishments and value to brands', 'Confidence to present your unique story, land more brand deals, and ask for more', 'Audience, results, calendar, partnership tiers', 'Editable templates you can update yourself', 'Designed to actually close brand conversations'] },
  ];

  return (
    <section className="gg-section" id="design" style={{ background: 'var(--gg-panel)' }}>
      <div className="gg-container">
        <SectionHeader number="06" label="DESIGN REQUESTS" status="FOR ATHLETES · BY AN ATHLETE" title={<>The kit I wish<br/>I'd had earlier.</>} />

        <div className="gg-design-grid">
          {offerings.map((o) => (
            <div className="gg-design-card" key={o.tag}>
              <span className="gg-funnel__panel-tag">{o.tag}</span>
              <h3 className="gg-design-card__title">{o.title}</h3>
              <div className="gg-design-card__price">{o.price}</div>
              <ul className="gg-funnel__panel-includes" style={{ marginTop: 8 }}>
                {o.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gg-sp-7)', alignItems: 'start' }} className="gg-design-form-row">
          <div>
            <h3 className="gg-section-head__title" style={{ fontSize: 'clamp(36px, 5vw, 60px)', marginBottom: 16 }}>Start a project.</h3>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--gg-fg-2)', margin: '0 0 16px' }}>Tell me what you're trying to make. I'll come back with pricing, a timeline, and what I'd need from you to start.</p>
            <p style={{ fontSize: 14, color: 'var(--gg-fg-3)' }}>I take on 2 projects a month. Right now there's room.</p>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--gg-black)', border: '1px solid var(--gg-line)', borderRadius: 8, padding: 28 }}>
            {sent ? (
              <div style={{ background: 'var(--gg-green-soft)', border: '1px solid var(--gg-green)', padding: 20, borderRadius: 8 }}>
                <span className="gg-modal__cleared-tag">REQUEST RECEIVED</span>
                <h4 className="gg-modal__cleared-title" style={{ marginTop: 8, fontSize: 28 }}>Got it. Talk soon.</h4>
                <p style={{ marginTop: 12, color: 'var(--gg-fg-1)', fontSize: 14 }}>I'll reply within 3 business days with pricing and next steps.</p>
              </div>
            ) : (
              <>
                <Field label="Your name" name="name" required value={v.name} onChange={set('name')} />
                <Field label="Email" type="email" name="email" required value={v.email} onChange={set('email')} />
                <Field label="Sport · event" name="sport" value={v.sport} onChange={set('sport')} placeholder="e.g. 800m / NCAA D1 → pro" />
                <Field label="What do you need?" name="need" required options={['Website', 'Brand deck', 'Both', 'Not sure yet']} value={v.need} onChange={set('need')} />
                <Field label="Tell me about the project" name="note" textarea rows={4} required value={v.note} onChange={set('note')} placeholder="What's the goal? Timeline? Do you have copy / photos already?" />
                {error && (
                  <div style={{ background: '#2a0e0d', border: '1px solid var(--gg-error)', padding: 12, borderRadius: 4, fontSize: 13, color: 'var(--gg-fg-1)' }}>
                    {error}
                  </div>
                )}
                <Button variant="gold" type="submit" disabled={submitting}>
                  {submitting ? 'SENDING…' : 'SEND REQUEST'} <Arrow />
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===== Recovery Brands =================================================== */
function RecoverySection() {
  const brands = [
    {
      name: 'Lagoon Sleep',
      tag: 'PILLOWS · SLEEP',
      note: 'The pillow that actually fixed my neck on travel weeks.',
      url: 'lagoonsleep.com/grant',
      href: 'https://lagoonsleep.com/grant',
      code: 'GRANT',
    },
    {
      name: 'Shakti Mat',
      tag: 'ACUPRESSURE · RECOVERY',
      note: '15 minutes daily for a nervous system reset.',
      url: 'shaktimat.com/grant',
      href: 'https://shaktimat.com/grant',
      code: 'GRANT',
    },
  ];

  return (
    <section className="gg-section" id="recovery">
      <div className="gg-container">
        <SectionHeader
          number="07"
          label="RECOVERY BRANDS"
          status="GEAR I ACTUALLY USE · DISCOUNT CODES"
          title={<>What I use to<br/>recover and sleep.</>}
        />

        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--gg-fg-2)', maxWidth: 720, margin: '0 0 32px' }}>
          A short list — only the products that earned a spot in my routine. Code <strong style={{ color: 'var(--gg-gold)' }}>GRANT</strong> works at checkout on both.
        </p>

        <div className="gg-recovery-grid">
          {brands.map((b) => (
            <a className="gg-recovery-card" key={b.name} href={b.href} target="_blank" rel="noreferrer">
              <div className="gg-recovery-card__top">
                <span className="gg-funnel__panel-tag">{b.tag}</span>
                <span className="gg-recovery-card__arrow"><Arrow /></span>
              </div>
              <h3 className="gg-recovery-card__name">{b.name}</h3>
              <p className="gg-recovery-card__note">{b.note}</p>
              <div className="gg-recovery-card__row">
                <div>
                  <div className="gg-funnel__panel-meta">LINK</div>
                  <div className="gg-recovery-card__url">{b.url}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="gg-funnel__panel-meta">CODE</div>
                  <div className="gg-recovery-card__code">{b.code}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gg-fg-3)', marginTop: 24, fontFamily: 'var(--gg-font-mono)' }}>
          Affiliate links. I only list brands I'd buy from again.
        </p>
      </div>
    </section>
  );
}

/* ===== Work With Me / Contact ============================================ */
function WorkWithMe() {
  const [v, setV] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setV(s => ({ ...s, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/xkoewbwb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Work With Me] ${v.type || 'New inquiry'} — ${v.name || ''}`,
          _replyto: v.email || '',
          form: 'Work With Me',
          submitted_at: new Date().toISOString(),
          ...v,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submit failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="gg-section" id="contact">
      <div className="gg-container">
        <SectionHeader number="04" label="WORK WITH ME" status="BRAND · MEDIA · SPEAKING" title="The kit, the calendar, the conversation." />
        <div className="gg-contact">
          <div className="gg-contact__intro">
            <p>For brand partnerships, sponsorship vetting, race appearances, podcasts, and speaking. I read every message myself. Tell me what you're working on and what you're hoping I can do — that's enough to start.</p>
            <p style={{ color: 'var(--gg-fg-1)' }}>Or if you'd rather skip the form: <a style={{ color: 'var(--gg-gold)', borderBottom: '1px solid var(--gg-gold)' }} href="mailto:grantgrosvenor1@gmail.com">grantgrosvenor1@gmail.com</a></p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 32, borderTop: '1px solid var(--gg-line)', paddingTop: 24 }}>
              <div>
                <div className="gg-funnel__panel-meta">REPRESENTATION</div>
                <div style={{ fontSize: 15, marginTop: 6 }}>Direct (currently unrepresented)</div>
              </div>
              <div>
                <div className="gg-funnel__panel-meta">RESPONSE TIME</div>
                <div style={{ fontSize: 15, marginTop: 6 }}>Within 5 business days</div>
              </div>
              <div>
                <div className="gg-funnel__panel-meta">MEDIA KIT</div>
                <div style={{ fontSize: 15, marginTop: 6 }}><a style={{ color: 'var(--gg-gold)' }} href="#">Download (PDF, 4MB)</a></div>
              </div>
              <div>
                <div className="gg-funnel__panel-meta">BASED IN</div>
                <div style={{ fontSize: 15, marginTop: 6 }}>Melbourne / US</div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {sent ? (
              <div style={{ background: 'var(--gg-green-soft)', border: '1px solid var(--gg-green)', padding: 24, borderRadius: 8 }}>
                <span className="gg-modal__cleared-tag">RECEIVED</span>
                <h4 className="gg-modal__cleared-title" style={{ marginTop: 8 }}>Got it. I'll be in touch.</h4>
                <p style={{ marginTop: 12, color: 'var(--gg-fg-1)' }}>I read every one of these myself. Expect a reply within five business days.</p>
              </div>
            ) : (
              <>
                <div className="gg-form-grid">
                  <Field label="Your name" name="name" required value={v.name} onChange={set('name')} />
                  <Field label="Email" type="email" name="email" required value={v.email} onChange={set('email')} />
                </div>
                <div className="gg-form-grid">
                  <Field label="Company / brand" name="company" value={v.company} onChange={set('company')} />
                  <Field label="Role" name="role" value={v.role} onChange={set('role')} placeholder="Brand partnerships, founder, producer…" />
                </div>
                <Field label="Type of work" name="type" required options={['Brand partnership', 'Sponsorship', 'Race appearance', 'Speaking', 'Podcast / media', 'Other']} value={v.type} onChange={set('type')} />
                <Field label="Tell me about it" name="msg" textarea required rows={5} value={v.msg} onChange={set('msg')} placeholder="What's the campaign / product / event? What's the timeline? What are you hoping I can do?" />

                {error && (
                  <div style={{ background: '#2a0e0d', border: '1px solid var(--gg-error)', padding: 12, borderRadius: 4, fontSize: 13, color: 'var(--gg-fg-1)' }}>
                    {error}
                  </div>
                )}

                <div className="gg-form__cta-row">
                  <p className="gg-form__legal">No mailing list. Your email is used only to reply to this message.</p>
                  <Button variant="gold" type="submit" disabled={submitting}>
                    {submitting ? 'SENDING…' : 'SEND'} <Arrow />
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ============================================================ */
function Footer() {
  return (
    <footer className="gg-footer">
      <div className="gg-container">
        <div className="gg-footer__inner">
          <div>
            <div className="gg-footer__brand-line">RUN<br/>WHAT'S LEFT.</div>
            <div className="gg-footer__brand-sub">GRANT GROSVENOR · MELBOURNE / US · {new Date().getFullYear()}</div>
          </div>
          <div className="gg-footer__col">
            <h4>SITE</h4>
            <ul>
              <li><a href="#story">Story</a></li>
              <li><a href="#coaching">Coaching</a></li>
              <li><a href="#group">Comeback Collective</a></li>
              <li><a href="#sobriety">Sobriety</a></li>
              <li><a href="#contact">Work with me</a></li>
            </ul>
          </div>
          <div className="gg-footer__col">
            <h4>ELSEWHERE</h4>
            <ul>
              <li><a href="https://www.instagram.com/grantwgrosvenor/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/@grant800m" target="_blank" rel="noreferrer">YouTube</a></li>
              <li><a href="https://www.tiktok.com/@grantgrosvenor" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://strava.com/athletes/grantgrosvenor" target="_blank" rel="noreferrer">Strava</a></li>
              <li><a href="mailto:grantgrosvenor1@gmail.com">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="gg-footer__bottom">
          <span>© {new Date().getFullYear()} GRANT GROSVENOR</span>
          <span>BUILT WITH UNFINISHED BUSINESS</span>
          <span>SUB-4 · 2× NCAA · WORLD RANKED</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, StatsSection, StorySection, Breaker, FunnelSection, SobrietySection,
  BrandsSection, DesignSection, RecoverySection, WorkWithMe, Footer,
});
